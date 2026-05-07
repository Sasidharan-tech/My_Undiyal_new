"use client";

import { useMemo } from "react";
import {
  AppButton,
  AppCard,
  AppEmptyState,
  AppErrorState,
  AppLoader,
  useOrders,
  usePagination,
} from "@/lib/index";

/**
 * OrdersView - Centralized orders UI component
 * Handles orders list display with pagination
 */

export default function OrdersView() {
  const { orders, loading, error } = useOrders();
  const { page, setPage, totalPages, paginatedItems } = usePagination(orders || [], 10);

  if (loading) {
    return <AppLoader label="Loading your orders..." />;
  }

  if (error) {
    return <AppErrorState title="Failed to load orders" />;
  }

  const isEmpty = !orders || orders.length === 0;

  if (isEmpty) {
    return (
      <div className="space-y-4 px-4 py-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <AppEmptyState
          title="No orders yet"
          description="Start shopping to place your first order"
          action={() => {}}
          actionLabel="Browse Products"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-6">
      <h1 className="text-2xl font-bold">My Orders ({orders.length})</h1>

      {/* Orders List */}
      <div className="space-y-3">
        {paginatedItems.map((order) => (
          <AppCard key={order.id} clickable>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">Order #{order.id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-1 text-sm font-medium">
                  Status: <span className="text-blue-600">{order.status}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-orange-500">
                  ₹{order.total}
                </p>
                <AppButton size="sm" variant="outline" onClick={() => {}}>
                  View Details
                </AppButton>
              </div>
            </div>
          </AppCard>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <AppButton
            size="sm"
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </AppButton>
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <AppButton
            size="sm"
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </AppButton>
        </div>
      )}
    </div>
  );
}
