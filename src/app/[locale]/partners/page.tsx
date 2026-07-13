"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LockSimple, ShieldCheck, ArrowUpRight } from "@phosphor-icons/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const STORAGE_KEY = "bcc-partner-portal-unlocked";

const CREDENTIALS = [
  "CompTIA Tech+",
  "CompTIA Network+",
  "CompTIA Security+ (SY0-701)",
  "SOC-Analyst Capstone",
  "Durable Skills Coaching",
];

const PILLARS = [
  {
    n: "01",
    title: "STACKED CREDENTIALS",
    text: "Tech+, Network+, and Security+ — industry-recognized proof that compounds, not a single bootcamp certificate.",
  },
  {
    n: "02",
    title: "HANDS-ON CAPSTONE",
    text: "A completed SOC-analyst simulation demonstrates ability directly, even for candidates without prior security job history.",
  },
  {
    n: "03",
    title: "DURABLE SKILLS",
    text: "Our career coaching curriculum builds the reliability, communication, and follow-through that make entry-level hires stick.",
  },
  {
    n: "04",
    title: "ONGOING SUPPORT",
    text: "We stay engaged after the hire with wraparound support to protect retention.",
  },
];

const ROLES = [
  {
    track: "Track · Operations",
    title: "SOC ANALYST I",
    text: "Security operations, SIEM monitoring, and alert triage — backed directly by the cohort's capstone. Multiple candidates name SOC work as their clear goal.",
  },
  {
    track: "Track · Foundations",
    title: "IT SUPPORT & HELP DESK",
    text: "Service desk, desktop, and technical support — the proven on-ramp for candidates with Network+/Tech+ and strong transferable experience.",
  },
  {
    track: "Track · Governance",
    title: "GRC & COMPLIANCE",
    text: "Governance, risk, IT audit, and compliance analysis — a natural fit for candidates coming from audit, Salesforce administration, and operations.",
  },
  {
    track: "Track · Cloud & Automation",
    title: "CLOUD & SECURITY AUTOMATION",
    text: "Entry cloud security and DevSecOps-adjacent roles — including a QA-automation engineer bridging into security automation.",
  },
];

const CALIBER = [
  {
    tag: "SOC · Forensics",
    text: "Cybersecurity master's candidate, fluent in ServiceNow, Wireshark, and Azure — targeting SOC and digital-forensics roles.",
  },
  {
    tag: "Security Leadership Track",
    text: "Former Director of Systems Development from the nonprofit IT world, bringing management depth into a security pivot.",
  },
  {
    tag: "Security Automation",
    text: "QA automation engineer with a clear bridge story: from test automation into DevSecOps and security automation.",
  },
  {
    tag: "GRC · Compliance",
    text: "Salesforce administrator and consultant moving deliberately toward governance, risk, and compliance work.",
  },
  {
    tag: "Security Operations",
    text: "Military IT veteran seeking to stay in IT and security operations — a repeat, high-commitment learner.",
  },
  {
    tag: "SOC · SIEM · GRC",
    text: "Local-government data and audit analyst, ServiceNow user, targeting SOC, SIEM, and GRC pathways.",
  },
];

const STEPS = [
  {
    n: "Step 01",
    title: "INFORMATIONAL INTERVIEW",
    text: "Give 30 minutes to a candidate. Low lift, and it doubles as real-world exposure for our learners.",
  },
  {
    n: "Step 02",
    title: "PREVIEW AT DEMO DAY",
    text: "Join us in early September to watch the cohort present their SOC-analyst capstones live.",
  },
  {
    n: "Step 03",
    title: "INTERVIEW IN OCTOBER",
    text: "Commit to interview job-ready candidates matched to your open roles.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const;

function MonoLabel({
  children,
  className = "text-cobalt",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-wider ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </p>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setError(false);
    try {
      const res = await fetch("/api/partner-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        onUnlock();
        return;
      }
    } catch {
      // treat as wrong password
    }
    setError(true);
    setChecking(false);
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-off-white px-6 pt-36 pb-20 lg:pt-44">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={submit}
        className="w-full max-w-sm"
      >
        <span className="flex h-12 w-12 items-center justify-center bg-cobalt text-off-white">
          <LockSimple size={20} weight="bold" />
        </span>
        <MonoLabel className="mt-6 text-cobalt">[ Partners Only ]</MonoLabel>
        <h1 className="mt-3 font-heading text-4xl leading-[0.9] text-true-black">
          PARTNER
          <br />
          ACCESS
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-grey-3">
          This page is for Beyond Code Collective hiring partners. Enter the
          access code you received from our team.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Access code"
          autoFocus
          className="mt-6 w-full border border-true-black/20 bg-white px-4 py-3 font-mono text-sm tracking-wider outline-none focus:border-cobalt"
          style={{ fontFamily: "var(--font-mono)" }}
        />
        {error ? (
          <p className="mt-2 text-sm text-orange">
            That code didn&apos;t work. Please try again.
          </p>
        ) : null}
        <button
          type="submit"
          disabled={checking || !password}
          className="mt-4 w-full bg-true-black px-6 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-cobalt disabled:opacity-50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {checking ? "Checking..." : "View Partner Page"}
        </button>
      </motion.form>
    </section>
  );
}

function CatalystContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark-cobalt px-6 pt-36 pb-16 lg:px-8 lg:pt-44 lg:pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-electric-green" />
              <MonoLabel className="text-electric-green">
                Catalyst · Cybersecurity Cohort
              </MonoLabel>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.85] text-off-white">
              HIRE
              <br />
              <span className="text-electric-green">READY.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-off-white/70 sm:text-lg">
              A cohort of certified, screened, job-ready cybersecurity talent —
              available to interview this October.
            </p>
            <a
              href="mailto:mica@wearebcc.org"
              className="mt-8 inline-flex items-center gap-2 bg-cobalt px-6 py-4 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-off-white hover:text-true-black"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Talk To Our Team
              <ArrowUpRight size={14} weight="bold" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative hidden aspect-[4/3] overflow-hidden lg:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://beyondcode-catalyst.vercel.app/hero.jpg"
              alt="Beyond Code Catalyst cohort collaborating"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-off-white/10 bg-true-black px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6">
          {[
            { stat: "15", label: "Vetted candidates in the inaugural cohort" },
            { stat: "OCT", label: "Interview-ready · 2026 placement window" },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-none text-electric-green">
                {item.stat}
              </p>
              <p
                className="mt-2 font-mono text-[10px] uppercase tracking-wider text-off-white/50"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hook */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal}>
            <MonoLabel>[ The Gap ]</MonoLabel>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.92] text-true-black">
              THERE ARE MORE OPEN CYBER ROLES THAN CREDENTIALED PEOPLE TO FILL
              THEM.{" "}
              <span className="text-cobalt">
                WE&apos;VE SCREENED THE TALENT TO CLOSE THE GAP.
              </span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-grey-3 sm:text-lg">
              Beyond Code&apos;s Cybersecurity cohort is a pre-vetted pipeline
              of career-changers who hold stacked CompTIA industry credentials,
              have completed a live SOC-analyst simulation, and bring extensive
              work experience with transferable skills.{" "}
              <strong className="text-true-black">
                You get first access to proven talent.
              </strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certified & Screened + Why the model works */}
      <section className="bg-grey-1 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <motion.div {...reveal}>
            <MonoLabel>[ Who You&apos;re Hiring ]</MonoLabel>
            <h3 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-4xl">
              CERTIFIED &amp;
              <br />
              SCREENED
            </h3>
            <p className="mt-5 text-base leading-relaxed text-grey-3">
              Every candidate enters your pipeline already holding a stack of
              CompTIA credentials, with all of them finishing Security+
              certification by Q4 2026.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CREDENTIALS.map((c) => (
                <span
                  key={c}
                  className="border border-true-black/30 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-true-black"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-6 text-base leading-relaxed text-grey-3">
              These aren&apos;t first-time learners. They&apos;re bringing real
              careers in systems administration, QA automation, IT leadership,
              and government audit as they transition into tech careers.
            </p>
            <div className="mt-8 bg-true-black p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  weight="bold"
                  className="text-electric-green"
                />
                <MonoLabel className="text-electric-green">
                  Proof, Not Promise
                </MonoLabel>
              </div>
              <h4 className="mt-3 font-heading text-xl text-off-white">
                THEY&apos;VE DONE THE WORK
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-off-white/70">
                Every graduate completes a SOC-analyst simulation — triaging
                real alerts in a SIEM lab, identifying the threat, and writing
                an incident report. It&apos;s the closest thing to an
                entry-level SOC workflow, and you can preview it before you
                interview.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal} transition={{ delay: 0.15, duration: 0.6 }}>
            <MonoLabel>[ Why Catalyst Talent ]</MonoLabel>
            <h3 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-4xl">
              WHY THE
              <br />
              MODEL WORKS
            </h3>
            <div className="mt-8 space-y-7">
              {PILLARS.map((p) => (
                <div key={p.n} className="flex gap-5">
                  <span className="font-heading text-3xl leading-none text-cobalt">
                    {p.n}
                  </span>
                  <div>
                    <h4 className="font-heading text-lg text-true-black">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-grey-3">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal}>
            <MonoLabel>[ Roles They&apos;re Ready For ]</MonoLabel>
            <h2 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-5xl">
              FOUR TRACKS,
              <br />
              JOB-READY NOW
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {ROLES.map((r, i) => (
              <motion.div
                key={r.title}
                {...reveal}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="bg-white p-7"
              >
                <MonoLabel className="text-cobalt">{r.track}</MonoLabel>
                <h3 className="mt-2 font-heading text-2xl text-true-black">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey-3">
                  {r.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Caliber */}
      <section className="bg-grey-1 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal}>
            <MonoLabel>[ A Preview Of The Room ]</MonoLabel>
            <h2 className="mt-4 font-heading text-3xl leading-[0.92] text-true-black sm:text-5xl">
              THE CALIBER
              <br />
              YOU&apos;LL MEET
            </h2>
          </motion.div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CALIBER.map((c, i) => (
              <motion.div
                key={c.tag}
                {...reveal}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
                className="bg-white p-6"
              >
                <MonoLabel className="text-cobalt">{c.tag}</MonoLabel>
                <p className="mt-3 text-sm leading-relaxed text-grey-3">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>
          <p
            className="mt-8 font-mono text-xs tracking-wider text-grey-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Anonymized snapshots from the confirmed cohort. Full candidate
            profiles shared with committed hiring partners.
          </p>
        </div>
      </section>

      {/* How partnership works */}
      <section className="bg-dark-cobalt px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal}>
            <MonoLabel className="text-electric-green">
              [ How Partnership Works ]
            </MonoLabel>
            <h2 className="mt-4 font-heading text-3xl leading-[0.92] text-off-white sm:text-5xl">
              THREE WAYS IN —
              <br />
              START WHEREVER YOU LIKE
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                {...reveal}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <MonoLabel className="text-electric-green">{s.n}</MonoLabel>
                <h3 className="mt-3 font-heading text-xl text-off-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-off-white/70">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About + quote */}
      <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal}>
            <MonoLabel>[ About Beyond Code ]</MonoLabel>
            <p className="mt-5 text-base leading-relaxed text-grey-3 sm:text-lg">
              Beyond Code Collective is a nonprofit bridging the gap between
              inspiration, training, and employment in tech. We connect
              learners to accessible education, hands-on opportunities to build
              with emerging technologies, and clear pathways to launch and grow
              meaningful careers.
            </p>
            <p className="mt-4 text-base leading-relaxed text-grey-3 sm:text-lg">
              Designed for learners of all ages and backgrounds, Beyond Code
              prepares people to thrive in a tech-powered world and achieve
              lasting career mobility. Catalyst is our flagship workforce
              program for adults — pairing market-relevant technical skills
              with durable mindset coaching, employer partnerships, and
              community.
            </p>
          </motion.div>
          <motion.blockquote
            {...reveal}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-12 bg-white p-8"
          >
            <p className="text-lg font-medium leading-relaxed text-true-black">
              &ldquo;Catalyst is how we ensure a human stays in the loop. We
              focus on building access to inspiration, to community, to early
              skills, enabling learners to build meaningful careers and become
              catalysts for change in the tech ecosystem.&rdquo;
            </p>
            <cite
              className="mt-5 block font-mono text-xs uppercase not-italic tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Cristina Mancini · Founder &amp; CEO, Beyond Code Collective
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-true-black px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.h2
            {...reveal}
            className="max-w-xl font-heading text-3xl leading-[0.92] text-off-white sm:text-4xl"
          >
            MEET THE TALENT THIS SUMMER.{" "}
            <span className="text-electric-green">
              HIRE BEFORE END OF YEAR.
            </span>
          </motion.h2>
          <motion.div
            {...reveal}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-mono text-sm leading-relaxed text-off-white/70"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Mica Le John · Executive Director
            <br />
            <a
              href="mailto:mica@wearebcc.org"
              className="text-electric-green underline-offset-4 hover:underline"
            >
              mica@wearebcc.org
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function PartnersPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-off-white">
      <Nav variant={unlocked ? "dark" : "light"} />
      {ready ? (
        unlocked ? (
          <CatalystContent />
        ) : (
          <PasswordGate onUnlock={() => setUnlocked(true)} />
        )
      ) : (
        <div className="min-h-[70vh]" />
      )}
      <Footer />
    </div>
  );
}
