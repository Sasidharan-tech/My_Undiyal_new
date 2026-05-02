import ProductCard from "./ProductCard";

export default function ProductGrid({ products, showHeader = true }) {
  return (
    <section className="mt-2 px-4 pb-4">
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {products.map((product, index) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              imageLoading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
