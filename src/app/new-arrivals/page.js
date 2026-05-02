import Link from "next/link";
import MainLayout from "@/layout/MainLayout";
import ProductGrid from "@/components/sections/product/ProductGrid";
import { products } from "@/data/products";

const newArrivalProducts = products.filter(
  (product) => product.newArrival === "yes",
);

export default function NewArrivalsPage() {
  if (newArrivalProducts.length === 0) {
    return (
      <MainLayout title="New Arraival" backHref="/" contentClassName="px-4 pb-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            No new arrival products
          </h2>
          <Link
            href="/categories"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#cc7a4b] px-5 text-sm font-semibold text-white"
          >
            Browse Categories
          </Link>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="New Arraival" backHref="/" contentClassName="px-0 pb-6">
      <ProductGrid products={newArrivalProducts} />
    </MainLayout>
  );
}
