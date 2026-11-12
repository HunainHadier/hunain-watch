import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.name} — Vintage Made` }, { name: "description", content: loaderData.description },
         { property: "og:title", content: loaderData.name }, { property: "og:description", content: loaderData.description },
         { property: "og:type", content: "product" }, { name: "twitter:card", content: "summary_large_image" }]
      : [{ title: "Watch not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-3xl">Watch not found</h1><Link to="/shop" className="btn mt-6">Back to shop</Link></div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:gap-16 lg:py-20">
      <img src={p.image} alt={p.name} width={1024} height={1024} className="aspect-square w-full rounded-md object-cover" />
      <div>
        <Link to="/shop" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold">← Shop / {p.category}</Link>
        <h1 className="mt-4 font-serif text-4xl font-semibold normal-case tracking-normal sm:text-5xl">{p.name}</h1>
        <p className="mt-3 text-2xl text-gold">{formatPrice(p.price)}</p>
        <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-md border border-border">
            <button aria-label="Decrease" className="p-3" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center">{qty}</span>
            <button aria-label="Increase" className="p-3" onClick={() => setQty(qty + 1)}><Plus className="h-4 w-4" /></button>
          </div>
          <button className="btn btn-gold flex-1 sm:flex-none" onClick={() => { add(p.id, qty); toast.success(`${p.name} added to cart`); }}>Add to cart</button>
        </div>
        <h2 className="mt-12 text-lg">Specifications</h2>
        <dl className="mt-4 divide-y divide-border border-y border-border">
          {Object.entries({ Year: p.year, ...p.specs }).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="text-right">{v}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
