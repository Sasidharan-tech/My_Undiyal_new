"use client";

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import EditAddressForm from "@/components/sections/addresses/EditAddressForm";

export default function EditAddressPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const addressId = typeof params?.addressId === "string" ? params.addressId : "";
  const returnTo = searchParams.get("returnTo") || "/order-summary";

  return (
    <MainLayout
      title="Edit Address"
      backHref={`/addresses?returnTo=${encodeURIComponent(returnTo)}`}
      contentClassName="px-3 pt-0 pb-28"
    >
      <EditAddressForm
        addressId={decodeURIComponent(addressId)}
        returnTo={returnTo}
      />
    </MainLayout>
  );
}
