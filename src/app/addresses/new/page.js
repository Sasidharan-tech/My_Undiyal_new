"use client";

import AddAddressForm from "@/components/sections/addresses/AddAddressForm";
import MainLayout from "@/layout/MainLayout";
import { useSearchParams } from "next/navigation";

export default function AddAddressPage() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/order-summary";

  return (
    <MainLayout
      title="Location Details"
      backHref={`/addresses?returnTo=${encodeURIComponent(returnTo)}`}
      contentClassName="px-3 pt-0 pb-28"
    >
      <AddAddressForm returnTo={returnTo} />
    </MainLayout>
  );
}
