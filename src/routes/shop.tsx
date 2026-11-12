import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop Vintage Watches — Vintage Made" }, { name: "description", content: "Browse restored vintage chronographs, dress watches, divers and field watches." }, { property: "og:title", content: "Shop Vintage Watches — Vintage Made" }, { property: "og:description", content: "Browse restored vintage chronographs, dress watches, divers and field watches." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<Category | "All">("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);
  return (
    <>
      <PageHeader eyebrow="The collection" title="Shop">Each piece is sourced, authenticated and serviced in our Geneva atelier.</PageHeader>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-10 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`btn px-4 py-2 ${cat === c ? "btn-gold" : "border-border text-muted-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}
