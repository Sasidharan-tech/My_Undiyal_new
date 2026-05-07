"use client";

import { useMemo } from "react";
import WishlistView from "@/components/views/wishlist/WishlistView";
import { products } from "@/data/products";

/**
 * Wishlist Page - Enterprise architecture
 * Page is MINIMAL - only delegates to view component
 * All business logic in hooks, all UI in view component
 */

export default function WishlistPage() {
  const productData = useMemo(() => products, []);

  return <WishlistView products={productData} />;
}
