"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  const shouldShow = pathname === "/";

  if (!shouldShow) {
    return null;
  }

  return (
    <header className="sticky top-0 z-20 bg-white/95 px-3 py-3 backdrop-blur-sm sm:px-4">
      <div className="mx-auto flex w-full max-w-[var(--app-max-width)] items-center justify-between gap-3">
        <div aria-label="My Undiyal" className="w-[clamp(122px,40vw,170px)] shrink-0">
          <Image
            src="/logo/logo.png"
            alt="My Undiyal"
            width={190}
            height={52}
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        <Link
          href="/profile"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff2ea] text-[#cc7a4b] transition active:scale-95 sm:h-12 sm:w-12"
          aria-label="Open profile"
        >
          <CircleUserRound size={20} className="sm:hidden" />
          <CircleUserRound size={24} className="hidden sm:block" />
        </Link>
      </div>
    </header>
  );
}
