import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field, PageHeader } from "@/components/Layout";
import { email, errorsOf, formData, required } from "@/lib/validation";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — Vintage Made" }, { name: "description", content: "Visit our Geneva atelier or send us a message about any vintage watch." }, { property: "og:title", content: "Contact Us — Vintage Made" }, { property: "og:description", content: "Visit our Geneva atelier or send us a message about any vintage watch." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Contact,
});

const schema = z.object({ name: required("Name"), email, message: required("Message", 1000) });

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(formData(e.currentTarget));
    setErrors(errorsOf(r));
    if (r.success) { toast.success("Message sent — we'll reply within one business day."); e.currentTarget.reset(); }
  };
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact Us">Questions about a piece, a restoration or a visit? We'd love to hear from you.</PageHeader>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-6">
          {[[MapPin, "Atelier", "12 Rue du Rhône, 1204 Geneva"], [Phone, "Phone", "+41 22 555 0148"], [Mail, "Email", "atelier@vintagemade.demo"]].map(([Icon, t, v]) => {
            const I = Icon as typeof Mail;
            return <li key={t as string} className="flex gap-4"><I className="mt-1 h-5 w-5 shrink-0 text-gold" /><div><p className="eyebrow">{t as string}</p><p className="mt-1">{v as string}</p></div></li>;
          })}
          <li className="text-sm text-muted-foreground">Open Monday–Saturday, 10:00–18:00</li>
        </ul>
        <form onSubmit={submit} noValidate className="space-y-4 rounded-md border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name}><input name="name" className="field" /></Field>
            <Field label="Email" error={errors.email}><input name="email" type="email" className="field" /></Field>
          </div>
          <Field label="Message" error={errors.message}><textarea name="message" rows={5} className="field" /></Field>
          <button className="btn btn-gold">Send message</button>
        </form>
      </section>
    </>
  );
}
