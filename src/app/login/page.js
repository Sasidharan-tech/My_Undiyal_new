"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { successNotify } from "@/utils/notifications";

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    return next && next.startsWith("/") ? next : "/";
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [isAuthenticated, isLoading, nextPath, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    successNotify("Login successful! Redirecting...");
    const userData = {
      name: name.trim() || "Guest User",
    };

    login(userData, "demo-token");
    router.replace(nextPath);
  };

  if (isLoading) {
    return <main className="mobile-app-shell app-content px-4 py-10">Loading...</main>;
  }

  return (
    <main className="mobile-app-shell app-content px-4 py-10">
      <section className="mx-auto w-full max-w-sm rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to continue your order flow.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
