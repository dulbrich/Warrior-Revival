"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setAuthorized(Boolean(data.user));
      setReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 12) {
      setError("Use at least 12 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setSubmitting(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setSubmitting(false);
      setError(error.message);
      return;
    }

    await supabase.auth.signOut();
    window.location.assign("/admin/login?password=updated");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-light px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-card">
        <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
          Admin
        </p>
        <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary">
          Choose a new password
        </h1>

        {!ready ? (
          <p className="mt-5 text-sm text-textSecondary">Checking your session...</p>
        ) : !authorized ? (
          <>
            <p className="mt-5 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600">
              Sign in or use a valid password-reset link to change your password.
            </p>
            <p className="mt-5 text-center text-sm">
              <a
                href="/admin/forgot-password"
                className="font-semibold text-primary underline underline-offset-4"
              >
                Request a new reset link
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm text-textSecondary">
              Use at least 12 characters. After saving, you&apos;ll sign in again
              with your new password.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-textPrimary">
                  New password
                </span>
                <input
                  type="password"
                  required
                  minLength={12}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-textPrimary">
                  Confirm password
                </span>
                <input
                  type="password"
                  required
                  minLength={12}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </label>

              {error ? (
                <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save password"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
