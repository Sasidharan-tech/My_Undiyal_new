"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  CreditCard,
  FileText,
  Heart,
  Headset,
  MapPin,
  Package,
  Settings,
} from "lucide-react";
import MainLayout from "@/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import ProfileCard from "@/components/sections/profile/ProfileCard";
import ProfileListItem from "@/components/sections/profile/ProfileListItem";
import ProfileSection from "@/components/sections/profile/ProfileSection";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();

  const name = user?.name || "Vijay";
  const email = user?.email || "vijayvignav@gmail.com";

  return (
    <MainLayout title="Profile" backHref="/" contentClassName="px-3 pt-1 pb-28">
      <ProfileCard
        name={name}
        email={email}
        editHref="/profile-edit"
      />

      <ProfileSection title="My Activity">
        <ProfileListItem
          icon={Package}
          title="Orders"
          subtitle="Track and manage your purchases"
          iconClassName="bg-sky-50 text-sky-600"
          href="/orders"
        />
        <ProfileListItem
          icon={Heart}
          title="Wishlist"
          subtitle="Items you saved"
          iconClassName="bg-rose-50 text-rose-500"
          onClick={() => router.push("/wishlist")}
        />
        <ProfileListItem
          icon={CreditCard}
          title="Payments"
          subtitle="History and saved methods"
          iconClassName="bg-emerald-50 text-emerald-600"
          onClick={() => router.push("/payment-method")}
        />
      </ProfileSection>

      <ProfileSection title="Accounts">
        <ProfileListItem
          icon={MapPin}
          title="Saved addresses"
          subtitle="Home, work and more"
          iconClassName="bg-amber-50 text-amber-600"
          onClick={() => router.push("/addresses?returnTo=/profile")}
        />
        <ProfileListItem
          icon={Bell}
          title="Notifications"
          subtitle="Manage alerts and updates"
          badge="1"
          iconClassName="bg-indigo-50 text-indigo-600"
          onClick={() => router.push("/notifications")}
        />
        <ProfileListItem
          icon={Settings}
          title="Settings"
          subtitle="Privacy and saved methods"
          iconClassName="bg-slate-100 text-slate-600"
          onClick={() => router.push("/settings")}
        />
      </ProfileSection>

      <ProfileSection title="Support and Legal">
        <ProfileListItem
          icon={Headset}
          title="Help and Support"
          subtitle="Get quick help"
          iconClassName="bg-teal-50 text-teal-600"
          href="/help-support"
        />
        <ProfileListItem
          icon={FileText}
          title="Terms and Conditions"
          subtitle="Privacy policy and usage terms"
          iconClassName="bg-orange-50 text-orange-600"
          onClick={() => router.push("/profile")}
        />
      </ProfileSection>
    </MainLayout>
  );
}