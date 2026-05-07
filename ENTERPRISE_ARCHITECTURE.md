/**
 * ============================================
 * ENTERPRISE ARCHITECTURE GUIDE
 * ============================================
 * 
 * This document defines the professional-grade
 * architecture implemented in this project.
 */

// ============================================
// 1. PROJECT STRUCTURE
// ============================================

/**
 * src/
 * ├── app/                          # Next.js App Router pages
 * │   ├── cart/page.js              # Minimal page - delegates to view
 * │   ├── wishlist/page.js          # Minimal page - delegates to view
 * │   ├── orders/page.js            # Minimal page - delegates to view
 * │   └── ...
 * │
 * ├── components/
 * │   ├── core/                     # Reusable UI primitives
 * │   │   ├── buttons/
 * │   │   │   └── AppButton.js      # Enterprise button component
 * │   │   ├── inputs/
 * │   │   │   └── AppInput.js       # Enterprise input component
 * │   │   ├── cards/
 * │   │   │   └── AppCard.js        # Reusable card container
 * │   │   ├── modals/
 * │   │   │   └── AppModal.js       # Enterprise modal component
 * │   │   ├── feedback/
 * │   │   │   ├── AppLoader.js      # Loading states
 * │   │   │   ├── AppEmptyState.js  # Empty states
 * │   │   │   └── AppErrorState.js  # Error states
 * │   │   ├── tables/               # Reusable table components
 * │   │   ├── forms/                # Form building blocks
 * │   │   └── layouts/              # Layout wrappers
 * │   │
 * │   ├── views/                    # Page-specific UI (orchestration)
 * │   │   ├── cart/
 * │   │   │   └── CartView.js       # Cart UI - handles layout & interactions
 * │   │   ├── wishlist/
 * │   │   │   └── WishlistView.js   # Wishlist UI
 * │   │   ├── orders/
 * │   │   │   └── OrdersView.js     # Orders UI
 * │   │   ├── products/
 * │   │   ├── addresses/
 * │   │   └── ...
 * │   │
 * │   └── shared/                   # Shared non-view components
 * │
 * ├── hooks/
 * │   ├── useDataManagement.js      # Generic hooks (useFetch, useCrud, etc.)
 * │   ├── useDomainLogic.js         # Domain-specific hooks (useCart, useOrders, etc.)
 * │   └── ...
 * │
 * ├── services/
 * │   └── api/
 * │       ├── apiClient.js          # Axios client with interceptors
 * │       ├── auth.service.js       # Auth API calls
 * │       ├── products.service.js   # Product API calls
 * │       ├── orders.service.js     # Orders API calls
 * │       ├── cart.service.js       # Cart API calls
 * │       ├── wishlist.service.js   # Wishlist API calls
 * │       └── addresses.service.js  # Addresses API calls
 * │
 * ├── store/
 * │   └── index.js                  # Zustand stores (UI, Cart, Auth, Wishlist)
 * │
 * ├── constants/                    # App-wide constants
 * │   ├── appRoutes.js              # Route definitions
 * │   └── ...
 * │
 * ├── lib/
 * │   └── index.js                  # Barrel exports - single import point
 * │
 * └── types/                        # TypeScript types (if using TS)
 */

// ============================================
// 2. CORE PRINCIPLES
// ============================================

/**
 * PRINCIPLE 1: SEPARATION OF CONCERNS
 * 
 * - Pages: MINIMAL - only delegate to views
 * - Views: ORCHESTRATION - layout, state binding, event handlers
 * - Components: REUSABLE - no business logic, only UI
 * - Hooks: DATA & LOGIC - business logic, API calls, state management
 * - Services: API - centralized HTTP calls
 * - Store: GLOBAL STATE - Zustand stores for app-wide state
 */

/**
 * PRINCIPLE 2: COMPONENT HIERARCHY
 * 
 * Page
 *   └─ View Component (CartView, WishlistView, etc.)
 *       ├─ AppCard (core component)
 *       ├─ AppButton (core component)
 *       ├─ AppModal (core component)
 *       └─ AppLoader (core component)
 */

/**
 * PRINCIPLE 3: DATA FLOW
 * 
 * Page
 *   ├─ calls useCart() hook
 *   ├─ passes data to CartView
 *   └─ CartView renders UI & handles interactions
 * 
 * useCart() hook
 *   ├─ uses useCartStore (Zustand)
 *   ├─ calls cartService.addItem()
 *   └─ manages cart state
 * 
 * cartService
 *   ├─ uses apiClient
 *   └─ returns API data
 * 
 * apiClient
 *   ├─ sends HTTP requests
 *   └─ handles auth interceptors
 */

/**
 * PRINCIPLE 4: NO PROP DRILLING
 * 
 * Use Zustand stores instead of passing props through many levels
 * 
 * BAD:
 *   <Page cartItems={items} />
 *     <View cartItems={items} />
 *       <CartList cartItems={items} />
 *         <CartItem item={item} />
 * 
 * GOOD:
 *   const items = useCartStore(state => state.items)
 */

/**
 * PRINCIPLE 5: MEMOIZATION FOR PERFORMANCE
 * 
 * - Use React.memo() for components that don't change often
 * - Use useMemo() for expensive computations
 * - Use useCallback() for event handlers
 */

// ============================================
// 3. CORE COMPONENTS
// ============================================

/**
 * AppButton - Enterprise button component
 * 
 * Features:
 *   - Multiple variants (primary, secondary, outline, ghost, danger)
 *   - Multiple sizes (sm, md, lg)
 *   - Loading state with spinner
 *   - Disabled state
 *   - Full width option
 * 
 * Usage:
 *   <AppButton variant="primary" size="md" loading={isLoading}>
 *     Save
 *   </AppButton>
 */

/**
 * AppInput - Enterprise input component
 * 
 * Features:
 *   - Label, error message, hint text
 *   - Icon support (left/right)
 *   - Required indicator
 *   - Disabled state
 *   - Error styling
 * 
 * Usage:
 *   <AppInput
 *     label="Email"
 *     placeholder="user@example.com"
 *     error={errors.email}
 *     required
 *   />
 */

/**
 * AppCard - Reusable card container
 * 
 * Features:
 *   - Optional header/footer
 *   - Interactive variant with hover states
 *   - Clickable with onClick handler
 * 
 * Usage:
 *   <AppCard header={<h3>Title</h3>} footer={<button>Action</button>}>
 *     Card content here
 *   </AppCard>
 */

/**
 * AppModal - Enterprise modal component
 * 
 * Features:
 *   - Animated backdrop
 *   - Close button
 *   - Title and custom footer
 *   - Different sizes (sm, md, lg, xl)
 * 
 * Usage:
 *   <AppModal
 *     isOpen={isOpen}
 *     onClose={handleClose}
 *     title="Confirm"
 *     footer={<AppButton onClick={handleConfirm}>Confirm</AppButton>}
 *   >
 *     Are you sure?
 *   </AppModal>
 */

/**
 * AppLoader - Loading state component
 * 
 * Features:
 *   - Supports different sizes
 *   - Optional label text
 *   - Full-screen variant
 * 
 * Usage:
 *   <AppLoader size="md" label="Loading..." />
 *   <AppLoader fullScreen label="Loading data..." />
 */

/**
 * AppEmptyState - Empty data state component
 * 
 * Features:
 *   - Icon support
 *   - Title, description
 *   - CTA button with action
 * 
 * Usage:
 *   <AppEmptyState
 *     title="No items found"
 *     description="Add items to get started"
 *     action={handleAddItem}
 *     actionLabel="Add Item"
 *   />
 */

/**
 * AppErrorState - Error state component
 * 
 * Features:
 *   - Icon support
 *   - Error message
 *   - Retry button
 * 
 * Usage:
 *   <AppErrorState
 *     title="Failed to load"
 *     description="Please try again"
 *     onRetry={handleRetry}
 *   />
 */

// ============================================
// 4. CUSTOM HOOKS
// ============================================

/**
 * useFetch(fetchFn, dependencies)
 * 
 * Generic data fetching hook with caching
 * 
 * Returns: { data, loading, error, refetch }
 * 
 * Usage:
 *   const { data: products, loading, error } = useFetch(
 *     () => productsService.getAll(),
 *     []
 *   );
 */

/**
 * useCrud(initialData)
 * 
 * Generic CRUD operations hook
 * 
 * Returns: { data, loading, error, create, read, update, remove }
 * 
 * Usage:
 *   const { data, loading, create, update, remove } = useCrud();
 *   
 *   await create(async () => {
 *     return await productService.create(newProduct);
 *   });
 */

/**
 * useSearch(items, searchKey)
 * 
 * Search filtering hook
 * 
 * Returns: { searchText, setSearchText, filteredItems }
 * 
 * Usage:
 *   const { searchText, setSearchText, filteredItems } = useSearch(
 *     products,
 *     (p) => `${p.name} ${p.description}`
 *   );
 */

/**
 * usePagination(items, itemsPerPage)
 * 
 * Pagination hook
 * 
 * Returns: { page, setPage, totalPages, paginatedItems, hasNextPage, hasPrevPage }
 * 
 * Usage:
 *   const { page, setPage, paginatedItems } = usePagination(items, 10);
 */

/**
 * useModal(initialState)
 * 
 * Modal state management hook
 * 
 * Returns: { isOpen, open, close, toggle }
 * 
 * Usage:
 *   const { isOpen, open, close } = useModal();
 */

/**
 * useCart()
 * 
 * Cart operations hook (domain-specific)
 * 
 * Returns: { items, totalPrice, addItem, removeItem, updateItem, clearCart }
 * 
 * Usage:
 *   const { items, totalPrice, addItem, removeItem } = useCart();
 */

/**
 * useOrders()
 * 
 * Orders operations hook (domain-specific)
 * 
 * Returns: { orders, loading, error, createOrder, refetch }
 * 
 * Usage:
 *   const { orders, loading, createOrder } = useOrders();
 */

// ============================================
// 5. SERVICES LAYER
// ============================================

/**
 * All API calls are centralized in services/api/
 * 
 * apiClient.js
 *   - Axios instance with interceptors
 *   - Auth token management
 *   - Error handling
 * 
 * auth.service.js
 *   - login, register, logout
 *   - getProfile, updateProfile
 * 
 * products.service.js
 *   - getAll, getById, search
 *   - getByCategory, getFeatured, getNewArrivals
 * 
 * orders.service.js
 *   - getAll, getById, create, update
 *   - cancel, getOrderSummary
 * 
 * cart.service.js
 *   - getCart, addItem, updateItem, removeItem
 *   - clearCart, applyCode
 * 
 * wishlist.service.js
 *   - getAll, add, remove, isInWishlist
 * 
 * addresses.service.js
 *   - getAll, getById, create, update, delete
 *   - setDefault
 * 
 * RULE: NO API CALLS IN UI COMPONENTS
 *       Only call services from hooks
 */

// ============================================
// 6. STATE MANAGEMENT (ZUSTAND)
// ============================================

/**
 * useUIStore
 *   - modals (modal open/close states)
 *   - notifications (toast notifications)
 *   - isLoading (global loading state)
 * 
 * Usage:
 *   const isOpen = useUIStore(state => state.modals['deleteModal'])
 *   useUIStore.getState().openModal('deleteModal')
 */

/**
 * useCartStore
 *   - items (cart items)
 *   - addItem, removeItem, updateItem
 *   - clearCart
 * 
 * Usage:
 *   const items = useCartStore(state => state.items)
 */

/**
 * useWishlistStore
 *   - items (wishlist items)
 *   - addItem, removeItem
 *   - isInWishlist
 * 
 * Usage:
 *   const items = useWishlistStore(state => state.items)
 */

/**
 * useAuthStore
 *   - user (current user)
 *   - isAuthenticated
 *   - setUser, logout
 * 
 * Usage:
 *   const user = useAuthStore(state => state.user)
 */

// ============================================
// 7. ROUTING
// ============================================

/**
 * APP_ROUTES constant in src/constants/appRoutes.js
 *   - HOME, CATEGORIES, PRODUCT(id), CART, ORDER_SUMMARY, etc.
 * 
 * Usage:
 *   import { APP_ROUTES } from "@/constants/appRoutes";
 *   href={APP_ROUTES.PRODUCT(123)}
 */

// ============================================
// 8. PAGE STRUCTURE PATTERN
// ============================================

/**
 * MINIMAL PAGE EXAMPLE
 * 
 * export default function CartPage() {
 *   return <CartView />;
 * }
 * 
 * That's it! All business logic goes in hooks and views.
 */

// ============================================
// 9. VIEW COMPONENT STRUCTURE PATTERN
// ============================================

/**
 * TYPICAL VIEW COMPONENT EXAMPLE
 * 
 * export default function CartView() {
 *   // 1. Data hooks
 *   const { items, totalPrice, removeItem } = useCart();
 *   const { searchText, setSearchText, filteredItems } = useSearch(items, 'name');
 *   
 *   // 2. UI state hooks
 *   const { isOpen, open, close } = useModal();
 *   
 *   // 3. Event handlers
 *   const handleRemove = useCallback((id) => {
 *     removeItem(id);
 *   }, [removeItem]);
 *   
 *   // 4. Render core components
 *   return (
 *     <div>
 *       <div>{items.map(item => <AppCard key={item.id}>{item.name}</AppCard>)}</div>
 *       <AppButton onClick={handleRemove}>Remove</AppButton>
 *       <AppModal isOpen={isOpen} onClose={close}>
 *         Confirm?
 *       </AppModal>
 *     </div>
 *   );
 * }
 */

// ============================================
// 10. BEST PRACTICES
// ============================================

/**
 * DO:
 * ✅ Keep pages minimal - just delegate to views
 * ✅ Put all business logic in hooks
 * ✅ Put all UI in reusable components
 * ✅ Use Zustand for global state
 * ✅ Call services only from hooks
 * ✅ Use React.memo for components
 * ✅ Use useMemo/useCallback for performance
 * ✅ Handle loading/error states explicitly
 * ✅ Use AppButton, AppInput, AppCard for consistency
 * ✅ Keep components focused on one responsibility
 * 
 * DON'T:
 * ❌ Put JSX in pages - use view components
 * ❌ Repeat Tailwind classes - use reusable components
 * ❌ Call API directly in components - use services
 * ❌ Use useState for global state - use Zustand
 * ❌ Mix business logic with UI
 * ❌ Pass props through 3+ levels (use stores)
 * ❌ Create non-reusable components
 * ❌ Ignore loading/error states
 * ❌ Make expensive operations in render
 * ❌ Create large monolithic files
 */

// ============================================
// 11. REFACTORING CHECKLIST
// ============================================

/**
 * For each page you refactor:
 * 
 * 1. ✅ Create a view component in src/components/views/{feature}/
 * 2. ✅ Extract hooks to src/hooks/useDomainLogic.js
 * 3. ✅ Extract services to src/services/api/
 * 4. ✅ Extract state to src/store/index.js
 * 5. ✅ Use only core components (AppButton, AppCard, etc.)
 * 6. ✅ Make page MINIMAL (just delegate to view)
 * 7. ✅ Remove ALL JSX from page
 * 8. ✅ Remove ALL API calls from page/view
 * 9. ✅ Handle loading, error, empty states
 * 10. ✅ Memoize components appropriately
 * 11. ✅ Test navigation and interactions
 * 12. ✅ Run lint: npm run lint
 */

// ============================================
// 12. EXAMPLE FLOW
// ============================================

/**
 * USER ACTION:
 * 1. Click "Add to Cart" button in CartView
 * 
 * VIEW LAYER:
 * 2. CartView calls useCart().addItem(productId)
 * 
 * HOOK LAYER:
 * 3. useCart() calls cartService.addItem(productId)
 * 4. useCart() updates useCartStore with response
 * 
 * SERVICE LAYER:
 * 5. cartService calls apiClient.post("/cart/items", ...)
 * 
 * API LAYER:
 * 6. apiClient sends request with auth token
 * 7. API server responds with new item
 * 
 * BACK TO STORE:
 * 8. useCartStore state updates
 * 9. CartView re-renders with new item
 * 
 * RESULT:
 * UI updates instantly without full page refresh
 */
