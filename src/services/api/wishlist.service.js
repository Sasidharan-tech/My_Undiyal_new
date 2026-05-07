/**
 * Wishlist Service - Centralized API calls for wishlist
 */

import apiClient from "./apiClient";

export const wishlistService = {
  async getAll() {
    return apiClient.get("/wishlist");
  },

  async add(productId) {
    return apiClient.post("/wishlist", { productId });
  },

  async remove(productId) {
    return apiClient.delete(`/wishlist/${productId}`);
  },

  async isInWishlist(productId) {
    return apiClient.get(`/wishlist/${productId}`);
  },
};
