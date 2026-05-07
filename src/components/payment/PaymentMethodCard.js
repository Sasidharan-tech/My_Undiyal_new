"use client";

import { motion } from "framer-motion";

export default function PaymentMethodCard({
  title,
  subtitle,
  badge,
  icon,
  accent = "from-sky-500 to-cyan-500",
  selected = false,
  onSelect,
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-3xl border p-4 text-left transition ${selected ? "border-transparent bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-slate-900" : "border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/70"}`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${accent}`}
        aria-hidden="true"
      />

      <span
        className={`relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${selected ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-200"}`}
      >
        {icon}
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-950 dark:text-white">{title}</span>
          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {badge}
          </span>
        </span>
        <span className="mt-1 block text-sm leading-5 text-slate-500 dark:text-slate-400">
          {subtitle}
        </span>
      </span>

      <span
        className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${selected ? "border-emerald-500" : "border-slate-300 dark:border-slate-700"}`}
        aria-hidden="true"
      >
        <span className={`h-2.5 w-2.5 rounded-full bg-emerald-500 transition ${selected ? "scale-100" : "scale-0"}`} />
      </span>
    </motion.button>
  );
}