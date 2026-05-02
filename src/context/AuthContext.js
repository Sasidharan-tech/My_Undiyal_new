"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEYS = {
    login: "@Login",
    user: "@User",
    node: "@Node",
    token: "@Token",
    logoutSignal: "logout",
};

const AuthContext = createContext(undefined);

const getStoredAuth = () => {
    try {
        const storedLogin = localStorage.getItem(STORAGE_KEYS.login) === "true";
        const storedUserRaw = localStorage.getItem(STORAGE_KEYS.user);
        const storedToken = localStorage.getItem(STORAGE_KEYS.token);
        const storedNode = localStorage.getItem(STORAGE_KEYS.node);

        if (!storedLogin || !storedUserRaw || !storedToken) {
            return {
                isAuthenticated: false,
                user: null,
                node: null,
                token: null,
            };
        }

        return {
            isAuthenticated: true,
            user: JSON.parse(storedUserRaw),
            node: storedNode ? Number(storedNode) : 1,
            token: storedToken,
        };
    } catch (error) {
        console.error("Failed to read auth from storage:", error);
        return {
            isAuthenticated: false,
            user: null,
            node: null,
            token: null,
        };
    }
};

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        node: null,
        token: null,
    });
    const [isHydrated, setIsHydrated] = useState(false);
    const [branchCode] = useState(1);
    const [counterCode] = useState(1);
    const [warehouseCode] = useState(1);
    const [fyCode] = useState(1);
    const router = useRouter();

    useEffect(() => {
        setAuthState(getStoredAuth());
        setIsHydrated(true);

        const handleStorageChange = (event) => {
            if (
                event.key === STORAGE_KEYS.logoutSignal ||
                event.key === STORAGE_KEYS.login ||
                event.key === STORAGE_KEYS.user ||
                event.key === STORAGE_KEYS.token
            ) {
                setAuthState(getStoredAuth());
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const login = (userData, token, options = {}) => {
        const node = options.node ?? 1;

        localStorage.setItem(STORAGE_KEYS.login, "true");
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
        localStorage.setItem(STORAGE_KEYS.node, String(node));
        localStorage.setItem(STORAGE_KEYS.token, token);

        setAuthState({
            isAuthenticated: true,
            user: userData,
            node,
            token,
        });
    };

    const logout = ({ redirectTo = "/login" } = {}) => {
        localStorage.removeItem(STORAGE_KEYS.login);
        localStorage.removeItem(STORAGE_KEYS.user);
        localStorage.removeItem(STORAGE_KEYS.node);
        localStorage.removeItem(STORAGE_KEYS.token);
        localStorage.setItem(STORAGE_KEYS.logoutSignal, String(Date.now()));

        setAuthState({
            isAuthenticated: false,
            user: null,
            node: null,
            token: null,
        });

        router.replace(redirectTo);
    };

    const updateUser = (userPatch) => {
        setAuthState((current) => {
            if (!current.user) {
                return current;
            }

            const nextUser = {
                ...current.user,
                ...userPatch,
            };

            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));

            return {
                ...current,
                user: nextUser,
            };
        });
    };

    const value = useMemo(
        () => ({
            isAuthenticated: authState.isAuthenticated,
            user: authState.user,
            node: authState.node,
            token: authState.token,
            branchCode,
            counterCode,
            warehouseCode,
            fyCode,
            isLoading: !isHydrated,
            isHydrated,
            login,
            logout,
            updateUser,
        }),
        [
            authState,
            branchCode,
            counterCode,
            warehouseCode,
            fyCode,
            isHydrated,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
