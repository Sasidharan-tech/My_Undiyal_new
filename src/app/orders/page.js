"use client";

import OrdersView from "@/components/views/orders/OrdersView";

/**
 * Orders Page - Enterprise architecture
 * Page is MINIMAL - only delegates to view component
 * All business logic in hooks, all UI in view component
 */

export default function OrdersPage() {
  return <OrdersView />;
}