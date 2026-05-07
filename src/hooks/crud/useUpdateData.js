"use client";

import { useCallback, useState } from "react";

export function useUpdateData(updateAction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      return await updateAction(payload);
    } catch (actionError) {
      setError(actionError);
      throw actionError;
    } finally {
      setLoading(false);
    }
  }, [updateAction]);

  return { updateData, loading, error };
}
