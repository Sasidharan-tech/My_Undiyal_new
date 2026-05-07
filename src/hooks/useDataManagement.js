"use client";

import { useState, useCallback, useEffect } from "react";

/**
 * useFetch - Generic data fetching hook
 * Handles loading, error, and caching
 */

export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(Array.isArray(dependencies) ? dependencies : []), refetch]);

  return { data, loading, error, refetch };
}

/**
 * useCrud - Generic CRUD operations hook
 * Handles create, read, update, delete operations
 */

export function useCrud(initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (operation) => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      const errorMessage = err.message || "Operation failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(
    async (createFn) => {
      const result = await execute(createFn);
      setData(result);
      return result;
    },
    [execute],
  );

  const update = useCallback(
    async (updateFn) => {
      const result = await execute(updateFn);
      setData(result);
      return result;
    },
    [execute],
  );

  const remove = useCallback(
    async (removeFn) => {
      await execute(removeFn);
      setData(null);
    },
    [execute],
  );

  const read = useCallback(
    async (readFn) => {
      const result = await execute(readFn);
      setData(result);
      return result;
    },
    [execute],
  );

  return {
    data,
    loading,
    error,
    create,
    read,
    update,
    remove,
  };
}

/**
 * useSearch - Search with filtering hook
 * Handles search state and filtered results
 */

export function useSearch(items, searchKey = "name") {
  const [searchText, setSearchText] = useState("");

  const filteredItems = items.filter((item) => {
    const searchValue = typeof searchKey === "function"
      ? searchKey(item)
      : item[searchKey];

    return String(searchValue)
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  return { searchText, setSearchText, filteredItems };
}

/**
 * useDebounce - Debounce hook
 * Delays callback execution until specified time has passed
 */

export function useDebounce(callback, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      callback(debouncedValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [debouncedValue, callback, delay]);

  return [debouncedValue, setDebouncedValue];
}

/**
 * usePagination - Pagination hook
 * Handles page state and item slicing
 */

export function usePagination(items, itemsPerPage = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = useCallback((pageNumber) => {
    setPage(Math.max(1, Math.min(pageNumber, totalPages)));
  }, [totalPages]);

  return {
    page,
    setPage: goToPage,
    totalPages,
    paginatedItems,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/**
 * useModal - Modal state management hook
 * Handles modal open/close state
 */

export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}

/**
 * useAsync - Generic async operation hook
 * Handles loading and error states
 */

export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus("pending");
    setData(null);
    setError(null);

    try {
      const result = await asyncFunction();
      setData(result);
      setStatus("success");
      return result;
    } catch (err) {
      setError(err);
      setStatus("error");
      throw err;
    }
  }, [asyncFunction]);

  useEffect(() => {
    let mounted = true;

    const runAsync = async () => {
      if (!mounted) return;
      setStatus("pending");
      setData(null);
      setError(null);

      try {
        const result = await asyncFunction();
        if (mounted) {
          setData(result);
          setStatus("success");
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setStatus("error");
        }
      }
    };

    if (immediate) {
      void runAsync();
    }

    return () => {
      mounted = false;
    };
  }, [asyncFunction, immediate]);

  return { status, data, error, execute };
}
