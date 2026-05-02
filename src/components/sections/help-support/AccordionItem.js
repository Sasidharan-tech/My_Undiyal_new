import { ChevronDown } from "lucide-react";

export default function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-[#f8f5f2]">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-slate-800">{title}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`.trim()}
          aria-hidden="true"
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`.trim()}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
