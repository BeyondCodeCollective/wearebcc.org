"use client";

import { motion } from "framer-motion";
import {
  GoogleLogo,
  MicrosoftLogo,
  AmazonLogo,
  MetaLogo,
  AppleLogo,
  SalesforceLogo,
  IBMLogo,
  AdobeLogo,
} from "./ui/brand-logos";

const LOGOS = [
  { name: "Google", Component: GoogleLogo, width: "w-20" },
  { name: "Microsoft", Component: MicrosoftLogo, width: "w-7" },
  { name: "Amazon", Component: AmazonLogo, width: "w-24" },
  { name: "Meta", Component: MetaLogo, width: "w-20" },
  { name: "Apple", Component: AppleLogo, width: "w-7" },
  { name: "Salesforce", Component: SalesforceLogo, width: "w-10" },
  { name: "IBM", Component: IBMLogo, width: "w-14" },
  { name: "Adobe", Component: AdobeLogo, width: "w-7" },
];

export function TrustBar() {
  return (
    <section className="border-b border-grey-2/50 bg-off-white px-6 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-wider uppercase text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Where Tech Careers Are Being Built
        </motion.p>

        <div className="mt-4 relative overflow-hidden">
          <div className="flex animate-scroll items-center gap-16 whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className={`flex-shrink-0 text-grey-3/30 transition-colors hover:text-grey-3 ${logo.width} h-8`}
              >
                <logo.Component className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
