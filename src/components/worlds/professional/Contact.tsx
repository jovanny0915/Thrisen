import { useState } from "react";

/**
 * Phase 4.2: Contact form — name, email, message. Submit to Formspree when configured.
 * If Formspree isn't configured, falls back to opening a prefilled email draft.
 * Validation and success/error state.
 */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? "hello@example.com";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): boolean {
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    const next: Record<string, string> = {};
    if (!name) next.name = "Name is required.";
    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!message) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio contact from ${name || "website visitor"}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mb-14 scroll-mt-24" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-2xl font-bold text-cyan-100 mb-4">
        Contact
      </h2>
      <form
        onSubmit={handleSubmit}
        action={FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : undefined}
        method="POST"
        className="space-y-4 max-w-md"
      >
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-200 mb-1">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full px-3 py-2 border border-cyan-700/60 bg-slate-900/60 text-cyan-50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-200 mb-1">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-3 py-2 border border-cyan-700/60 bg-slate-900/60 text-cyan-50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-slate-200 mb-1">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            className="w-full px-3 py-2 border border-cyan-700/60 bg-slate-900/60 text-cyan-50 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.message}
            </p>
          )}
        </div>
        {status === "success" && (
          <p className="text-green-700 text-sm" role="status">
            Thanks! Your message was sent.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-4 py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-600 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
