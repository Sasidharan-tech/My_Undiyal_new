export function formatAmount(
  amount,
  { minimumFractionDigits = 2, maximumFractionDigits = 2 } = {},
) {
  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(safeAmount);
}

export function formatCurrency(amount) {
  return `₹${formatAmount(amount)}`;
}

export function clampDiscount(discount, itemsTotal) {
  const safeDiscount = Number.isFinite(discount) ? discount : 0;
  const safeItemsTotal = Number.isFinite(itemsTotal) ? itemsTotal : 0;

  return Math.max(0, Math.min(safeDiscount, safeItemsTotal));
}

export function calculateTotals(cartItems, coupon) {
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const shipping = 0;
  const discount = coupon
    ? clampDiscount(coupon.discountAmount, itemsTotal)
    : 0;
  const finalTotal = Math.max(itemsTotal - discount + shipping, 0);

  return {
    itemsTotal,
    shipping,
    discount,
    finalTotal,
  };
}
