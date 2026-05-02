"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

const FILTERS = ["All", "Orders", "Offers", "Delivery"];

const NOTIFICATIONS = [
  {
    id: "n1",
    type: "Orders",
    title: "Your order #2847 from Spice Garden is being prepared.",
    time: "5 mins ago",
  },
  {
    id: "n2",
    type: "Orders",
    title: "Your order #2847 from Spice Garden is being prepared.",
    time: "5 mins ago",
  },
  {
    id: "n3",
    type: "Offers",
    title: "Flat 15% off is now live on selected festival items.",
    time: "12 mins ago",
  },
  {
    id: "n4",
    type: "Delivery",
    title: "Your rider is on the way and will arrive soon.",
    time: "18 mins ago",
  },
];

export default function NotificationFeed() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "All") return NOTIFICATIONS;

    return NOTIFICATIONS.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <section className="min-h-[calc(100dvh-210px)] bg-linear-to-b from-[#FFF8F2] to-[#FFF5ED] px-3 pt-0 pb-8 font-(--font-nunito)">
        <div className="flex items-center gap-1.5 rounded-lg bg-[#FFF8F2] py-1">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`inline-flex h-5.5 items-center justify-center rounded-full px-2.5 text-[9px] leading-none font-semibold transition ${
                  active
                    ? "bg-[#CC7A4B] text-white"
                    : "border border-[#E1D7CF] bg-[#F4F4F4] text-[#888888]"
                }`.trim()}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-2.5 space-y-2">
          {filteredNotifications.map((item, index) => (
            <article
              key={item.id}
              className="notification-card-fade relative rounded-lg border border-[#F0E4DD] bg-white px-2.5 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#CC7A4B]" />

              <div className="flex items-start gap-2">
                <span className="inline-flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-md bg-[#FFF5EF] text-[#CC7A4B]">
                  <CalendarDays size={13} strokeWidth={2.1} />
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] leading-3.5 font-semibold text-[#2C2C2C]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[8px] leading-3 font-medium text-[#A3A3A3]">
                    {item.time}
                  </p>
                </div>
              </div>
            </article>
          ))}

          {filteredNotifications.length === 0 ? (
            <div className="rounded-lg border border-[#F0E4DD] bg-white px-3 py-4 text-center text-[11px] font-medium text-[#9A9A9A]">
              No notifications in {activeFilter.toLowerCase()}.
            </div>
          ) : null}
        </div>
      </section>
  );
}
