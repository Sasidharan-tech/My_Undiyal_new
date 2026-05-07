/**
 * Addresses Service - Centralized API calls for addresses
 */

import apiClient from "./apiClient";

export const addressesService = {
  async getAll() {
    return apiClient.get("/addresses");
  },

  async getById(id) {
    return apiClient.get(`/addresses/${id}`);
  },

  async create(data) {
    return apiClient.post("/addresses", data);
  },

  async update(id, data) {
    return apiClient.patch(`/addresses/${id}`, data);
  },

  async delete(id) {
    return apiClient.delete(`/addresses/${id}`);
  },

  async setDefault(id) {
    return apiClient.post(`/addresses/${id}/set-default`);
  },
};
