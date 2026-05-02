"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import Button from "@/components/ui/Button";
import { useShop } from "@/context/ShopContext";
import CurrencyAmount from "@/components/ui/CurrencyAmount";
import { CircleCheckBig } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const { cart, finalTotal, scheme, paymentType, resetCheckout } = useShop();

  return (
    <MainLayout title="Order Success" backHref="/scheme">
      <section className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-5 text-center shadow-sm">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
          <CircleCheckBig size={28} />
        </div>

        <h2 className="mt-3 text-lg font-semibold text-slate-900">
          Order Placed Successfully
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Your purchase flow is now complete.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-left">
          <div className="rounded-xl bg-white p-3">
            <span>Items</span>
            <strong className="block text-base text-slate-900">
              {cart.length}
            </strong>
          </div>
          <div className="rounded-xl bg-white p-3">
            <span>Payment Type</span>
            <strong className="block text-base capitalize text-slate-900">
              {paymentType}
            </strong>
          </div>
          <div className="rounded-xl bg-white p-3">
            <span>Scheme</span>
            <strong className="block text-sm text-slate-900">
              {scheme?.type || "Immediate Purchase"}
            </strong>
          </div>
          <div className="rounded-xl bg-white p-3">
            <span>Total Paid</span>
            <strong className="block text-base text-slate-900">
              <CurrencyAmount amount={finalTotal} />
            </strong>
          </div>
        </div>

        <Button
          className="mt-5 w-full"
          onClick={() => {
            resetCheckout();
            router.push("/");
          }}
        >
          Back to Home
        </Button>
      </section>
    </MainLayout>
  );
}
