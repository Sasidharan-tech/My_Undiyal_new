"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import AddressBook from "@/components/sections/addresses/AddressBook";

export default function AddressesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/order-summary";
  const [addresses, setAddresses] = useState([]);

  return (
    <MainLayout
      title="Select Your Location"
      backHref={returnTo}
      contentClassName="px-0 pt-0 pb-28"
      headerProps={{
        headerClassName: "bg-[#C1683A]",
      }}
    >
      <AddressBook returnTo={returnTo} />
    </MainLayout>
  );
}
