---
name: payload-ecommerce
description: Specialized skill for the Payload CMS Ecommerce plugin. Use this for configuring the plugin, working with ecommerce collections (products, carts, orders), and implementing frontend checkout flows.
---

# Payload Ecommerce Plugin

This skill covers the official `@payloadcms/plugin-ecommerce`. It adds comprehensive ecommerce capabilities to Payload, including products, carts, orders, and payment processing.

## Quick Start

### Installation

```bash
pnpm add @payloadcms/plugin-ecommerce
```

### Configuration (`payload.config.ts`)

```ts
import { ecommercePlugin } from "@payloadcms/plugin-ecommerce";
import { stripeAdapter } from "@payloadcms/plugin-ecommerce/payments/stripe";

export default buildConfig({
  plugins: [
    ecommercePlugin({
      // active: true, // defaults to true
      payments: {
        paymentMethods: [
          stripeAdapter({
            stripeSecretKey: process.env.STRIPE_SECRET_KEY,
          }),
        ],
      },
      // Optional: Override default collections
      // products: { slug: 'merch' },
    }),
  ],
});
```

## Frontend Integration

The plugin provides a React provider and hooks for interacting with the ecommerce API from your frontend (Next.js).

### Setup Provider

Wrap your application (or specific routes) with `EcommerceProvider`.

```tsx
// src/components/providers/EcommerceProvider.tsx
"use client";

import { EcommerceProvider as PayloadEcommerceProvider } from "@payloadcms/plugin-ecommerce/client/react";
import { stripeAdapterClient } from "@payloadcms/plugin-ecommerce/payments/stripe";

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PayloadEcommerceProvider
      paymentMethods={[
        stripeAdapterClient({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
        }),
      ]}
    >
      {children}
    </PayloadEcommerceProvider>
  );
};
```

### Key Hooks

Import these from `@payloadcms/plugin-ecommerce/client/react`.

| Hook             | Purpose                 | Returns                                                                    |
| :--------------- | :---------------------- | :------------------------------------------------------------------------- |
| `useCart()`      | Manage shopping cart    | `cart`, `addItem`, `removeItem`, `updateItem`, `clearCart`, `isLoading`    |
| `usePayments()`  | Handle checkout         | `initiatePayment`, `confirmOrder`, `paymentMethods`, `activePaymentMethod` |
| `useAddresses()` | Manage shipping/billing | `addresses`, `createAddress`, `updateAddress`, `deleteAddress`             |
| `useCurrency()`  | Currency formatting     | `currency`, `setCurrency`, `formatCurrency`                                |

#### Example: Add to Cart

```tsx
import { useCart } from "@payloadcms/plugin-ecommerce/client/react";

export const AddToCart = ({ productId }) => {
  const { addItem, isLoading } = useCart();

  return (
    <button
      onClick={() => addItem({ product: productId, quantity: 1 })}
      disabled={isLoading}
    >
      Add to Cart
    </button>
  );
};
```

#### Example: Checkout Flow

```tsx
import { usePayments } from "@payloadcms/plugin-ecommerce/client/react";

export const CheckoutButton = () => {
  const { initiatePayment, confirmOrder } = usePayments();

  const handleCheckout = async () => {
    // 1. Initiate (creates PaymentIntent on Stripe)
    await initiatePayment("stripe", {
      additionalData: {
        /* ... */
      },
    });

    // 2. Confirm (finalizes order)
    await confirmOrder("stripe", {
      additionalData: {
        /* ... */
      },
    });
  };
};
```

## Collections Reference

The plugin automatically registers several collections. You can override their slugs/configs in `ecommercePlugin` options.

### `products`

The core catalog item.

- **Fields**: `title`, `slug`, `price` (JSON), `images`, `stock` (if inventory enabled), `relatedProducts`.
- **Variants**: optional, adds `variants` collection and relationship.

### `carts`

Stores temporary user selections.

- **Fields**: `items` (array of product + quantity), `total`, `user` (relationship).
- **Behavior**: Auto-created for guest or logged-in users. Merges on login.

### `orders`

Completed purchases.

- **Fields**: `orderedBy`, `items` (snapshot of cart), `total`, `status`, `paymentIntent`.
- **Status**: `pending`, `succeeded`, `failed`.

### `transactions`

Logs payment attempts/history.

- **Fields**: `order`, `amount`, `status`, `paymentMethod`, `externalId` (e.g. Stripe ID).

### `customers`

Extension of the auth collection (usually `users`).

- **Fields**: `stripeCustomerID`, `addresses` (array).

## Access Control

By default, the plugin applies secure defaults:

- **Products**: Public read, Admin write.
- **Orders**: Owner/Admin read, no public write (created via API).
- **Carts**: Owner/Admin read/write.

## Type Definitions

Use these types for type safety in your code:

```ts
import type { Product, Cart, Order } from "@/payload-types"; // Generated types
import type { EcommerceConfig } from "@payloadcms/plugin-ecommerce/types";
```
