import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Field, PageHeader } from "@/components/Layout";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { email, errorsOf, formData, required } from "@/lib/validation";
import { useCartLines } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Vintage Made" }, { name: "description", content: "Enter your details to complete your demo order." }, { property: "og:title", content: "Checkout — Vintage Made" }, { property: "og:description", content: "Enter your details to complete your demo order." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Checkout,
});

const schema = z.object({
  name: required("Full name"), email, phone: required("Phone", 30),
  address: required("Address", 200), city: required("City"), postal: required("Postal code", 20), country: required("Country"),
});

function Checkout() {
  const { clear } = useCart();
  const { lines, total } = useCartLines();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(formData(e.currentTarget));
    setErrors(errorsOf(r));
    if (r.success) { clear(); setDone(true); }
  };
  if (done) return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="eyebrow">Thank you</p><h1 className="mt-3 text-4xl">Order placed</h1>
      <p className="mt-4 text-muted-foreground">This is a demo — no payment was taken. We'd normally email your confirmation now.</p>
      <Link to="/shop" className="btn mt-8">Continue shopping</Link>
    </div>
  );
  const f = (n: keyof z.infer<typeof schema>, label: string, type = "text") => (
    <Field label={label} error={errors[n]}><input name={n} type={type} className="field" /></Field>
  );
  return (
    <>
      <PageHeader eyebrow="Almost yours" title="Checkout" />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} noValidate className="space-y-8">
          <div><h2 className="mb-4 text-lg">Customer</h2>
            <div className="grid gap-4 sm:grid-cols-2">{f("name", "Full name")}{f("email", "Email", "email")}{f("phone", "Phone", "tel")}</div></div>
          <div><h2 className="mb-4 text-lg">Delivery</h2>
            <div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2">{f("address", "Address")}</div>{f("city", "City")}{f("postal", "Postal code")}{f("country", "Country")}</div></div>
          <button type="submit" className="btn btn-gold w-full sm:w-auto" disabled={lines.length === 0}>Place demo order</button>
          {lines.length === 0 && <p className="text-sm text-muted-foreground">Your cart is empty. <Link to="/shop" className="text-gold">Shop now</Link></p>}
        </form>
        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="text-lg">Order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {lines.map(({ p, qty }) => <li key={p.id} className="flex justify-between gap-3"><span className="min-w-0 truncate">{p.name} × {qty}</span><span>{formatPrice(p.price * qty)}</span></li>)}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4"><span>Total</span><span className="text-gold">{formatPrice(total)}</span></div>
        </aside>
      </section>
    </>
  );
}
