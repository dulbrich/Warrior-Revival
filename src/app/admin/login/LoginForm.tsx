"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const passwordParam = searchParams.get("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setSubmitting(false);
    if (error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.assign("/admin");
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-card">
      <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
        Admin
      </p>
      <h1 className="mt-2 font-blackOps text-3xl font-normal text-primary">Sign in</h1>
      <p className="mt-3 text-sm text-textSecondary">
        Sign in with the email and password for your Warrior Revival account.
      </p>

      {passwordParam === "updated" ? (
        <p className="mt-5 rounded-md border border-success/40 bg-success/10 px-3 py-2 text-sm text-success">
          Password updated. Sign in with your new password.
        </p>
      ) : null}

      {errorParam === "not_authorized" ? (
        <p className="mt-5 rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning">
          That account isn&apos;t authorized for the admin area. Sign in with a
          different account or contact the site owner.
        </p>
      ) : null}
      {errorParam === "callback_failed" ? (
        <p className="mt-5 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          That recovery or invitation link was invalid or expired. Request a new
          password reset below.
        </p>
      ) : null}
      {errorParam === "dev_signin_email_missing" ? (
        <p className="mt-5 rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-warning">
          Dev shortcut hit but <code>DEV_AUTH_EMAIL</code> isn&apos;t set in
          <code>.env.local</code>. Add it or sign in normally.
        </p>
      ) : null}
      {errorParam === "dev_signin_failed" ? (
        <p className="mt-5 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          Dev sign-in couldn&apos;t generate a session. Check the server logs.
        </p>
      ) : null}

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
        <label className="block">
          <span className="text-sm font-semibold text-textPrimary">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          disabled={submitting || !email || !password}
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-5 text-center text-sm">
        <a
          href="/admin/forgot-password"
          className="font-semibold text-primary underline decoration-border underline-offset-4 hover:text-secondary"
        >
          Forgot password?
        </a>
        <p className="mt-2 text-xs text-textSecondary">
          New or previously magic-link-only account? Use Forgot password to set
          your first password.
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-textSecondary">
        <a href="/" className="underline hover:text-primary">
          Back to site
        </a>
      </p>
    </div>
  );
}
