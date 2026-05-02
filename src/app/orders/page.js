"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import MainLayout from "@/layout/MainLayout";
import OrderCard from "@/components/sections/order/OrderCard";
import { ORDERS, normalizeOrderStatus } from "@/data/orders";

const TABS = [
  { key: "all", label: "All" },
  { key: "ongoing", label: "Ongoing" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Canceling" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") {
      return ORDERS;
    }

    return ORDERS.filter(
      (order) => normalizeOrderStatus(order.status) === activeTab,
    );
  }, [activeTab]);

  return (
    <MainLayout
      title="My Orders"
      backHref="/profile"
      className="bg-[#f6f6f6]"
      contentClassName="px-4 pt-3 pb-28"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#FFF2EA] px-4 py-3">
            <Search size={18} className="shrink-0 text-orange-400" />
            <input
              type="search"
              placeholder="Search your order here"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-orange-200"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF2EA] text-orange-500"
            aria-label="Filter orders"
          >
            <Filter size={18} />
          </button>
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-transparent text-gray-500"
                }`.trim()}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                title={order.title}
                status={order.status}
                date={order.date}
                qty={order.qty}
                imageSrc={order.imageSrc}
                trackHref="/order-summary"
              />
            ))
          ) : (
            <p className="rounded-lg bg-white/70 px-3 py-4 text-center text-sm text-slate-500">
              No orders found in this section.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}