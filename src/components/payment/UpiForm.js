"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, Smartphone, BadgeCheck } from "lucide-react";

const apps = [
  { id: "gpay", label: "Google Pay", image: "/icons/paymets/gpay.png" },
  { id: "phonepe", label: "PhonePe", image: "/icons/paymets/phonepay.png" },
  { id: "paytm", label: "Paytm", badge: "P" },
];

export default function UpiForm({
  upiId,
  onUpiIdChange,
  selectedApp,
  onAppSelect,
  onVerify,
  isVerifying,
  verified,
  error,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-4 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-900/70"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <Smartphone size={16} className="text-emerald-500" />
        Pay with any verified UPI app.
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_.85fr]">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">UPI ID</span>
          <input
            value={upiId}
            onChange={(event) => onUpiIdChange(event.target.value)}
            placeholder="name@bank"
            autoComplete="off"
            inputMode="email"
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          {error ? <p className="text-xs text-rose-500">{error}</p> : null}
        </label>

        <button
          type="button"
          onClick={onVerify}
          disabled={isVerifying}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 px-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.25)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isVerifying ? <Loader2 size={16} className="animate-spin" /> : null}
          {verified ? "UPI verified" : "Verify UPI"}
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          <BadgeCheck size={14} />
          Popular apps
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {apps.map((app) => {
            const isActive = selectedApp === app.id;

            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onAppSelect(app.id)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 transition ${isActive ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/60 dark:bg-emerald-950/40" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"}`}
              >
                {app.image ? (
                  <Image src={app.image} alt={app.label} width={28} height={28} className="h-7 w-7 object-contain" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
                    {app.badge}
                  </span>
                )}
                <span className="text-center text-xs font-medium text-slate-600 dark:text-slate-300">
                  {app.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {verified ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <BadgeCheck size={14} />
          UPI verified and ready for payment
        </div>
      ) : null}
    </motion.div>
  );
}