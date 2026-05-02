"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const METHODS = [
  {
    id: "paypal",
    label: "PayPal",
    subtitle: "vijayragavan@gmail.com",
    iconSrc: "/icons/paymets/phonepay.png",
    iconAlt: "PayPal",
    iconBgClass: "bg-[#d8ecf7]",
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    subtitle: "Touch ID enabled",
    iconSrc: "/icons/paymets/applepay.png",
    iconAlt: "Apple Pay",
    iconBgClass: "bg-[#e4e4e4]",
  },
  {
    id: "google-pay",
    label: "Google Pay",
    subtitle: "Linked account",
    iconSrc: "/icons/paymets/gpay.png",
    iconAlt: "Google Pay",
    iconBgClass: "bg-[#deefe3]",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    subtitle: "Pay when ot arrives",
    iconSrc: "/icons/paymets/cod.png",
    iconAlt: "Cash on Delivery",
    iconBgClass: "bg-[#f9f1dc]",
  },
];

function MethodRow({
  iconSrc,
  iconAlt,
  label,
  subtitle,
  iconBgClass,
  selected,
  onSelect,
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={`inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-xl ${iconBgClass}`.trim()}
          >
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={34}
              height={34}
              className="h-8.5 w-8.5 object-contain"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[clamp(15px,4.6vw,38px)] leading-[1.1] font-semibold text-[#1f1f1f]">
              {label}
            </span>
            <span className="mt-0.5 block truncate text-[clamp(11px,3.2vw,27px)] leading-[1.1] font-normal text-[#b9b9b9]">
              {subtitle}
            </span>
          </span>
        </span>

        <span
          className={`inline-flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full border ${
            selected ? "border-[#cc7a4b]" : "border-[#bfbfbf]"
          }`.trim()}
        >
          <span
            className={`h-3.5 w-3.5 rounded-full ${
              selected ? "bg-[#cc7a4b]" : "bg-transparent"
            }`.trim()}
          />
        </span>
      </button>
    </li>
  );
}

export default function PaymentMethodList() {
  const [selectedId, setSelectedId] = useState("");

  return (
    <section className="bg-transparent px-3 py-4">
      <h2 className="px-1 text-[clamp(16px,4vw,32px)] leading-[1.2] font-semibold text-[#2b2b2b]">
        Wallet
      </h2>

      <ul className="mt-2 space-y-0.5">
        {METHODS.map((method) => (
          <MethodRow
            key={method.id}
            iconSrc={method.iconSrc}
            iconAlt={method.iconAlt}
            label={method.label}
            subtitle={method.subtitle}
            iconBgClass={method.iconBgClass}
            selected={selectedId === method.id}
            onSelect={() => setSelectedId(method.id)}
          />
        ))}
      </ul>

      <Link
        href="/payment-method/new-card"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#cc7a4b]/30 bg-white text-sm font-semibold tracking-wide text-[#cc7a4b] transition active:scale-[0.99]"
      >
        Add new card
      </Link>
    </section>
  );
}
