"use client";

import MainLayout from "@/layout/MainLayout";
import SettingsList from "@/components/sections/settings/SettingsList";

export default function SettingsPage() {
  return (
    <MainLayout title="Settings" backHref="/profile" contentClassName="px-3 pt-0 pb-28">
      <SettingsList />
    </MainLayout>
  );
}
