"use client";

import { useCallback, useState } from "react";
import {
  AppButton,
  AppCard,
  AppEmptyState,
  AppErrorState,
  AppLoader,
  useWishlist,
  useSearch,
  useModal,
} from "@/lib/index";
import AppModal from "@/components/core/modals/AppModal";

/**
 * WishlistView - Centralized wishlist UI component
 * Handles wishlist display and item management
 */

export default function WishlistView({ products }) {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { searchText, setSearchText, filteredItems } = useSearch(
    products.filter((p) => wishlistItems.some((w) => w.id === p.id)),
    (p) => p.name,
  );

  const { isOpen: showConfirm, open: openConfirm, close: closeConfirm } = useModal();
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveClick = useCallback((item) => {
    setItemToRemove(item);
    openConfirm();
  }, [openConfirm]);

  const handleConfirmRemove = useCallback(async () => {
    if (itemToRemove) {
      await removeFromWishlist(itemToRemove.id);
      closeConfirm();
      setItemToRemove(null);
    }
  }, [itemToRemove, removeFromWishlist, closeConfirm]);

  const isEmpty = filteredItems.length === 0;

  if (isEmpty && wishlistItems.length === 0) {
    return (
      <div className="space-y-4 px-4 py-6">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <AppEmptyState
          title="Your wishlist is empty"
          description="Add products to your wishlist"
          action={() => {}}
          actionLabel="Browse Products"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-6">
      <h1 className="text-2xl font-bold">Wishlist ({wishlistItems.length})</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search wishlist..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2"
      />

      {/* Items */}
      {isEmpty && wishlistItems.length > 0 ? (
        <AppEmptyState title="No items match your search" />
      ) : (
        <div className="grid gap-3">
          {filteredItems.map((product) => (
            <AppCard key={product.id} interactive>
              <div className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {product.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-500">
                      ₹{product.price}
                    </span>
                    <div className="flex gap-2">
                      <AppButton
                        size="sm"
                        variant="primary"
                        onClick={() => {}}
                      >
                        Add to Cart
                      </AppButton>
                      <AppButton
                        size="sm"
                        variant="danger"
                        onClick={() => handleRemoveClick(product)}
                      >
                        Remove
                      </AppButton>
                    </div>
                  </div>
                </div>
              </div>
            </AppCard>
          ))}
        </div>
      )}

      {/* Confirm Remove Modal */}
      <AppModal
        isOpen={showConfirm}
        onClose={closeConfirm}
        title="Remove from Wishlist?"
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
        <p>Remove {itemToRemove?.name} from your wishlist?</p>
      </AppModal>
    </div>
  );
}
