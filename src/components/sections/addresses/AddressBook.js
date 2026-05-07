"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BriefcaseBusiness,
  Home,
  MapPin,
  Navigation,
  Pencil,
  Trash2,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import DeletePopup from "@/components/ui/DeletePopup";
import SearchInput from "@/components/common/SearchInput";
import EmptyState from "@/components/common/EmptyState";
import { useSearch } from "@/hooks/useSearch";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { getCurrentPosition, reverseGeocode } from "@/services/location.service";

function AddressIcon({ iconType }) {
  if (iconType === "navigation") {
    return (
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6EAE2] text-[#444444]">
        <Navigation size={15} strokeWidth={2.3} />
      </span>
    );
  }

  if (iconType === "briefcase") {
    return (
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6EAE2] text-[#444444]">
        <BriefcaseBusiness size={15} strokeWidth={2.1} />
      </span>
    );
  }

  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6EAE2] text-[#444444]">
      <Home size={15} strokeWidth={2.1} />
    </span>
  );
}

function AddressCard({ address, onSelect, onEdit, onDelete }) {
  return (
    <article className="px-3 py-3 transition-colors duration-200 hover:bg-[#FFF8F3]">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onSelect}
          className="shrink-0"
          aria-label={`Select ${address.label} address`}
        >
          <AddressIcon iconType={address.iconType} />
        </button>

        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={onSelect}
            className="text-left"
            aria-label={`Use ${address.label} as delivery address`}
          >
            <h3 className="text-base leading-5 font-semibold text-[#2D2A28]">
              {address.label}
            </h3>
          </button>

          <p className="mt-0.5 text-[13px] leading-4.5 font-normal text-[#8A817B]">
            {address.street}
          </p>
          <p className="mt-0.5 text-[13px] leading-4.5 font-normal text-[#8A817B]">
            {address.city}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-6 min-w-18 items-center justify-center gap-1 rounded-md bg-[#FFF1E6] px-2 text-[11px] leading-none font-semibold text-[#CD8750]"
            >
              <Pencil size={12} /> Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-6 min-w-18 items-center justify-center gap-1 rounded-md bg-[#FFE9E9] px-2 text-[11px] leading-none font-semibold text-[#F05454]"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AddressBook({ returnTo: returnToProp = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = returnToProp || searchParams.get("returnTo") || "/order-summary";
  const {
    target: pendingDelete,
    isOpen,
    openDialog,
    closeDialog,
  } = useConfirmDialog();

  const {
    savedAddresses,
    addSavedAddress,
    selectSavedAddress,
    updateSavedAddress,
    deleteSavedAddress,
  } = useShop();

  const searchSelector = useCallback(
    (address) => `${address.label || ""} ${address.street || ""} ${address.city || ""}`,
    [],
  );

  const { searchText, setSearchText, filteredItems: filteredAddresses } = useSearch(
    savedAddresses,
    searchSelector,
  );

  const handleAddAddress = useCallback(() => {
    router.push(`/addresses/new?returnTo=${encodeURIComponent(returnTo)}`);
  }, [router, returnTo]);

  const handleEditAddress = useCallback((address) => {
    router.push(
      `/addresses/${encodeURIComponent(address.id)}/edit?returnTo=${encodeURIComponent(returnTo)}`,
    );
  }, [router, returnTo]);

  const handleSelectAddress = useCallback((addressId) => {
    selectSavedAddress(addressId);
    router.push(returnTo);
  }, [router, returnTo, selectSavedAddress]);

  const handleDeleteAddress = useCallback((address) => {
    openDialog(address);
  }, [openDialog]);

  const handleConfirmDelete = useCallback(() => {
    if (pendingDelete?.id) {
      deleteSavedAddress(pendingDelete.id);
    }

    closeDialog();
  }, [closeDialog, deleteSavedAddress, pendingDelete]);

  const locationErrorMessages = useMemo(
    () => ({
      1: "Location permission denied. Please allow access in your browser settings.",
      2: "Unable to determine your location. Please try again.",
      3: "Location request timed out. Please try again.",
    }),
    [],
  );

  function handleCurrentLocation() {
    const applyCurrentLocation = (street, city) => {
      const existingCurrent = savedAddresses.find(
        (item) => item.label.toLowerCase() === "current location",
      );

      if (existingCurrent) {
        updateSavedAddress(existingCurrent.id, { street, city });
        selectSavedAddress(existingCurrent.id);
        router.push(returnTo);
        return;
      }

      const newAddress = {
        label: "Current Location",
        street,
        city,
        iconType: "navigation",
      };

      addSavedAddress(newAddress);
      router.push(returnTo);
    };

    getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
      maximumAge: 0,
    })
      .then(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const geocoded = await reverseGeocode(lat, lon);
        applyCurrentLocation(geocoded.displayName || geocoded.street, geocoded.city);
      })
      .catch((error) => {
        alert(locationErrorMessages[error.code] || error.message || "Failed to get your location.");
      });
  }

  return (
    <>
      <section className="w-full bg-transparent pb-10 font-(--font-nunito)">
        <div className="px-4 pt-5">
          <label htmlFor="address-search" className="sr-only">
            Search your location
          </label>
          <SearchInput
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search your location"
            ariaLabel="Search your location"
            className="h-12.5 gap-3 text-[#cc7a4b]"
          />

          <button
            type="button"
            onClick={handleAddAddress}
            className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#C1683A] text-sm leading-none font-semibold text-white"
          >
            <MapPin size={15} /> Add New Address
          </button>

          <button
            type="button"
            onClick={handleCurrentLocation}
            className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#E4E4E4] text-sm leading-none font-semibold text-[#2F2F2F]"
          >
            <Image
              src="/icons/common/my_location.png"
              alt="Current location"
              width={18}
              height={18}
              className="h-4.5 w-4.5 object-contain"
            />
            Use Current Location
          </button>
        </div>

        <div className="mt-13">
          <h2 className="flex items-center gap-1.5 px-3 text-xs font-bold tracking-[0.08em] text-[#3E3835] uppercase">
            <MapPin size={16} /> SAVED ADDRESSES
          </h2>

          <div className="mt-3 bg-transparent">
            {filteredAddresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onSelect={() => handleSelectAddress(address.id)}
                onEdit={() => handleEditAddress(address)}
                onDelete={() => handleDeleteAddress(address)}
              />
            ))}

            {filteredAddresses.length === 0 ? (
              <div className="px-3 py-3">
                <EmptyState message="No addresses found for your search." />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <DeletePopup
        open={isOpen}
        onCancel={closeDialog}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this address?"
        addressTag={pendingDelete?.label || ""}
        addressLine={pendingDelete?.street || ""}
        city={pendingDelete?.city || ""}
      />
    </>
  );
}
