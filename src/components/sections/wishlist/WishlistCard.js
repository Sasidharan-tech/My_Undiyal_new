import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, Trash2 } from "lucide-react";
import CurrencyAmount from "@/components/ui/CurrencyAmount";
import Button from "@/components/ui/Button";

export default function WishlistCard({ product, onRemove }) {
  return (
    <article className="mt-5 mb-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex min-h-44 items-stretch gap-0">
        <Link
          href={`/product/${product.id}`}
          className=" w-[38%] min-w-29 max-w-38 shrink-0 overflow-hidden rounded-l-lg bg-[#FFF3EC]"
          aria-label={`Open ${product.name}`}
        >
          <div className="flex h-full w-full items-center justify-center px-3 py-2 sm:px-4">
            <div className="relative aspect-square w-full max-w-32">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        <div className="min-w-0 flex flex-1 flex-col justify-between py-2 pl-2 pr-2 text-left sm:py-2.5">
          <Link href={`/product/${product.id}`} className="block w-full space-y-1 leading-tight">
            <h2 className="mt-2 truncate text-md font-bold text-gray-900 sm:text-base ">
              {product.name}
            </h2>
            <p className="mt-2 truncate text-[0.75rem] text-gray-500 sm:text-xs">
              {product.description}
            </p>
          </Link>

          <div className="mt-2 w-full space-y-1.5">
            <div className="flex w-full items-center gap-1">
              <span className="text-md font-semibold text-gray-900 sm:text-base">
                <CurrencyAmount
                  amount={Number(product.price || 0)}
                  minimumFractionDigits={0}
                  maximumFractionDigits={0}
                />
              </span>
              <span className="relative text-[0.75rem] text-gray-400 sm:text-xs after:absolute after:left-0 after:right-0 after:top-1/2 after:border-t after:border-gray-400 after:content-['']">
                <CurrencyAmount
                  amount={Number(product.oldPrice || 0)}
                  minimumFractionDigits={0}
                  maximumFractionDigits={0}
                />
              </span>
            </div>

            <div className="inline-flex items-center gap-0.5 rounded-md bg-orange-100 px-1.5 py-0.5 text-[0.75rem] font-medium text-orange-600 sm:text-xs">
              <Star size={10} className="fill-current" aria-hidden="true" />
              <span>4.0</span>
            </div>

            <div className="flex w-full items-center justify-between gap-2">
              <Link href={`/product/${product.id}`} className="min-w-0 flex-1">
                <Button
                  variant="ghost"
                  className="mt-2 min-h-8 w-full rounded-md border-orange-500 bg-orange-500 px-3 py-0 text-[0.75rem] font-semibold text-white shadow-none hover:bg-orange-600 sm:text-xs"
                >
                    <Image
                            src="/icons/common/BuyNow_icon.png"
                            alt=""
                            width={72}
                            height={59}
                            className="w-[16px] h-[20px] mb-1 object-contain"
                            aria-hidden="true"
                          />
                  <span className="ml-1">Buy Now</span>
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => onRemove(product.id)}
                className="mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 transition-transform duration-200 active:scale-95 sm:h-10 sm:w-10"
                aria-label={`Remove ${product.name} from wishlist`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
