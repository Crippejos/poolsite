/**
 * Shopify Storefront API — cart operations.
 *
 * All functions are no-ops (return null) when Shopify is not configured,
 * allowing the site to run in local-only cart mode during development.
 */

import { shopifyFetch, shopifyEnabled } from "./shopify";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShopifyCartLine = {
  id: string;           // line item id (gid://shopify/CartLine/…)
  quantity: number;
  merchandise: {
    id: string;         // variant id
    title: string;
    product: { title: string };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: { edges: Array<{ node: ShopifyCartLine }> };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
};

type CartCreateData = { cartCreate: { cart: ShopifyCart; userErrors: { message: string }[] } };
type CartLinesAddData = { cartLinesAdd: { cart: ShopifyCart; userErrors: { message: string }[] } };
type CartLinesRemoveData = { cartLinesRemove: { cart: ShopifyCart; userErrors: { message: string }[] } };
type CartLinesUpdateData = { cartLinesUpdate: { cart: ShopifyCart; userErrors: { message: string }[] } };
type CartQueryData = { cart: ShopifyCart | null };

// ─── Fragments ────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    cost { totalAmount { amount currencyCode } }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product { title }
            }
          }
        }
      }
    }
  }
`;

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function cartCreate(
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart | null> {
  if (!shopifyEnabled) return null;
  try {
    const data = await shopifyFetch<CartCreateData>(
      `${CART_FRAGMENT}
      mutation cartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart { ...CartFragment }
          userErrors { message }
        }
      }`,
      { lines }
    );
    return data.cartCreate.cart;
  } catch (e) {
    console.error("[shopifyCart] cartCreate failed:", e);
    return null;
  }
}

export async function cartLinesAdd(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart | null> {
  if (!shopifyEnabled) return null;
  try {
    const data = await shopifyFetch<CartLinesAddData>(
      `${CART_FRAGMENT}
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFragment }
          userErrors { message }
        }
      }`,
      { cartId, lines }
    );
    return data.cartLinesAdd.cart;
  } catch (e) {
    console.error("[shopifyCart] cartLinesAdd failed:", e);
    return null;
  }
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  if (!shopifyEnabled) return null;
  try {
    const data = await shopifyFetch<CartLinesRemoveData>(
      `${CART_FRAGMENT}
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFragment }
          userErrors { message }
        }
      }`,
      { cartId, lineIds }
    );
    return data.cartLinesRemove.cart;
  } catch (e) {
    console.error("[shopifyCart] cartLinesRemove failed:", e);
    return null;
  }
}

export async function cartLinesUpdate(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart | null> {
  if (!shopifyEnabled) return null;
  try {
    const data = await shopifyFetch<CartLinesUpdateData>(
      `${CART_FRAGMENT}
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFragment }
          userErrors { message }
        }
      }`,
      { cartId, lines }
    );
    return data.cartLinesUpdate.cart;
  } catch (e) {
    console.error("[shopifyCart] cartLinesUpdate failed:", e);
    return null;
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  if (!shopifyEnabled) return null;
  try {
    const data = await shopifyFetch<CartQueryData>(
      `${CART_FRAGMENT}
      query getCart($cartId: ID!) {
        cart(id: $cartId) { ...CartFragment }
      }`,
      { cartId }
    );
    return data.cart;
  } catch (e) {
    console.error("[shopifyCart] getCart failed:", e);
    return null;
  }
}
