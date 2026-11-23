import type { ReactNode } from "react";

type Props = { text: string; emphasis: string; className: string };

/** Renders a line with one phrase pulled out in its own element so CSS can make it louder. The words stay exactly as written. */
export function Emphasis({ text, emphasis, className }: Props): ReactNode {
  const at = text.indexOf(emphasis);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className={className}>{emphasis}</strong>
      {text.slice(at + emphasis.length)}
    </>
  );
}
