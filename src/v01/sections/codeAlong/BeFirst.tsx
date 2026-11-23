"use client";

import { useId, useState, type SyntheticEvent } from "react";
import type { BeFirstContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import { subscribe } from "../../lib/subscribe";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Badge } from "./parts";
import parts from "./parts.module.css";
import s from "./BeFirst.module.css";
import t from "./tone.module.css";

type Props = { content: BeFirstContent };

/** Email sign-up for new-episode alerts. Posts to the endpoint named in its content. */
export function BeFirst({ content }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const id = useId();

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
    <Section id="signup" surface="paper" pad="lg" className={t.lemon}>
      <div className={s.stack}>
        <Badge tone="navy">{content.badge}</Badge>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <p className={s.lede}>{content.lede}</p>
        {state !== "done" && (
          <form className={s.form} onSubmit={onSubmit}>
            <label htmlFor={id} className={p.srOnly}>
              {content.label}
            </label>
            <input
              id={id}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={content.placeholder}
              className={s.input}
            />
            <div className={s.trap} aria-hidden="true">
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button
              type="submit"
              className={cx(p.button, parts.cta, parts.solid)}
              aria-busy={state === "sending"}
              disabled={state === "sending"}
            >
              {content.submit}
            </button>
          </form>
        )}
        <div role="status" aria-live="polite">
          {state === "done" && (
            <p className={s.done}>
              <strong className={cx(p.title, s.doneTitle)}>{content.messages.success}</strong>
              <span>{content.messages.successBody}</span>
            </p>
          )}
          {state === "error" && <p className={s.error}>{content.messages.error}</p>}
        </div>
        <p className={cx(p.mono, s.fine)}>{content.fine}</p>
      </div>
    </Section>
  );
}
