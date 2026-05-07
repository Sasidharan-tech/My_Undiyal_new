import DeliveryArrived from "@/components/sections/order/DeliveryArrived";
import PayDue from "@/components/sections/order/PayDue";
import BannerCarousel from "../components/sections/home/BannerCarousel";
import Categories from "../components/sections/home/Categories";
import ProductGrid from "../components/sections/product/ProductGrid";
import SearchBar from "../components/common/SearchBar";
import { products } from "@/data/products";
import { NavLink, APP_ROUTES } from "@/components/common";
import Image from "next/image";
import { getFeaturedOrder } from "@/data/orders";

const newArrivalProducts = products.filter(
  (product) => product.newArrival === "yes",
).slice(0, 2);
const featuredOrder = getFeaturedOrder();

export default function HomePage() {
  return (
    <main className="mobile-app-shell app-background">
      <div className="container-fluid app-content px-0">
        <SearchBar />
        <BannerCarousel />
        <section
          className="status-stack"
          aria-label="Account and delivery updates"
        >
          <PayDue />
          <DeliveryArrived order={featuredOrder} />
        </section>
        <Categories />

        <div className="mb-3 mt-3 flex items-center justify-between px-4">
          <h3 className="inline-flex items-center gap-2 text-base font-semibold text-slate-900">
            <Image
              src="/icons/common/Vector.png"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            New Arraival
          </h3>
          <NavLink href={APP_ROUTES.NEW_ARRIVALS} className="text-sm font-medium text-slate-900">
            View All
          </NavLink>
        </div>

        <ProductGrid products={newArrivalProducts} />
      </div>
    </main>
  );
}
