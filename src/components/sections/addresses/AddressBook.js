"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BriefcaseBusiness,
  Home,
  MapPin,
  Navigation,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import DeletePopup from "@/components/ui/DeletePopup";

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
  const [pendingDelete, setPendingDelete] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = returnToProp || searchParams.get("returnTo") || "/order-summary";

  const {
    savedAddresses,
    addSavedAddress,
    selectSavedAddress,
    updateSavedAddress,
    deleteSavedAddress,
  } = useShop();

  function handleAddAddress() {
    router.push(`/addresses/new?returnTo=${encodeURIComponent(returnTo)}`);
  }

  function handleEditAddress(address) {
    router.push(
      `/addresses/${encodeURIComponent(address.id)}/edit?returnTo=${encodeURIComponent(returnTo)}`,
    );
  }

  function handleSelectAddress(addressId) {
    selectSavedAddress(addressId);
    router.push(returnTo);
  }

  function handleDeleteAddress(address) {
    setPendingDelete(address);
  }

  function handleCancelDelete() {
    setPendingDelete(null);
  }

  function handleConfirmDelete() {
    if (pendingDelete?.id) {
      deleteSavedAddress(pendingDelete.id);
    }

    setPendingDelete(null);
  }

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

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        (async () => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
            );

            if (res.ok) {
              const data = await res.json();
              const display = data.display_name || `Lat ${lat.toFixed(4)}, Lng ${lon.toFixed(4)}`;
              const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                data.address?.county ||
                "Live Location";

              applyCurrentLocation(display, city);
              return;
            }
          } catch (e) {
            // fall through to coordinate fallback
          }

          applyCurrentLocation(
            `Lat ${lat.toFixed(4)}, Lng ${lon.toFixed(4)}`,
            "Live Location",
          );
        })();
      },
      (error) => {
        const messages = {
          1: "Location permission denied. Please allow access in your browser settings.",
          2: "Unable to determine your location. Please try again.",
          3: "Location request timed out. Please try again.",
        };

        alert(messages[error.code] || "Failed to get your location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0,
      },
    );
  }

  return (
    <>
      <section className="w-full bg-transparent pb-10 font-(--font-nunito)">
        <div className="px-4 pt-5">
          <label htmlFor="address-search" className="sr-only">
            Search your location
          </label>
          <div className="flex h-12.5 items-center gap-3 rounded-full bg-[#FFF2EA] px-4 text-[#cc7a4b]">
            <Search size={24} aria-hidden="true" />
            <input
              id="address-search"
              type="search"
              placeholder="Search your location"
              className="h-full w-full bg-transparent text-sm font-normal text-[#904910]/60 outline-none placeholder:text-[#904910]/30"
              aria-label="Search your location"
            />
          </div>

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
            {savedAddresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onSelect={() => handleSelectAddress(address.id)}
                onEdit={() => handleEditAddress(address)}
                onDelete={() => handleDeleteAddress(address)}
              />
            ))}
          </div>
        </div>
      </section>

      <DeletePopup
        open={Boolean(pendingDelete)}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this address?"
        addressTag={pendingDelete?.label || ""}
        addressLine={pendingDelete?.street || ""}
        city={pendingDelete?.city || ""}
      />
    </>
  );
}
