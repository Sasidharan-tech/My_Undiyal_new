"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Mail, Phone, User, Globe, Sparkles } from "lucide-react";
import MainLayout from "@/layout/MainLayout";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { useAuth } from "@/context/AuthContext";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(
    user?.avatar || "/categories/images/electronics.png",
  );
  const [form, setForm] = useState({
    name: user?.name || "Vijay",
    phone: user?.phone || "",
    email: user?.email || "vijayvignav@gmail.com",
    gender: user?.gender || "male",
    address: user?.address || "",
    city: user?.city || "",
    pincode: user?.pincode || "",
  });

  const isValid = useMemo(() => {
    const emailValid = /^\S+@\S+\.\S+$/.test(form.email.trim());
    const phoneValid = /^\d{10}$/.test(form.phone.trim());
    const nameValid = form.name.trim().length >= 2;
    const addressValid = form.address.trim().length >= 5;
    const cityValid = form.city.trim().length >= 2;
    const pincodeValid = /^\d{6}$/.test(form.pincode.trim());

    return (
      nameValid &&
      emailValid &&
      phoneValid &&
      addressValid &&
      cityValid &&
      pincodeValid
    );
  }, [form]);

  function handleChange(field) {
    return (event) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };
  }

  function handleAvatarPick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const nextSrc = URL.createObjectURL(file);
    setAvatarSrc(nextSrc);
  }

  function handleSave() {
    if (!isValid) {
      return;
    }

    updateUser({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      gender: form.gender,
      address: form.address.trim(),
      city: form.city.trim(),
      pincode: form.pincode.trim(),
      avatar: avatarSrc,
    });

    router.push("/profile");
  }

  function handleCurrentLocation() {
    setForm((current) => ({
      ...current,
      address: current.address || "23, Lake View Road, Anna Nagar West",
      city: current.city || "Chennai",
      pincode: current.pincode || "600040",
    }));
  }

  return (
    <MainLayout
      title="Profile Edit"
      backHref="/profile"
      contentClassName="px-4 pt-3 pb-[calc(120px+env(safe-area-inset-bottom))]"
    >
      <div className="flex flex-col items-center">
        <ProfileAvatar
          src={avatarSrc}
          onEditClick={handleAvatarPick}
          inputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
      </div>

      <section className="mt-4">
        <h2 className="text-lg font-semibold text-slate-800">Personal Info</h2>
        <div className="mt-3 space-y-4 rounded-xl bg-white p-4">
          <InputField
            label="Name"
            icon={User}
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Enter name"
            autoComplete="name"
          />
          <InputField
            label="Phone Number"
            icon={Phone}
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="Enter number"
            autoComplete="tel"
          />
          <InputField
            label="Email ID"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="Enter mail"
            autoComplete="email"
          />
          <SelectField
            label="Gender"
            value={form.gender}
            onChange={handleChange("gender")}
            options={[
              { label: "Select gender", value: "" },
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-semibold text-slate-800">Delivery Address</h2>
        <div className="mt-3 space-y-4 rounded-xl bg-white p-4">
          <InputField
            label="Address"
            icon={MapPin}
            as="textarea"
            value={form.address}
            onChange={handleChange("address")}
            placeholder="Enter address"
            rows={4}
          />

          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="City"
              icon={Globe}
              value={form.city}
              onChange={handleChange("city")}
              placeholder="City"
            />
            <InputField
              label="Pincode"
              icon={Sparkles}
              inputMode="numeric"
              value={form.pincode}
              onChange={handleChange("pincode")}
              placeholder="600 XXX"
            />
          </div>

          <button
            type="button"
            onClick={handleCurrentLocation}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#c97a48] px-4 text-sm font-semibold text-white"
          >
            <MapPin size={16} strokeWidth={2.2} />
            Use Current Location
          </button>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(74px+env(safe-area-inset-bottom))] z-40 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-120 gap-3">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-[#d9aa88] bg-white px-4 text-base font-semibold text-[#c97a48]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-[#c97a48] px-4 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
