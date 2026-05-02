"use client";

import NotificationFeed from "@/components/sections/notifications/NotificationFeed";
import MainLayout from "@/layout/MainLayout";

export default function NotificationsPage() {
  return (
    <MainLayout
      title="Notification"
      backHref="/profile"
      contentClassName="px-0 pt-0 pb-28"
      headerProps={{
        headerClassName: "bg-[#C1683A]",
      }}
    >
      <NotificationFeed />
    </MainLayout>
  );
}
