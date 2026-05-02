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
    <header className="sticky top-0 z-20  bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div aria-label="My Undiyal" className="w-40.5">
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
          className="inline-flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-full bg-[#fff2ea] text-[#cc7a4b]"
          aria-label="Open profile"
        >
          <CircleUserRound size={24} />
        </Link>
      </div>
    </header>
  );
}
