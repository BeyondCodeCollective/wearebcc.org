"use client";

import { useId, useState, type SyntheticEvent } from "react";
import { CaretDown } from "@phosphor-icons/react";
import type { CentersJoinContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import { subscribe, type SubscribeFields } from "../../lib/subscribe";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Sticker } from "../../ui/Sticker";
import s from "./JoinForm.module.css";

type Props = { content: CentersJoinContent };

/** Email, what the person wants and their ZIP code, so dates near them can be sent. */
export function JoinForm({ content }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const uid = useId();
  const field = (name: string) => `${uid}-${name}`;

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    setState("sending");
    // The sign-up endpoint reads a ZIP code, which SubscribeFields does not list yet.
    const fields: SubscribeFields & { zip: string } = {
      email: value("email"),
      segment: value("want"),
      zip: value("zip"),
      website: value("website"),
    };
    const ok = await subscribe(content.subscribe, fields);
    setState(ok ? "done" : "error");
  }

  return (
    <Section id={content.id} surface="lemon" pad="lg" className={s.section}>
      <Sticker sticker={content.sticker} className={s.sticker} />
      <div className={s.layout}>
        <div className={s.intro}>
          <h2 className={cx(p.display, s.headline)}>
            {content.headline.map((line) => (
              <span key={line} className={s.line}>
                {line}
              </span>
            ))}
          </h2>
          <p className={s.body}>{content.body}</p>
        </div>

        <div className={s.formWrap}>
          {state !== "done" && (
            <form onSubmit={onSubmit} className={s.form}>
              <div className={s.fields}>
                <div className={s.field}>
                  <label htmlFor={field("email")} className={cx(p.mono, s.label)}>
                    {content.email.label}
                  </label>
                  <input
                    id={field("email")}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={content.email.placeholder}
                    className={s.input}
                  />
                </div>
                <div className={s.field}>
                  <label htmlFor={field("want")} className={cx(p.mono, s.label)}>
                    {content.want.label}
                  </label>
                  <span className={s.choice}>
                    <select id={field("want")} name="want" className={cx(s.input, s.select)}>
                      {content.want.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <CaretDown weight="bold" size={16} aria-hidden="true" className={s.caret} />
                  </span>
                </div>
                <div className={s.field}>
                  <label htmlFor={field("zip")} className={cx(p.mono, s.label)}>
                    {content.zip.label}
                  </label>
                  <input
                    id={field("zip")}
                    name="zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    pattern="[0-9]{5}"
                    placeholder={content.zip.placeholder}
                    className={s.input}
                  />
                </div>
              </div>
              <div className={s.trap} aria-hidden="true">
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <button
                type="submit"
                className={cx(p.button, p.ink, p.lg)}
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
