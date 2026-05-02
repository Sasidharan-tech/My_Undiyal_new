import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({
  qty,
  onIncrement,
  onDecrement,
  icons,
}) {
  return (
    <div
      className="inline-flex items-center gap-2"
      aria-label="Quantity stepper"
    >
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CC7A4B]/10"
      >
        {icons?.decrement ? (
          <Image
            src={icons.decrement}
            alt=""
            width={20}
            height={20}
            className="qty-stepper-icon"
          />
        ) : (
          <Minus size={12} />
        )}
      </button>
      <span className="min-w-4 text-center text-sm font-medium text-black">
        {String(qty).padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CC7A4B]/10"
      >
        {icons?.increment ? (
          <Image
            src={icons.increment}
            alt=""
            width={20}
            height={20}
            className="qty-stepper-icon"
          />
        ) : (
          <Plus size={12} />
        )}
      </button>
    </div>
  );
}
