"use client";

import { useMemo, useState } from "react";

export function useSearch(items, selector) {
  const [searchText, setSearchText] = useState("");

  const filteredItems = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return items;
    }

    return items.filter((item) => {
      const searchSource = selector(item).toLowerCase();
      return searchSource.includes(query);
    });
  }, [items, searchText, selector]);

  return {
    searchText,
    setSearchText,
    filteredItems,
  };
}
