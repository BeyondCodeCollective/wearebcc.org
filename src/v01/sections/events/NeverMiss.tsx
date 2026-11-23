"use client";

import { useId, useState, type SyntheticEvent } from "react";
import type { NeverMissContent } from "../../content/events.types";
import { cx } from "../../lib/cx";
import { subscribe } from "../../lib/subscribe";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./NeverMiss.module.css";

type Props = { content: NeverMissContent };

/** Email sign-up on lemon. Posts to the endpoint named in its content. */
export function NeverMiss({ content }: Props) {
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
    <Section id="signup" surface="lemon" pad="lg">
      <div className={s.inner}>
        <h2 className={cx(p.display, s.headline)}>
          {content.headline.map((line) => (
            <span key={line} className={s.line}>
              {line}
            </span>
          ))}
        </h2>
        <div className={s.formWrap}>
          {state !== "done" && (
            <form className={s.form} onSubmit={onSubmit}>
              <div className={s.field}>
                <label htmlFor={id} className={cx(p.mono, s.label)}>
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
              </div>
              <div className={s.trap} aria-hidden="true">
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <button
                type="submit"
                className={cx(p.button, p.ink, p.lg, s.submit)}
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
        </div>
      </div>
    </Section>
  );
}
