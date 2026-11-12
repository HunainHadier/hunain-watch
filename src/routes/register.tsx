import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/Layout";
import { email, errorsOf, formData, required } from "@/lib/validation";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Vintage Made" }, { name: "description", content: "Create a Vintage Made account to save favourites and track orders." }, { property: "og:title", content: "Register — Vintage Made" }, { property: "og:description", content: "Create a Vintage Made account to save favourites and track orders." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Register,
});

const schema = z.object({
  name: required("Name"), email,
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: "Passwords do not match", path: ["confirm"] });

function Register() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(formData(e.currentTarget));
    setErrors(errorsOf(r));
    if (r.success) toast.success("Account created (demo)");
  };
  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <p className="eyebrow text-center">Join the house</p>
      <h1 className="mt-3 text-center text-4xl">Register</h1>
      <form onSubmit={submit} noValidate className="mt-10 space-y-4 rounded-md border border-border bg-card p-6 sm:p-8">
        <Field label="Full name" error={errors.name}><input name="name" className="field" /></Field>
        <Field label="Email" error={errors.email}><input name="email" type="email" className="field" /></Field>
        <Field label="Password" error={errors.password}><input name="password" type="password" className="field" /></Field>
        <Field label="Confirm password" error={errors.confirm}><input name="confirm" type="password" className="field" /></Field>
        <button className="btn btn-gold w-full">Create account</button>
        <p className="text-center text-sm text-muted-foreground">Already a member? <Link to="/login" className="text-gold">Login</Link></p>
      </form>
    </section>
  );
}
