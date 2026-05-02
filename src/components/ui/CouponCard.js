import Image from "next/image";

export default function CouponCard({
  coupon,
  onApply,
  isApplied = false,
  children,
}) {
  const frameImageSrc = isApplied
    ? "/Coupon/ApplieCoupon.png"
    : "/Coupon/ActiveCoupon.png";
  const logoClass = isApplied ? "grayscale opacity-70" : "";
  const applyLabelClass = isApplied ? "text-[#D5D5D5]" : "text-[#B76128]";
  const titleClass = isApplied ? "text-[#D5D5D5]" : "text-[#B76128]";
  const subtitleClass = isApplied ? "text-[#D5D5D5]" : "text-[#B76128]";
  const offerClass = isApplied ? "text-[#D5D5D5]" : "text-[#5C9757]";
  const logoSizeClass = isApplied ? "w-34 max-w-[62%]" : "w-38 max-w-[68%]";

  const applyCoupon = () => {
    if (!isApplied) {
      onApply?.(coupon);
    }
  };

  const customContent =
    typeof children === "function"
      ? children({
          coupon,
          isApplied,
          applyCoupon,
          classes: {
            logoClass,
            applyLabelClass,
            titleClass,
            subtitleClass,
            offerClass,
          },
        })
      : children;
  const hasCustomContent =
    customContent !== undefined && customContent !== null;

  return (
    <article className="relative mx-auto w-full max-w-92.25 overflow-hidden rounded-[10px] aspect-369/166">
      <Image
        src={frameImageSrc}
        alt="Coupon frame"
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 369px"
        priority={false}
      />

      <span className="pointer-events-none absolute left-5.5 top-1/2 z-10 inline-block -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-3xl font-semibold text-white">
        {coupon.label}
      </span>

      <div className="absolute inset-y-0 left-14 right-0 min-w-0 px-3 py-2">
        {hasCustomContent ? (
          customContent
        ) : (
          <div className="relative h-full">
            <div className="flex items-start gap-2">
              <Image
                src="/logo/logo.png"
                alt="My Undiyal"
                width={178}
                height={51}
                className={`h-auto ${logoSizeClass} shrink-0 ${logoClass}`.trim()}
                priority={false}
              />

             <button
                type="button"
                onClick={applyCoupon}
                disabled={isApplied}
                className={`ml-auto shrink-0 whitespace-nowrap pt-4 !text-xl mr-2  !font-semibold ${applyLabelClass}`}
              >
                {isApplied ? "APPLIED" : "APPLY"}
              </button>
            </div>

            <div className="mt-1.5 ml-7 pl-2.5 ">
              <h4
               className={`text-xl align-middle font-semibold ${titleClass}`}
              >
                {coupon.title}{" "}
                <Image
                  src="/icons/common/celebration_icon.png"
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={16}
                  className={`inline-block align-[-2px] ${
                    isApplied ? "grayscale opacity-70" : ""
                  }`.trim()}
                />
              </h4>
              <p
                className={`text-[12px] font-semibold pb-0 leading-4 ${subtitleClass}`.trim()}
              >
                {coupon.description}
              </p>
            </div>

      <div
         className="mt-4 h-[2px] w-full"
          style={{
            background:
              "repeating-linear-gradient(to right, #918c8c 0 7px, transparent 10px 22px)",
          }}
      />

            <p
              className={`pt-2 text-center text-lg font-semibold leading-6.75 ${offerClass}`.trim()}
            >
              up to {coupon.discountAmount} discount on orders
            </p>
          </div>
        )}
      </div>
    </article>
  );
}





