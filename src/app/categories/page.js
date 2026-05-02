import { categories } from "@/data/categories-data";
import CategoriesMosaic from "@/components/sections/categories/CategoriesMosaic";
import MainLayout from "@/layout/MainLayout";

export default function CategoriesPage() {
  return (
    <MainLayout title="Categories" backHref="/" contentClassName="px-4 pb-6">
      <CategoriesMosaic categories={categories} />
    </MainLayout>
  );
}
