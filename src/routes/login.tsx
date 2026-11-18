import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/Layout";
import { email, errorsOf, formData } from "@/lib/validation";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Hunain Watch" }, { name: "description", content: "Sign in to your Hunain Watch account." }] }),
  component: Login,
});

const schema = z.object({ email, password: z.string().min(8, "Password must be at least 8 characters").max(100) });

function Login() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(formData(e.currentTarget));
    setErrors(errorsOf(r));
    if (!r.success) return;
    setBusy(true);
    try {
      await signIn(r.data.email, r.data.password);
      toast.success("Login successful. Welcome back!");
      await navigate({ to: "/" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <p className="eyebrow text-center">Welcome back</p>
      <h1 className="mt-3 text-center text-4xl">Login</h1>
      <form onSubmit={submit} noValidate className="mt-10 space-y-4 rounded-md border border-border bg-card p-6 sm:p-8">
        <Field label="Email" error={errors.email}><input name="email" type="email" autoComplete="email" required className="field" /></Field>
        <Field label="Password" error={errors.password}><input name="password" type="password" autoComplete="current-password" required className="field" /></Field>
        <div className="text-right"><Link to="/forgot-password" className="text-sm text-gold hover:underline">Forgot password?</Link></div>
        <button disabled={busy} className="btn btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Signing in..." : "Sign in"}</button>
        <p className="text-center text-sm text-muted-foreground">New here? <Link to="/register" className="text-gold">Create an account</Link></p>
      </form>
    </section>
  );
}
