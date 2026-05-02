import Image from "next/image";
import Link from "next/link";
import CartItem from "@/components/sections/cart/CartItem";
import Button from "@/components/ui/Button";
import CurrencyAmount from "@/components/ui/CurrencyAmount";
import PriceSummary from "@/components/ui/PriceSummary";

const orderSummaryIcons = {
  remove: "/icons/cart/delete_icon.png",
  delivery: "/icons/cart/delivery_icon.png",
  stepper: {
    increment: "/icons/cart/add_icon.png",
    decrement: "/icons/cart/remove_icon.png",
  },
};

export default function OrderSummarySection({
  cart,
  address,
  coupon,
  clearCoupon,
  itemsTotal,
  shipping,
  discount,
  finalTotal,
  incrementQty,
  decrementQty,
  removeFromCart,
  onChangeAddress,
  onContinueToPayment,
}) {
  return (
    <section className="relative pb-1">
      <div className="pointer-events-none absolute inset-x-0 top-10 bottom-0 bg-linear-to-b from-[rgba(255,248,242,0)] to-[#FFF5ED]" />

      <div className="relative z-10 space-y-3">
        {discount > 0 ? (
          <aside className="rounded-md bg-linear-to-r from-[#FF5D00] via-[#B34201] to-[#D17235] px-3 py-2 text-sm font-semibold text-white">
            <span>
              You Saved{" "}
              <CurrencyAmount
                amount={discount}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />{" "}
              New Launching Offer
            </span>{" "}
            <span aria-hidden="true">🎉</span>
          </aside>
        ) : null}

        <section className="space-y-3">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={incrementQty}
              onDecrement={decrementQty}
              onRemove={removeFromCart}
              icons={orderSummaryIcons}
            />
          ))}
        </section>

        <section className="rounded-[9px] bg-[rgba(204,122,75,0.1)] px-3 py-3">
          <Link
            href="/coupon"
            className="flex items-center justify-between text-base font-normal text-black"
          >
            <span className="inline-flex items-center gap-2">
              <Image
                src="/icons/cart/sell_icon.png"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              Add Coupon
            </span>
            <Image
              src="/icons/cart/arrow_forward_icon.png"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </Link>

          {coupon ? (
            <div className="mt-2 flex items-start justify-between gap-3">
              <span className="text-xs font-medium text-[#5C9757]">
                🎉 You Save{" "}
                <CurrencyAmount
                  amount={coupon.discountAmount}
                  minimumFractionDigits={0}
                  maximumFractionDigits={0}
                />{" "}
                with {coupon.title}
              </span>
              <button
                type="button"
                onClick={clearCoupon}
                className="text-sm font-medium text-[#FF0E0E]"
              >
                Remove
              </button>
            </div>
          ) : null}
        </section>

        <section className="rounded-[9px] bg-[rgba(204,122,75,0.1)] px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="inline-flex items-center gap-2 text-base font-medium text-black">
              <Image
                src="/icons/cart/Vector.png"
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
              />
              Delivery Address:
            </h3>
            <Button
              variant="ghost"
              className="min-h-7 rounded border border-[#CC7A4B] bg-transparent! px-3 py-1 text-xs font-medium text-[#CC7A4B]! hover:bg-[#CC7A4B]/10!"
              onClick={onChangeAddress}
            >
              Change
            </Button>
          </div>
          <p className="mt-2 text-sm font-normal text-black">
            Street Address: {address.street}, {address.city}
          </p>
        </section>

        <PriceSummary
          itemsTotal={itemsTotal}
          shipping={shipping}
          discount={discount}
          finalTotal={finalTotal}
          variant="soft"
          alwaysShowCoupon
        />

        <Button
          type="button"
          onClick={onContinueToPayment}
          className="w-full rounded-[10px] bg-[#CC7A4B]! py-3 text-base font-semibold hover:bg-[#B66C42]!"
        >
          Continue to Payment
        </Button>
      </div>
    </section>
  );
}
