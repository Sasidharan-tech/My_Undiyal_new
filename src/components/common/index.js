/**
 * Common Components Used Across All Pages
 * This document lists all shared components for reference
 */

// Layout & Navigation
export { default as MainLayout } from "@/layout/MainLayout";
export { default as Header } from "@/components/common/Header";
export { default as BottomNav } from "@/components/common/BottomNav";
export { default as FlowHeader } from "@/components/ui/FlowHeader";

// UI Elements
export { default as Button } from "@/components/ui/Button";
export { default as CommonButton } from "@/components/ui/CommonButton";
export { default as CommonInput } from "@/components/ui/CommonInput";
export { default as InputField } from "@/components/ui/InputField";
export { default as SelectField } from "@/components/ui/SelectField";
export { default as CurrencyAmount } from "@/components/ui/CurrencyAmount";
export { default as BottomBar } from "@/components/ui/BottomBar";

// States & Feedback
export { default as Loader } from "@/components/common/Loader";
export { default as EmptyState } from "@/components/common/EmptyState";
export { default as ErrorState } from "@/components/common/ErrorState";
export { default as DeletePopup } from "@/components/ui/DeletePopup";
export { default as ConfirmPopup } from "@/components/ui/ConfirmPopup";

// Search & Input
export { default as SearchInput } from "@/components/common/SearchInput";
export { default as SearchBar } from "@/components/common/SearchBar";

// Forms
export { default as FormWrapper } from "@/components/forms/FormWrapper";
export { default as CommonModal } from "@/components/modals/CommonModal";
export { default as ConfirmDialog } from "@/components/modals/ConfirmDialog";

// Navigation
export { default as NavLink } from "@/components/common/NavLink";
export { APP_ROUTES, APP_ROUTES_WITH_BACK } from "@/constants/appRoutes";
export { useNavigation } from "@/hooks/useNavigation";
export { useAppContext, useAppNavigation, AppProvider } from "@/context/AppContext";

// CRUD Hooks
export { useSearch } from "@/hooks/useSearch";
export { usePagination } from "@/hooks/usePagination";
export { useFetchData } from "@/hooks/crud/useFetchData";
export { useCreateData } from "@/hooks/crud/useCreateData";
export { useUpdateData } from "@/hooks/crud/useUpdateData";
export { useDeleteData } from "@/hooks/crud/useDeleteData";
export { useConfirmDialog } from "@/hooks/useConfirmDialog";
