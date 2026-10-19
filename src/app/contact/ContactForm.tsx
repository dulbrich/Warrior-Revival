"use client";

import type { FormEvent } from "react";

const CONTACT_EMAIL = "info@warrior-revival.org";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      return;
    }

    const subject = "Warrior Revival Contact Form Submission";
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-light p-6 shadow-card"
    >
      <div className="grid gap-4">
        <label className="text-base font-semibold text-textSecondary">
          Name
          <input
            className="mt-2 h-11 w-full rounded-md border border-border bg-white px-3 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
        </label>
        <label className="text-base font-semibold text-textSecondary">
          Email
          <input
            className="mt-2 h-11 w-full rounded-md border border-border bg-white px-3 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="text-base font-semibold text-textSecondary">
          Message
          <textarea
            className="mt-2 min-h-[140px] w-full rounded-md border border-border bg-white px-3 py-2 text-base text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            name="message"
            placeholder="How can we help?"
            required
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Send message
        </button>
        <p className="text-sm text-textSecondary">
          This opens your email app with your message ready to send.
        </p>
      </div>
    </form>
  );
}
