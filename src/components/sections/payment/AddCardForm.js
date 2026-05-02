"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

function sanitizeCvv(value) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export default function AddCardForm() {
  const router = useRouter();
  const [holderName, setHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isValid =
    holderName.trim().length > 1 &&
    cardNumber.replace(/\D/g, "").length >= 12 &&
    expiry.replace(/\D/g, "").length === 6 &&
    cvv.length >= 3;

  const maskedNumber = useMemo(() => {
    const digits = cardNumber.replace(/\D/g, "");
    if (!digits.length) {
      return ".... ....    ___";
    }

    const tail = digits.slice(-4).padStart(4, "_");
    return `.... ....    ${tail}`;
  }, [cardNumber]);

  const expiryPreview = expiry.trim() || "__ /__";

  const handleSave = (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }

    router.push("/payment-method");
  };

  return (
    <form onSubmit={handleSave} className="relative flex min-h-[calc(100dvh-180px)] flex-col px-4 pb-8 pt-6">
      <div className="pointer-events-none absolute inset-x-0 top-[-6px] h-[680px] bg-linear-to-b from-[rgba(255,248,242,0)] to-[#fff5ed]" />

      <div className="relative z-10">
        <article className="relative h-[166px] w-[273px] overflow-hidden rounded-[14px] bg-linear-to-br from-[#efc896] via-[#efc1a7] to-[#e6b8b2] px-[16px] py-[15px]">
          <div className="absolute -left-[86px] -top-[78px] h-[176px] w-[204px] rounded-full bg-[#f0bc8f]/50 blur-[1px]" />
          <div className="absolute right-[-70px] top-[-48px] h-[160px] w-[182px] rounded-full bg-[#edbeac]/60" />

          <div className="relative z-10 flex items-start gap-0.5">
            <span className="h-[40px] w-[40px] rounded-full bg-[#f57800]/95" />
            <span className="-ml-3 h-[40px] w-[40px] rounded-full bg-[#ffaf2c]/95" />
          </div>

          <p className="relative z-10 mt-[13px] text-[18px] font-medium tracking-[0.02em] text-black/50">
            {maskedNumber}
          </p>

          <p className="relative z-10 mt-[6px] text-[11px] font-medium text-black/50">Expires</p>

          <div className="relative z-10 mt-[2px] flex items-end justify-between text-black/50">
            <span className="text-[16px] font-medium">{expiryPreview}</span>
            <span className="text-[28px] leading-none">.</span>
          </div>

          <p className="relative z-10 mt-[-2px] text-right text-[28px] font-medium text-black/50 uppercase leading-none">
            MASTER CARD
          </p>
        </article>

        <div className="mt-9 space-y-6">
          <label className="block">
            <span className="mb-2 block text-base font-normal text-black">Card holder name</span>
            <input
              type="text"
              value={holderName}
              onChange={(event) => setHolderName(event.target.value)}
              placeholder="Enter your name"
              autoComplete="cc-name"
              className="h-[49px] w-full rounded-[10px] border border-[#c6c6c6] bg-white px-3 text-lg text-black outline-none transition focus:border-[#cc7a4b]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-base font-normal text-black">Card number</span>
            <input
              type="text"
              value={cardNumber}
              onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
              placeholder="XXXX XXXX XXXX"
              inputMode="numeric"
              autoComplete="cc-number"
              className="h-[49px] w-full rounded-[10px] border border-[#c6c6c6] bg-white px-3 text-lg text-black outline-none transition focus:border-[#cc7a4b]"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-2 block text-base font-normal text-black">Expiry Date</span>
              <input
                type="text"
                value={expiry}
                onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                placeholder="MM / YYYY"
                inputMode="numeric"
                autoComplete="cc-exp"
                className="h-[49px] w-full rounded-[10px] border border-[#c6c6c6] bg-white px-3 text-[32px] leading-none text-[#c3c3c3] outline-none transition focus:border-[#cc7a4b] focus:text-black"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-base font-normal text-black">CVV</span>
              <input
                type="text"
                value={cvv}
                onChange={(event) => setCvv(sanitizeCvv(event.target.value))}
                placeholder="Enter CVV"
                inputMode="numeric"
                autoComplete="cc-csc"
                className="h-[49px] w-full rounded-[10px] border border-[#c6c6c6] bg-white px-3 text-lg text-black outline-none transition focus:border-[#cc7a4b]"
              />
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="relative z-10 mt-auto h-[54px] w-full rounded-[12px] bg-[#cc7a4b]/50 text-[34px] font-semibold text-white/50 disabled:cursor-not-allowed"
      >
        Save Card
      </button>
    </form>
  );
}
