import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field, PageHeader } from "@/components/Layout";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { email, errorsOf, formData, required } from "@/lib/validation";
import { useCartLines } from "./cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Hunain Watch" }, { name: "description", content: "Complete your Hunain Watch order." }] }),
  component: Checkout,
});

const schema = z.object({
  name: required("Full name"), email, phone: required("Phone", 30),
  address: required("Address", 200), city: required("City"),
  postal: required("Postal code", 20), country: required("Country"),
});

function Checkout() {
  const { user, loading } = useAuth();
  const { clear } = useCart();
  const { lines, total } = useCartLines();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in before checkout.");
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      toast.error("Please log in before placing an order.");
      await navigate({ to: "/login" });
      return;
    }
    if (!supabase) {
      toast.error("Supabase is not configured. Please check your environment variables.");
      return;
    }
    const result = schema.safeParse(formData(event.currentTarget));
    setErrors(errorsOf(result));
    if (!result.success || lines.length === 0) return;

    setBusy(true);
    try {
      const { data, error } = await supabase.from("orders").insert({
        user_id: user.id,
        customer_name: result.data.name,
        customer_email: result.data.email,
        phone: result.data.phone,
        delivery_address: result.data.address,
        city: result.data.city,
        postal_code: result.data.postal,
        country: result.data.country,
        order_items: lines.map(({ p, qty }) => ({
          product_id: p.id,
          product_name: p.name,
          unit_price: p.price,
          quantity: qty,
        })),
        total_amount: total,
      }).select("id").single();

      if (error) throw error;
      setOrderId(data.id);
      clear();
      toast.success("Your order has been saved successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your order. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (loading || (!user && !orderId)) {
    return <div className="mx-auto max-w-xl px-4 py-24 text-center"><p className="text-muted-foreground">Checking your account...</p></div>;
  }

  if (orderId) return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="eyebrow">Thank you</p>
      <h1 className="mt-3 text-4xl">Order placed</h1>
      <p className="mt-4 text-muted-foreground">Your order has been saved to our database.</p>
      <p className="mt-2 text-sm text-muted-foreground">Order ID: {orderId}</p>
      <Link to="/shop" className="btn mt-8">Continue shopping</Link>
    </div>
  );

  const f = (name: keyof z.infer<typeof schema>, label: string, type = "text", defaultValue = "") => (
    <Field label={label} error={errors[name]}>
      <input name={name} type={type} defaultValue={defaultValue} className="field" required />
    </Field>
  );

  return (
    <>
      <PageHeader eyebrow="Almost yours" title="Checkout" />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} noValidate className="space-y-8">
          <div>
            <h2 className="mb-4 text-lg">Customer</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {f("name", "Full name", "text", String(user.user_metadata?.full_name || ""))}
              {f("email", "Email", "email", user.email || "")}
              {f("phone", "Phone", "tel")}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg">Delivery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">{f("address", "Address")}</div>
              {f("city", "City")}
              {f("postal", "Postal code")}
              {f("country", "Country")}
            </div>
          </div>
          <button type="submit" className="btn btn-gold w-full sm:w-auto disabled:opacity-60" disabled={busy || lines.length === 0}>
            {busy ? "Saving order..." : "Place order"}
          </button>
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
