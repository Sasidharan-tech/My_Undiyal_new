"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const matchesPath = (pathname, route) => {
    if (!pathname || !route) {
        return false;
    }

    return pathname === route || pathname.startsWith(`${route}/`);
};

const ProtectedRoute = ({
    children,
    redirectTo = "/login",
    fallback = <div>Loading...</div>,
    publicPaths = [],
    protectedPaths = [],
}) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const requiresAuth = useMemo(() => {
        if (!pathname) {
            return false;
        }

        if (protectedPaths.length > 0) {
            return protectedPaths.some((route) => matchesPath(pathname, route));
        }

        const isPublicPath = publicPaths.some((route) => matchesPath(pathname, route));
        return !isPublicPath;
    }, [pathname, protectedPaths, publicPaths]);

    useEffect(() => {
        if (isLoading || !requiresAuth) {
            return;
        }

        if (!isAuthenticated || !user) {
            const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
            router.replace(`${redirectTo}${next}`);
        }
    }, [isAuthenticated, isLoading, requiresAuth, pathname, redirectTo, router, user]);

    if (isLoading && requiresAuth) {
        return fallback;
    }

    if (!requiresAuth) {
        return children;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
