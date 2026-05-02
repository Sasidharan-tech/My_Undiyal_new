import Link from "next/link";
import Image from "next/image";
import CurrencyAmount from "@/components/ui/CurrencyAmount";

export default function ProductCard({ product, imageLoading = "lazy" }) {
  const title = product.title || product.name || product.shortName || "Product";
  const description = product.description || "";

  return (
    <Link
      href={`/product/${product.id}`}
      className="block h-full overflow-hidden rounded-[14px] bg-white"
      aria-label={title}
    >
      <div className="overflow-hidden px-2 pt-3">
        <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
          <Image
            src={product.image}
            alt={title}
            fill
            sizes="(max-width: 412px) 45vw, 220px"
            className="object-contain"
            loading={imageLoading}
          />
        </div>
      </div>
      <div className="space-y-1 px-3 pb-3 pt-2">
        <h4 className="line-clamp-1 text-sm font-medium leading-5.25 text-black">
          {title}
        </h4>
        <p className="line-clamp-1 min-h-4 text-[11px] font-normal leading-4 text-[#929292]">
          {description}
        </p>
        <div className="flex items-end gap-2">
          <span className="text-sm font-medium leading-5.25 text-black">
            <CurrencyAmount
              amount={Number(product.price || 0)}
              minimumFractionDigits={0}
              maximumFractionDigits={0}
            />
          </span>
          <span className="text-xs font-normal leading-4.5 text-[#999999] line-through">
            <CurrencyAmount
              amount={Number(product.oldPrice || 0)}
              className="price-old-value"
              minimumFractionDigits={0}
              maximumFractionDigits={0}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
