import s from "./ReadingProgress.module.css";

/**
 * Thin bar under the header that fills as the page scrolls. Pure CSS: it only
 * appears in browsers that support scroll-linked animation.
 */
export function ReadingProgress() {
  return (
    <div aria-hidden="true" className={s.track}>
      <div className={s.fill} />
    </div>
  );
}
