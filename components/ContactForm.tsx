"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });

  function update(
    field: keyof typeof form,
    value: string
  ) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      // TODO: wire this to your backend, an email service (e.g. Resend,
      // Formspree), or a Next.js Route Handler at /app/api/contact/route.ts.
      // The block below simulates a successful submission.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
      setForm({ name: "", email: "", subject: "General enquiry", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-forest/20 bg-forest/5 p-8 text-center">
        <p className="font-display text-xl font-semibold text-forest">
          Message sent — thank you.
        </p>
        <p className="mt-2 text-ink/70">
          We will get back to you as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-forest/20 bg-white/70 px-4 py-3 text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-ink">
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          className={inputClass}
        >
          <option>General enquiry</option>
          <option>I want to donate</option>
          <option>I want to volunteer</option>
          <option>Partnership</option>
          <option>Apply for support</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="How can we help?"
          className={`${inputClass} resize-y`}
          required
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-700">
          Please fill in your name, a valid email, and a message.
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </div>
  );
}
