"use client";

import { useRouter as useNextRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * useNavigation - Centralized hook for all programmatic navigation
 * Replaces useRouter throughout the app
 * Usage:
 *   const nav = useNavigation();
 *   nav.goHome();
 *   nav.goProduct(123);
 *   nav.push("/custom-path");
 */

export function useNavigation() {
  const router = useNextRouter();
  const searchParams = useSearchParams();

  const push = useCallback(
    (path) => {
      router.push(path);
    },
    [router],
  );

  const replace = useCallback(
    (path) => {
      router.replace(path);
    },
    [router],
  );

  const back = useCallback(() => {
    router.back();
  }, [router]);

  const forward = useCallback(() => {
    router.forward();
  }, [router]);

  const goHome = useCallback(() => {
    push("/");
  }, [push]);

  const goCategories = useCallback(() => {
    push("/categories");
  }, [push]);

  const goProduct = useCallback(
    (id) => {
      push(`/product/${id}`);
    },
    [push],
  );

  const goCart = useCallback(() => {
    push("/cart");
  }, [push]);

  const goOrderSummary = useCallback(() => {
    push("/order-summary");
  }, [push]);

  const goAddresses = useCallback(
    (returnTo) => {
      const query = returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : "";
      push(`/addresses${query}`);
    },
    [push],
  );

  const goAddNewAddress = useCallback(
    (returnTo) => {
      const query = returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : "";
      push(`/addresses/new${query}`);
    },
    [push],
  );

  const goEditAddress = useCallback(
    (id, returnTo) => {
      const query = returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : "";
      push(`/addresses/${encodeURIComponent(id)}/edit${query}`);
    },
    [push],
  );

  const goCoupon = useCallback(() => {
    push("/coupon");
  }, [push]);

  const goPayment = useCallback(() => {
    push("/payment");
  }, [push]);

  const goScheme = useCallback(() => {
    push("/scheme");
  }, [push]);

  const goSuccess = useCallback(() => {
    push("/success");
  }, [push]);

  const goOrders = useCallback(() => {
    push("/orders");
  }, [push]);

  const goOrder = useCallback(
    (id) => {
      push(`/orders/${id}`);
    },
    [push],
  );

  const goWishlist = useCallback(() => {
    push("/wishlist");
  }, [push]);

  const goProfile = useCallback(() => {
    push("/profile");
  }, [push]);

  const goProfileEdit = useCallback(() => {
    push("/profile-edit");
  }, [push]);

  const goSettings = useCallback(() => {
    push("/settings");
  }, [push]);

  const goNotifications = useCallback(() => {
    push("/notifications");
  }, [push]);

  const goHelpSupport = useCallback(() => {
    push("/help-support");
  }, [push]);

  const goPaymentMethod = useCallback(() => {
    push("/payment-method");
  }, [push]);

  const goNewCard = useCallback(() => {
    push("/payment-method/new-card");
  }, [push]);

  const goNewArrivals = useCallback(() => {
    push("/new-arrivals");
  }, [push]);

  const goLogin = useCallback(() => {
    push("/login");
  }, [push]);

  const getReturnParam = useCallback(() => {
    return searchParams.get("returnTo") || "/";
  }, [searchParams]);

  return {
    push,
    replace,
    back,
    forward,
    goHome,
    goCategories,
    goProduct,
    goCart,
    goOrderSummary,
    goAddresses,
    goAddNewAddress,
    goEditAddress,
    goCoupon,
    goPayment,
    goScheme,
    goSuccess,
    goOrders,
    goOrder,
    goWishlist,
    goProfile,
    goProfileEdit,
    goSettings,
    goNotifications,
    goHelpSupport,
    goPaymentMethod,
    goNewCard,
    goNewArrivals,
    goLogin,
    getReturnParam,
  };
}
