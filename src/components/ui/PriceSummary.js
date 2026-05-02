import CurrencyAmount from "./CurrencyAmount";

export default function PriceSummary({
  itemsTotal,
  shipping,
  discount,
  finalTotal,
  variant = "default",
  className = "",
  alwaysShowCoupon = false,
}) {
  const isSoftVariant = variant === "soft";
  const shouldShowCoupon = alwaysShowCoupon || discount > 0;
  const couponAmount = discount > 0 ? -discount : 0;

  const containerClassName = isSoftVariant
    ? "rounded-lg bg-[rgba(198,198,198,0.2)] px-3 py-2.5"
    : "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm";

  const rowClassName = isSoftVariant
    ? "flex items-center justify-between py-0.5 text-base text-black"
    : "flex items-center justify-between py-1 text-sm text-slate-600";

  const valueClassName = isSoftVariant
    ? "text-black font-medium"
    : "text-slate-900";
  const couponTextClassName = discount > 0 ? "text-[#D02A2A]" : "text-black";
  const totalRowClassName = isSoftVariant
    ? "mt-0.5 flex items-center justify-between pt-0.5 text-base font-medium text-black"
    : "mt-2 flex items-center justify-between border-t border-dashed border-slate-200 pt-3 text-base font-semibold text-slate-900";

  return (
    <section
      className={`${containerClassName} ${className}`.trim()}
      aria-label="Price breakdown"
    >
      <div className={rowClassName}>
        <span>Items Total:</span>
        <strong className={valueClassName}>
          <CurrencyAmount amount={itemsTotal} />
        </strong>
      </div>
      <div className={rowClassName}>
        <span>Shipping Charge:</span>
        <strong className={valueClassName}>
          <CurrencyAmount amount={shipping} />
        </strong>
      </div>
      {shouldShowCoupon ? (
        <div className={`${rowClassName} ${couponTextClassName}`.trim()}>
          <span>Coupon:</span>
          <strong>
            <CurrencyAmount amount={couponAmount} showSign={discount > 0} />
          </strong>
        </div>
      ) : null}
      <div className={totalRowClassName}>
        <span>Order Total:</span>
        <strong>
          <CurrencyAmount amount={finalTotal} />
        </strong>
      </div>
    </section>
  );
}
