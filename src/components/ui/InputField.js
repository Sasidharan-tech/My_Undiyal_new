import { Circle } from "lucide-react";

export default function InputField({
  label,
  icon: Icon = Circle,
  as = "input",
  type = "text",
  value,
  onChange,
  placeholder,
  rows = 3,
  inputMode,
  autoComplete,
}) {
  const isTextarea = as === "textarea";
  const sharedClassName =
    "w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#d9aa88] focus:ring-2 focus:ring-[#f4ddce]";

  return (
    <label className="block">
      <span className="mb-1.5 inline-flex items-center text-sm font-medium text-slate-700">
        {label}
      </span>

      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${sharedClassName} resize-none px-3`.trim()}
        />
      ) : (
        <span className="relative block">
          <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-[#c97a48]">
            <Icon size={16} />
          </span>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            inputMode={inputMode}
            autoComplete={autoComplete}
            className={`${sharedClassName} px-3 pl-10`.trim()}
          />
        </span>
      )}
    </label>
  );
}
