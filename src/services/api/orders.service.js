/**
 * Orders Service - Centralized API calls for orders
 */

import apiClient from "./apiClient";

export const ordersService = {
  async getAll() {
    return apiClient.get("/orders");
  },

  async getById(id) {
    return apiClient.get(`/orders/${id}`);
  },

  async create(data) {
    return apiClient.post("/orders", data);
  },

  async update(id, data) {
    return apiClient.patch(`/orders/${id}`, data);
  },

  async cancel(id) {
    return apiClient.post(`/orders/${id}/cancel`);
  },

  async getOrderSummary() {
    return apiClient.get("/orders/summary");
  },
};
