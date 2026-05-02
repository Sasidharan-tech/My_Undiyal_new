import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProfileListItem({
  icon: Icon,
  title,
  subtitle,
  badge = null,
  iconClassName = "bg-slate-100 text-slate-600",
  href,
  onClick,
}) {
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`.trim()}
        >
          <Icon size={18} strokeWidth={2.2} />
        </span>

        <div className="min-w-0">
          <p className="truncate text-[15px] font-normal text-slate-800">{title}</p>
          <p className="truncate text-xs font-normal text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {badge ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
            {badge}
          </span>
        ) : null}
        <ChevronRight size={18} className="shrink-0 text-slate-400" />
      </div>
    </>
  );

  const sharedClassName =
    "flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition active:scale-[0.99]";

  if (href) {
    return (
      <Link href={href} className={sharedClassName} aria-label={title}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={sharedClassName}
    >
      {content}
    </button>
  );
}