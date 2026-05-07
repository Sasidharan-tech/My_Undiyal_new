import axios from "axios";
import { STORAGE_KEYS } from "@/constants/storageKeys";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem(STORAGE_KEYS.authToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
