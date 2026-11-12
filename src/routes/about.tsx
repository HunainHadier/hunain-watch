import { createFileRoute, Link } from "@tanstack/react-router";
import img from "@/assets/hero.jpg";
import { PageHeader } from "@/components/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — Vintage Made" }, { name: "description", content: "The story of our Geneva atelier restoring vintage luxury watches since 1987." }, { property: "og:title", content: "About Us — Vintage Made" }, { property: "og:description", content: "The story of our Geneva atelier restoring vintage luxury watches since 1987." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="Since 1987" title="Our Story">A small atelier with a single belief: great watches deserve a second life.</PageHeader>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
        <img src={img} alt="Our watchmaking workbench" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover object-right" />
        <div className="space-y-5 text-muted-foreground">
          <h2 className="text-3xl text-foreground">Built by hand, kept by heart</h2>
          <p>Vintage Made began at a walnut workbench in Geneva, where our founder repaired his grandfather's 1948 chronograph. Word spread, and collectors began to bring theirs.</p>
          <p>Today our watchmakers source, authenticate and restore every piece we sell — preserving original dials and patina while servicing each movement to modern standards.</p>
          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            {[["38", "Years"], ["4,200+", "Watches restored"], ["2 yr", "Warranty"]].map(([n, l]) => (
              <div key={l} className="rounded-md border border-border p-4"><p className="font-display text-2xl text-gold">{n}</p><p className="mt-1 text-xs uppercase tracking-widest">{l}</p></div>
            ))}
          </div>
          <Link to="/shop" className="btn mt-4">Discover the collection</Link>
        </div>
      </section>
    </>
  );
}
