import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/Layout";
import { email, errorsOf, formData, required } from "@/lib/validation";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Hunain Watch" }, { name: "description", content: "Create a Hunain Watch account." }] }),
  component: Register,
});

const schema = z.object({
  name: required("Name"), email,
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: "Passwords do not match", path: ["confirm"] });

function Register() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(formData(e.currentTarget));
    setErrors(errorsOf(r));
    if (!r.success) return;
    setBusy(true);
    try {
      const result = await signUp(r.data.name, r.data.email, r.data.password);
      if (result.needsEmailConfirmation) {
        toast.success("Account created. Please check your email and confirm your account, then log in.");
        await navigate({ to: "/login" });
      } else {
        toast.success("Account created successfully!");
        await navigate({ to: "/" });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <p className="eyebrow text-center">Join the house</p>
      <h1 className="mt-3 text-center text-4xl">Register</h1>
      <form onSubmit={submit} noValidate className="mt-10 space-y-4 rounded-md border border-border bg-card p-6 sm:p-8">
        <Field label="Full name" error={errors.name}><input name="name" autoComplete="name" required className="field" /></Field>
        <Field label="Email" error={errors.email}><input name="email" type="email" autoComplete="email" required className="field" /></Field>
        <Field label="Password" error={errors.password}><input name="password" type="password" autoComplete="new-password" required className="field" /></Field>
        <Field label="Confirm password" error={errors.confirm}><input name="confirm" type="password" autoComplete="new-password" required className="field" /></Field>
        <button disabled={busy} className="btn btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Creating account..." : "Create account"}</button>
        <p className="text-center text-sm text-muted-foreground">Already a member? <Link to="/login" className="text-gold">Login</Link></p>
      </form>
    </section>
  );
}
