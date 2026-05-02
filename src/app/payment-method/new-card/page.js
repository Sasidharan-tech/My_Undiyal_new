"use client";

import MainLayout from "@/layout/MainLayout";
import AddCardForm from "@/components/sections/payment/AddCardForm";

export default function AddNewCardPage() {
  return (
    <MainLayout
      title="Add new card"
      backHref="/payment-method"
      className="bg-white"
      contentClassName="px-0 pt-0 pb-28"
      headerProps={{
        headerClassName: "mb-0",
        containerClassName: "h-[95px] items-end pb-3",
        titleClassName: "text-[20px] font-medium",
        backButtonClassName: "h-8 w-8 rounded-none",
      }}
    >
      <AddCardForm />
    </MainLayout>
  );
}
