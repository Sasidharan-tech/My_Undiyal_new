import { ChevronDown } from "lucide-react";

export default function SelectField({ label, value, onChange, options = [] }) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-800 outline-none transition focus:border-[#d9aa88] focus:ring-2 focus:ring-[#f4ddce]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-slate-400">
          <ChevronDown size={16} />
        </span>
      </div>
    </label>
  );
}
