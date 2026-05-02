import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Truck } from "lucide-react";

const statusStyles = {
  ongoing: "bg-orange-100 text-orange-600",
  delivered: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};

const statusLabels = {
  ongoing: "ONGOING",
  delivered: "DELIVERED",
  cancelled: "CANCELLED",
};

function normalizeOrderStatus(status) {
  const value = String(status || "").trim().toLowerCase();

  if (
    value.includes("cancel") ||
    value.includes("cancell") ||
    value.includes("cancl")
  ) {
    return "cancelled";
  }

  if (
    value.includes("deliver") ||
    value.includes("delive") ||
    value.includes("deliv") ||
    value.includes("delin")
  ) {
    return "delivered";
  }

  if (
    value.includes("ongo") ||
    value.includes("ongi") ||
    value.includes("on go")
  ) {
    return "ongoing";
  }

  return "ongoing";
}

export default function OrderCard({
  title,
  status,
  date,
  imageSrc,
  qty = 1,
  trackHref = "/order-summary",
}) {
  const normalizedStatus = normalizeOrderStatus(status);

  return (
    <article
      className="mx-auto h-30.75 w-full max-w-93.25 rounded-xl transition"
    >
      <div className="flex h-full gap-3">
        <div className="flex h-30.75 w-30.75 shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-[#FAF2ED]">
          <Image
            src={imageSrc}
            alt={title}
            width={123}
            height={123}
            className="h-full w-full object-contain p-3"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex justify-end">
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${statusStyles[normalizedStatus]}`.trim()}
            >
              {statusLabels[normalizedStatus]}
            </span>
          </div>

          <h3 className="min-w-0 truncate text-sm font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-slate-700">Qty: {qty}</p>

          <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
            <Truck size={12} className="shrink-0" />
            <span className="truncate">Delivery on {date}</span>
          </p>

          <div className="mt-2 flex justify-end">
            <Link
              href={trackHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-orange-600"
            >
              Track <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}