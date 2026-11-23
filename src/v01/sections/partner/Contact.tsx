"use client";

import { useState, type SyntheticEvent } from "react";
import type { PartnerPageContent } from "../../content/partner.types";
import { cx } from "../../lib/cx";
import { subscribe } from "../../lib/subscribe";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Contact.module.css";

type Props = { content: PartnerPageContent["contact"] };

/**
 * Contact form on lemon. Send posts the inquiry to the sign-up endpoint, which
 * stores it, tells the team and adds the contact to Mailchimp.
 */
export function Contact({ content }: Props) {
  const { form } = content;
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    setState("sending");
    const ok = await subscribe(form.subscribe, {
      email: value(form.email.name),
      firstName: value(form.name.name),
      company: value(form.organization.name),
      segment: value(form.want.name),
      message: value(form.message.name),
      website: value("website"),
    });
    setState(ok ? "done" : "error");
  }

  return (
    <Section id={content.id} surface="lemon" pad="lg">
      <div className={s.layout}>
        <div className={s.copy}>
          <h2 className={cx(p.display, s.headline)}>
            {content.headline.map((line, index) => (
              <span key={line}>
                {line}
                {index < content.headline.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={s.intro}>
            {content.intro.map((part) =>
              typeof part === "string" ? (
                part
              ) : (
                <a key={part.href} href={part.href}>
                  {part.label}
                </a>
              ),
            )}
          </p>
          <p className={s.address}>
            {content.address.map((line, index) => (
              <span key={line}>
                {line}
                {index < content.address.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        <div className={s.formWrap}>
          {state !== "done" && (
        <form aria-label={form.ariaLabel} onSubmit={onSubmit} className={s.form}>
          <div className={s.fields}>
            <div className={s.field}>
              <label htmlFor={form.name.id} className={cx(p.mono, s.label)}>
                {form.name.label}
              </label>
              <input id={form.name.id} name={form.name.name} type="text" autoComplete="name" className={s.control} />
            </div>
            <div className={s.field}>
              <label htmlFor={form.organization.id} className={cx(p.mono, s.label)}>
                {form.organization.label}
              </label>
              <input
                id={form.organization.id}
                name={form.organization.name}
                type="text"
                autoComplete="organization"
                className={s.control}
              />
            </div>
            <div className={s.field}>
              <label htmlFor={form.email.id} className={cx(p.mono, s.label)}>
                {form.email.label}
              </label>
              <input
                id={form.email.id}
                name={form.email.name}
                type="email"
                required
                autoComplete="email"
                placeholder={form.email.placeholder}
                className={s.control}
              />
            </div>
            <div className={s.field}>
              <label htmlFor={form.want.id} className={cx(p.mono, s.label)}>
                {form.want.label}
              </label>
              <select id={form.want.id} name={form.want.name} className={s.control}>
                {form.want.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className={cx(s.field, s.wide)}>
              <label htmlFor={form.message.id} className={cx(p.mono, s.label)}>
                {form.message.label}
              </label>
              <textarea id={form.message.id} name={form.message.name} rows={4} className={cx(s.control, s.message)} />
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
            {form.submit}
          </button>
        </form>
          )}
          <div role="status" aria-live="polite">
            {state === "done" && (
              <p className={s.done}>
                <strong className={cx(p.title, s.doneTitle)}>{form.messages.success}</strong>
                <span>{form.messages.successBody}</span>
              </p>
            )}
            {state === "error" && <p className={s.error}>{form.messages.error}</p>}
          </div>
        </div>
      </div>
    </Section>
  );
}
