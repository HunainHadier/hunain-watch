import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/Layout";
import { email, errorsOf, formData } from "@/lib/validation";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — Hunain Watch" }] }),
  component: ForgotPassword,
});

const schema = z.object({ email });

function ForgotPassword() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { resetPassword } = useAuth();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(formData(event.currentTarget));
    setErrors(errorsOf(result));
    if (!result.success) return;
    setBusy(true);
    try {
      await resetPassword(result.data.email);
      toast.success("If an account exists for this email, a password reset link has been sent.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send the reset email.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <p className="eyebrow text-center">Account help</p>
      <h1 className="mt-3 text-center text-4xl">Forgot password?</h1>
      <p className="mt-3 text-center text-sm text-muted-foreground">Enter your account email and we’ll send you a password reset link.</p>
      <form onSubmit={submit} noValidate className="mt-8 space-y-4 rounded-md border border-border bg-card p-6 sm:p-8">
        <Field label="Email" error={errors.email}><input name="email" type="email" autoComplete="email" required className="field" /></Field>
        <button disabled={busy} className="btn btn-gold w-full disabled:opacity-60">{busy ? "Sending..." : "Send reset email"}</button>
        <p className="text-center text-sm text-muted-foreground"><Link to="/login" className="text-gold">Back to login</Link></p>
      </form>
    </section>
  );
}
