"use client";

import { useCallback, useEffect, useState } from "react";

export function useFetchData(fetcher, options = {}) {
  const { immediate = true } = options;
  const [data, setData] = useState(options.initialData ?? null);
  const [loading, setLoading] = useState(Boolean(immediate));
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (requestError) {
      setError(requestError);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (!immediate) {
      return;
    }

    execute().catch(() => {});
  }, [immediate, execute]);

  return {
    data,
    setData,
    loading,
    error,
    refetch: execute,
  };
}
