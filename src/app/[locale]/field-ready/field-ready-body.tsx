"use client";

import { useEffect } from "react";
import { FIELD_READY_HTML, FIELD_READY_STRINGS } from "./content";

type DataLayerWindow = Window & { dataLayer?: unknown[] };

export function FieldReadyBody({ locale }: { locale: "en" | "es" }) {
  useEffect(() => {
    const t = FIELD_READY_STRINGS[locale];
    const video = document.getElementById("hero-video") as HTMLVideoElement | null;
    const toggle = document.getElementById("vid-toggle") as HTMLButtonElement | null;
    const sync = () => {
      if (!video || !toggle) return;
      const paused = video.paused;
      toggle.textContent = paused ? t.play : t.pause;
      toggle.setAttribute("aria-label", paused ? t.playLabel : t.pauseLabel);
      toggle.setAttribute("aria-pressed", paused ? "true" : "false");
    };
    const onToggle = () => {
      if (!video) return;
      if (video.paused) void video.play().catch(() => {});
      else video.pause();
    };
    if (video && toggle) {
      video.muted = true;
      video.addEventListener("play", sync);
      video.addEventListener("pause", sync);
      toggle.addEventListener("click", onToggle);
      // Some browsers (iOS Low Power Mode) refuse autoplay: the button then reads "Play".
      void video.play().catch(sync);
      sync();
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
        say(t.needName, false);
        field("first").focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say(t.needEmail, false);
        field("email").focus();
        return;
      }
      if (button) button.disabled = true;
      say(t.sending, false);
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
        say(t.done, true);
      } catch {
        say(t.error, false);
      } finally {
        if (button) button.disabled = false;
      }
    };

    form.addEventListener("submit", onSubmit);
    return () => {
      form.removeEventListener("submit", onSubmit);
      toggle?.removeEventListener("click", onToggle);
      video?.removeEventListener("play", sync);
      video?.removeEventListener("pause", sync);
    };
  }, [locale]);

  return <div dangerouslySetInnerHTML={{ __html: FIELD_READY_HTML[locale] }} />;
}
