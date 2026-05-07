"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * UI Store - Centralized UI state management
 * Handles modals, notifications, loading states
 */

export const useUIStore = create(
  devtools(
    persist(
      (set) => ({
        // Modal states
        modals: {},
        openModal: (modalId) =>
          set((state) => ({
            modals: { ...state.modals, [modalId]: true },
          })),
        closeModal: (modalId) =>
          set((state) => ({
            modals: { ...state.modals, [modalId]: false },
          })),
        toggleModal: (modalId) =>
          set((state) => ({
            modals: { ...state.modals, [modalId]: !state.modals[modalId] },
          })),

        // Notifications
        notifications: [],
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              { id: Date.now(), ...notification },
            ],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),

        // Loading state
        isLoading: false,
        setLoading: (loading) => set({ isLoading: loading }),
      }),
      { name: "ui-store" },
    ),
  ),
);

/**
 * Cart Store - Centralized cart state management
 */

export const useCartStore = create(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item) =>
          set((state) => ({
            items: [...state.items, item],
          })),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          })),
        updateItem: (id, updates) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, ...updates } : item,
            ),
          })),
        clearCart: () => set({ items: [] }),
        getTotalPrice: () => {
          // This will be computed in selector
        },
      }),
      { name: "cart-store" },
    ),
  ),
);

/**
 * Wishlist Store - Centralized wishlist state
 */

export const useWishlistStore = create(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item) =>
          set((state) => ({
            items: [...state.items, item],
          })),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          })),
        isInWishlist: (id) => {
          // Computed in selector
        },
      }),
      { name: "wishlist-store" },
    ),
  ),
);

/**
 * Auth Store - Centralized auth state
 */

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
          }),
        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
          }),
      }),
      { name: "auth-store" },
    ),
  ),
);
