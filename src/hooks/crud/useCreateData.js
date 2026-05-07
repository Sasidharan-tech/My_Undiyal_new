"use client";

import { useCallback, useState } from "react";

export function useCreateData(createAction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createData = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      return await createAction(payload);
    } catch (actionError) {
      setError(actionError);
      throw actionError;
    } finally {
      setLoading(false);
    }
  }, [createAction]);

  return { createData, loading, error };
}
