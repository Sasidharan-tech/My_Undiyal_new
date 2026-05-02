import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { px } from "framer-motion";

export default function DeliveryArrived({ order }) {
  if (!order) {
    return null;
  }

  const arrivedOn = order.date || "";
  const itemName = order.title || "";
  const address = order.address || "";
  const href = order.trackHref && order.trackHref !== "/order-summary" ? order.trackHref : `/orders/${order.id}`;

  return (
    <article className="mx-4 mt-4 overflow-hidden rounded-md bg-linear-to-r from-[#fc8000] to-[#c16404] text-white">
      <div className="flex items-start justify-between gap-3 px-3 py-2.5">
        <div className="min-w-0 pr-1">
          <h4 className="text-base font-normal text-white">
            Delivery on {arrivedOn}
          </h4>
          <p className="line-clamp-1 text-xs text-white">{itemName}</p>
          <p className="line-clamp-1 text-[10px] text-white/95">
            Address : {address}
          </p>
        </div>
        <span
          className="inline-flex h-14.75 w-18 shrink-0 items-center justify-center text-white"
          aria-hidden="true"
        >
            <Image
          src="/icons/common/box.png"
          alt=""
          width={72}
          height={59}
          className="w-18 h-14.75 object-contain"
          aria-hidden="true"
        />
        </span>
      </div>

      <Link
        href={href}
        className="flex h-6.25 items-center justify-end gap-1 bg-[#e17200] px-4 text-xs font-normal text-white"
      >
        View Details <ArrowRight size={18} />
      </Link>
    </article>
  );
}
