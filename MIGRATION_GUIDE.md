/**
 * MIGRATION GUIDE - Converting Pages to Use Centralized Routing
 * 
 * Follow these steps to refactor any page to use the new APP_ROUTES, useNavigation, and NavLink components
 */

// ============================================
// BEFORE: Old Pattern (DON'T USE)
// ============================================

import { useRouter } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/layout/MainLayout";

export default function OldCategoriesPage() {
  const router = useRouter();

  const handleNavigateToProduct = (productId) => {
    router.push(`/product/${productId}`); // ❌ Hardcoded path
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <MainLayout
      title="Categories"
      backHref="/" // ❌ Hardcoded href
      contentClassName="px-4 pb-6"
    >
      <div className="space-y-4">
        <Link href="/new-arrivals" className="text-blue-600">
          {" "}
          {/* ❌ Hardcoded href */}
          New Arrivals
        </Link>

        <button onClick={() => router.push("/cart")}>
          {" "}
          {/* ❌ Hardcoded path, router.push() */}
          Go to Cart
        </button>

        <button onClick={() => router.push(`/addresses/new?returnTo=/categories`)}>
          {" "}
          {/* ❌ Hardcoded complex navigation */}
          Add New Address
        </button>
      </div>
    </MainLayout>
  );
}

// ============================================
// AFTER: New Pattern (USE THIS)
// ============================================

import { useNavigation, NavLink, APP_ROUTES, MainLayout } from "@/components/common";

export default function CategoriesPage() {
  const nav = useNavigation();

  const handleNavigateToProduct = (productId) => {
    nav.goProduct(productId); // ✅ Typed navigation method
  };

  const handleGoBack = () => {
    nav.back();
  };

  return (
    <MainLayout
      title="Categories"
      backHref={APP_ROUTES.HOME} // ✅ Route constant
      contentClassName="px-4 pb-6"
    >
      <div className="space-y-4">
        <NavLink href={APP_ROUTES.NEW_ARRIVALS} className="text-blue-600">
          {" "}
          {/* ✅ NavLink component + route constant */}
          New Arrivals
        </NavLink>

        <button onClick={() => nav.goCart()}>
          {" "}
          {/* ✅ Typed navigation method */}
          Go to Cart
        </button>

        <button onClick={() => nav.goAddNewAddress("/categories")}>
          {" "}
          {/* ✅ Method with returnTo parameter */}
          Add New Address
        </button>
      </div>
    </MainLayout>
  );
}

// ============================================
// STEP-BY-STEP MIGRATION CHECKLIST
// ============================================

/*
1. IMPORTS
   OLD:
     import { useRouter } from "next/navigation";
     import Link from "next/link";
   
   NEW:
     import { useNavigation, NavLink, APP_ROUTES, MainLayout } from "@/components/common";

2. REPLACE useRouter
   OLD:
     const router = useRouter();
     router.push("/categories");
     router.back();
   
   NEW:
     const nav = useNavigation();
     nav.goCategories();
     nav.back();

3. REPLACE Link COMPONENTS
   OLD:
     <Link href="/categories">Go to Categories</Link>
   
   NEW:
     <NavLink href={APP_ROUTES.CATEGORIES}>Go to Categories</NavLink>

4. REPLACE HARDCODED ROUTES WITH CONSTANTS
   OLD:
     backHref="/"
     href="/product/123"
     router.push(`/orders/${orderId}`)
   
   NEW:
     backHref={APP_ROUTES.HOME}
     href={APP_ROUTES.PRODUCT(123)}
     nav.goOrder(orderId)

5. HANDLE returnTo PARAMETERS
   OLD:
     router.push(`/addresses/new?returnTo=${encodeURIComponent(location.pathname)}`)
   
   NEW:
     nav.goAddNewAddress("/categories")
     // returnTo is automatically encoded!

6. VERIFY NAVIGATION METHODS EXIST
   Available navigation methods:
     • nav.goHome()
     • nav.goCategories()
     • nav.goProduct(id)
     • nav.goCart()
     • nav.goOrderSummary()
     • nav.goAddresses(returnTo)
     • nav.goAddNewAddress(returnTo)
     • nav.goEditAddress(id, returnTo)
     • nav.goCoupon()
     • nav.goPayment()
     • nav.goScheme()
     • nav.goSuccess()
     • nav.goOrders()
     • nav.goOrder(id)
     • nav.goWishlist()
     • nav.goProfile()
     • nav.goProfileEdit()
     • nav.goSettings()
     • nav.goNotifications()
     • nav.goHelpSupport()
     • nav.goPaymentMethod()
     • nav.goNewCard()
     • nav.goNewArrivals()
     • nav.goLogin()
     • nav.back()
     • nav.forward()
     • nav.push(path) - for custom paths
     • nav.replace(path) - for custom paths
*/

// ============================================
// EXAMPLE: CART PAGE BEFORE & AFTER
// ============================================

// BEFORE
export function CartPageOld() {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleCheckout = () => {
    router.push("/order-summary");
  };

  return (
    <MainLayout
      title="Shopping Cart"
      backHref="/"
      contentClassName="px-4"
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <Link href="/" className="flex-1">
            Continue Shopping
          </Link>
          <button
            onClick={handleCheckout}
            className="flex-1"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

// AFTER
import { useNavigation, NavLink, APP_ROUTES, MainLayout } from "@/components/common";

export function CartPageNew() {
  const nav = useNavigation();

  const handleContinueShopping = () => {
    nav.goHome();
  };

  const handleCheckout = () => {
    nav.goOrderSummary();
  };

  return (
    <MainLayout
      title="Shopping Cart"
      backHref={APP_ROUTES.HOME}
      contentClassName="px-4"
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <NavLink
            href={APP_ROUTES.HOME}
            className="flex-1"
          >
            Continue Shopping
          </NavLink>
          <button
            onClick={handleCheckout}
            className="flex-1"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

// ============================================
// EXAMPLE: ADDRESS FLOWS WITH returnTo
// ============================================

// BEFORE - AddressBook selecting address and returning
export function AddressBookOld() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const handleAddNewAddress = () => {
    router.push(
      `/addresses/new?returnTo=${encodeURIComponent(returnTo)}`
    );
  };

  const handleSelectAddress = (address) => {
    // Do something with address...
    router.push(returnTo);
  };

  return null;
}

// AFTER - AddressBook selecting address and returning
import { useNavigation } from "@/hooks/useNavigation";

export function AddressBookNew() {
  const nav = useNavigation();
  const returnTo = nav.getReturnParam(); // Automatically reads ?returnTo from URL

  const handleAddNewAddress = () => {
    nav.goAddNewAddress(returnTo); // returnTo is automatically encoded
  };

  const handleSelectAddress = (address) => {
    // Do something with address...
    nav.push(returnTo); // Navigate to the return destination
  };

  return null;
}

// ============================================
// COMMON PATTERNS AFTER MIGRATION
// ============================================

/*
PATTERN 1: Simple Navigation
  OLD: router.push("/categories")
  NEW: nav.goCategories()

PATTERN 2: Navigation with IDs
  OLD: router.push(`/product/${id}`)
  NEW: nav.goProduct(id)

PATTERN 3: Navigation with returnTo
  OLD: router.push(`/addresses/new?returnTo=${encodeURIComponent(location.pathname)}`)
  NEW: nav.goAddNewAddress("/categories")

PATTERN 4: Read returnTo from URL
  OLD: 
    const searchParams = useSearchParams();
    const returnTo = searchParams.get("returnTo") || "/";
  NEW: 
    const nav = useNavigation();
    const returnTo = nav.getReturnParam();

PATTERN 5: Custom path (if method doesn't exist)
  OLD: router.push("/custom/path")
  NEW: nav.push("/custom/path")

PATTERN 6: Going back
  OLD: router.back()
  NEW: nav.back()
*/

// ============================================
// VERIFYING YOUR CHANGES
// ============================================

/*
After migrating a page:
1. ✅ All hardcoded hrefs replaced with APP_ROUTES constants
2. ✅ All router.push() replaced with nav.goXxx() methods
3. ✅ All <Link> components replaced with <NavLink>
4. ✅ No remaining imports of useRouter or Link from next/link
5. ✅ Page uses backHref={APP_ROUTES.XXXX} instead of hardcoded strings
6. ✅ returnTo flows use nav.getReturnParam() and nav.goXxx(returnTo)
7. ✅ Test navigation in the browser to ensure all links work
8. ✅ Run lint: npm run lint
*/
