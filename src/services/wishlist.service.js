import { STORAGE_KEYS } from "@/constants/storageKeys";

export function getWishlistIdsFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith(STORAGE_KEYS.wishlistPrefix))
    .filter((key) => window.localStorage.getItem(key) === "true")
    .map((key) => key.replace(STORAGE_KEYS.wishlistPrefix, ""));
}

export function removeWishlistItem(productId) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(`${STORAGE_KEYS.wishlistPrefix}${productId}`, "false");
}
