"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import CurrencyAmount from "@/components/ui/CurrencyAmount";

export default function FailureModal({
  open,
  amount,
  transactionId,
  errorReason = "Payment Declined",
  onRetry,
  onGoHome,
  details = [],
  showRetryButton = true,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/75 px-3 py-4 backdrop-blur-sm sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-failure-title"
        >
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="w-full max-w-[min(92vw,24rem)] rounded-4xl bg-gradient-to-b from-red-600 to-red-700 p-4 text-white shadow-[0_30px_80px_rgba(15,23,42,0.34)] sm:p-5"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 p-2 sm:h-22 sm:w-22">
              <Image
                src="/paymet_complete/error-icon.svg"
                alt="Payment failed"
                width={80}
                height={80}
                unoptimized
                priority
                className="h-18 w-18 object-contain sm:h-20 sm:w-20"
              />
            </div>

            <h2
              id="payment-failure-title"
              className="mt-4 text-center text-2xl font-semibold tracking-tight text-white"
            >
              Payment Failed
            </h2>
            <p className="mt-2 text-center text-sm leading-6 text-white/85">
              {errorReason}
            </p>

            <div className="mt-5 rounded-[26px] bg-black/15 p-4 backdrop-blur-sm">
              {transactionId && (
                <>
                  <div className="flex items-center justify-between gap-3 text-sm text-white/85">
                    <span>Transaction ID</span>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(transactionId)}
                      className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="mt-2 break-all font-mono text-sm font-medium text-white">
                    {transactionId}
                  </p>
                </>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                <span className="text-sm text-white/85">Amount attempted</span>
                <span className="text-lg font-semibold text-white">
                  <CurrencyAmount amount={amount} minimumFractionDigits={0} maximumFractionDigits={0} />
                </span>
              </div>

              {details.length > 0 ? (
                <div className="mt-4 border-t border-white/15 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                    Order details
                  </p>
                  <div className="mt-2 space-y-2">
                    {details.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <span className="text-white/75">{item.label}</span>
                        <span className="text-right font-medium text-white">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {showRetryButton && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-red-600 shadow-[0_16px_36px_rgba(255,255,255,0.14)] transition hover:bg-white/95"
                >
                  <RotateCcw size={16} />
                  Try Again
                </button>
              )}
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-white/30 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Go to Home
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
