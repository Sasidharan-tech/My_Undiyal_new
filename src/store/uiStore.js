"use client";

import { createContext, useContext, useMemo, useState } from "react";

const UiStoreContext = createContext(null);

export function UiStoreProvider({ children }) {
  const [isBusy, setIsBusy] = useState(false);

  const value = useMemo(
    () => ({
      isBusy,
      setIsBusy,
    }),
    [isBusy],
  );

  return <UiStoreContext.Provider value={value}>{children}</UiStoreContext.Provider>;
}

export function useUiStore() {
  const context = useContext(UiStoreContext);

  if (!context) {
    throw new Error("useUiStore must be used inside UiStoreProvider");
  }

  return context;
}
