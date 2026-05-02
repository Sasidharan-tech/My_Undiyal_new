import { notFound } from "next/navigation";
import ProductGrid from "@/components/sections/product/ProductGrid";
import { categoryRows } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import MainLayout from "@/layout/MainLayout";

export default async function CategoryProductsPage({ params }) {
  const { categoryId } = await params;
  const category = categoryRows.find((item) => item.id === categoryId);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.id);

  return (
    <MainLayout
      title={category.name}
      backHref="/categories"
      contentClassName="px-4 pb-6"
    >
      <p className="mb-3 text-sm text-slate-600">
        {categoryProducts.length} products in {category.name}
      </p>

      {categoryProducts.length ? (
        <section aria-label={`${category.name} products`}>
          <ProductGrid products={categoryProducts} showHeader={false} />
        </section>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
          No products available in this category.
        </p>
      )}
    </MainLayout>
  );
}
