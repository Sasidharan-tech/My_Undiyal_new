"use client";

import Link from "next/link";
import { useState } from "react";
import BottomBar from "@/components/ui/BottomBar";
import CartItem from "@/components/sections/cart/CartItem";
import DeletePopup from "@/components/ui/DeletePopup";
import MainLayout from "@/layout/MainLayout";
import { useShop } from "@/context/ShopContext";

export default function CartPage() {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { cart, itemsTotal, incrementQty, decrementQty, removeFromCart } =
    useShop();

  const cartIcons = {
    remove: "/icons/cart/delete_icon.png",
    delivery: "/icons/cart/delivery_icon.png",
    stepper: {
      increment: "/icons/cart/add_icon.png",
      decrement: "/icons/cart/remove_icon.png",
    },
  };

  const handleOpenDeletePopup = (itemId) => {
    const targetItem = cart.find((item) => item.id === itemId) || null;
    setDeleteTarget(targetItem);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget?.id) {
      removeFromCart(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  if (!cart.length) {
    return (
      <MainLayout title="Cart" backHref="/">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Your cart is empty
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Add products to continue checkout.
          </p>
          <Link
            href="/categories"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-5 text-sm font-semibold text-white"
          >
            Browse Products
          </Link>
        </section>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout
        title="Cart"
        backHref={`/product/${cart[0].id}`}
        className="bg-white"
        contentClassName="px-4 pb-24"
      >
        <section className="space-y-4">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={incrementQty}
              onDecrement={decrementQty}
              onRemove={handleOpenDeletePopup}
              showScheme
              icons={cartIcons}
            />
          ))}
        </section>
      </MainLayout>

      <BottomBar
        label="Total price"
        amount={itemsTotal}
        buttonText="Continue"
        href="/order-summary"
      />

      <DeletePopup
        open={Boolean(deleteTarget)}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        showImage
        imageSrc={deleteTarget?.image}
        imageAlt={deleteTarget?.name || "Product"}
        primaryText={deleteTarget?.shortName || deleteTarget?.name || ""}
        secondaryText={
          deleteTarget?.schemePreview
            ? `Scheme: ${deleteTarget.schemePreview}`
            : deleteTarget?.name || ""
        }
      />
    </>
  );
}
