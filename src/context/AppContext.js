"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useNavigation } from "@/hooks/useNavigation";

/**
 * AppContext - Centralized app-level context for routing and global state
 * Provides navigation helpers and app-wide utilities
 */

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const setLoading = useCallback((state) => {
    setIsLoading(state);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      setLoading,
      nav: navigation,
    }),
    [isLoading, setLoading, navigation],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}

/**
 * useAppNavigation - Shorthand hook for accessing just the navigation utilities
 */
export function useAppNavigation() {
  const { nav } = useAppContext();
  return nav;
}
