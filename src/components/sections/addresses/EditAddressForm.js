"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Navigation } from "lucide-react";
import { useShop } from "@/context/ShopContext";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), {
  ssr: false,
});

function getIconType(label) {
  const normalized = label.trim().toLowerCase();

  if (normalized.includes("work")) {
    return "briefcase";
  }

  if (normalized.includes("home")) {
    return "house";
  }

  if (normalized.includes("current")) {
    return "navigation";
  }

  return "house";
}

function splitStreet(street) {
  const value = street?.trim() || "";

  if (!value) {
    return {
      buildingFloor: "",
      street: "",
    };
  }

  const parts = value.split(",");
  if (parts.length < 2) {
    return {
      buildingFloor: value,
      street: "",
    };
  }

  return {
    buildingFloor: parts.shift().trim(),
    street: parts.join(",").trim(),
  };
}

export default function EditAddressForm({ addressId, returnTo = "/order-summary" }) {
  const router = useRouter();
  const { savedAddresses, updateSavedAddress, selectSavedAddress } = useShop();
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [isChoosingOnMap, setIsChoosingOnMap] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 13.0827, lng: 80.2707 });
  const [selectedCoords, setSelectedCoords] = useState(null);

  const existingAddress = useMemo(
    () => savedAddresses.find((item) => item.id === addressId) || null,
    [savedAddresses, addressId],
  );

  const [form, setForm] = useState({
    label: "",
    buildingFloor: "",
    street: "",
    areaLocality: "",
  });

  useEffect(() => {
    if (!existingAddress) {
      return;
    }

    const parsedStreet = splitStreet(existingAddress.street);

    const timer = window.setTimeout(() => {
      setForm({
        label: existingAddress.label || "",
        buildingFloor: parsedStreet.buildingFloor,
        street: parsedStreet.street,
        areaLocality: existingAddress.city || "",
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [existingAddress]);

  const canSave = useMemo(() => {
    return (
      form.label.trim().length > 0 &&
      form.buildingFloor.trim().length > 0 &&
      form.street.trim().length > 0 &&
      form.areaLocality.trim().length > 0
    );
  }, [form]);

  const mapPreviewStyle = {
    backgroundImage:
      "linear-gradient(rgba(36,54,38,0.58), rgba(36,54,38,0.58)), url('/backgrounds/bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  function handleFieldChange(field) {
    return (event) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSave || !existingAddress) {
      return;
    }

    updateSavedAddress(existingAddress.id, {
      label: form.label.trim(),
      street: `${form.buildingFloor.trim()}, ${form.street.trim()}`,
      city: form.areaLocality.trim(),
      iconType: getIconType(form.label),
    });

    selectSavedAddress(existingAddress.id);
    router.push(returnTo);
  }

  async function getReadableAddress(latitude, longitude) {
    const fallback = {
      street: `Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`,
      city: "Live Location",
    };

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      );

      if (!response.ok) {
        return fallback;
      }

      const data = await response.json();
      const address = data.address || {};

      const lineOneParts = [
        address.house_number,
        address.road || address.pedestrian || address.neighbourhood,
      ].filter(Boolean);

      const cityParts = [
        address.suburb || address.village || address.town || address.city,
        address.state,
      ].filter(Boolean);

      return {
        street: lineOneParts.length > 0 ? lineOneParts.join(", ") : fallback.street,
        city: cityParts.length > 0 ? cityParts.join(", ") : fallback.city,
      };
    } catch {
      return fallback;
    }
  }

  function handleChooseLocation() {
    setIsChoosingOnMap(true);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = { lat: latitude, lng: longitude };
        setMapCenter(coords);
        setSelectedCoords(coords);
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      },
    );
  }

  async function handleConfirmLocation() {
    if (!selectedCoords) {
      return;
    }

    setIsSelectingLocation(true);
    const locationAddress = await getReadableAddress(
      selectedCoords.lat,
      selectedCoords.lng,
    );

    setForm((prev) => ({
      ...prev,
      buildingFloor:
        prev.buildingFloor.trim().length > 0
          ? prev.buildingFloor
          : "Current Location",
      street: locationAddress.street,
      areaLocality: locationAddress.city,
    }));

    setIsSelectingLocation(false);
    setIsChoosingOnMap(false);
  }

  if (!existingAddress) {
    return (
      <section className="pt-6 text-center font-(--font-nunito)">
        <p className="text-sm text-[#5C5957]">Address not found.</p>
      </section>
    );
  }

  return (
    <section className="bg-transparent font-(--font-nunito)">
      <form onSubmit={handleSubmit} className="space-y-4 pb-10 pt-1">
        <div className="space-y-1.5">
          <label htmlFor="save-as" className="text-sm font-semibold text-[#3D3A38]">
            Save address as
          </label>
          <input
            id="save-as"
            type="text"
            value={form.label}
            onChange={handleFieldChange("label")}
            placeholder="Example: Home, office or others..."
            className="h-11 w-full rounded-lg border border-transparent bg-[#ECECEC] px-3 text-sm text-[#373737] placeholder:text-[#B5B5B5] focus:border-[#C1683A] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="building-floor"
            className="text-sm font-semibold text-[#3D3A38]"
          >
            Building / Floor
          </label>
          <input
            id="building-floor"
            type="text"
            value={form.buildingFloor}
            onChange={handleFieldChange("buildingFloor")}
            placeholder="type building name"
            className="h-11 w-full rounded-lg border border-transparent bg-[#ECECEC] px-3 text-sm text-[#373737] placeholder:text-[#B5B5B5] focus:border-[#C1683A] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="street" className="text-sm font-semibold text-[#3D3A38]">
            Street
          </label>
          <input
            id="street"
            type="text"
            value={form.street}
            onChange={handleFieldChange("street")}
            placeholder="Street Details"
            className="h-11 w-full rounded-lg border border-transparent bg-[#ECECEC] px-3 text-sm text-[#373737] placeholder:text-[#B5B5B5] focus:border-[#C1683A] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="area-locality"
            className="text-sm font-semibold text-[#3D3A38]"
          >
            Area / Locality
          </label>
          <textarea
            id="area-locality"
            value={form.areaLocality}
            onChange={handleFieldChange("areaLocality")}
            placeholder="Type your address"
            rows={4}
            className="w-full resize-none rounded-lg border border-transparent bg-[#ECECEC] px-3 py-3 text-sm text-[#373737] placeholder:text-[#B5B5B5] focus:border-[#C1683A] focus:bg-white focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleChooseLocation}
          disabled={isSelectingLocation}
          style={mapPreviewStyle}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-bold text-white disabled:opacity-80"
        >
          <Navigation size={16} strokeWidth={2.4} />
          {isSelectingLocation ? "Selecting..." : "Choose Location"}
        </button>

        {isChoosingOnMap ? (
          <>
            <LocationPickerMap
              center={mapCenter}
              selectedCoords={selectedCoords}
              onPick={setSelectedCoords}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsChoosingOnMap(false)}
                className="h-10 flex-1 rounded-lg border border-[#D8D8D8] bg-white text-sm font-semibold text-[#3D3A38]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLocation}
                disabled={!selectedCoords || isSelectingLocation}
                className="h-10 flex-1 rounded-lg bg-[#C1683A] text-sm font-semibold text-white disabled:bg-[#E8A98A]"
              >
                Confirm Location
              </button>
            </div>
          </>
        ) : null}

        <button
          type="submit"
          disabled={!canSave}
          className={`h-12 w-full rounded-xl text-base font-semibold text-white transition ${
            canSave
              ? "bg-[#C1683A] active:scale-[0.99]"
              : "bg-[#E8A98A]"
          }`.trim()}
        >
          Update Address
        </button>
      </form>
    </section>
  );
}
