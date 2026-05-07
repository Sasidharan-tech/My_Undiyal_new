import { memo } from "react";

function CommonButton({
  type = "button",
  children,
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl bg-[#C1683A] px-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default memo(CommonButton);
