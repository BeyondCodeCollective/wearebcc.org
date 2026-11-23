"use client";

import { useId, useState, type SyntheticEvent } from "react";
import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react";
import type { SignupContent } from "../content/types";
import { cx } from "../lib/cx";
import { subscribe } from "../lib/subscribe";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Signup.module.css";

type Props = { content: SignupContent; id?: string };

/**
 * A choice set into the sentence. The value shows in the display type while the
 * real select lies invisibly over it at body size. The native list opens at the
 * control's own font size, so a select set in the sentence type filled the screen.
 */
function Choice({ id, name, options }: { id: string; name: string; options: string[] }) {
  const [value, setValue] = useState(options[0] ?? "");
  return (
    <span className={s.choice}>
      <span className={cx(s.field, s.value)} aria-hidden="true">
        {value}
      </span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={s.select}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <CaretDown weight="bold" aria-hidden="true" className={s.caret} />
    </span>
  );
}

/**
 * Sign-up written as one sentence with the fields set into it.
 * Posts to the endpoint named in its content.
 */
export function Signup({ content, id }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const uid = useId();
  const t = content.sentence;
  const field = (name: string) => `${uid}-${name}`;

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
        {state !== "done" && (
          <form aria-label={content.ariaLabel} onSubmit={onSubmit}>
            <p className={cx(p.display, s.sentence)}>
              {t.intro}{" "}
              <label htmlFor={field("name")} className={p.srOnly}>
                {t.name.label}
              </label>
              <input
                id={field("name")}
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder={t.name.placeholder}
                className={cx(s.field, s.name)}
              />{" "}
              {t.want}{" "}
              <label htmlFor={field("interest")} className={p.srOnly}>
                {t.interest.label}
              </label>
              <Choice id={field("interest")} name="interest" options={t.interest.options} />{" "}
              {t.place}{" "}
              <label htmlFor={field("city")} className={p.srOnly}>
                {t.city.label}
              </label>
              <span className={s.keep}>
                <input
                id={field("city")}
                name="city"
                type="text"
                autoComplete="address-level2"
                placeholder={t.city.placeholder}
                className={cx(s.field, s.city)}
              />
                {t.cityEnd}
              </span>{" "}
              {t.write}{" "}
              <label htmlFor={field("language")} className={p.srOnly}>
                {t.language.label}
              </label>
              <Choice id={field("language")} name="language" options={t.language.options} />{" "}
              {t.at}{" "}
              <label htmlFor={field("email")} className={p.srOnly}>
                {t.email.label}
              </label>
              <span className={s.keep}>
                <input
                id={field("email")}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t.email.placeholder}
                className={cx(s.field, s.email)}
              />
                {t.end}
              </span>
            </p>

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

        {content.sticker && (
          <Image
            src={content.sticker.src}
            alt=""
            aria-hidden="true"
            width={260}
            height={260}
            sizes="260px"
            className={s.sticker}
          />
        )}
      </div>
    </Section>
  );
}
