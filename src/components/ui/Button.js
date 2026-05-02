export default function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
  ...props
}) {
  const variantClass =
    variant === "ghost"
      ? "border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
      : "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md hover:from-orange-600 hover:to-amber-600";

  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold tracking-wide transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
