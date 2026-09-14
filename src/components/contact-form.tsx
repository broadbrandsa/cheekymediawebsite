"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite" className="rounded-3xl border border-coral/30 bg-coral/5 p-8">
        <h2 className="type-h3">
          Thanks, that came through.
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          We will come back to you shortly. If it is urgent, give us a call on{" "}
          <span className="font-medium text-foreground">011 258 4465</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label-mono mt-6 inline-flex items-center rounded-pill border border-border px-6 py-4 transition-colors hover:bg-secondary"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot, hidden from people and catnip for bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="label-mono" htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label className="label-mono" htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="label-mono" htmlFor="phone">
            Phone <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label className="label-mono" htmlFor="company">
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="label-mono" htmlFor="message">What are you working on?</Label>
        <Textarea id="message" name="message" rows={6} required />
      </div>

      <div aria-live="assertive">
        {status === "error" && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-7 py-4 text-primary-foreground transition-colors hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send message
            <Send className="size-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
