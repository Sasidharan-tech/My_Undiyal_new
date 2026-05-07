/**
 * Products Service - Centralized API calls for products
 */

import apiClient from "./apiClient";

export const productsService = {
  async getAll() {
    return apiClient.get("/products");
  },

  async getById(id) {
    return apiClient.get(`/products/${id}`);
  },

  async search(query) {
    return apiClient.get("/products/search", { params: { q: query } });
  },

  async getByCategory(categoryId) {
    return apiClient.get(`/categories/${categoryId}/products`);
  },

  async getFeatured() {
    return apiClient.get("/products/featured");
  },

  async getNewArrivals() {
    return apiClient.get("/products/new-arrivals");
  },
};
