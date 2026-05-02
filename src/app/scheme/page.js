"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import SchemeCard from "@/components/ui/SchemeCard";
import { schemeOptions } from "@/data/schemes";
import { getProductById } from "@/data/products";
import { useShop } from "@/context/ShopContext";

const colorClassByIndex = ["scheme-blue", "scheme-gold", "scheme-green"];

export default function SchemePage() {
  const router = useRouter();
  const { cart, setScheme, setPaymentType } = useShop();
  const item = cart[0];
  const productData = useMemo(
    () => (item ? getProductById(item.id) : null),
    [item],
  );

  const displayItem = {
    ...productData,
    ...item,
  };

  if (!item) {
    return (
      <MainLayout title="Select Scheme" backHref="/payment">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            No cart items found
          </h2>
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
    <MainLayout
      title="All Scheme"
      backHref={`/product/${item.id}`}
      className="relative max-w-103 bg-white"
      contentClassName="relative px-4 pb-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-43.25 bottom-0 bg-linear-to-b from-[rgba(255,248,242,0)] to-[#FFF5ED]" />

      <div className="relative z-10">
        <section className="mt-1 flex items-center gap-2.75">
          <div className="h-17.25 w-17.25 shrink-0 overflow-hidden rounded-[9px] bg-[#E8F0FB] p-2.5">
            <Image
              src={displayItem.image}
              alt={displayItem.name}
              width={120}
              height={150}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h2 className="line-clamp-1 text-sm leading-5.25 font-medium text-black">
              {displayItem.shortName || displayItem.name}
            </h2>
            <p className="line-clamp-1 text-xs leading-4.5 font-normal text-black">
              Single Door Refrigerator
            </p>
          </div>
        </section>

        <div
          className="-mx-4 mt-3 border-t border-[#E9E9E9]"
          aria-hidden="true"
        />

        <section className="mt-4 space-y-5">
          {schemeOptions.map((option, index) => (
            <SchemeCard
              key={option.id}
              option={option}
              basePrice={displayItem.price}
              colorClass={colorClassByIndex[index % colorClassByIndex.length]}
              onSelect={(selectedScheme) => {
                setScheme(selectedScheme);

                if (selectedScheme.id === "immediate") {
                  setPaymentType("on-time");
                  router.push("/order-summary");
                  return;
                }

                setPaymentType("weekly");
                router.push("/payment");
              }}
            />
          ))}
        </section>
      </div>
    </MainLayout>
  );
}
