import Link from "next/link";
import Button from "./Button";
import CurrencyAmount from "./CurrencyAmount";

export default function BottomBar({
  label,
  amount,
  buttonText,
  href,
  onClick,
  disabled = false,
}) {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 flex h-18.75 w-[min(100vw,var(--app-max-width))] -translate-x-1/2 items-center justify-between bg-white px-4 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:px-5">
      <div className="min-w-0">
        <small className="block text-base leading-6 font-normal text-[#CC7A4B]">
          {label}
        </small>
        <strong className="block text-[22px] leading-8 font-medium text-[#CC7A4B]">
          <CurrencyAmount
            amount={amount}
            className="text-[#CC7A4B]"
            valueClassName="font-medium"
          />
        </strong>
      </div>

      {href ? (
        <Link
          href={disabled ? "#" : href}
          className={`inline-flex h-11.25 min-w-32 items-center justify-center rounded-[10px] bg-[#CC7A4B] px-4 text-base font-semibold leading-6 text-white sm:min-w-38.25 ${disabled ? "pointer-events-none opacity-50" : ""}`.trim()}
          aria-disabled={disabled}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault();
            }
          }}
        >
          {buttonText}
        </Link>
      ) : (
        <Button className="min-w-32 px-5" onClick={onClick} disabled={disabled}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
