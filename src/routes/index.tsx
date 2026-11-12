import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import promo from "@/assets/watch-3.jpg";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/Layout";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Vintage Made — Restored Vintage Luxury Watches" }, { name: "description", content: "Hand-restored vintage chronographs, divers and dress watches. Design every detail. Wear your story." }, { property: "og:title", content: "Vintage Made — Restored Vintage Luxury Watches" }, { property: "og:description", content: "Hand-restored vintage chronographs, divers and dress watches. Design every detail. Wear your story." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-espresso">
        <img src={hero} alt="Vintage watch parts on a walnut workbench" width={1920} height={960} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="hero-shade absolute inset-0" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:min-h-[80vh]">
          <h1 className="max-w-xl text-5xl font-bold leading-[1.05] tracking-[0.08em] sm:text-7xl">Vintage,<br />Made Yours</h1>
          <p className="mt-6 text-sm uppercase italic tracking-[0.2em] sm:text-lg">Design every detail.<br />Wear your story.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/shop" className="btn">Shop the collection</Link>
            <Link to="/about" className="btn btn-gold">Our story</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Curated" title="Featured Watches" action={<Link to="/shop" className="btn">View all</Link>} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((p) => p.featured).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <img src={promo} alt="Gold vintage dress watch" loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full rounded-md object-cover" />
          <div>
            <p className="eyebrow">Atelier service</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Complimentary restoration</h2>
            <p className="mt-5 text-muted-foreground">Every watch over $3,000 includes a full movement service, a two-year warranty and your choice of handmade leather strap.</p>
            <Link to="/shop" className="btn btn-gold mt-8">Explore pieces</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Just in" title="New Arrivals" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((p) => p.isNew).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}
