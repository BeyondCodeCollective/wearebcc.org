import { SITE, CONTACT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-true-black px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {/* Logo & tagline */}
          <div>
            <span
              className="font-heading text-lg leading-[0.85] text-off-white"
              aria-label="Beyond Code Collective"
            >
              BEY0ND C0DE C0LLECT1VE
            </span>
            <p
              className="mt-3 font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {SITE.tagline}
            </p>
            <p
              className="mt-1 font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WeAreBCC.org
            </p>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              CONTACT
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {Object.entries(CONTACT).map(([key, email]) => (
                <a
                  key={key}
                  href={`mailto:${email}`}
                  className="text-sm text-off-white/70 transition-colors hover:text-off-white break-all"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* Social / Legal */}
          <div>
            <p
              className="font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FOLLOW US
            </p>
            <div className="mt-3 flex gap-4">
              <a
                href="#"
                className="text-sm text-off-white/70 transition-colors hover:text-off-white"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-off-white/70 transition-colors hover:text-off-white"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-sm text-off-white/70 transition-colors hover:text-off-white"
              >
                X
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-off-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-grey-3">
            &copy; {new Date().getFullYear()} Beyond Code Collective. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-grey-3 transition-colors hover:text-off-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-grey-3 transition-colors hover:text-off-white"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
