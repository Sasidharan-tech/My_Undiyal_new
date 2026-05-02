import Image from "next/image";
import MainLayout from "@/layout/MainLayout";

const offers = [
  {
    id: "diwali",
    title: "Diwali Offer",
    image: "/schemes/diwali.png",
  },
  {
    id: "pongal",
    title: "Pongal Offer",
    image: "/schemes/pongal.png",
  },
];

export default function FestivalSchemePage() {
  return (
    <MainLayout
      title="Festival Scheme"
      backHref="/"
      contentClassName="px-4 pb-6"
    >
      <section className="space-y-3" aria-label="Festival offers">
        {offers.map((offer, index) => (
          <article
            key={offer.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <Image
              src={offer.image}
              alt={offer.title}
              width={1400}
              height={760}
              className="h-auto w-full object-cover"
              priority={index === 0}
              sizes="(max-width: 480px) 100vw, 480px"
            />
          </article>
        ))}
      </section>
    </MainLayout>
  );
}
