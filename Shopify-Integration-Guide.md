# Shopify Headless Integration — Elite Pool & Spa

**Project:** poolsite (Next.js 16 / App Router)
**Date:** 2026-03-23
**Status:** Foundation complete — ready to connect when Shopify store is live

---

## Overview

The site is wired for Shopify as a headless backend. When Shopify credentials are added, the cart automatically syncs with Shopify and the checkout button routes customers directly to Shopify's hosted checkout page.

Until credentials are set, the site runs in **local-only cart mode** — everything works exactly as before, no errors.

---

## Files Added / Changed

### New files

| File | Purpose |
|------|---------|
| `lib/shopify.ts` | Storefront API client — handles all GraphQL requests, auth headers, and errors |
| `lib/shopifyCart.ts` | Cart mutations: create cart, add/remove/update lines, fetch cart |

### Modified files

| File | What changed |
|------|-------------|
| `app/Components/CartContext.tsx` | Cart now syncs to Shopify in the background after every add/remove/update. Exposes `checkoutUrl`. |
| `app/Components/CartDrawer.tsx` | "Gå till kassan" button links to Shopify checkout URL when available |
| `lib/allProducts.ts` | Added optional `shopifyVariantId?: string` field to Product type |
| `lib/pahlenProducts.ts` | Added optional `shopifyVariantId?: string` field to PahlenProduct type |
| `.env.local` | Added placeholder env vars for Shopify credentials |

---

## How to Connect Shopify

### Step 1 — Create a Storefront API token in Shopify

1. Go to your Shopify Admin
2. Navigate to **Settings → Apps and sales channels → Develop apps**
3. Create a new app (e.g. "Elite Pool Headless")
4. Under **API credentials**, enable the **Storefront API**
5. Grant these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
6. Copy the **Storefront API access token**

### Step 2 — Add credentials to `.env.local`

Open `.env.local` in the project root and fill in:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=yourstore.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-token
```

Restart the dev server after saving (`npm run dev`).

### Step 3 — Link products to Shopify variants

For each product you publish in Shopify, copy its **Variant GID** and add it to the product entry in code.

**Example — main product (`lib/allProducts.ts`):**
```ts
{
  slug: "bst-001",
  name: "Utomhusbastu Classic",
  sku: "BST-001",
  price: 49900,
  shopifyVariantId: "gid://shopify/ProductVariant/12345678901",
  // ... rest of fields
}
```

**Example — Pahlén spare part (`lib/pahlenProducts.ts`):**
```ts
{ sku: "633003", name: "Klafflucka 235x136,5 komplett", price: 341,
  shopifyVariantId: "gid://shopify/ProductVariant/98765432100" },
```

**Where to find the Variant GID in Shopify:**
- Open the product in Shopify Admin
- Click on a variant
- The URL will contain the numeric ID: `admin.shopify.com/products/123/variants/456`
- The GID is: `gid://shopify/ProductVariant/456`

### Step 4 — Products without a variantId (quote-only items)

Products with `price: 0` or no `shopifyVariantId` are **not synced to Shopify**. They stay in the local cart and the drawer shows "Begär offert" instead of "Gå till kassan". This is intentional for custom/bespoke items.

If a cart contains **both** Shopify products and quote-only items, the drawer shows "Begär offert" and routes to `/kontakt`.

---

## How It Works (Technical)

### Cart flow

```
User clicks "Lägg i varukorg"
        │
        ▼
CartContext.addItem()
  → Updates local state immediately (optimistic)
  → Saves to localStorage
  → If item has shopifyVariantId:
      → cartCreate (first item) OR cartLinesAdd (subsequent items)
      → Stores shopifyCartId in localStorage
      → Updates checkoutUrl in context
        │
        ▼
CartDrawer
  → If checkoutUrl exists AND no quote-only items:
      → "Gå till kassan" → links to Shopify hosted checkout
  → Otherwise:
      → "Begär offert" → links to /kontakt
```

### Graceful degradation

If Shopify is down or credentials are missing:
- Cart still works 100% locally
- No errors shown to user
- Shopify errors are logged to console only (`console.error`)
- `checkoutUrl` stays null → drawer falls back to `/kontakt`

### localStorage keys

| Key | Value |
|-----|-------|
| `elite-cart` | JSON array of cart items |
| `elite-shopify-cart-id` | Shopify cart GID (persisted across page loads) |

---

## Shopify Storefront API Details

- **Endpoint:** `https://{domain}/api/2024-04/graphql.json`
- **Auth header:** `X-Shopify-Storefront-Access-Token`
- **API version:** `2024-04`

### Mutations used

| Mutation | When |
|----------|------|
| `cartCreate` | First item added to an empty cart |
| `cartLinesAdd` | Subsequent items added |
| `cartLinesRemove` | Item removed from cart |
| `cartLinesUpdate` | Quantity changed |

---

## Checklist — Going Live

- [ ] Shopify store created and products published
- [ ] Storefront API token generated
- [ ] `.env.local` filled in (also set in Vercel/hosting env vars)
- [ ] `shopifyVariantId` added to each product entry in code
- [ ] Test: add a priced product → cart syncs → checkout URL appears → Shopify checkout loads
- [ ] Test: add a price-on-request product → "Begär offert" shown → routes to /kontakt
- [ ] Test: mixed cart (priced + quote) → "Begär offert" shown
- [ ] Verify Shopify checkout currency is set to SEK
- [ ] Verify shipping zones cover Sweden in Shopify

---

## Notes

- Quote-only / bespoke products (spa, custom pools) should **not** be published in Shopify. Keep `price: 0` and omit `shopifyVariantId` — they will always go through the contact form.
- Pahlén spare parts can all be published in Shopify with individual variants. Use the SKU as the Shopify product SKU field for easy matching.
- The Shopify cart ID is stored in localStorage, so if a user closes the browser and returns, their cart is still linked to the same Shopify cart (until it expires — Shopify carts expire after 10 days of inactivity).
