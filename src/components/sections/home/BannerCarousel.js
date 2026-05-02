"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    image: "/banners/festival-banner.png",
    link: "/FestivalScheme",
  },
  {
    id: 2,
    image: "/banners/festival-banner.png",
    link: "/FestivalScheme",
  },
  {
    id: 3,
    image: "/banners/festival-banner.png",
    link: "/FestivalScheme",
  },
];

export default function BannerCarousel() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;

    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const nextIndex = (activeIndex + 1) % banners.length;
      container.scrollTo({
        left: nextIndex * container.offsetWidth,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="mt-1 px-5.5">
      {/* Banners */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory"
      >
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.link}
            className="relative min-w-full aspect-[16/7] shrink-0 overflow-hidden rounded-3xl bg-[#fef4ea] snap-center"
          >
            <Image src={banner.image} alt="Banner" fill className="object-contain" />
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-2">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-6 bg-[#b76128]" : "w-2 bg-[#d9d9d9]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
