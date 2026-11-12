import { z } from "zod";
export const email = z.string().trim().email("Enter a valid email").max(255);
export const required = (label: string, max = 100) => z.string().trim().min(1, `${label} is required`).max(max);
export function errorsOf(r: z.SafeParseReturnType<unknown, unknown>) {
  const e: Record<string, string> = {};
  if (!r.success) for (const i of r.error.issues) { const k = String(i.path[0]); e[k] ??= i.message; }
  return e;
}
export const formData = (f: HTMLFormElement) => Object.fromEntries(new FormData(f)) as Record<string, string>;
