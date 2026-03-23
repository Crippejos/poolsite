/**
 * Shopify Storefront API client.
 *
 * Set these env vars to activate Shopify:
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN   = yourstore.myshopify.com
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = your-public-storefront-token
 *
 * When the vars are missing the client is a no-op (local-only cart mode).
 */

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const API_VERSION = "2024-04";

export const shopifyEnabled = Boolean(DOMAIN && TOKEN);

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!shopifyEnabled) throw new Error("Shopify not configured");

  const res = await fetch(
    `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }

  return json.data as T;
}
