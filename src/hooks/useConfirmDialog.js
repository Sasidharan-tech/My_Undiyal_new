"use client";

import { useCallback, useState } from "react";

export function useConfirmDialog() {
  const [target, setTarget] = useState(null);

  const openDialog = useCallback((nextTarget) => {
    setTarget(nextTarget ?? null);
  }, []);

  const closeDialog = useCallback(() => {
    setTarget(null);
  }, []);

  return {
    target,
    isOpen: Boolean(target),
    openDialog,
    closeDialog,
  };
}
