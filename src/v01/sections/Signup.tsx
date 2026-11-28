"use client";

import { useId, useState, type SyntheticEvent } from "react";
import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react";
import type { SignupContent } from "../content/types";
import { cx } from "../lib/cx";
import { subscribe } from "../lib/subscribe";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import { EventFacts } from "./events/EventFacts";
import s from "./Signup.module.css";

type Props = {
  content: SignupContent;
  id?: string;
  /** The Sign up page has no other headline, so its form carries the h1. */
  heading?: "h1" | "h2";
};

/**
 * Sign-up as a plain form: one labelled box per answer. When the person came
 * from a named session or program, the form says which one before it asks anything.
 * Posts to the endpoint named in its content.
 */
export function Signup({ content, id, heading: Heading = "h2" }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const uid = useId();
  const f = content.fields;
  const field = (name: string) => `${uid}-${name}`;
  const context = content.context;

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    setState("sending");
    const ok = await subscribe(content.subscribe, {
      email: value("email"),
      firstName: value("firstName"),
      segment: value("interest"),
      city: value("city"),
      language: value("language"),
      website: value("website"),
    });
    setState(ok ? "done" : "error");
  }

  return (
    <Section id={id} surface="peach" pad="sm">
      <div className={s.inner}>
        <div className={s.copy}>
          <Heading className={cx(p.display, s.headline)}>{content.headline}</Heading>
          <p className={s.lede}>{content.lede}</p>
          {context && (
            <div className={s.context} data-surface="ink">
              <p className={s.contextLabel}>{context.label}</p>
              <p className={cx(p.display, s.contextTitle)}>{context.title}</p>
              {context.when && <p className={s.contextWhen}>{context.when}</p>}
              <EventFacts facts={context.facts} className={s.contextFacts} />
              <p className={s.contextNote}>{context.note}</p>
            </div>
          )}
        </div>

        <div className={s.formWrap}>
          {state !== "done" && (
            <form aria-label={content.ariaLabel} onSubmit={onSubmit} className={s.form}>
              <div className={s.fields}>
                <div className={s.field}>
                  <label htmlFor={field("name")} className={s.label}>
                    {f.name.label}
                  </label>
                  <input
                    id={field("name")}
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder={f.name.placeholder}
                    className={s.control}
                  />
                </div>
                <div className={s.field}>
                  <label htmlFor={field("email")} className={s.label}>
                    {f.email.label}
                  </label>
                  <input
                    id={field("email")}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={f.email.placeholder}
                    className={s.control}
                  />
                </div>
                <div className={cx(s.field, s.wide)}>
                  <label htmlFor={field("interest")} className={s.label}>
                    {f.interest.label}
                  </label>
                  <span className={s.choice}>
                    <select id={field("interest")} name="interest" className={cx(s.control, s.select)}>
                      {f.interest.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <CaretDown weight="bold" aria-hidden="true" className={s.caret} />
                  </span>
                </div>
                <div className={s.field}>
                  <label htmlFor={field("city")} className={s.label}>
                    {f.city.label}
                  </label>
                  <input
                    id={field("city")}
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder={f.city.placeholder}
                    className={s.control}
                  />
                </div>
                <div className={s.field}>
                  <label htmlFor={field("language")} className={s.label}>
                    {f.language.label}
                  </label>
                  <span className={s.choice}>
                    <select id={field("language")} name="language" className={cx(s.control, s.select)}>
                      {f.language.options.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <CaretDown weight="bold" aria-hidden="true" className={s.caret} />
                  </span>
                </div>
              </div>

              <div className={s.trap} aria-hidden="true">
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className={s.foot}>
                <button
                  type="submit"
                  className={cx(p.button, p.ink, p.xl)}
                  aria-busy={state === "sending"}
                  disabled={state === "sending"}
                >
                  {content.submit}
                </button>
                <p className={s.note}>{content.note}</p>
              </div>
            </form>
          )}

          <div role="status" aria-live="polite">
            {state === "done" && (
              <div className={s.done}>
                <p className={cx(p.display, s.doneTitle)}>{content.messages.success}</p>
                <p className={s.doneBody}>{content.messages.successBody}</p>
              </div>
            )}
            {state === "error" && <p className={s.error}>{content.messages.error}</p>}
          </div>
        </div>

        {content.sticker && (
          <Image
            src={content.sticker.src}
            alt=""
            aria-hidden="true"
            width={260}
            height={260}
            sizes="160px"
            className={s.sticker}
          />
        )}
      </div>
    </Section>
  );
}
