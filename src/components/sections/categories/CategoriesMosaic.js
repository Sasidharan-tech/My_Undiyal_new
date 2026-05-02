import Link from "next/link";
import Image from "next/image";

const fallbackById = {
  electronics: {
    name: "Electronics",
    image: "/categories/images/electronics.png",
    href: "/categories/electronics",
  },
  furniture: {
    name: "Furniture",
    image: "/categories/images/furniture.png",
    href: "/categories/furniture",
  },
  grocery: {
    name: "Grocery",
    image: "/categories/images/grocery.png",
    href: "/categories/grocery",
  },
  crackers: {
    name: "Crackers",
    image: "/categories/images/crackers.png",
    href: "/categories/crackers",
  },
  coppers: {
    name: "Copper",
    image: "/categories/images/coppers.png",
    href: "/categories/coppers",
  },
  brass: {
    name: "Brass",
    image: "/categories/images/brass.png",
    href: "/categories/brass",
  },
};

export default function CategoriesMosaic({ categories }) {
  const categoryById = new Map(categories.map((item) => [item.id, item]));

  const electronics =
    categoryById.get("electronics") ?? fallbackById.electronics;
  const furniture = categoryById.get("furniture") ?? fallbackById.furniture;
  const grocery = categoryById.get("grocery") ?? fallbackById.grocery;
  const crackers = categoryById.get("crackers") ?? fallbackById.crackers;
  const coppers = categoryById.get("coppers") ?? fallbackById.coppers;
  const brass = categoryById.get("brass") ?? fallbackById.brass;

  return (
    <section
      className="-mx-4 space-y-6 px-4 py-6"
      aria-label="Product categories"
    >
      <Link href={electronics.href} className="block rounded-xl">
        <div className="relative h-43.25 w-full overflow-hidden rounded-xl bg-[#F5F0EB]">
          <Image
            src={electronics.image}
            alt={electronics.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 480px) 100vw, 420px"
            priority
          />
        </div>
        <p className="mt-2 text-lg font-medium text-gray-800">
          {electronics.name}
        </p>
      </Link>

      <div className="grid grid-cols-3 gap-3">
        <CategoryCard
          label={furniture.name}
          src={furniture.image}
          href={furniture.href}
        />
        <CategoryCard
          label={grocery.name}
          src={grocery.image}
          href={grocery.href}
        />
        <CategoryCard
          label={crackers.name}
          src={crackers.image}
          href={crackers.href}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard label="Copper" src={coppers.image} href={coppers.href} />
        <CategoryCard label={brass.name} src={brass.image} href={brass.href} />
      </div>
    </section>
  );
}

function CategoryCard({
  label,
  src,
  href,
  imageBoxClassName = "aspect-[6/5]",
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2">
      <div
        className={`relative ${imageBoxClassName} w-full overflow-hidden rounded-xl bg-[#F5F0EB]`.trim()}
      >
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover object-center"
          sizes="(max-width: 480px) 33vw, 180px"
        />
      </div>
      <p className="min-h-5 text-center text-sm font-medium leading-5 text-gray-800">
        {label}
      </p>
    </Link>
  );
}
