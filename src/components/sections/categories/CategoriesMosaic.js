import Image from "next/image";
import { NavLink, APP_ROUTES } from "@/components/common";

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
      <NavLink href={APP_ROUTES.CATEGORY_DETAIL(electronics.id)} className="block rounded-xl">
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
      </NavLink>

      <div className="grid grid-cols-3 gap-3">
        <CategoryCard
          label={furniture.name}
          id={furniture.id}
          src={furniture.image}
        />
        <CategoryCard
          label={grocery.name}
          id={grocery.id}
          src={grocery.image}
        />
        <CategoryCard
          label={crackers.name}
          id={crackers.id}
          src={crackers.image}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard label="Copper" id={coppers.id} src={coppers.image} />
        <CategoryCard label={brass.name} id={brass.id} src={brass.image} />
      </div>
    </section>
  );
}

function CategoryCard({
  label,
  id,
  src,
  imageBoxClassName = "aspect-[6/5]",
}) {
  return (
    <NavLink href={APP_ROUTES.CATEGORY_DETAIL(id)} className="flex flex-col items-center gap-2">
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
    </NavLink>
  );
}
