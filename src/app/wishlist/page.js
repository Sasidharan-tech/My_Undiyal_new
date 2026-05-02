"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import FlowHeader from "@/components/ui/FlowHeader";
import WishlistCard from "@/components/sections/wishlist/WishlistCard";
import DeletePopup from "@/components/ui/DeletePopup";
import { getProductById } from "@/data/products";

function getWishlistIdsFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith("myundiyal-wishlist-"))
    .filter((key) => window.localStorage.getItem(key) === "true")
    .map((key) => key.replace("myundiyal-wishlist-", ""));
}

export default function WishlistPage() {
  const [searchText, setSearchText] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setWishlistIds(getWishlistIdsFromStorage());
    setIsHydrated(true);
  }, []);

  const wishlistProducts = useMemo(
    () => wishlistIds.map((id) => getProductById(id)).filter(Boolean),
    [wishlistIds],
  );

  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return wishlistProducts;
    }

    return wishlistProducts.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const description = (product.description || "").toLowerCase();
      return name.includes(query) || description.includes(query);
    });
  }, [wishlistProducts, searchText]);

  function handleOpenDeletePopup(productId) {
    const targetProduct = wishlistProducts.find((product) => product.id === productId) || null;
    setDeleteTarget(targetProduct);
  }

  function handleCancelDelete() {
    setDeleteTarget(null);
  }

  function handleRemoveFromWishlist() {
    const productId = deleteTarget?.id;
    if (!productId) {
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(`myundiyal-wishlist-${productId}`, "false");
    }

    setWishlistIds((prevIds) => prevIds.filter((id) => id !== productId));
    setDeleteTarget(null);
  }

  return (
    <main className="app-background mx-auto min-h-dvh w-full max-w-120 pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
      <FlowHeader title="Wishlist" backHref="/profile" headerClassName="mb-0" />

      <section className="px-4 py-3">
        <div
          className="flex items-center gap-2 rounded-full bg-[#FFF2EA] px-4 py-2"
          role="search"
          aria-label="Search your wishlist"
        >
          <Search size={18} className="text-orange-300" aria-hidden="true" />
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search your Wishlist..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-orange-300"
            aria-label="Search your Wishlist"
          />
        </div>
      </section>

      <section className="space-y-3 px-4 pb-4" aria-label="Wishlist products">
        {!isHydrated ? (
          <p className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
            Loading your wishlist...
          </p>
        ) : null}

        {isHydrated && filteredProducts.length === 0 ? (
          <p className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
            No wishlist items found.
          </p>
        ) : null}

        {filteredProducts.map((product) => (
          <WishlistCard
            key={product.id}
            product={product}
            onRemove={handleOpenDeletePopup}
          />
        ))}
      </section>

      <DeletePopup
        open={Boolean(deleteTarget)}
        onCancel={handleCancelDelete}
        onConfirm={handleRemoveFromWishlist}
        title="Are your sure your want to delete this product?"
        showImage
        imageSrc={deleteTarget?.image}
        imageAlt={deleteTarget?.name || "Product"}
        primaryText={deleteTarget?.shortName || deleteTarget?.name || ""}
        secondaryText={deleteTarget?.description || deleteTarget?.name || ""}
      />
    </main>
  );
}
