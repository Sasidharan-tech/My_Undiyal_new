"use client";

import Image from "next/image";
import CurrencyAmount from "@/components/ui/CurrencyAmount";

export default function OrderSummary({
  item,
  quantity,
  subtotal,
  deliveryFee,
  promoDiscount,
  total,
}) {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-4 rounded-[26px] bg-slate-50 p-4 dark:bg-slate-900/70">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm dark:bg-slate-950">
          <Image
            src={item.image}
            alt={item.name}
            width={112}
            height={112}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-950 dark:text-white">
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {item.deliveryText || "Delivery in 2 days"}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-200/80 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Qty {quantity}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              Free secure checkout
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-[26px] bg-slate-50 p-4 dark:bg-slate-900/70">
        <Row label="Item total" value={<CurrencyAmount amount={subtotal} minimumFractionDigits={0} maximumFractionDigits={0} />} />
        <Row label="Delivery fee" value={<CurrencyAmount amount={deliveryFee} minimumFractionDigits={0} maximumFractionDigits={0} />} />
        <Row
          label="Promo discount"
          value={
            <CurrencyAmount
              amount={-promoDiscount}
              minimumFractionDigits={0}
              maximumFractionDigits={0}
              showSign
            />
          }
          tone="text-emerald-600 dark:text-emerald-400"
        />

        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Total amount
            </span>
            <span className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              <CurrencyAmount amount={total} minimumFractionDigits={0} maximumFractionDigits={0} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, tone = "text-slate-600 dark:text-slate-300" }) {
  return (
    <div className={`flex items-center justify-between gap-3 py-2 text-sm ${tone}`}>
      <span>{label}</span>
      <span className="font-medium text-slate-950 dark:text-white">{value}</span>
    </div>
  );
}