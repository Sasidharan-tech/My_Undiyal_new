import { formatAmount } from "@/utils/price";
import RupeeSymbol from "@/components/ui/RupeeSymbol";

export default function CurrencyAmount({
  amount,
  className = "",
  valueClassName = "",
  rupeeClassName = "",
  rupeeSize = "0.88em",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  showSign = false,
}) {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const isNegative = safeAmount < 0;
  const absoluteAmount = Math.abs(safeAmount);
  const formattedAmount = formatAmount(absoluteAmount, {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return (
    <span
      className={`inline-flex items-baseline gap-[0.08em] ${className}`.trim()}
    >
      {showSign && isNegative ? (
        <span className="text-current" aria-hidden="true">
          -
        </span>
      ) : null}
      <RupeeSymbol className={rupeeClassName} size={rupeeSize} />
      <span className={`${valueClassName}`.trim()}>{formattedAmount}</span>
    </span>
  );
}
