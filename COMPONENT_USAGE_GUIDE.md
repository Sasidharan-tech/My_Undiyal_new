/**
 * QUICK REFERENCE - How to use common components across pages
 */

// ============================================
// 1. ROUTING & NAVIGATION
// ============================================

// Instead of: useRouter() + router.push("/path")
// Use: useNavigation() hook
import { useNavigation } from "@/hooks/useNavigation";

function MyComponent() {
  const nav = useNavigation();

  return (
    <>
      <button onClick={() => nav.goCart()}>Go to Cart</button>
      <button onClick={() => nav.goProduct(123)}>Go to Product 123</button>
      <button onClick={() => nav.back()}>Go Back</button>
    </>
  );
}

// Instead of: <Link href="/categories">
// Use: <NavLink> component
import { NavLink } from "@/components/common";

function Navigation() {
  return (
    <NavLink href="/categories" className="text-blue-600">
      Categories
    </NavLink>
  );
}

// ============================================
// 2. ROUTE CONSTANTS
// ============================================

// Instead of hardcoded: "/product/123"
// Use: APP_ROUTES constants
import { APP_ROUTES } from "@/constants/appRoutes";

function ProductPage() {
  return <NavLink href={APP_ROUTES.PRODUCT(123)}>Product</NavLink>;
}

// ============================================
// 3. COMMON UI STATES
// ============================================

// Loading
import { Loader } from "@/components/common";

function MyList() {
  const [loading, setLoading] = useState(false);
  if (loading) return <Loader label="Loading items..." />;
  return null;
}

// Empty State
import { EmptyState } from "@/components/common";

function MyList() {
  if (items.length === 0) return <EmptyState message="No items found" />;
  return null;
}

// Error State
import { ErrorState } from "@/components/common";

function MyList() {
  if (error) return <ErrorState message="Failed to load items" />;
  return null;
}

// ============================================
// 4. DELETE CONFIRMATION FLOW
// ============================================

// Use: useConfirmDialog + useDeleteData
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useDeleteData } from "@/hooks/crud/useDeleteData";
import { DeletePopup } from "@/components/common";

function ItemList() {
  const { target, isOpen, openDialog, closeDialog } = useConfirmDialog();
  const { deleteData } = useDeleteData(async () => {
    removeItem(target.id);
    closeDialog();
  });

  return (
    <>
      <button onClick={() => openDialog(item)}>Delete</button>
      <DeletePopup
        open={isOpen}
        onCancel={closeDialog}
        onConfirm={() => deleteData().catch(() => {})}
        showImage
        imageSrc={target?.image}
        primaryText={target?.name}
      />
    </>
  );
}

// ============================================
// 5. SEARCH FILTERING
// ============================================

// Use: useSearch + SearchInput
import { useSearch, SearchInput } from "@/components/common";

function SearchableList() {
  const { searchText, setSearchText, filteredItems } = useSearch(
    items,
    (item) => `${item.name} ${item.description}`,
  );

  return (
    <>
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search..."
        ariaLabel="Search items"
      />
      {filteredItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
}

// ============================================
// 6. FORM HANDLING
// ============================================

// Use: FormWrapper
import { FormWrapper } from "@/components/common";

function MyForm() {
  return (
    <FormWrapper
      title="Add Item"
      description="Fill in the details below"
      onSubmit={handleSubmit}
    >
      <input type="text" placeholder="Name" />
      <button type="submit">Save</button>
    </FormWrapper>
  );
}

// ============================================
// 7. PAGINATION
// ============================================

// Use: usePagination
import { usePagination, Pagination } from "@/components/common";

function ItemList() {
  const { page, setPage, totalPages, paginatedItems } = usePagination(items, 10);

  return (
    <>
      {paginatedItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}

// ============================================
// 8. REUSABLE BUTTONS
// ============================================

// Use: CommonButton
import { CommonButton } from "@/components/common";

function MyComponent() {
  return (
    <CommonButton onClick={() => handleSave()} disabled={isSaving}>
      {isSaving ? "Saving..." : "Save"}
    </CommonButton>
  );
}

// ============================================
// 9. APP CONTEXT & GLOBAL STATE
// ============================================

// Use: useAppContext for app-wide utilities
import { useAppContext } from "@/context/AppContext";

function MyComponent() {
  const { isLoading, nav } = useAppContext();

  return (
    <button onClick={() => nav.goHome()}>
      {isLoading ? "Loading..." : "Go Home"}
    </button>
  );
}

// ============================================
// 10. FULL PAGE EXAMPLE
// ============================================

import { useCallback } from "react";
import { MainLayout } from "@/components/common";
import { useSearch, SearchInput, EmptyState, Loader } from "@/components/common";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useDeleteData } from "@/hooks/crud/useDeleteData";
import { APP_ROUTES } from "@/constants/appRoutes";
import { useNavigation } from "@/hooks/useNavigation";

export default function ItemsPage() {
  const nav = useNavigation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { searchText, setSearchText, filteredItems } = useSearch(
    items,
    (item) => item.name,
  );

  const { target: deleteTarget, isOpen, openDialog, closeDialog } = useConfirmDialog();
  const { deleteData } = useDeleteData(async () => {
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    closeDialog();
  });

  const handleDelete = useCallback(() => {
    deleteData().catch(() => {});
  }, [deleteData]);

  return (
    <MainLayout
      title="Items"
      backHref={APP_ROUTES.HOME}
      contentClassName="px-4 pb-6"
    >
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search items..."
        ariaLabel="Search items"
      />

      {isLoading ? (
        <Loader label="Loading items..." />
      ) : filteredItems.length === 0 ? (
        <EmptyState message="No items found" />
      ) : (
        <div className="space-y-3 mt-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <button onClick={() => openDialog(item)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <DeletePopup
        open={isOpen}
        onCancel={closeDialog}
        onConfirm={handleDelete}
        primaryText={deleteTarget?.name}
      />
    </MainLayout>
  );
}
