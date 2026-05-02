"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Clock3, Sparkles } from "lucide-react";
import MainLayout from "@/layout/MainLayout";
import { paymentOptions } from "@/data/payment-options";
import { getProductById } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import CurrencyAmount from "@/components/ui/CurrencyAmount";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function parseDdMmYyyy(value) {
  if (typeof value !== "string") {
    return new Date();
  }

  const [dayPart, monthPart, yearPart] = value.split("/").map(Number);
  if (
    Number.isFinite(dayPart) &&
    Number.isFinite(monthPart) &&
    Number.isFinite(yearPart)
  ) {
    return new Date(yearPart, monthPart - 1, dayPart);
  }

  const fallback = new Date(value);
  return Number.isNaN(fallback.getTime()) ? new Date() : fallback;
}

function formatDdMmYyyy(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

function resolveInstallments(option, weeklyTotalDues, monthlyTotalDues) {
  if (option.installmentsSource === "monthly") {
    return monthlyTotalDues > 0 ? monthlyTotalDues : 12;
  }

  if (option.installmentsSource === "weekly") {
    return weeklyTotalDues > 0 ? weeklyTotalDues : 53;
  }

  return option.defaultInstallments || 53;
}

function getInstallmentAmount(total, option, installments) {
  const safeTotal = Number.isFinite(total) ? total : 0;
  const safeInstallments = installments > 0 ? installments : 1;

  if (option.cadence === "monthly") {
    return Math.max(0, Math.round(safeTotal / safeInstallments / 5) * 5);
  }

  return Math.max(0, Math.ceil(safeTotal / safeInstallments));
}

function buildDueRows({
  startDate,
  cadence,
  installments,
  weekday,
  amount,
  rowCount = 6,
}) {
  const start = parseDdMmYyyy(startDate);
  const weekdayIndex = WEEKDAYS.indexOf(weekday);
  const aligned = new Date(start);

  if (weekdayIndex >= 0 && cadence === "weekly") {
    const offset = (weekdayIndex - aligned.getDay() + 7) % 7;
    aligned.setDate(aligned.getDate() + offset);
  }

  const rows = [];
  const count = Math.min(Math.max(installments, 1), rowCount);

  for (let index = 0; index < count; index += 1) {
    const dueDate = new Date(aligned);
    if (cadence === "monthly") {
      dueDate.setMonth(aligned.getMonth() + index);
    } else {
      dueDate.setDate(aligned.getDate() + index * 7);
    }

    rows.push({
      id: index + 1,
      dueDate: formatDdMmYyyy(dueDate),
      dueAmount: amount,
    });
  }

  return rows;
}

export default function PaymentPage() {
  const router = useRouter();
  const { cart, paymentType, setPaymentType, finalTotal, scheme } = useShop();
  const item = cart[0];

  const [expandedOptionId, setExpandedOptionId] = useState(
    paymentType || paymentOptions[0]?.id || "weekly",
  );
  const [dueWeekday, setDueWeekday] = useState("Friday");
  const [weekdayPickerOpen, setWeekdayPickerOpen] = useState(false);

  const productData = useMemo(
    () => (item ? getProductById(item.id) : null),
    [item],
  );

  const displayItem = {
    ...productData,
    ...item,
  };

  if (!item) {
    return (
      <MainLayout title="Select Payment Type" backHref="/scheme">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Your cart is empty
          </h2>
          <Link
            href="/categories"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-5 text-sm font-semibold text-white"
          >
            Browse Products
          </Link>
        </section>
      </MainLayout>
    );
  }

  const checkoutTitle = displayItem.checkoutTitle || "Diwali Purchase";
  const checkoutSchemeName =
    scheme?.type || displayItem.checkoutSchemeName || "Diwali Scheme";
  const checkoutDeliveryDate =
    displayItem.checkoutDeliveryDate || "11 Jan 2027";
  const checkoutStartDate = displayItem.checkoutStartDate || "02/11/2026";
  const checkoutEndDate = displayItem.checkoutEndDate || "02/11/2026";

  const weeklyCompletedDues = Number.isFinite(displayItem.weeklyCompletedDues)
    ? displayItem.weeklyCompletedDues
    : 21;
  const monthlyCompletedDues = Number.isFinite(displayItem.monthlyCompletedDues)
    ? displayItem.monthlyCompletedDues
    : 5;
  const weeklyTotalDues = Number.isFinite(displayItem.weeklyTotalDues)
    ? displayItem.weeklyTotalDues
    : 53;
  const monthlyTotalDues = Number.isFinite(displayItem.monthlyTotalDues)
    ? displayItem.monthlyTotalDues
    : 12;

  const optionCards = useMemo(
    () =>
      paymentOptions.map((option) => {
        const installments = resolveInstallments(
          option,
          weeklyTotalDues,
          monthlyTotalDues,
        );

        return {
          ...option,
          installments,
          amount: getInstallmentAmount(finalTotal, option, installments),
        };
      }),
    [finalTotal, monthlyTotalDues, weeklyTotalDues],
  );

  const activeOption =
    optionCards.find((option) => option.id === expandedOptionId) ||
    optionCards[0];

  const dueRows = useMemo(
    () =>
      buildDueRows({
        startDate: checkoutStartDate,
        cadence: activeOption?.cadence || "weekly",
        installments: activeOption?.installments || weeklyTotalDues,
        weekday: dueWeekday,
        amount: activeOption?.amount || 0,
      }),
    [
      activeOption?.amount,
      activeOption?.cadence,
      activeOption?.installments,
      checkoutStartDate,
      dueWeekday,
      weeklyTotalDues,
    ],
  );

  const handleSelectPlan = (option) => {
    setPaymentType(option.id);
    router.push("/order-summary");
  };

  return (
    <MainLayout
      title="Select Payment Type"
      backHref="/scheme"
      className="relative max-w-103 bg-white"
      contentClassName="relative px-4 pb-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-43 bottom-0 bg-linear-to-b from-[rgba(255,248,242,0)] to-[#FFF5ED]" />

      <div className="relative z-10">
        <section>
          <h2 className="text-[18px] leading-6.75 font-medium text-black">
            {checkoutTitle}
          </h2>

          <article className="mt-2 flex gap-3">
            <div className="h-23 w-23 shrink-0 overflow-hidden rounded-[9px] bg-[#E8F0FB] p-2.5">
              <Image
                src={displayItem.image}
                alt={displayItem.name}
                width={120}
                height={150}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-[14px] leading-5.25 font-medium text-black">
                {displayItem.name}
              </h3>

              <div className="mt-2 flex items-center gap-2.5">
                <span className="inline-flex h-5.75 min-w-13.5 items-center justify-center rounded-[11.5px] border border-[#C6C6C6] bg-[rgba(0,0,0,0.12)] px-2 text-xs leading-4.5 font-medium text-black">
                  Qty: {displayItem.qty}
                </span>

                <span className="inline-flex h-5.75 min-w-42.25 items-center gap-1 rounded-[11.5px] bg-[#FAEEDA] px-2 text-xs leading-4.5 font-medium text-[#854F0B]">
                  <Image
                    src={scheme?.deliveryIcon || "/icons/cart/delivery_icon.png"}
                    alt=""
                    aria-hidden="true"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                  />
                  Delivery on {checkoutDeliveryDate}
                </span>
              </div>
            </div>
          </article>

          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2">
            <article className="rounded-2xl bg-[#FAEEDA] px-3 py-3">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex h-6.75 w-6.75 items-center justify-center rounded-md bg-[#854F0B] text-white">
                  <Sparkles size={15} />
                </span>
                <span className="text-[10px] leading-3.75 font-normal text-[#854F0B]">
                  {checkoutSchemeName}
                </span>
              </div>

              <p className="mt-2 text-[10px] leading-3.75 font-normal text-[#854F0B]">
                Duration
              </p>

              <div className="mt-1 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] leading-3.75 font-normal text-[#854F0B]">
                    Start Date:
                  </p>
                  <p className="text-xs leading-4.5 font-medium text-[#854F0B]">
                    {checkoutStartDate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] leading-3.75 font-normal text-[#854F0B]">
                    End Date:
                  </p>
                  <p className="text-xs leading-4.5 font-medium text-[#854F0B]">
                    {checkoutEndDate}
                  </p>
                </div>
              </div>
            </article>

            <div className="space-y-2">
              <article className="rounded-xl bg-[#E6F1FB] px-3 py-2">
                <p className="inline-flex items-center gap-1 text-[10px] leading-3.75 font-normal text-black">
                  <Clock3 size={12} /> Weekly Dues
                </p>
                <p className="mt-1 text-[18px] leading-6.75 font-medium text-black">
                  {weeklyCompletedDues}/{weeklyTotalDues}
                  <span className="ml-1 text-[10px] leading-3.75 font-normal">
                    Completed Dues
                  </span>
                </p>
              </article>

              <article className="rounded-xl bg-[#EAF3DE] px-3 py-2">
                <p className="inline-flex items-center gap-1 text-[10px] leading-3.75 font-normal text-black">
                  <Clock3 size={12} /> Monthly Dues
                </p>
                <p className="mt-1 text-[18px] leading-6.75 font-medium text-black">
                  {monthlyCompletedDues}/{monthlyTotalDues}
                  <span className="ml-1 text-[10px] leading-3.75 font-normal">
                    Completed Dues
                  </span>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h3 className="text-[18px] leading-6.75 font-medium text-[#1F2937]">
            Payment Options
          </h3>
          <p className="mt-1 text-sm leading-5.25 font-normal text-[#B17344]">
            Select any one your payment option Week / Month
          </p>

          <div className="-mx-4 mt-3 border-y border-[#E9E9E9] bg-white">
            {optionCards.map((option, index) => {
              const isExpanded = expandedOptionId === option.id;
              const unitLabel =
                option.perLabel === "months" ? "Months" : "Weeks";

              return (
                <article
                  key={option.id}
                  className={index > 0 ? "border-t border-[#E9E9E9]" : ""}
                >
                  <button
                    type="button"
                    className="relative w-full px-7 py-3 text-left"
                    onClick={() => {
                      setExpandedOptionId((currentId) =>
                        currentId === option.id ? null : option.id,
                      );

                      if (expandedOptionId !== option.id) {
                        setPaymentType(option.id);
                      }
                    }}
                  >
                    <span
                      className={`inline-flex h-6.25 min-w-20 items-center justify-center rounded-[12.5px] px-4 text-xs leading-4.5 font-normal ${option.badgeClass}`.trim()}
                    >
                      {option.badge}
                    </span>

                    <div className="mt-2 flex items-end gap-1 text-black">
                      <strong className="text-[20px] leading-7.5 font-medium">
                        <CurrencyAmount
                          amount={option.amount}
                          rupeeSize="0.62em"
                          rupeeClassName="relative -top-0.5"
                          minimumFractionDigits={0}
                          maximumFractionDigits={0}
                        />
                      </strong>
                      <span className="pb-0.5 text-[20px] leading-7.5 font-normal">
                        per {option.perLabel}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs leading-4.5 font-normal text-black">
                      For {option.installments} {unitLabel} Total{" "}
                      <CurrencyAmount
                        amount={finalTotal}
                        rupeeSize="0.62em"
                        rupeeClassName="relative -top-0.5"
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                      />
                    </p>

                    <span className="absolute right-7 top-1/2 -translate-y-1/2 text-black">
                      <ChevronDown
                        size={24}
                        className={`${isExpanded ? "rotate-180" : "rotate-0"} transition-transform duration-200 ${option.arrowClass}`.trim()}
                      />
                    </span>
                  </button>

                  {isExpanded ? (
                    <div className="border-t border-[#E9E9E9] px-5 py-4">
                      <p className="text-[14px] leading-5.25 font-normal text-[#B17344]">
                        Select Due Weekday
                      </p>

                      <button
                        type="button"
                        onClick={() => setWeekdayPickerOpen(true)}
                        className="mt-2 flex h-11 w-full items-center justify-between rounded-xl border border-[#D7C2AA] bg-white px-4 text-[16px] leading-6 font-normal text-[#1F1F1F]"
                      >
                        {dueWeekday}
                        <ChevronDown size={20} className="text-[#5A5A5A]" />
                      </button>

                      <div className="mt-3 overflow-hidden rounded-lg border border-[#E9E9E9]">
                        <div className="grid grid-cols-[52px_1fr_90px] bg-[#F8F8F8] px-3 py-2 text-sm leading-5.25 font-semibold text-[#1F2937]">
                          <span className="text-center">#</span>
                          <span className="text-center">Due Date</span>
                          <span className="text-right">Due</span>
                        </div>

                        <div className="max-h-46 overflow-y-auto bg-white">
                          {dueRows.map((row) => (
                            <div
                              key={`due-row-${option.id}-${row.id}`}
                              className="grid grid-cols-[52px_1fr_90px] border-t border-[#EFEFEF] px-3 py-2 text-sm leading-5.25 text-[#1F1F1F]"
                            >
                              <span className="text-center font-medium">
                                {row.id}
                              </span>
                              <span className="text-center">{row.dueDate}</span>
                              <span className="text-right font-medium">
                                <CurrencyAmount
                                  amount={row.dueAmount}
                                  rupeeSize="0.62em"
                                  rupeeClassName="relative -top-0.5"
                                  minimumFractionDigits={0}
                                  maximumFractionDigits={0}
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectPlan(option)}
                        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#CC7A4B] text-[16px] leading-6 font-medium text-white"
                      >
                        SELECT
                      </button>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {weekdayPickerOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
          onClick={() => setWeekdayPickerOpen(false)}
        >
          <div
            className="w-full max-w-90 overflow-hidden rounded-md border border-[#6E6E6E] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {WEEKDAYS.map((weekday) => {
              const selected = dueWeekday === weekday;

              return (
                <button
                  key={weekday}
                  type="button"
                  onClick={() => {
                    setDueWeekday(weekday);
                    setWeekdayPickerOpen(false);
                  }}
                  className="flex h-19 w-full items-center justify-between border-b border-[#D9D9D9] px-6 text-left last:border-b-0"
                >
                  <span className="text-[24px] leading-9 font-normal text-black">
                    {weekday}
                  </span>

                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 ${selected ? "border-[#7A7A7A]" : "border-[#8F8F8F]"}`.trim()}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-full ${selected ? "bg-[#87D31E]" : "bg-[#E5E5E5]"}`.trim()}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </MainLayout>
  );
}
