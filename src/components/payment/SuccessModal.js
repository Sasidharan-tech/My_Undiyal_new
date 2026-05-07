"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import CurrencyAmount from "@/components/ui/CurrencyAmount";

export default function SuccessModal({
  open,
  amount,
  transactionId,
  method,
  onContinue,
  details = [],
  showContinueButton = true,
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
          aria-labelledby="payment-success-title"
        >
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="w-full max-w-[min(92vw,24rem)] rounded-4xl bg-[#CC7A4B] p-4 text-white shadow-[0_30px_80px_rgba(15,23,42,0.34)] sm:p-5"
          >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 p-2 sm:h-22 sm:w-22">
                <Image
                  src="/paymet_complete/Check Mark - Success.gif"
                  alt="Payment success animation"
                  width={80}
                  height={80}
                  unoptimized
                  priority
                  className="h-18 w-18 object-contain sm:h-20 sm:w-20"
                />
            </div>

            <h2
              id="payment-success-title"
              className="mt-4 text-center text-2xl font-semibold tracking-tight text-white"
            >
              Payment Successful
            </h2>
            <p className="mt-2 text-center text-sm leading-6 text-white/85">
              Your payment was processed securely using {method}.
            </p>

            <div className="mt-5 rounded-[26px] bg-black/15 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 text-sm text-white/85">
                <span>Transaction ID</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(transactionId)}
                  className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
                >
                  <Copy size={12} />
                  Copy
                </button>
              </div>
              <p className="mt-2 break-all font-mono text-sm font-medium text-white">
                {transactionId}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                <span className="text-sm text-white/85">Amount paid</span>
                <span className="text-lg font-semibold text-white">
                  <CurrencyAmount amount={amount} minimumFractionDigits={0} maximumFractionDigits={0} />
                </span>
              </div>

              {details.length > 0 ? (
                <div className="mt-4 border-t border-white/15 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                    Purchase details
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

            {showContinueButton ? (
              <button
                type="button"
                onClick={onContinue}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-semibold text-[#CC7A4B] shadow-[0_16px_36px_rgba(255,255,255,0.14)] transition hover:bg-white/95"
              >
                Continue Shopping
                <ArrowRight size={16} />
              </button>
            ) : (
              <p className="mt-5 text-center text-xs font-medium text-white/75">
                Redirecting...
              </p>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}