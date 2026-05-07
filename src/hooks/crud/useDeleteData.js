"use client";

import { useCallback, useState } from "react";

export function useDeleteData(deleteAction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      return await deleteAction(payload);
    } catch (actionError) {
      setError(actionError);
      throw actionError;
    } finally {
      setLoading(false);
    }
  }, [deleteAction]);

  return { deleteData, loading, error };
}
