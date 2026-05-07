/**
 * Barrel export for all core components
 * Single import point for UI primitives
 */

export { default as AppButton } from "@/components/core/buttons/AppButton";
export { default as AppInput } from "@/components/core/inputs/AppInput";
export { default as AppCard } from "@/components/core/cards/AppCard";
export { default as AppModal } from "@/components/core/modals/AppModal";
export { default as AppLoader } from "@/components/core/feedback/AppLoader";
export { default as AppEmptyState } from "@/components/core/feedback/AppEmptyState";
export { default as AppErrorState } from "@/components/core/feedback/AppErrorState";

// Hooks
export { useFetch, useCrud, useSearch, useDebounce, usePagination, useModal, useAsync } from "@/hooks/useDataManagement";
export { useProducts, useProduct, useOrders, useCart, useWishlist, useAddresses } from "@/hooks/useDomainLogic";

// Stores
export { useUIStore, useCartStore, useWishlistStore, useAuthStore } from "@/store";

// Services
export { authService } from "@/services/api/auth.service";
export { productsService } from "@/services/api/products.service";
export { ordersService } from "@/services/api/orders.service";
export { cartService } from "@/services/api/cart.service";
export { wishlistService } from "@/services/api/wishlist.service";
export { addressesService } from "@/services/api/addresses.service";
