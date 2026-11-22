"use client";

import { useState, type SyntheticEvent } from "react";
import type { HeroContent } from "../content/types";
import { cx } from "../lib/cx";
import { subscribe } from "../lib/subscribe";
import p from "./primitives.module.css";
import s from "./EmailForm.module.css";

type Props = { id: string; content: HeroContent["form"] };

/** One email field and a button. Posts to the endpoint named in its content. */
export function EmailForm({ id, content }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const data = new FormData(event.currentTarget);
    setState("sending");
    const ok = await subscribe(content.subscribe, {
      email: String(data.get("email") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    });
    setState(ok ? "done" : "error");
  }

  return (
    <div>
      {state !== "done" && (
        <form className={s.form} onSubmit={onSubmit}>
          <label htmlFor={id} className={cx(p.mono, s.label)}>
            {content.label}
          </label>
          <div className={s.row}>
            <input
              id={id}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={content.placeholder}
              aria-describedby={`${id}-help`}
              className={s.input}
            />
            <button
              type="submit"
              className={cx(p.button, p.ink, p.lg)}
              aria-busy={state === "sending"}
              disabled={state === "sending"}
            >
              {content.submit}
            </button>
          </div>
          <div className={s.trap} aria-hidden="true">
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <p id={`${id}-help`} className={s.helper}>
            {content.helper}
          </p>
        </form>
      )}
      <div role="status" aria-live="polite">
        {state === "done" && (
          <p className={s.done}>
            <strong className={cx(p.title, s.doneTitle)}>{content.messages.success}</strong>
            <span className={s.doneBody}>{content.messages.successBody}</span>
          </p>
        )}
        {state === "error" && <p className={s.error}>{content.messages.error}</p>}
      </div>
    </div>
  );
}
