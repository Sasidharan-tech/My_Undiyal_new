"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, Heart, Share2, ShieldCheck, ShoppingBag } from "lucide-react";
import CurrencyAmount from "@/components/ui/CurrencyAmount";
import { getProductById, products } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import MainLayout from "@/layout/MainLayout";
import ImageModal from "@/components/ui/ImageModal";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, setPaymentType, setScheme } = useShop();
  const product = getProductById(params.id);
  const carouselRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState("immediate");
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerSrc, setViewerSrc] = useState(null);

  const productSlides = useMemo(() => {
    if (!product) {
      return [];
    }

    return [
      {
        id: "hero",
        title: product.name,
        subtitle: product.schemePreview,
        badge: product.shortName,
        background: "bg-[#F3F4F6]",
        ring: "from-slate-900/5 to-transparent",
        imageClass: "object-contain",
      },
      {
        id: "offer",
        title: product.discountLabel || "Special Offer",
        subtitle: product.deliveryText,
        badge: product.categoryId,
        background: "bg-[#fff4ea]",
        ring: "from-[#cc7a4b]/10 to-transparent",
        imageClass: "object-contain scale-105",
      },
      {
        id: "value",
        title: `₹${product.price.toLocaleString("en-IN")}`,
        subtitle: product.warrantyText,
        badge: product.newArrival === "yes" ? "New Arrival" : "Popular Pick",
        background: "bg-white",
        ring: "from-slate-900/5 to-transparent",
        imageClass: "object-contain scale-110",
      },
    ];
  }, [product]);

  useEffect(() => {
    if (productSlides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      const container = carouselRef.current;
      if (!container) {
        return;
      }

      const nextIndex = (activeSlide + 1) % productSlides.length;
      container.scrollTo({
        left: nextIndex * container.offsetWidth,
        behavior: "smooth",
      });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [activeSlide, productSlides.length]);

  function handleCarouselScroll() {
    const container = carouselRef.current;

    if (!container) {
      return;
    }

    const nextIndex = Math.round(container.scrollLeft / container.offsetWidth);

    if (nextIndex !== activeSlide) {
      setActiveSlide(nextIndex);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const wishlistKey = `myundiyal-wishlist-${params.id}`;
    const rafId = window.requestAnimationFrame(() => {
      setIsWishlisted(window.localStorage.getItem(wishlistKey) === "true");
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [params.id]);

  const colorVariants = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((item) => item.categoryId === product.categoryId)
      .slice(0, 4)
      .map((item, index) => ({
        id: item.id,
        colorName: index === 0 ? "Blue" : index === 1 ? "Maroon" : "Grey",
        title: item.name,
        price: item.price,
        image: item.image,
      }));
  }, [product]);

  const activeVariantId = selectedVariantId ?? colorVariants[0]?.id;
  const weeklyAmount = Math.ceil(product ? product.price / 53 / 10 : 0) * 10;
  const mrp =
    Math.ceil((product?.oldPrice || product?.price || 0) / 1000) * 1000;
  const discountText = product?.discountLabel;
  const productHighlights = product?.highlights?.slice(0, 4) || [];

  const descriptionParagraphs = useMemo(() => {
    const text = (product?.detailDescription || "").trim();

    if (!text) {
      return [];
    }

    const sentences = text
      .split(/\.\s+/)
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => (part.endsWith(".") ? part : `${part}.`));

    if (sentences.length <= 2) {
      return [text];
    }

    const midpoint = Math.ceil(sentences.length / 2);
    return [
      sentences.slice(0, midpoint).join(" "),
      sentences.slice(midpoint).join(" "),
    ];
  }, [product?.detailDescription]);

  const canCollapseDescription =
    (product?.detailDescription || "").length > 140;

  const optionCards = [
    {
      id: "immediate",
      title: product?.immediateOptionTitle,
      amount: product?.price,
      suffix: "",
      delivery: product?.immediateDeliveryText,
      icon: "/icons/common/Shopping_Bag.svg",
      iconAlt: "Immediate Purchase",
    },
    {
      id: "pongal",
      title: product?.pongalOptionTitle,
      amount: weeklyAmount,
      suffix: product?.pongalSuffixText,
      delivery: product?.pongalDeliveryText,
      icon: "/icons/common/pongal.png",
      iconAlt: "Pongal Purchase",
    },
  ];

  const wholeAmountProps = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  function handleWishlistToggle() {
    if (!product || typeof window === "undefined") {
      return;
    }

    const nextWishlisted = !isWishlisted;
    const wishlistKey = `myundiyal-wishlist-${product.id}`;
    window.localStorage.setItem(wishlistKey, String(nextWishlisted));
    setIsWishlisted(nextWishlisted);
  }

  function openViewer(src) {
    setViewerSrc(src);
    setViewerOpen(true);
  }

  function closeViewer() {
    setViewerOpen(false);
    setViewerSrc(null);
  }

  async function handleShareProduct() {
    if (!product || typeof window === "undefined") {
      return;
    }

    const shareData = {
      title: product.name,
      text: `${product.name} - ${product.schemePreview}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setActionStatus("Product shared");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setActionStatus("Link copied");
        return;
      }

      const tempInput = document.createElement("input");
      tempInput.value = shareData.url;
      document.body.appendChild(tempInput);
      tempInput.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(tempInput);

      if (copied) {
        setActionStatus("Link copied");
        return;
      }

      setActionStatus("Sharing is not supported on this device");
    } catch {
      setActionStatus("Share cancelled");
    }
  }

  if (!product) {
    return (
      <MainLayout
        title="Product"
        backHref="/categories"
        className="max-w-120 bg-[#fffdf9]"
        contentClassName="px-4 pb-6"
      >
        <div>
          <section className="rounded-2xl bg-white p-5 text-center shadow-[0_6px_20px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-medium text-slate-900">
              Product not found
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This product is not available right now.
            </p>
            <Link
              href="/categories"
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#cc7a4b] px-5 text-sm font-semibold text-white active:scale-95"
            >
              Back to Categories
            </Link>
          </section>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Product"
      backHref="/categories"
      className="relative max-w-120 overflow-x-hidden bg-[#fffdf9] pb-[calc(122px+env(safe-area-inset-bottom))]"
      contentClassName="px-4 pb-6"
    >
      <div>
        <section className="rounded-2xl bg-[#F3F4F6] p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)]">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {productSlides.map((slide) => (
              <div
                key={slide.id}
                className={`relative min-w-full overflow-hidden rounded-3xl snap-center`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openViewer(product.image)}
                  onKeyDown={(e) => e.key === "Enter" && openViewer(product.image)}
                  className="relative w-full h-44 sm:h-56 md:h-64 flex items-center justify-center cursor-zoom-in"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 412px) 68vw, 280px"
                      className={slide.imageClass}
                    />
                  </div>
                </div>

                {/* overlays removed - image-only hero */}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {productSlides.map((_, index) => (
              <span
                key={`slide-dot-${index}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-6 bg-[#b76128]" : "w-2 bg-[#d9d9d9]"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="mt-5 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="product-title-two-line flex-1 text-lg font-medium leading-snug text-slate-900">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 pt-0.5">
<button
  type="button"
  aria-label={
    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
  }
  onClick={handleWishlistToggle}
  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-red-100 bg-red-50 text-[#ff0e0e] overflow-hidden"
>
  <span
    className={`transition-all duration-300 
    ${isWishlisted ? "scale-125 animate-[pulse_0.4s]" : "scale-100"}`}
  >
    <Heart
      size={22}
      fill={isWishlisted ? "currentColor" : "none"}
      className={`transition-all duration-300 ${
        isWishlisted ? "stroke-[1.5]" : "stroke-2"
      }`}
    />
  </span>
</button>
              <button
                type="button"
                aria-label="Share product"
                onClick={handleShareProduct}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition active:scale-95"
              >
                <Share2 size={21} />
              </button>
            </div>
          </div>

          <div className="mt-2 mb-3 flex items-center gap-2">
            <ShieldCheck size={18} className="shrink-0 text-[#cc7a4b]" />
            <span className="text-sm text-slate-500">Product Warranty:</span>
            <strong className="text-base font-medium text-slate-900">
              {product.warrantyText}
            </strong>
          </div>

          {actionStatus ? (
            <p className="text-xs text-emerald-700" aria-live="polite">
              {actionStatus}
            </p>
          ) : null}
        </section>

        <section className="mt-5">
          <h3 className="text-base font-medium text-slate-900">Other Option</h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {optionCards.map((option) => {
              const isSelected = selectedOption === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className={`min-h-40 rounded-[10px] border-0 p-3 text-left transition duration-200 active:scale-[0.98] ${
                    isSelected ? "bg-[#E8E8E8]" : "bg-[rgba(246,246,246,0.4)]"
                  }`.trim()}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg">
                    <Image
                      src={option.icon}
                      alt={option.iconAlt || option.title}
                      width={48}
                      height={48}
                      className="h-11 w-11 object-contain"
                    />
                  </div>

                  <h4 className="mt-2 text-xs font-medium tracking-[0.01em] text-slate-900">
                    {option.title}
                  </h4>

                  <p className="mt-1 flex flex-wrap items-end gap-1 text-slate-900">
                    <span className="text-[20px] leading-8 font-medium">
                      <CurrencyAmount
                        amount={option.amount}
                        {...wholeAmountProps}
                      />
                    </span>
                    {option.suffix ? (
                      <span className="pb-1 text-xs font-medium text-slate-700">
                        {option.suffix}
                      </span>
                    ) : null}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {option.delivery}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 space-y-2">
          <h3 className="text-base font-medium text-slate-900">Price</h3>

          {selectedOption === "immediate" ? (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <strong className="text-3xl font-medium leading-tight text-slate-900">
                <CurrencyAmount amount={product.price} {...wholeAmountProps} />
              </strong>

              <span className="discount-ribbon-badge">{discountText}</span>

              <p className="pb-1 text-sm font-medium text-gray-400">
                M.R.P :{" "}
                <CurrencyAmount
                  amount={mrp}
                  className="price-old-value"
                  minimumFractionDigits={0}
                  maximumFractionDigits={0}
                />
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-end gap-2">
              <strong className="text-3xl font-medium leading-tight text-slate-900">
                <CurrencyAmount amount={weeklyAmount} {...wholeAmountProps} />
              </strong>
              <span className="pb-1 text-sm font-medium text-slate-700">
                x 53 Weeks
              </span>
            </div>
          )}
        </section>

        <section className="mt-6">
          <h3 className="text-base font-normal leading-6 text-black">
            Select Color
          </h3>

          <div className="no-scrollbar mt-1.5 flex max-w-71.75 gap-2.5 overflow-x-auto pb-1">
            {colorVariants.map((variant) => {
              const isActive = activeVariantId === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`min-h-28 w-22.25 shrink-0 rounded-[7px] border px-1.25 pt-2 pb-1 text-left transition active:scale-[0.98] ${
                    isActive
                      ? "border-[#C6C6C6]"
                      : "border-[rgba(198,198,198,0.5)]"
                  }`.trim()}
                >
                  <Image
                    src={variant.image}
                    alt={variant.colorName}
                    width={60}
                    height={60}
                    className="mx-auto h-13 w-15 "
                  />
                  <p className="mt-0.5 h-3 truncate text-[8px] leading-3 font-normal text-black">
                    {variant.title}
                  </p>
                  <p className="select-color-price mt-px text-[12px] font-medium leading-4.5 text-black">
                    <CurrencyAmount
                      amount={variant.price}
                      {...wholeAmountProps}
                    />
                  </p>
                  <span className="mt-px block text-[8px] font-normal leading-3 text-[#00AE1A]">
                    In Stock
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-2xl  p-4 ">
          <h3 className="text-base font-medium text-slate-900">
            Product Description
          </h3>

          <div className="mt-3 space-y-3 px-0.5">
            {(isDescriptionExpanded
              ? descriptionParagraphs
              : descriptionParagraphs.slice(0, 1)
            ).map((paragraph, index) => (
              <p
                key={`description-${index}`}
                className="text-sm leading-relaxed text-slate-700"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {canCollapseDescription ? (
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              className="mt-3 inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-[#b75f2d] active:scale-95"
            >
              {isDescriptionExpanded ? "Show less" : "Read more"}
            </button>
          ) : null}
        </section>

        <section className="mt-6 pb-8">
          <h4 className="text-base font-medium text-slate-900">
            Product Highlights
          </h4>

          <ul className="mt-3 space-y-2">
            {productHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 text-sm text-slate-800"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fff1e7] text-[#cc7a4b]">
                  <Check size={12} strokeWidth={2.8} />
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {viewerOpen && (
        <ImageModal src={viewerSrc} alt={product?.name || "Product image"} onClose={closeViewer} />
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 pt-2 pb-[calc(env(safe-area-inset-bottom)+8px)] shadow-[0_-8px_22px_rgba(15,23,42,0.08)]">
        <div className="mx-auto w-full max-w-120">
          <button
            type="button"
            className="mx-4 mb-3 inline-flex min-h-14 w-[calc(100%-32px)] items-center justify-center gap-2 rounded-xl bg-[#CC7A4B] text-lg font-medium text-white transition-transform duration-150 active:scale-95"
            onClick={() => {
              setPaymentType("weekly");
              setScheme(null);
              addToCart(product);
              router.push("/scheme");
            }}
          >
                <Image
                    src="/icons/common/BuyNow_icon.png"
                    alt=""
                    width={72}
                    height={59}
                    className="w-[16px] h-[20px] mb-1 object-contain"
                    aria-hidden="true"
                                      />
            BUY NOW
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
