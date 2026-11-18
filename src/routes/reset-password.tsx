import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/components/Layout";
import { errorsOf, formData } from "@/lib/validation";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — Hunain Watch" }] }),
  component: ResetPassword,
});

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  confirm: z.string(),
}).refine((values) => values.password === values.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

function ResetPassword() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(formData(event.currentTarget));
    setErrors(errorsOf(result));
    if (!result.success) return;
    setBusy(true);
    try {
      await updatePassword(result.data.password);
      toast.success("Password updated. You can now log in.");
      await navigate({ to: "/login" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update password. Please open the reset email link again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-20">
      <p className="eyebrow text-center">Account help</p>
      <h1 className="mt-3 text-center text-4xl">Choose a new password</h1>
      <form onSubmit={submit} noValidate className="mt-8 space-y-4 rounded-md border border-border bg-card p-6 sm:p-8">
        <Field label="New password" error={errors.password}><input name="password" type="password" autoComplete="new-password" required className="field" /></Field>
        <Field label="Confirm new password" error={errors.confirm}><input name="confirm" type="password" autoComplete="new-password" required className="field" /></Field>
        <button disabled={busy} className="btn btn-gold w-full disabled:opacity-60">{busy ? "Updating..." : "Update password"}</button>
        <p className="text-center text-sm text-muted-foreground"><Link to="/login" className="text-gold">Back to login</Link></p>
      </form>
    </section>
  );
}
