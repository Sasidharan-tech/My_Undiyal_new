import Link from "next/link";
import CurrencyAmount from "@/components/ui/CurrencyAmount";
import { Wallet } from "lucide-react";

export default function PayDue({ amount = "999", dueDate = "13 Mar 2026" }) {
  return (
    <article className="mx-4 mt-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eec5b2] text-[#cc7a4b]"
          aria-hidden="true"
        >
          <Wallet size={22} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h4 className="text-base font-medium text-[#cc7a4b]">Payment Due</h4>
          <p className="mt-0.5 flex items-center gap-1 whitespace-nowrap text-[10px] font-normal text-[#cc7a4b]">
            <span className="text-base font-semibold text-[#cc7a4b]">
              <CurrencyAmount
                amount={Number(amount)}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            </span>
            <span>Due on {dueDate}</span>
          </p>
        </div>
      </div>

      <Link
        href="/payment"
        className="inline-flex h-10 min-w-25.75 shrink-0 items-center justify-center rounded-md bg-[#cc7a4b] px-4 text-base font-semibold text-white"
      >
        Pay now
      </Link>
    </article>
  );
}
