import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" }, { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" }, { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-espresso/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="Hunain Watches home" className="flex shrink-0 items-center">
          <img src="/hunain-watch-logo.webp" alt="Hunain Watches — Timeless Elegance" className="h-[4.5rem] w-auto max-w-[9rem] object-contain sm:max-w-[10rem]" />
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-gold" }}>{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" aria-label="Account" className="hidden hover:text-gold sm:block"><User className="h-5 w-5" /></Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-gold">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}
          </Link>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border bg-espresso px-4 py-4 md:hidden">
          {[...links, { to: "/login", label: "Login" } as const, { to: "/register", label: "Register" } as const].map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 text-sm uppercase tracking-[0.2em]" activeProps={{ className: "text-gold" }}>{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-espresso">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link to="/" aria-label="Hunain Watches home" className="inline-flex items-center">
            <img src="/hunain-watch-logo.webp" alt="Hunain Watches — Timeless Elegance" className="h-28 w-auto max-w-[12rem] object-contain" />
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">Restored vintage timepieces, curated and serviced by hand since 1987.</p>
        </div>
        <FooterCol title="Shop" items={[["/shop", "All watches"], ["/cart", "Cart"], ["/checkout", "Checkout"]]} />
        <FooterCol title="House" items={[["/about", "Our story"], ["/contact", "Contact"], ["/login", "Account"]]} />
        <div>
          <p className="eyebrow">Visit</p>
          <p className="mt-3 text-sm text-muted-foreground">12 Rue du Rhône, Geneva<br />Mon–Sat, 10:00–18:00<br />+41 22 555 0148</p>
        </div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs text-muted-foreground">© 2026 Vintage Made. Demo store — no real purchases.</p>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map(([to, l]) => <li key={to}><Link to={to} className="hover:text-foreground">{l}</Link></li>)}
      </ul>
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="border-b border-border bg-espresso">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-6xl">{title}</h1>
        {children && <div className="mt-4 max-w-xl text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2></div>
      {action}
    </div>
  );
}

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
