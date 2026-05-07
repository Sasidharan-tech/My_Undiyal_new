import Image from "next/image";
import Link from "next/link";
import { Star, Trash2 } from "lucide-react";
import CurrencyAmount from "@/components/ui/CurrencyAmount";
import Button from "@/components/ui/Button";

export default function WishlistCard({ product, onRemove }) {
  return (
    <article className="mt-4 w-full overflow-hidden rounded-xl border border-gray-200 bg-[#f7f3ef]">
      <div className="flex items-center gap-3 p-3">

        {/* Image */}
        <Link
          href={`/product/${product.id}`}
          className="flex h-[80px] w-[120px] items-center justify-center rounded-lg bg-[#FFF3EC]"
        >
          <div className="relative h-[70px] w-[100px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">

          <Link href={`/product/${product.id}`}>
            <h2 className="text-sm font-semibold text-gray-900 truncate">
              {product.name}
            </h2>
            <p className="text-xs text-gray-500 truncate">
              {product.description}
            </p>
          </Link>

          {/* Price */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              <CurrencyAmount amount={Number(product.price || 0)} />
            </span>
            <span className="text-xs text-gray-400 line-through">
              <CurrencyAmount amount={Number(product.oldPrice || 0)} />
            </span>
          </div>

          {/* Rating */}
          <div className="mt-1 inline-flex items-center gap-1 rounded bg-orange-100 px-1.5 py-[2px] text-xs text-orange-600">
            <Star size={12} className="fill-current" />
            <span>4.0</span>
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center justify-between">

            {/* Buy Button */}
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button
                className="flex h-8 w-full items-center justify-center rounded-md bg-orange-500 text-xs font-medium text-white hover:bg-orange-600"
              >
                <Image
                  src="/icons/common/BuyNow_icon.png"
                  alt=""
                  width={16}
                  height={16}
                />
                <span className="ml-1">Buy Now</span>
              </Button>
            </Link>

            {/* Delete */}
            <button
              onClick={() => onRemove(product.id)}
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-red-300 text-red-500 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>

          </div>
        </div>
      </div>
    </article>
  );
}