import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Vintage Made" }, { name: "description", content: "Review the vintage watches in your cart." }, { property: "og:title", content: "Your Cart — Vintage Made" }, { property: "og:description", content: "Review the vintage watches in your cart." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: CartPage,
});

export function useCartLines() {
  const { items } = useCart();
  const lines = items.flatMap((i) => { const p = getProduct(i.id); return p ? [{ ...i, p }] : []; });
  const total = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  return { lines, total };
}

function CartPage() {
  const { setQty, remove } = useCart();
  const { lines, total } = useCartLines();
  return (
    <>
      <PageHeader eyebrow="Your selection" title="Cart" />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {lines.length === 0 ? (
          <div className="py-16 text-center"><p className="text-muted-foreground">Your cart is empty.</p><Link to="/shop" className="btn mt-6">Continue shopping</Link></div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <ul className="divide-y divide-border border-y border-border">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[110px_minmax(0,1fr)_auto]">
                  <img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
                  <div className="min-w-0">
                    <Link to="/product/$id" params={{ id: p.id }} className="font-serif text-xl hover:text-gold">{p.name}</Link>
                    <p className="text-sm text-muted-foreground">{formatPrice(p.price)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-border">
                        <button aria-label="Decrease" className="p-2" onClick={() => setQty(p.id, qty - 1)}><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{qty}</span>
                        <button aria-label="Increase" className="p-2" onClick={() => setQty(p.id, qty + 1)}><Plus className="h-3 w-3" /></button>
                      </div>
                      <button aria-label="Remove" onClick={() => remove(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <p className="col-start-2 text-gold sm:col-start-3 sm:text-right">{formatPrice(p.price * qty)}</p>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-md border border-border bg-card p-6">
              <h2 className="text-lg">Summary</h2>
              <div className="mt-4 flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Insured shipping</span><span>Free</span></div>
              <div className="mt-4 flex justify-between border-t border-border pt-4"><span>Total</span><span className="text-gold">{formatPrice(total)}</span></div>
              <Link to="/checkout" className="btn btn-gold mt-6 w-full">Checkout</Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
