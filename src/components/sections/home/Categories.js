import Link from "next/link";
import Image from "next/image";
import { categoryRows } from "@/data/categories";
import { Grid2x2 } from "lucide-react";

export default function Categories() {
  return (
    <section id="categories" className="mt-4 px-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="inline-flex items-center gap-2 text-base font-medium text-black">
          <Grid2x2 size={15} strokeWidth={1.8} />
          Categories
        </h3>
        <Link href="/categories" className="text-sm font-normal text-black">
          View All
        </Link>
      </div>

      <div
  className="no-scrollbar flex gap-4 overflow-x-auto pb-2 scroll-smooth"
  role="list"
>
  {categoryRows.map((category) => (
    <Link
      href={`/categories/${category.id}`}
      className="min-w-[70px] flex-shrink-0 rounded-[5px] bg-linear-to-t from-[#fff2ea] to-[#fff2ea00] p-1.5 text-center"
      key={category.id}
      role="listitem"
    >
      <span className="mx-auto inline-flex h-8.75 w-10.5 items-center justify-center">
        <Image
          src={category.image}
          alt=""
          width={42}
          height={34}
          className="h-8.5 w-10.5 object-contain"
        />
      </span>

      <span className="mt-1 block text-[10px] uppercase text-black">
        {category.name}
      </span>
    </Link>
  ))}
</div>
    </section>
  );
}
