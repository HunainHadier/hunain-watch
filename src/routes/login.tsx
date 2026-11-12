import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/Layout";
import { email, errorsOf, formData } from "@/lib/validation";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Vintage Made" }, { name: "description", content: "Sign in to your Vintage Made account." }, { property: "og:title", content: "Login — Vintage Made" }, { property: "og:description", content: "Sign in to your Vintage Made account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Login,
});

const schema = z.object({ email, password: z.string().min(8, "Password must be at least 8 characters").max(100) });

function Login() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(formData(e.currentTarget));
    setErrors(errorsOf(r));
    if (r.success) toast.success("Signed in (demo)");
  };
  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <p className="eyebrow text-center">Welcome back</p>
      <h1 className="mt-3 text-center text-4xl">Login</h1>
      <form onSubmit={submit} noValidate className="mt-10 space-y-4 rounded-md border border-border bg-card p-6 sm:p-8">
        <Field label="Email" error={errors.email}><input name="email" type="email" className="field" /></Field>
        <Field label="Password" error={errors.password}><input name="password" type="password" className="field" /></Field>
        <button className="btn btn-gold w-full">Sign in</button>
        <p className="text-center text-sm text-muted-foreground">New here? <Link to="/register" className="text-gold">Create an account</Link></p>
      </form>
    </section>
  );
}
