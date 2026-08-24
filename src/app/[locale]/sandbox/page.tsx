import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/logo";

/**
 * The sandbox: work-in-progress pieces shared for feedback.
 *
 * To publish something, drop the file into public/sandbox/ and push — that is
 * the whole workflow. It becomes reachable at /sandbox/<filename> and this
 * page lists it automatically (title pulled from the HTML <title> tag, so
 * name that well). No manifest, no constants file, nothing else to edit.
 *
 * Unlisted, same posture as /links: noindex keeps it out of search, anyone
 * with the link can see it. Static files get the matching X-Robots-Tag header
 * in next.config.ts. Nothing confidential belongs here — for gated material
 * use /decks, which sits behind the partner gate.
 */

const SANDBOX_DIR = path.join(process.cwd(), "public", "sandbox");

// Extensions that show up in the list. Notes-to-self (.md, .txt) and dotfiles
// stay out of the index but are still served if you hand out a direct link.
const LISTED = new Set([
  ".html",
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".mp4",
  ".webm",
]);

type Entry = {
  file: string;
  href: string;
  title: string;
  kind: string;
};

/** "lxp-learner-journey" → "Lxp learner journey" — last resort when a file
 * has no readable <title>. */
function titleFromFilename(name: string): string {
  const bare = name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return bare.charAt(0).toUpperCase() + bare.slice(1);
}

function htmlTitle(filePath: string): string | null {
  try {
    const head = fs.readFileSync(filePath, "utf8").slice(0, 8192);
    const match = head.match(/<title>([^<]*)<\/title>/i);
    const title = match?.[1].trim();
    return title ? title : null;
  } catch {
    return null;
  }
}

function getEntries(): Entry[] {
  let files: string[];
  try {
    files = fs.readdirSync(SANDBOX_DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => !f.startsWith(".") && LISTED.has(path.extname(f).toLowerCase()))
    .sort()
    .map((file) => {
      const ext = path.extname(file).toLowerCase();
      const title =
        (ext === ".html" ? htmlTitle(path.join(SANDBOX_DIR, file)) : null) ??
        titleFromFilename(file);
      return {
        file,
        href: `/sandbox/${file}`,
        title,
        kind: ext.slice(1).toUpperCase(),
      };
    });
}

const TITLE = "BCC Sandbox — Works in progress";
const DESCRIPTION =
  "Diagrams, drafts, and explorations shared for feedback. Not the finished thing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
};

export default function SandboxPage() {
  const entries = getEntries();

  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-off-white px-6 py-14">
      <div className="w-full max-w-2xl">
        <Logo variant="stacked" color="black" className="h-14 w-auto" />

        <p
          className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          [ Sandbox ]
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2.5rem,9vw,3.5rem)] leading-[0.9] text-true-black">
          Works in progress
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-charcoal">
          Diagrams, drafts, and explorations shared for feedback. Everything
          here is a working document, not the finished thing.
        </p>

        {entries.length === 0 ? (
          <p
            className="mt-12 font-mono text-sm uppercase tracking-wider text-grey-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Nothing here yet.
          </p>
        ) : (
          <ul className="mt-12 border-t border-true-black/15">
            {entries.map((entry, i) => (
              <li key={entry.file} className="border-b border-true-black/15">
                <a
                  href={entry.href}
                  className="group flex items-baseline gap-4 py-5 transition-colors hover:bg-true-black/[0.03] sm:gap-6"
                >
                  <span
                    className="shrink-0 font-mono text-xs text-grey-3"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-medium leading-snug text-true-black group-hover:text-cobalt">
                      {entry.title}
                    </span>
                    <span
                      className="mt-1 block truncate font-mono text-xs uppercase tracking-wider text-grey-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {entry.kind} · {entry.file}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="shrink-0 self-center text-cobalt"
                  />
                </a>
              </li>
            ))}
          </ul>
        )}

        <p
          className="mt-12 font-mono text-xs uppercase tracking-wider text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Unlisted — share the link, not search. wearebcc.org
        </p>
      </div>
    </main>
  );
}
