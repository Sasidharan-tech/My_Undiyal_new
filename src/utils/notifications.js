"use client";

import { useEffect, useMemo, useState } from "react";

const listeners = new Set();

const emitToast = (toast) => {
  listeners.forEach((listener) => listener(toast));
};

const notify = ({ severity = "info", summary = "Info", detail = "", life = 3000 }) => {
  emitToast({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    severity,
    summary,
    detail,
    life,
  });
};

const toastTheme = {
  success: {
    border: "border-lime-500",
    badge: "bg-lime-100 text-lime-700",
  },
  error: {
    border: "border-rose-500",
    badge: "bg-rose-100 text-rose-700",
  },
  warn: {
    border: "border-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  info: {
    border: "border-sky-500",
    badge: "bg-sky-100 text-sky-700",
  },
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (toast) => {
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, toast.life);
    };

    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const hasToasts = useMemo(() => toasts.length > 0, [toasts.length]);

  if (!hasToasts) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[90] flex justify-center px-3 sm:top-4">
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => {
          const theme = toastTheme[toast.severity] || toastTheme.info;

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto rounded-xl border ${theme.border} bg-white p-3 shadow-lg`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${theme.badge}`}>
                  {toast.summary}
                </span>
              </div>
              <p className="text-sm text-slate-700">{toast.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const successNotify = (msg) => {
  notify({
    severity: "success",
    summary: "Success",
    detail: msg,
    life: 3000,
  });
};

export const errorNotify = (msg) => {
  if (msg?.includes("Request failed with status code 401")) {
    notify({
      severity: "info",
      summary: "Info",
      detail: "Your session has expired ! Please login again",
      life: 3000,
    });
    return;
  }

  notify({
    severity: "error",
    summary: "Error",
    detail: msg,
    life: 3000,
  });
};

export const warningNotify = (msg) => {
  notify({
    severity: "warn",
    summary: "Warning",
    detail: msg,
    life: 3000,
  });
};