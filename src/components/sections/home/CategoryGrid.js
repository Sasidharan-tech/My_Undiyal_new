import Image from "next/image";
import Link from "next/link";

export default function CategoryGrid({ items, getHref }) {
  return (
    <section className="grid grid-cols-2 gap-3" aria-label="Category list">
      {items.map((category, index) => (
        <Link
          key={category.id}
          href={getHref(category)}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="overflow-hidden bg-slate-50">
            <Image
              src={category.image}
              alt={category.name}
              width={420}
              height={320}
              className="h-28 w-full object-cover"
              priority={index < 2}
              sizes="(max-width: 480px) 42vw, (max-width: 900px) 32vw, 260px"
            />
          </div>
          <span className="block p-3 text-sm font-semibold text-slate-800">
            {category.name}
          </span>
        </Link>
      ))}
    </section>
  );
}
