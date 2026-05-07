"use client";

import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = "",
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-[#FFF2EA] px-4 py-2 ${className}`.trim()}
      role="search"
      aria-label={ariaLabel}
    >
      <Search size={18} className="text-orange-300" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-orange-300"
        aria-label={ariaLabel}
      />
    </div>
  );
}
