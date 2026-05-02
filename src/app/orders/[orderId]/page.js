import MainLayout from "@/layout/MainLayout";
import Image from "next/image";
import { ORDERS, normalizeOrderStatus } from "@/data/orders";
import { ArrowRight } from "lucide-react";

function formatDateTime(dateStr) {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleString();
  } catch (e) {
    return dateStr;
  }
}

export default function OrderDetailsPage({ params }) {
  const id = Number(params.orderId);
  const order = ORDERS.find((o) => Number(o.id) === id) || ORDERS[0];

  const status = normalizeOrderStatus(order.status);

  const timeline = [
    {
      id: "placed",
      title: "Order Placed",
      desc: "Your order has been placed successfully",
      time: "08 Apr 2026, 11:08 AM",
      done: true,
    },
    {
      id: "paid",
      title: "Payment Confirmed",
      desc: `Payment of ₹${order.price || 13000} received via UPI`,
      time: "08 Apr 2026, 11:20 AM",
      done: true,
    },
    {
      id: "out",
      title: "Out of Delivery",
      desc: "Courier has picked up the package",
      time: "07 Apr 2026, 11:20 AM",
      done: status === "delivered" || status === "ongoing",
    },
    {
      id: "delivered",
      title: "Delivered",
      desc: "",
      time: "08 Apr 2026, 11:08 AM",
      done: status === "delivered",
    },
  ];

  return (
    <MainLayout title="Order Details" backHref="/" contentClassName="px-3 pt-0 pb-32">
      <section className="px-4 pt-4">
        <div className="flex items-start gap-3">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[9px] bg-[#FAF2ED] p-3">
            <Image src={order.imageSrc} alt={order.title} width={80} height={80} className="object-contain" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-slate-900">{order.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex h-6 items-center justify-center rounded-[11px] bg-[#FAEEDA] px-2 text-xs font-medium text-[#854F0B]">Qty: {order.qty}</span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-700">Delivery on {order.date}</span>
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-900">₹{order.price || 13000}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[#f1dcd0] bg-[#fff7f3] p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0cbb7] text-white">
              <ArrowRight />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#c77a4b]">Estimated Delivery</div>
              <div className="mt-1 text-sm font-medium text-slate-900">Sunday, 15 Apr 2026</div>
            </div>
            <div className="ml-auto text-sm text-slate-500">Days Left <span className="block text-lg font-semibold">3</span></div>
          </div>
        </div>

        <h3 className="mt-6 text-sm font-semibold text-slate-900">Tracking Timeline</h3>

        <ol className="mt-4 space-y-6">
          {timeline.map((item, idx) => (
            <li key={item.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${item.done ? 'bg-[#cc7a4b] text-white' : 'bg-[#f7eae3] text-[#caa38a]'}`}>
                  {item.done ? '✓' : idx === 2 ? '🚚' : ''}
                </span>
                {idx < timeline.length - 1 && <span className="mt-2 h-full w-px bg-linear-to-b from-[#f3ddd2] to-transparent" style={{height:80}} />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-xs text-slate-600">{item.desc}</p>
                  </div>
                  <div className="text-xs text-slate-500">{item.time}</div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-xl border border-[#f3e1d6] bg-white p-4">
          <h4 className="text-sm font-semibold text-slate-900">Delivery Address</h4>
          <p className="mt-2 text-sm text-slate-700">{order.address}</p>
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-120 px-4">
        <div className="flex gap-3">
          <button className="flex-1 rounded-xl border border-[#f0cbb7] bg-white py-3 text-sm font-semibold text-[#c77a4b]">Need Help</button>
          <button className="flex-1 rounded-xl bg-[#c67c4e] py-3 text-sm font-semibold text-white">Rate us</button>
        </div>
      </div>
    </MainLayout>
  );
}
