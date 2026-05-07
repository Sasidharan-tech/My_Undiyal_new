/**
 * Auth Service - Centralized API calls for authentication
 */

import apiClient from "./apiClient";

export const authService = {
  async login(email, password) {
    const response = await apiClient.post("/auth/login", { email, password });
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    return response;
  },

  async register(data) {
    const response = await apiClient.post("/auth/register", data);
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    return response;
  },

  async logout() {
    localStorage.removeItem("authToken");
    return apiClient.post("/auth/logout");
  },

  async getProfile() {
    return apiClient.get("/auth/profile");
  },

  async updateProfile(data) {
    return apiClient.patch("/auth/profile", data);
  },

  async verifyOtp(phone, otp) {
    return apiClient.post("/auth/verify-otp", { phone, otp });
  },
};
