import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FlowHeader({
  title,
  backHref = "/",
  rightSlot = null,
  headerClassName = "mb-4",
  containerClassName = "",
  backButtonClassName = "",
  titleClassName = "",
  rightSlotClassName = "",
}) {
  return (
    <header
      className={`sticky top-0 z-30 bg-[#CC7A4B] ${headerClassName}`.trim()}
    >
      <div
        className={`mx-auto flex h-16 w-full max-w-120 items-center gap-3 px-4 ${containerClassName}`.trim()}
      >
        <Link
          href={backHref}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-95 ${backButtonClassName}`.trim()}
          aria-label="Go back"
        >
          <ArrowLeft size={22} strokeWidth={2.2} />
        </Link>
        <h1
          className={`flex-1 truncate text-lg font-semibold text-white ${titleClassName}`.trim()}
        >
          {title}
        </h1>
        <div
          className={`inline-flex h-10 w-10 items-center justify-center text-white ${rightSlotClassName}`.trim()}
        >
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
