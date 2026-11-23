"use client";

import type { SyntheticEvent } from "react";
import type { PartnerPageContent } from "../../content/partner.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Contact.module.css";

type Props = { content: PartnerPageContent["contact"] };

/**
 * Contact form on lemon. There is no backend for it in the design: Send opens
 * the visitor's mail app with the fields written into a message.
 */
export function Contact({ content }: Props) {
  const { form } = content;

  function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const want = value(form.want.name);
    const body = [
      `${form.name.label}: ${value(form.name.name)}`,
      `${form.organization.label}: ${value(form.organization.name)}`,
      `${form.email.label}: ${value(form.email.name)}`,
      "",
      value(form.message.name),
    ].join("\n");
    const subject = `${form.mailto.subjectPrefix}${want}`;
    window.location.href = `mailto:${form.mailto.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
          <button type="submit" className={cx(p.button, p.ink, p.lg)}>
            {form.submit}
          </button>
        </form>
      </div>
    </Section>
  );
}
