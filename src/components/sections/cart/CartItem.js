import Image from "next/image";
import { Trash2, Truck } from "lucide-react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import CurrencyAmount from "@/components/ui/CurrencyAmount";

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  showStepper = true,
  showScheme = false,
  icons,
}) {
  return (
    <article className="flex gap-2.75 rounded-[9px] bg-white px-0 py-0">
      <div className="h-30.75 w-30.75 shrink-0 overflow-hidden rounded-[9px] bg-[#CC7A4B]/10 p-2">
        <Image
          src={item.image}
          alt={item.name}
          width={200}
          height={220}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="h-30.75 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm leading-5.25 font-medium text-black">
            {item.name}
          </h3>
          <button
            type="button"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF0E0E]/10"
            onClick={() => onRemove?.(item.id)}
            aria-label="Remove item"
          >
            {icons?.remove ? (
              <Image src={icons.remove} alt="" width={20} height={20} />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>

        {showScheme ? (
          <>
            <p className="mt-0.5 text-sm leading-5.25 font-normal text-black">
              Scheme : {item.schemePreview}
            </p>
            <p className="text-sm leading-5.25 font-normal text-black">
              Qty: {item.qty}
            </p>
          </>
        ) : (
          <p className="mt-0.5 text-sm leading-5.25 font-normal text-black">
            Qty: {item.qty}
          </p>
        )}

        <p className="mt-0.5 text-lg leading-6.75 font-medium text-black">
          <CurrencyAmount
            amount={item.price}
            className="tabular-nums"
            valueClassName="text-lg leading-6.75 font-medium"
            minimumFractionDigits={0}
            maximumFractionDigits={0}
          />
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <small className="inline-flex items-center gap-1 leading-3.75 font-normal text-black">
            {icons?.delivery ? (
              <Image src={icons.delivery} alt="" width={12} height={12} />
            ) : (
              <Truck size={13} />
            )}
            <span className="text-[8.5px]">{item.deliveryText}</span>
          </small>
          {showStepper ? (
            <QuantityStepper
              qty={item.qty}
              onIncrement={() => onIncrement?.(item.id)}
              onDecrement={() => onDecrement?.(item.id)}
              icons={icons?.stepper}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
