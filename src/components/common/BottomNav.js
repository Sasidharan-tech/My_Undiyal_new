"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "/icons/navbar_icons/home_icon.png", label: "Home", href: "/" },
  { icon: "/icons/navbar_icons/category_icon.png", label: "Category", href: "/categories" },
  { icon: "/icons/navbar_icons/wishlist_icon.png", label: "Wishlist", href: "/wishlist" },
  { icon: "/icons/navbar_icons/order_icon.png", label: "Order", href: "/orders" },
];

const schemeAction = {
  icon: "/icons/navbar_icons/scheme_icon.png",
  label: "Scheme",
  href: "/FestivalScheme",
};

export default function BottomNav() {
  const pathname = usePathname();
  const [pressedHref, setPressedHref] = useState(null);
  const normalizedPath =
    pathname && pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;

  const shouldHideBottomNav =
    normalizedPath === "/scheme" ||
    normalizedPath === "/payment" ||
    normalizedPath === "/order-summary" ||
    normalizedPath === "/cart" ||
    normalizedPath?.startsWith("/product/");

  if (shouldHideBottomNav) {
    return null;
  }

  const isActivePath = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const isSchemeActive = isActivePath(schemeAction.href);

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary mobile navigation"
    >
      <div className="pointer-events-auto relative mx-auto w-full max-w-[var(--app-max-width)] px-2 sm:px-3">
        <div className="relative flex h-16 items-end justify-between rounded-t-3xl border-t border-[#ece4db] bg-white px-2 pb-2.5 pt-3 shadow-[0_-8px_24px_rgba(26,22,18,0.12)] sm:h-18 sm:px-3 sm:pb-3 sm:pt-4">
          {navItems.map((item, index) => {
            const isActive = isActivePath(item.href);
            const isPressed = pressedHref === item.href;
            const showActive = isActive || isPressed;
            const isImageIcon = typeof item.icon === "string";
            const Icon = item.icon;

            return (
              <Fragment key={item.label}>
                <Link
                  href={item.href}
                  className="group flex flex-1 justify-center"
                  aria-current={isActive ? "page" : undefined}
                  onMouseDown={() => setPressedHref(item.href)}
                  onMouseUp={() => setPressedHref(null)}
                  onMouseLeave={() => setPressedHref(null)}
                  onTouchStart={() => setPressedHref(item.href)}
                  onTouchEnd={() => setPressedHref(null)}
                  onTouchCancel={() => setPressedHref(null)}
                >
                  <span
                    className={`inline-flex min-w-0 flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium leading-none transition-transform duration-200 group-active:scale-95 sm:min-w-14 sm:gap-1 sm:text-[0.82rem] ${
                      showActive ? "text-[#d17a3a]" : "text-[#8d8d8d]"
                    }`.trim()}
                  >
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 sm:h-9 sm:w-9 ${
                        showActive
                          ? "bg-[#CC7A4B] shadow-[0_4px_12px_rgba(204,122,75,0.35)]"
                          : "bg-transparent group-active:bg-[#CC7A4B]"
                      }`.trim()}
                    >
                      {isImageIcon ? (
                        <span
                          aria-hidden="true"
                          className="h-5 w-5 bg-current transition-colors duration-200 sm:h-5.5 sm:w-5.5"
                          style={{
                            WebkitMaskImage: `url(${item.icon})`,
                            maskImage: `url(${item.icon})`,
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                            maskPosition: "center",
                            WebkitMaskSize: "contain",
                            maskSize: "contain",
                            backgroundColor: showActive ? "white" : "#3A3A3A",
                          }}
                        />
                      ) : (
                        <Icon
                          size={22}
                          strokeWidth={2.2}
                          fill="none"
                          className={showActive ? "text-white" : "text-current group-active:text-white"}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="text-[#7F7F7F]">{item.label}</span>
                  </span>
                </Link>
                {index === 1 ? <span className="w-12 shrink-0 sm:w-22" aria-hidden="true" /> : null}
              </Fragment>
            );
          })}
        </div>

        <Link
          href={schemeAction.href}
          className="group absolute left-1/2 -top-3.5 z-50 -translate-x-1/2 sm:-top-4"
          aria-current={isSchemeActive ? "page" : undefined}
          aria-label={schemeAction.label}
        >
          <span
            className={`inline-flex h-18 w-18 items-center justify-center rounded-full border-4 p-1 transition-transform duration-200 group-hover:scale-[1.03] group-active:scale-95 sm:h-21.5 sm:w-21.5 sm:border-6 ${
              isSchemeActive
                ? "border-[#CC7A4B] bg-[#CC7A4B] shadow-[0_8px_18px_rgba(204,122,75,0.35)]"
                : "border-white bg-white group-active:border-[#CC7A4B] group-active:bg-[#CC7A4B] group-active:shadow-[0_8px_18px_rgba(204,122,75,0.35)]"
            }`.trim()}
          >
            <Image
              src={schemeAction.icon}
              alt={schemeAction.label}
              width={60}
              height={60}
              priority
              className="h-full w-full object-contain"
            />
          </span>
        </Link>
      </div>
    </nav>
  );
}
