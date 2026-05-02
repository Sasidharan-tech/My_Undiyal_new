"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import BottomNav from "@/components/common/BottomNav";
import MobileDebugLogger from "@/components/debug/MobileDebugLogger";
import ProtectedRoute from "@/context/ProtectedRoute";

const PUBLIC_PATHS = ["/login"];
const CHECKOUT_PROTECTED_PATHS = ["/payment", "/coupon", "/scheme", "/success"];
const CHROME_HIDDEN_PATHS = ["/login"];

const matchesPath = (pathname, route) => {
  if (!pathname || !route) {
    return false;
  }

  return pathname === route || pathname.startsWith(`${route}/`);
};

export default function AppRouteGuard({ children }) {
  const pathname = usePathname();

  const hideChrome = useMemo(() => {
    return CHROME_HIDDEN_PATHS.some((route) => matchesPath(pathname, route));
  }, [pathname]);

  return (
    <ProtectedRoute
      publicPaths={PUBLIC_PATHS}
      protectedPaths={CHECKOUT_PROTECTED_PATHS}
    >
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <MobileDebugLogger />}
      {!hideChrome && <BottomNav />}
    </ProtectedRoute>
  );
}
