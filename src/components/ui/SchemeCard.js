import Image from "next/image";
import CurrencyAmount from "./CurrencyAmount";
import { Check, Clock3 } from "lucide-react";

export default function SchemeCard({
  option,
  basePrice,
  onSelect,
  colorClass,
}) {
  const safeBasePrice = Number.isFinite(basePrice) ? basePrice : 0;
  const installmentCount =
    Number.isFinite(option.installments) && option.installments > 0
      ? option.installments
      : 53;

  const amount =
    option.priceMode === "full"
      ? Math.round(safeBasePrice / 1000) * 1000
      : Math.ceil(safeBasePrice / installmentCount / 10) * 10;

  const colorClassMap = {
    "scheme-blue": {
      panelHeader: "bg-[#E6F1FB]",
      accentText: "text-[#0C4FA1]",
      accentBorder: "border-[#0C4FA1]",
      accentButton: "bg-[#0C4FA1]",
      accentSoft: "bg-[rgba(26,89,167,0.34)]",
      accentBadge: "bg-[rgba(12,79,161,0.26)]",
      iconColor: "text-[#1A59A7]",
    },
    "scheme-gold": {
      panelHeader: "bg-[#FAEEDA]",
      accentText: "text-[#BA7517]",
      accentBorder: "border-[#BA7517]",
      accentButton: "bg-[#BA7517]",
      accentSoft: "bg-[rgba(186,117,23,0.34)]",
      accentBadge: "bg-[rgba(186,117,23,0.26)]",
      iconColor: "text-[#BA7517]",
    },
    "scheme-green": {
      panelHeader: "bg-[#EAF3DE]",
      accentText: "text-[#3B6D11]",
      accentBorder: "border-[#3B6D11]",
      accentButton: "bg-[#3B6D11]",
      accentSoft: "bg-[rgba(59,109,17,0.34)]",
      accentBadge: "bg-[rgba(59,109,17,0.26)]",
      iconColor: "text-[#3B6D11]",
    },
  };
  const theme = colorClassMap[colorClass] || colorClassMap["scheme-blue"];
  const isImmediate = option.priceMode === "full";

  return (
    <article className="min-h-38.25 overflow-hidden rounded-[9px] border border-[#D9D9D9] bg-white">
      <div
        className={`flex h-11.25 items-center justify-between px-4 ${theme.panelHeader}`.trim()}
      >
        <div className="inline-flex items-center gap-2">
          <span
            className={`inline-flex h-5.5 w-5.5 items-center justify-center rounded-full ${theme.accentSoft}`.trim()}
          >
            {isImmediate ? (
              <Check size={16} className={`${theme.iconColor}`.trim()} />
            ) : (
              <Clock3 size={16} className={`${theme.iconColor}`.trim()} />
            )}
          </span>

          <h3
            className={`text-[16px] leading-6 font-normal ${theme.accentText}`.trim()}
          >
            {option.type}
          </h3>
        </div>

        {option.badge ? (
          <span
            className={`inline-flex h-6.5 min-w-20.25 items-center justify-center rounded-[14.5px] px-2 text-sm leading-5.25 font-normal ${theme.accentText} ${theme.accentBadge}`.trim()}
          >
            {option.badge}
          </span>
        ) : null}
      </div>

      <div className="px-4 pt-3 pb-2.5">
        {!isImmediate ? (
          <p
            className={`text-xs leading-4.5 font-normal uppercase ${theme.accentText}`.trim()}
          >
            {option.subtitle}
          </p>
        ) : null}

        <div
          className={`flex items-end ${isImmediate ? "mt-1" : "mt-0"}`.trim()}
        >
          <strong className="text-[28px] leading-10.5 items-center font-medium text-black">
            <CurrencyAmount
              amount={amount}
              rupeeClassName="relative -top-0.5"
              rupeeSize="0.68em"
              minimumFractionDigits={0}
              maximumFractionDigits={0}
            />
          </strong>

          {isImmediate ? (
            <span className="ml-2 mb-1 text-[13px] leading-5 font-normal text-[#939393]">
              {option.duration}
            </span>
          ) : (
            <span className="ml-1 mb-1 text-[20px] leading-7.5 font-semibold text-black">
              x {option.duration}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div
            className={`inline-flex h-5.75 min-w-37.25 items-center gap-1 rounded border px-2 ${theme.accentBorder}`.trim()}
          >
            <Image
              src={option.deliveryIcon || "/icons/cart/delivery_icon.png"}
              alt=""
              aria-hidden="true"
              width={15}
              height={15}
              className="h-3.75 w-3.75 object-contain"
            />
            <span className="text-[10px] leading-3.75 font-normal text-black">
              {option.deliveryInfo}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(option)}
            className={`inline-flex h-7 w-21.25 items-center justify-center rounded text-base leading-6 font-normal text-white ${theme.accentButton}`.trim()}
          >
            SELECT
          </button>
        </div>
      </div>
    </article>
  );
}
