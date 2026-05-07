/**
 * ============================================
 * REFACTORING QUICK REFERENCE
 * ============================================
 */

// ============================================
// BEFORE: Old Pattern (DON'T DO THIS)
// ============================================

/**
 * src/app/cart/page.js (OLD - 100+ lines, mixed concerns)
 */
export function CartPageOld() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  // API call in component ❌
  useEffect(() => {
    setLoading(true);
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => setCartItems(data))
      .finally(() => setLoading(false));
  }, []);

  // Event handler ❌
  const handleRemove = (id) => {
    fetch(`/api/cart/${id}`, { method: "DELETE" })
      .then(() => setCartItems((prev) => prev.filter((i) => i.id !== id)))
      .catch((err) => console.error(err));
  };

  // Large JSX in page ❌
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold">Cart ({cartItems.length})</h1>

      {loading && <div className="animate-spin">Loading...</div>}

      {cartItems.length === 0 && (
        <div className="rounded-lg border-2 border-dashed py-8 text-center">
          <p>Your cart is empty</p>
        </div>
      )}

      <div className="space-y-3 mt-4">
        {cartItems.map((item) => (
          <div key={item.id} className="rounded-lg border p-4">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-500 text-white rounded">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* More JSX... */}
    </div>
  );
}

// ============================================
// AFTER: Enterprise Pattern (DO THIS)
// ============================================

/**
 * src/app/cart/page.js (NEW - 5 lines!)
 */
import CartView from "@/components/views/cart/CartView";

export default function CartPage() {
  return <CartView />;
}

/**
 * src/components/views/cart/CartView.js (NEW - Handles UI)
 */
import { AppButton, AppCard, AppLoader, AppEmptyState, useCart } from "@/lib/index";

export default function CartView() {
  // Data from hook ✅
  const { items, loading, removeItem } = useCart();

  if (loading) return <AppLoader label="Loading cart..." />;

  if (items.length === 0) {
    return (
      <AppEmptyState
        title="Your cart is empty"
        description="Add items to get started"
        action={() => {}}
        actionLabel="Browse Products"
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cart ({items.length})</h1>

      {/* Reusable components ✅ */}
      {items.map((item) => (
        <AppCard key={item.id}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
            {/* Consistent button ✅ */}
            <AppButton
              variant="danger"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </AppButton>
          </div>
        </AppCard>
      ))}
    </div>
  );
}

/**
 * src/hooks/useDomainLogic.js (NEW - Business logic)
 */
export function useCart() {
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleRemove = async (productId) => {
    try {
      // API call in hook ✅
      await cartService.removeItem(productId);
      // Update store ✅
      removeItem(productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return {
    items: cartItems,
    loading: false,
    removeItem: handleRemove,
  };
}

/**
 * src/services/api/cart.service.js (NEW - API calls)
 */
export const cartService = {
  async removeItem(productId) {
    // Centralized API call ✅
    return apiClient.delete(`/cart/items/${productId}`);
  },
};

/**
 * src/store/index.js (NEW - Global state)
 */
export const useCartStore = create((set) => ({
  items: [],
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));

// ============================================
// COMPARISON
// ============================================

/**
 * OLD PATTERN:
 * - Page had 100+ lines
 * - Mixed UI, logic, API calls
 * - Hard to test
 * - Hard to reuse
 * - Hard to maintain
 * - Repeated Tailwind classes
 * - useState everywhere
 * - Duplicated code across pages
 * 
 * NEW PATTERN:
 * - Page: 5 lines (just delegates)
 * - View: UI only (reusable components)
 * - Hooks: Business logic (reusable)
 * - Services: API calls (centralized)
 * - Store: Global state (Zustand)
 * 
 * Results:
 * ✅ Easy to test
 * ✅ Easy to reuse
 * ✅ Easy to maintain
 * ✅ Consistent styling
 * ✅ No code duplication
 * ✅ Professional architecture
 * ✅ Fast performance
 * ✅ Better UX
 */

// ============================================
// REFACTORING STEPS
// ============================================

/**
 * 1. IDENTIFY PAGE TYPE
 *    - Data list page? (products, orders, etc.)
 *    - Form page? (create, edit)
 *    - Detail page? (product detail, order detail)
 * 
 * 2. CREATE VIEW COMPONENT
 *    - Location: src/components/views/{feature}/
 *    - File: {Feature}View.js
 *    - Purpose: Layout & rendering
 * 
 * 3. EXTRACT HOOKS
 *    - Location: src/hooks/useDomainLogic.js
 *    - File: Add use{Feature}() function
 *    - Purpose: Business logic & data
 * 
 * 4. EXTRACT SERVICES
 *    - Location: src/services/api/
 *    - File: {feature}.service.js
 *    - Purpose: API calls only
 * 
 * 5. UPDATE STORE (if needed)
 *    - Location: src/store/index.js
 *    - Add new Zustand store
 *    - Purpose: Global state
 * 
 * 6. UPDATE PAGE
 *    - Location: src/app/{feature}/page.js
 *    - Make it MINIMAL (just delegates)
 *    - Import and use view component
 * 
 * 7. TEST
 *    - Test navigation
 *    - Test interactions
 *    - Test loading/error states
 *    - Run: npm run lint
 */

// ============================================
// COMMON PATTERNS
// ============================================

/**
 * PATTERN 1: Data List with Search & Pagination
 * 
 * Hook:
 *   - useFetch() for data
 *   - useSearch() for filtering
 *   - usePagination() for pagination
 * 
 * View:
 *   - AppCard for items
 *   - AppLoader for loading
 *   - AppEmptyState for empty
 *   - AppErrorState for errors
 * 
 * Example: OrdersView, ProductsView
 */

/**
 * PATTERN 2: Form Page
 * 
 * Hook:
 *   - useCrud() for operations
 *   - useModal() for confirmation
 * 
 * View:
 *   - AppInput for fields
 *   - AppButton for submit
 *   - AppModal for confirmation
 * 
 * Example: AddressForm, ProductForm
 */

/**
 * PATTERN 3: Detail Page with Actions
 * 
 * Hook:
 *   - useFetch() for single item
 *   - useCrud() for updates
 *   - useModal() for dialogs
 * 
 * View:
 *   - AppCard for layout
 *   - AppButton for actions
 *   - AppModal for confirmations
 * 
 * Example: ProductDetail, OrderDetail
 */

/**
 * PATTERN 4: List with CRUD Operations
 * 
 * Hook:
 *   - useFetch() for list
 *   - useCrud() for create/update/delete
 *   - useSearch() for filtering
 *   - useModal() for confirmations
 * 
 * View:
 *   - AppCard for items
 *   - AppButton for actions
 *   - AppModal for dialogs
 * 
 * Example: AddressBook, WishlistView
 */
