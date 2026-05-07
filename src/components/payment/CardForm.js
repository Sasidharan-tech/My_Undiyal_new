"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";

function maskCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);

  if (!digits) {
    return "4242 4242 4242 4242";
  }

  return digits.match(/.{1,4}/g)?.join(" ") || digits;
}

export default function CardForm({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  saveCard,
  cardBrand,
  onFieldChange,
  onSaveCardChange,
  errors = {},
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-4 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-900/70"
    >
      <div className="grid gap-4 xl:grid-cols-[1.06fr_.94fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <CreditCard size={16} className="text-sky-500" />
            Card details
          </div>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Card number</span>
            <input
              value={cardNumber}
              onChange={(event) => onFieldChange("cardNumber", event.target.value)}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
            {errors.cardNumber ? <p className="text-xs text-rose-500">{errors.cardNumber}</p> : null}
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Card holder name</span>
            <input
              value={cardHolder}
              onChange={(event) => onFieldChange("cardHolder", event.target.value)}
              autoComplete="cc-name"
              placeholder="Name on card"
              className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
            {errors.cardHolder ? <p className="text-xs text-rose-500">{errors.cardHolder}</p> : null}
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Expiry date</span>
              <input
                value={expiryDate}
                onChange={(event) => onFieldChange("expiryDate", event.target.value)}
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              {errors.expiryDate ? <p className="text-xs text-rose-500">{errors.expiryDate}</p> : null}
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">CVV</span>
              <input
                value={cvv}
                onChange={(event) => onFieldChange("cvv", event.target.value)}
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              {errors.cvv ? <p className="text-xs text-rose-500">{errors.cvv}</p> : null}
            </label>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(event) => onSaveCardChange(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            Save card securely for future payments
          </label>
        </div>

        <div className="rounded-[28px] bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-4 text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                Live preview
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <ShieldCheck size={14} />
                Tokenized and encrypted
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                VISA
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                MC
              </span>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold tracking-[0.24em]">
                {maskCardNumber(cardNumber)}
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/75">
                {cardBrand === "visa" ? "Visa" : cardBrand === "mastercard" ? "Mastercard" : "Card"}
              </div>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Card holder</p>
                <p className="mt-1 text-sm font-medium text-white">{cardHolder || "Name on card"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Expiry</p>
                <p className="mt-1 text-sm font-medium text-white">{expiryDate || "MM/YY"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs leading-6 text-white/70">
              <span className="inline-flex items-center gap-2 text-emerald-300">
                <CheckCircle2 size={14} />
                Secure payment preview
              </span>
              <p className="mt-1">
                Your card data is masked and validated locally before processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}