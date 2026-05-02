import { Award, Sparkles } from "lucide-react";
import CurrencyAmount from "@/components/ui/CurrencyAmount";

const collections = [
  {
    title: "Under",
    amount: "999",
    subtitle: "Daily-use picks",
    icon: Sparkles,
    theme: "budget-tile-warm",
  },
  {
    title: "Premium Picks",
    subtitle: "Top rated products",
    icon: Award,
    theme: "budget-tile-soft",
  },
];

export default function BudgetCollections() {
  return (
    <section className="mt-3 px-4" aria-label="Budget collections">
      <div className="grid grid-cols-2 gap-2">
        {collections.map((item) => (
          <div key={item.title}>
            <article
              className={`rounded-2xl border p-3 shadow-sm ${item.theme === "budget-tile-warm" ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white"}`}
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-orange-600"
                aria-hidden="true"
              >
                <item.icon size={16} />
              </span>
              <h4 className="mt-2 text-sm font-semibold text-slate-900">
                {item.title}
                {item.amount ? (
                  <CurrencyAmount
                    amount={Number(item.amount)}
                    minimumFractionDigits={0}
                    maximumFractionDigits={0}
                    className="ml-1"
                  />
                ) : null}
              </h4>
              <p className="mt-1 text-xs text-slate-600">{item.subtitle}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
