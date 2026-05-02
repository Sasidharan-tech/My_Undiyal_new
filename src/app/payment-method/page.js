"use client";

import MainLayout from "@/layout/MainLayout";
import PaymentMethodList from "@/components/sections/payment/PaymentMethodList";

export default function PaymentMethodPage() {
  return (
    <MainLayout
      title="Payment"
      backHref="/profile"
      className="bg-[#f2f2f2] bg-none"
      contentClassName="px-0 pt-0 pb-28"
    >
      <PaymentMethodList />
    </MainLayout>
  );
}
