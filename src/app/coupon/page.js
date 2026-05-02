"use client";

import { useRouter } from "next/navigation";
import CouponCard from "@/components/ui/CouponCard";
import MainLayout from "@/layout/MainLayout";
import { coupons } from "@/data/coupons";
import { useShop } from "@/context/ShopContext";

export default function CouponPage() {
  const router = useRouter();
  const { coupon, setCoupon } = useShop();

  return (
    <MainLayout title="Apply Coupon" backHref="/order-summary">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Redeem your coupons
        </h2>

        <div className="space-y-3">
          {coupons.map((item) => (
            <CouponCard
              key={item.code}
              coupon={item}
              isApplied={coupon?.code === item.code}
              onApply={(selectedCoupon) => {
                setCoupon(selectedCoupon);
                router.push("/order-summary");
              }}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
