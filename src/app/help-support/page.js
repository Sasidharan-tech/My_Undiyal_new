"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import AccordionItem from "@/components/sections/help-support/AccordionItem";

const ISSUE_LIST = [
  {
    id: "track-order",
    title: "I want to track my order",
    description:
      "You can track every order from the Order Summary page with live status updates.",
    primaryLabel: "Track Order",
    actionHref: "/order-summary",
  },
  {
    id: "manage-order",
    title: "I want to manage my order",
    description:
      "Need to update quantity, remove items, or review your order details? Open your order summary to manage it quickly.",
    primaryLabel: "Manage Order",
    actionHref: "/order-summary",
  },
  {
    id: "cashback",
    title: "I did not receive Instant Cashback",
    description:
      "Cashback can take a short while to reflect. If still missing, contact support with your order ID.",
    primaryLabel: "Contact Support",
    actionHref: "/profile",
  },
  {
    id: "wallet-payment",
    title: "I am unable to pay using wallet",
    description:
      "Please verify wallet balance and retry once. You can also choose another payment method instantly.",
    primaryLabel: "Try Payment",
    actionHref: "/payment",
  },
  {
    id: "returns-refunds",
    title: "I want help with returns & refunds",
    description:
      "Our support team can help with eligibility, pickup, and refund timelines for your products.",
    primaryLabel: "Contact Support",
    actionHref: "/profile",
  },
];

export default function HelpSupportPage() {
  const router = useRouter();
  const [openId, setOpenId] = useState(ISSUE_LIST[0].id);

  return (
    <MainLayout
      title="Help & Support"
      backHref="/profile"
      contentClassName="px-4 pt-4 pb-28"
    >
      <section className="space-y-3">
        <div className="mb-2">
          <h2 className="text-4xl leading-tight font-semibold text-[#c97a48]">
            What issues
            <br />
            are you facing?
          </h2>
          <p className="mt-2 text-sm leading-5 text-gray-500">
            Please get in touch and we will be happy to help you. Get quick
            customer support by selecting your item.
          </p>
        </div>

        <div className="space-y-3">
          {ISSUE_LIST.map((issue) => {
            const isOpen = openId === issue.id;

            return (
              <AccordionItem
                key={issue.id}
                title={issue.title}
                isOpen={isOpen}
                onToggle={() => setOpenId(isOpen ? "" : issue.id)}
              >
                <p>{issue.description}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => router.push(issue.actionHref)}
                    className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#c97a48] px-3 py-2 text-xs font-semibold text-white"
                  >
                    {issue.primaryLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/profile")}
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#e0c4b1] bg-white px-3 py-2 text-xs font-semibold text-[#c97a48]"
                  >
                    Back to Profile
                  </button>
                </div>
              </AccordionItem>
            );
          })}
        </div>
      </section>
    </MainLayout>
  );
}
