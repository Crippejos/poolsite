"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { shopifyEnabled } from "@/lib/shopify";
import {
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
} from "@/lib/shopifyCart";

export type CartItem = {
  id: string;
  name: string;
  sku: string;
  price: number;
  image?: string;
  options: Record<string, string>;
  quantity: number;
  /** Shopify variant GID — present for purchasable products synced to Shopify */
  shopifyVariantId?: string;
  /** Shopify cart line GID — set after the line has been added to a Shopify cart */
  shopifyLineId?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  /** Shopify checkout URL — only set when Shopify is enabled and cart has Shopify lines */
  checkoutUrl: string | null;
};

const CartContext = createContext<CartContextType | null>(null);

function makeId(sku: string, options: Record<string, string>) {
  return sku + Object.entries(options).map(([k, v]) => `|${k}:${v}`).join("");
}

const STORAGE_KEY = "elite-cart";
const SHOPIFY_CART_ID_KEY = "elite-shopify-cart-id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [shopifyCartId, setShopifyCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Track in-flight Shopify ops so we don't double-fire
  const syncing = useRef(false);

  // ── Hydrate from localStorage ─────────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
      const cartId = localStorage.getItem(SHOPIFY_CART_ID_KEY);
      if (cartId) setShopifyCartId(cartId);
    } catch {}
  }, []);

  // ── Persist cart items to localStorage ───────────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // ── Persist Shopify cart ID ───────────────────────────────────────────────
  useEffect(() => {
    if (shopifyCartId) {
      localStorage.setItem(SHOPIFY_CART_ID_KEY, shopifyCartId);
    }
  }, [shopifyCartId]);

  // ─── Shopify helpers ──────────────────────────────────────────────────────

  /** Sync a newly-added item to Shopify cart in the background. */
  async function syncAddToShopify(item: CartItem) {
    if (!shopifyEnabled || !item.shopifyVariantId || syncing.current) return;
    syncing.current = true;
    try {
      const line = { merchandiseId: item.shopifyVariantId, quantity: item.quantity };

      let cart;
      if (shopifyCartId) {
        cart = await cartLinesAdd(shopifyCartId, [line]);
      } else {
        cart = await cartCreate([line]);
        if (cart) {
          setShopifyCartId(cart.id);
          setCheckoutUrl(cart.checkoutUrl);
        }
      }

      if (cart) {
        setCheckoutUrl(cart.checkoutUrl);
        // Back-fill shopifyLineId on the matching item
        const added = cart.lines.edges.find(
          e => e.node.merchandise.id === item.shopifyVariantId
        );
        if (added) {
          setItems(prev =>
            prev.map(i =>
              i.id === item.id ? { ...i, shopifyLineId: added.node.id } : i
            )
          );
        }
      }
    } finally {
      syncing.current = false;
    }
  }

  /** Remove a line from Shopify cart in the background. */
  async function syncRemoveFromShopify(shopifyLineId: string) {
    if (!shopifyEnabled || !shopifyCartId || syncing.current) return;
    syncing.current = true;
    try {
      const cart = await cartLinesRemove(shopifyCartId, [shopifyLineId]);
      if (cart) setCheckoutUrl(cart.checkoutUrl);
    } finally {
      syncing.current = false;
    }
  }

  /** Update quantity of a Shopify line in the background. */
  async function syncUpdateQty(shopifyLineId: string, quantity: number) {
    if (!shopifyEnabled || !shopifyCartId || syncing.current) return;
    syncing.current = true;
    try {
      const cart = await cartLinesUpdate(shopifyCartId, [{ id: shopifyLineId, quantity }]);
      if (cart) setCheckoutUrl(cart.checkoutUrl);
    } finally {
      syncing.current = false;
    }
  }

  // ─── Public actions ───────────────────────────────────────────────────────

  const addItem = useCallback((item: Omit<CartItem, "id" | "quantity">) => {
    const id = makeId(item.sku, item.options);
    let newItem: CartItem | null = null;

    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      newItem = { ...item, id, quantity: 1 };
      return [...prev, newItem];
    });

    // Kick off Shopify sync on next tick so state has settled
    if (newItem) {
      const captured = newItem;
      setTimeout(() => syncAddToShopify(captured), 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopifyCartId]);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.shopifyLineId) {
        syncRemoveFromShopify(item.shopifyLineId);
      }
      return prev.filter(i => i.id !== id);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopifyCartId]);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => {
        const item = prev.find(i => i.id === id);
        if (item?.shopifyLineId) {
          syncRemoveFromShopify(item.shopifyLineId);
        }
        return prev.filter(i => i.id !== id);
      });
    } else {
      setItems(prev => {
        const item = prev.find(i => i.id === id);
        if (item?.shopifyLineId) {
          syncUpdateQty(item.shopifyLineId, qty);
        }
        return prev.map(i => i.id === id ? { ...i, quantity: qty } : i);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopifyCartId]);

  const clearCart = useCallback(() => {
    // Note: we intentionally keep the Shopify cart alive server-side;
    // the user can always re-open it via checkoutUrl. Just clear locally.
    setItems([]);
  }, []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQty, clearCart,
        count, subtotal, open, setOpen, checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
