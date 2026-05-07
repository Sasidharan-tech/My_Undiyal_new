"use client";

import CartView from "@/components/views/cart/CartView";

/**
 * Cart Page - Enterprise architecture
 * Page is MINIMAL - only delegates to view component
 * All business logic in hooks, all UI in view component
 */

export default function CartPage() {
  return <CartView />;
}
