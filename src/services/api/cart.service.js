/**
 * Cart Service - Centralized API calls for cart
 */

import apiClient from "./apiClient";

export const cartService = {
  async getCart() {
    return apiClient.get("/cart");
  },

  async addItem(productId, quantity) {
    return apiClient.post("/cart/items", { productId, quantity });
  },

  async updateItem(productId, quantity) {
    return apiClient.patch(`/cart/items/${productId}`, { quantity });
  },

  async removeItem(productId) {
    return apiClient.delete(`/cart/items/${productId}`);
  },

  async clearCart() {
    return apiClient.post("/cart/clear");
  },

  async applyCode(code) {
    return apiClient.post("/cart/apply-code", { code });
  },
};
