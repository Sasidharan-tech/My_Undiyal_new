"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import MainLayout from "@/layout/MainLayout";
import CurrencyAmount from "@/components/ui/CurrencyAmount";
import DeletePopup from "@/components/ui/DeletePopup";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "next/navigation";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useDeleteData } from "@/hooks/crud/useDeleteData";

export default function OrderSummaryPage() {
  const router = useRouter();
  const {
    target: deleteTarget,
    isOpen,
    openDialog,
    closeDialog,
  } = useConfirmDialog();
  const {
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
  } = useShop();

  const handleOpenDeletePopup = useCallback((item) => {
    openDialog(item);
  }, [openDialog]);

  const { deleteData } = useDeleteData(async () => {
    if (deleteTarget?.id) {
      removeFromCart(deleteTarget.id);
    }
    closeDialog();
  });

  const handleConfirmDelete = useCallback(() => {
    deleteData().catch(() => {});
  }, [deleteData]);

  const orderSummaryIcons = {
    remove: "/icons/cart/delete_icon.png",
    delivery: "/icons/cart/delivery_icon.png",
    stepper: {
      increment: "/icons/cart/add_icon.png",
      decrement: "/icons/cart/remove_icon.png",
    },
  };

  if (!cart.length) {
    return (
      <MainLayout title="Order Summary" backHref="/cart">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No items in order
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Add a product to continue.
          </p>
          <Link
            href="/categories"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-5 text-sm font-semibold text-white"
          >
            Go to Categories
          </Link>
        </section>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout
        title="Order Summary"
        backHref="/cart"
        headerTone="brand"
        headerProps={{ headerClassName: "mb-0" }}
        className="relative bg-white"
        contentClassName="relative px-4 pb-6"
      >
        <div className="pointer-events-none absolute inset-x-0 top-20 bottom-0 bg-linear-to-b from-[rgba(255,248,242,0)] to-[#FFF5ED] " />

        <div className="relative z-10">
          {discount > 0 ? (
            <div className="-mx-4 mb-3 flex h-10.25 items-center bg-[linear-gradient(89.99deg,#FF5D00_0.01%,#B34201_75.77%,#FFFFFF_93.81%)] px-5">
              <span className="text-sm font-semibold leading-5.25 text-white">
                You Saved{" "}
                <CurrencyAmount
                  amount={discount}
                  className="text-white"
                  valueClassName="font-semibold"
                  minimumFractionDigits={0}
                  maximumFractionDigits={0}
                />{" "}
                New Launching Offer
              </span>
              <span className="ml-1 text-sm text-white" aria-hidden="true">
                🎉
              </span>
            </div>
          ) : null}

          <section className="space-y-2.5">
            {cart.map((item) => (
              <article key={item.id} className="rounded-xl bg-white">
                <div className="flex gap-2.5 p-2.5 pr-2">
                  <div className="h-25 w-25 shrink-0 overflow-hidden rounded-[9px] bg-[#CC7A4B]/10 p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={160}
                      height={180}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1 h-25">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm leading-5.25 font-medium text-black">
                        {item.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() => handleOpenDeletePopup(item)}
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF0E0E]/10"
                        aria-label="Remove item"
                      >
                        <Image
                          src={orderSummaryIcons.remove}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>

                    <p className="mt-0.5 text-sm leading-5.25 font-medium text-black">
                      Qty: {item.qty}
                    </p>

                    <p className="mt-0.5 text-lg leading-6.75 font-medium text-black">
                      <CurrencyAmount
                        amount={item.price}
                        className="tabular-nums"
                        valueClassName="text-lg leading-6.75 font-medium"
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                      />
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <small className="inline-flex w-32 items-center gap-1 leading-3.75 font-normal text-center text-black">
                        <Image
                          src={orderSummaryIcons.delivery}
                          alt=""
                          width={12}
                          height={12}
                        />
                        <span className="text-[8.5px]">
                          Delivery on 11 Jan 2027
                        </span>
                      </small>

                      <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => decrementQty(item.id)}
                      disabled={item.qty === 1}
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full 
                        ${item.qty === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-[#CC7A4B]/10"}`}
                      aria-label="Decrease quantity"
                    >
                          <Image
                            src={orderSummaryIcons.stepper.decrement}
                            alt=""
                            width={20}
                            height={20}
                          />
                        </button>
                        <span className="min-w-4 text-center text-sm font-semibold text-[#3d3d3d]">
                          {String(item.qty).padStart(2, "0")}
                        </span>
                        <button
                          type="button"
                          onClick={() => incrementQty(item.id)}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CC7A4B]/10"
                          aria-label="Decrease quantity"
                        >
                          <Image
                            src={orderSummaryIcons.stepper.increment}
                            alt=""
                            width={20}
                            height={20}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-3 min-h-13 rounded-[9px] bg-[#CC7A4B]/10 px-3 py-4">
            <Link
              href="/coupon"
              className="flex items-center justify-between text-base font-normal text-black"
            >
              <span className="inline-flex items-center gap-2 text-base">
                <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
                  <Image
                    src="/icons/cart/sell_icon.png"
                    alt=""
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </span>
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
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="min-w-0 flex flex-1 items-center gap-x-1 overflow-hidden whitespace-nowrap text-sm leading-5 font-medium text-[#5C9757]">
                  <span aria-hidden="true" className="shrink-0 leading-none">
                    🎉
                  </span>
                  <span className="shrink-0">You Save</span>
                  <CurrencyAmount
                    amount={coupon.discountAmount}
                    className="shrink-0 text-[#5C9757]"
                    valueClassName="font-medium"
                    minimumFractionDigits={0}
                    maximumFractionDigits={0}
                  />
                  <span className="min-w-0 truncate">with {coupon.title}</span>
                </p>
                <button
                  type="button"
                  onClick={clearCoupon}
                  className="shrink-0 text-sm leading-5.25 font-medium text-[#FF0E0E]"
                >
                  Remove
                </button>
              </div>
            ) : null}
          </section>

          <section className="mt-3 px-0 py-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="inline-flex items-center gap-1.5 text-base font-medium text-black">
                <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center">
                  <Image
                    src="/icons/cart/Vector.png"
                    alt=""
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </span>
                Delivery Address:
              </h3>
              <button
                type="button"
                onClick={() => router.push("/addresses?returnTo=/order-summary")}
                className="h-7.25 min-w-21.75 rounded border border-[#CC7A4B] px-3 text-sm font-medium leading-5.25 text-[#CC7A4B]"
              >
                Change
              </button>
            </div>
            <p className="mt-1.5 pl-7 text-sm leading-5.25 text-black ">
              Street Address: {address.street}, {address.city}
            </p>
          </section>

          <div className="mt-4 space-y-4">
             <section
    className="min-h-28 rounded-lg bg-[rgba(198,198,198,0.2)] px-3 py-3"
    aria-label="Price breakdown"
  >
    {/* Items Total */}
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-1 text-base leading-6 text-black">
      <span>Items Total:</span>
      <strong className="text-right font-medium tabular-nums">
        <CurrencyAmount
          amount={itemsTotal}
          className="tabular-nums"
          valueClassName="font-medium"
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </strong>
    </div>

    {/* Shipping */}
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-1 text-base leading-6 text-black">
      <span>Shipping Charge:</span>
      <strong className="text-right font-medium tabular-nums">
        <CurrencyAmount
          amount={shipping}
          className="tabular-nums"
          valueClassName="font-medium"
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </strong>
    </div>

    {/* Coupon */}
    {discount > 0 && (
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-1 text-base leading-6">
        <span className="text-black">Coupon:</span>
        <strong className="text-right font-medium tabular-nums text-[#D02A2A]">
          <CurrencyAmount
            amount={-discount}
            showSign
            className="tabular-nums text-[#D02A2A]"
            valueClassName="font-medium"
            minimumFractionDigits={2}
            maximumFractionDigits={2}
          />
        </strong>
      </div>
    )}

    {/* Divider */}
    <div className="my-2 border-t border-gray-300"></div>

    {/* Order Total */}
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 py-1 text-base leading-6 text-black">
      <span className="font-semibold">Order Total:</span>
      <strong className="text-right font-semibold tabular-nums">
        <CurrencyAmount
          amount={finalTotal}
          className="tabular-nums"
          valueClassName="font-semibold"
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </strong>
    </div>
  </section>
            {/* Inline button removed; using fixed bottom bar below */}
          </div>
        </div>

        <DeletePopup
          open={isOpen}
          onCancel={closeDialog}
          onConfirm={handleConfirmDelete}
          title="Are your sure your want to delete this product?"
          showImage
          imageSrc={deleteTarget?.image}
          imageAlt={deleteTarget?.name || "Product"}
          primaryText={deleteTarget?.shortName || deleteTarget?.name || ""}
          secondaryText={deleteTarget?.description || deleteTarget?.name || ""}
        />
        {/* Fixed bottom bar with Continue action */}
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
          <div className="mx-auto max-w-120">
            <Link
              href="/payment"
              className="inline-flex h-13.5 w-full items-center justify-center rounded-[10px] bg-[#CC7A4B] px-5 text-base font-medium leading-6 text-white"
            >
              Continue to Payment
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
