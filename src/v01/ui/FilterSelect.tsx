"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useId } from "react";
import { cx } from "../lib/cx";
import p from "./primitives.module.css";
import s from "./FilterSelect.module.css";

type Option<T extends string> = { id: T; label: string };

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/** Phones: one native select in place of a wall of filter chips, so the first item stays near the top. */
export function FilterSelect<T extends string>({ label, options, value, onChange, className }: Props<T>) {
  const id = useId();
  return (
    <div className={cx(s.wrap, className)}>
      <label htmlFor={id} className={cx(p.mono, s.label)}>
        {label}
      </label>
      <div className={s.field}>
        <select
          id={id}
          className={cx(p.mono, s.select)}
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDown size={18} weight="bold" aria-hidden="true" className={s.caret} />
      </div>
    </div>
  );
}
