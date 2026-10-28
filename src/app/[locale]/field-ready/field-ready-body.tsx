"use client";

import { useEffect } from "react";
import { FIELD_READY_HTML } from "./content";

type DataLayerWindow = Window & { dataLayer?: unknown[] };

export function FieldReadyBody() {
  useEffect(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement | null;
    if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }

    const form = document.getElementById("signup-form") as HTMLFormElement | null;
    const hint = document.getElementById("hint-join");
    if (!form || !hint) return;
    const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
    const field = (name: string) =>
      form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
    const say = (text: string, on: boolean) => {
      hint.textContent = text;
      hint.setAttribute("data-on", on ? "true" : "false");
    };

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const first = field("first").value.trim();
      const email = field("email").value.trim();
      const zip = field("zip").value.trim();
      const age = field("age").value;
      if (!first) {
        say("Please add your first name.", false);
        field("first").focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say("Please enter a valid email address.", false);
        field("email").focus();
        return;
      }
      if (button) button.disabled = true;
      say("Sending...", false);
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: first,
            email,
            zip,
            source: "field-ready",
            segment: age ? `Field Ready | Age ${age}` : "Field Ready",
            website: field("website").value,
          }),
        });
        if (!res.ok) throw new Error("subscribe failed");
        const w = window as DataLayerWindow;
        (w.dataLayer = w.dataLayer || []).push({
          event: "field_ready_signup",
          form: "field-ready",
        });
        form.reset();
        say("You're on the list. We'll email you when the first cohort opens.", true);
      } catch {
        say("Something went wrong. Please try again.", false);
      } finally {
        if (button) button.disabled = false;
      }
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: FIELD_READY_HTML }} />;
}
