"use client";

import { useUIStore, useCartStore, useWishlistStore, useAuthStore } from "@/store";
import { useFetch, useCrud, useModal } from "@/hooks/useDataManagement";
import { productsService } from "@/services/api/products.service";
import { ordersService } from "@/services/api/orders.service";
import { cartService } from "@/services/api/cart.service";
import { wishlistService } from "@/services/api/wishlist.service";
import { addressesService } from "@/services/api/addresses.service";

/**
 * useProducts - Custom hook for products operations
 */

export function useProducts() {
  const { data: products, loading, error, refetch } = useFetch(
    () => productsService.getAll(),
    [],
  );

  return { products, loading, error, refetch };
}

/**
 * useProduct - Custom hook for single product
 */

export function useProduct(id) {
  const { data: product, loading, error, refetch } = useFetch(
    () => productsService.getById(id),
    [id],
  );

  return { product, loading, error, refetch };
}

/**
 * useOrders - Custom hook for orders operations
 */

export function useOrders() {
  const { data: orders, loading, error, refetch } = useFetch(
    () => ordersService.getAll(),
    [],
  );

  const createOrder = async (orderData) => {
    try {
      useUIStore.setState({ isLoading: true });
      const newOrder = await ordersService.create(orderData);
      refetch();
      return newOrder;
    } finally {
      useUIStore.setState({ isLoading: false });
    }
  };

  return { orders, loading, error, createOrder, refetch };
}

/**
 * useCart - Custom hook for cart operations
 */

export function useCart() {
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItem = useCartStore((state) => state.updateItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleAddItem = async (productId, quantity) => {
    try {
      const response = await cartService.addItem(productId, quantity);
      addItem(response);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartService.removeItem(productId);
      removeItem(productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: cartItems,
    totalPrice,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateItem,
    clearCart,
  };
}

/**
 * useWishlist - Custom hook for wishlist operations
 */

export function useWishlist() {
  const wishlistItems = useWishlistStore((state) => state.items);
  const addItem = useWishlistStore((state) => state.addItem);
  const removeItem = useWishlistStore((state) => state.removeItem);

  const handleAddToWishlist = async (productId) => {
    try {
      await wishlistService.add(productId);
      addItem({ id: productId });
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistService.remove(productId);
      removeItem(productId);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);

  return {
    items: wishlistItems,
    isInWishlist,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
  };
}

/**
 * useAddresses - Custom hook for addresses operations
 */

export function useAddresses() {
  const { data: addresses, loading, error, refetch } = useFetch(
    () => addressesService.getAll(),
    [],
  );

  const createAddress = async (addressData) => {
    try {
      await addressesService.create(addressData);
      refetch();
    } catch (error) {
      console.error("Failed to create address:", error);
      throw error;
    }
  };

  const updateAddress = async (id, addressData) => {
    try {
      await addressesService.update(id, addressData);
      refetch();
    } catch (error) {
      console.error("Failed to update address:", error);
      throw error;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await addressesService.delete(id);
      refetch();
    } catch (error) {
      console.error("Failed to delete address:", error);
      throw error;
    }
  };

  return {
    addresses,
    loading,
    error,
    createAddress,
    updateAddress,
    deleteAddress,
    refetch,
  };
}
