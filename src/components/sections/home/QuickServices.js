import { RefreshCw, ShieldCheck, Truck } from "lucide-react";

const services = [
  { icon: Truck, title: "Fast Delivery", subtitle: "Same day in city" },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    subtitle: "100% protected",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    subtitle: "Simple 7-day policy",
  },
];

export default function QuickServices() {
  return (
    <section className="mt-3 px-4" aria-label="Service highlights">
      <div className="no-scrollbar flex gap-2 overflow-x-auto" role="list">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex min-w-44 items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            role="listitem"
          >
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600"
              aria-hidden="true"
            >
              <service.icon size={15} />
            </span>
            <div>
              <h4 className="text-xs font-semibold text-slate-900">
                {service.title}
              </h4>
              <p className="text-[11px] text-slate-500">{service.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
