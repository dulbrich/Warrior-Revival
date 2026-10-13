"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const redirectTo =
      `${window.location.origin}/admin/auth/callback?next=/admin/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });

    setSubmitting(false);

    if (error) {
      setError("Unable to send a reset email right now. Please try again later.");
      return;
    }

    setSent(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-light px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-card">
        <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
          Admin
        </p>
        <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary">
          Reset password
        </h1>
        <p className="mt-3 text-sm text-textSecondary">
          Enter your account email and we&apos;ll send you a secure password-reset
          link.
        </p>

        {sent ? (
          <div className="mt-6 rounded-md border border-success/40 bg-success/10 px-3 py-3 text-sm text-success">
            If an account exists for <span className="font-semibold">{email}</span>,
            a password-reset email is on its way.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-textPrimary">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary placeholder:text-textSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
            </label>

            {error ? (
              <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting || !email}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-textSecondary">
          <a href="/admin/login" className="underline hover:text-primary">
            Back to sign in
          </a>
        </p>
      </div>
    </main>
  );
}
