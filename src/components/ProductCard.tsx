import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link to="/product/$id" params={{ id: p.id }} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-md bg-card">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {p.isNew && <span className="absolute left-3 top-3 rounded-sm bg-gold px-2 py-1 text-[10px] uppercase tracking-widest text-primary-foreground">New</span>}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.category} · {p.year}</p>
          <h3 className="mt-1 truncate font-serif text-xl normal-case tracking-normal">{p.name}</h3>
        </div>
        <p className="shrink-0 text-gold">{formatPrice(p.price)}</p>
      </div>
    </Link>
  );
}
