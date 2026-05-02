import { Search, CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="bg-white px-6 pb-4 pt-5">
      <div className="flex items-center justify-between gap-2">
        <div
          className="flex h-12.5 flex-1 items-center gap-3 rounded-full bg-[#FFF2EA] px-4"
          role="search"
          aria-label="Search products"
        >
          <Search size={24} className="text-[#cc7a4b]" aria-hidden="true" />
          <input
            type="search"
            className="h-full w-full bg-transparent text-sm font-normal text-[#904910]/60 outline-none placeholder:text-[#904910]/30"
            placeholder="Search your product"
            aria-label="Search products"
          />
        </div>


      </div>
    </div>
  );
}
