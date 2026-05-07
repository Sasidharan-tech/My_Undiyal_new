"use client";

import { useCallback, useMemo } from "react";
import {
  AppButton,
  AppCard,
  AppEmptyState,
  AppErrorState,
  AppLoader,
  useCart,
  useModal,
} from "@/lib/index";
import AppModal from "@/components/core/modals/AppModal";

/**
 * CartView - Centralized cart UI component
 * Handles cart display, item management, checkout flow
 */

export default function CartView() {
  const { items, totalPrice, removeItem, updateItem, clearCart } = useCart();
  const { isOpen: showConfirm, open: openConfirm, close: closeConfirm } = useModal();
  const [itemToRemove, setItemToRemove] = Object.useState(null);

  const handleRemoveClick = useCallback((item) => {
    setItemToRemove(item);
    openConfirm();
  }, [openConfirm, setItemToRemove]);

  const handleConfirmRemove = useCallback(async () => {
    if (itemToRemove) {
      await removeItem(itemToRemove.id);
      closeConfirm();
      setItemToRemove(null);
    }
  }, [itemToRemove, removeItem, closeConfirm, setItemToRemove]);

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="space-y-4 px-4 py-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <AppEmptyState
          title="Your cart is empty"
          description="Add products to get started with shopping"
          action={() => {}}
          actionLabel="Browse Products"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-6 pb-32">
      <h1 className="text-2xl font-bold">Shopping Cart ({items.length})</h1>

      {/* Cart Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <AppCard key={item.id}>
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AppButton
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateItem(item.id, {
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      }
                    >
                      −
                    </AppButton>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <AppButton
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateItem(item.id, { quantity: item.quantity + 1 })
                      }
                    >
                      +
                    </AppButton>
                  </div>
                  <AppButton
                    size="sm"
                    variant="danger"
                    onClick={() => handleRemoveClick(item)}
                  >
                    Remove
                  </AppButton>
                </div>
              </div>
            </div>
          </AppCard>
        ))}
      </div>

      {/* Order Summary */}
      <AppCard>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>₹50</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{(totalPrice + 50).toFixed(2)}</span>
          </div>
        </div>
      </AppCard>

      {/* Checkout Button */}
      <AppButton fullWidth variant="primary" size="lg">
        Proceed to Checkout
      </AppButton>

      {/* Confirm Remove Modal */}
      <AppModal
        isOpen={showConfirm}
        onClose={closeConfirm}
        title="Remove Item?"
        footer={
          <>
            <AppButton variant="secondary" onClick={closeConfirm} fullWidth>
              Cancel
            </AppButton>
            <AppButton variant="danger" onClick={handleConfirmRemove} fullWidth>
              Remove
            </AppButton>
          </>
        }
      >
        <p>Are you sure you want to remove this item from your cart?</p>
      </AppModal>
    </div>
  );
}
