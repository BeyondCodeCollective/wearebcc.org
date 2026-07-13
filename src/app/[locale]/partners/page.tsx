"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LockSimple } from "@phosphor-icons/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const STORAGE_KEY = "bcc-partner-portal-unlocked";

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
    <section className="flex min-h-[60vh] items-center justify-center px-6 pt-36 pb-20 lg:pt-44">
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
        <h1 className="mt-6 font-heading text-3xl leading-[0.95] text-true-black">
          PARTNER ACCESS
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-grey-3">
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

function CatalystSheet() {
  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-40">
      <style>{`
        .cat-sheet{--sky:#A8DBFF;--warm:#FEF9ED;width:100%;max-width:8.5in;margin:0 auto;background:var(--color-off-white);box-shadow:0 10px 50px rgba(1,41,102,.16);overflow:hidden;line-height:1.5;}
        .cat-sheet .eyebrow{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.18em;font-size:10.5px;font-weight:500;}
        .cat-sheet .display{font-family:var(--font-heading);text-transform:uppercase;line-height:.94;}
        .cat-sheet .sec-label{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.14em;font-size:10px;color:var(--color-cobalt);margin-bottom:7px;}
        .cat-sheet .cs-header{background:var(--color-dark-cobalt);color:#fff;padding:30px 42px 26px;display:flex;align-items:center;gap:30px;}
        .cat-sheet .head-text{flex:1 1 58%;min-width:0;}
        .cat-sheet .head-img{flex:0 0 36%;align-self:stretch;border-radius:6px;overflow:hidden;box-shadow:0 10px 30px rgba(1,41,102,.35);min-height:196px;background:var(--color-dark-cobalt);}
        .cat-sheet .head-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .cat-sheet .cs-header .logo img{height:36px;width:auto;display:block;margin-bottom:18px;}
        .cat-sheet .cs-header h1{font-family:var(--font-heading);font-size:60px;line-height:.9;text-transform:uppercase;margin:0 0 10px;}
        .cat-sheet .cs-header h1 .sky{color:var(--sky);}
        .cat-sheet .cs-header .tag{font-size:15px;font-weight:500;opacity:.95;}
        .cat-sheet .hook{padding:24px 42px 4px;}
        .cat-sheet .hook h2{font-family:var(--font-heading);font-size:30px;line-height:.96;text-transform:uppercase;margin-bottom:10px;}
        .cat-sheet .hook h2 .blue{color:var(--color-cobalt);}
        .cat-sheet .hook p{font-size:14px;color:var(--color-charcoal);max-width:94%;}
        .cat-sheet .cs-main{padding:22px 42px 6px;display:grid;grid-template-columns:1fr 1fr;gap:30px;}
        .cat-sheet h3.block{font-family:var(--font-heading);font-size:21px;text-transform:uppercase;margin-bottom:9px;line-height:.96;}
        .cat-sheet .cs-main p{font-size:12.5px;color:var(--color-charcoal);margin-bottom:11px;}
        .cat-sheet .cs-main p strong{color:var(--color-true-black);}
        .cat-sheet .pillar{display:flex;gap:12px;margin-bottom:13px;}
        .cat-sheet .pillar .pn{font-family:var(--font-heading);font-size:26px;color:var(--color-cobalt);line-height:.8;min-width:30px;}
        .cat-sheet .pillar h4{font-family:var(--font-heading);font-size:15px;text-transform:uppercase;margin-bottom:3px;}
        .cat-sheet .pillar p{font-size:12px;margin:0;}
        .cat-sheet .chips{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 13px;}
        .cat-sheet .chip{font-family:var(--font-mono);font-size:10px;letter-spacing:.04em;text-transform:uppercase;border:1.5px solid var(--color-true-black);padding:4px 9px;background:var(--warm);}
        .cat-sheet .chip.soft{border-color:var(--color-cobalt);color:var(--color-cobalt);}
        .cat-sheet .callout{background:var(--color-true-black);color:var(--color-off-white);padding:16px 18px;margin-top:4px;}
        .cat-sheet .callout .eyebrow{color:var(--sky);margin-bottom:6px;display:flex;align-items:center;gap:7px;}
        .cat-sheet .callout .dot{width:8px;height:8px;border-radius:50%;background:var(--sky);display:inline-block;}
        .cat-sheet .callout h4{font-family:var(--font-heading);font-size:18px;text-transform:uppercase;margin-bottom:6px;}
        .cat-sheet .callout p{font-size:12px;color:#D8D8D8;margin:0;}
        .cat-sheet .cs-stats{background:var(--color-dark-cobalt);color:#fff;display:grid;grid-template-columns:repeat(2,1fr);margin-top:18px;}
        .cat-sheet .cs-stats .s{padding:18px 16px;border-right:1px solid rgba(255,255,255,.22);}
        .cat-sheet .cs-stats .s:last-child{border-right:none;}
        .cat-sheet .cs-stats .num{font-family:var(--font-heading);font-size:34px;line-height:.85;}
        .cat-sheet .cs-stats .lab{font-family:var(--font-mono);font-size:9.5px;text-transform:uppercase;letter-spacing:.07em;margin-top:8px;opacity:.85;line-height:1.35;}
        .cat-sheet .roles-wrap{padding:22px 42px 6px;}
        .cat-sheet .roles{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:6px;}
        .cat-sheet .role{border:1.5px solid var(--color-true-black);padding:13px 14px;background:var(--warm);}
        .cat-sheet .role .tn{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--color-cobalt);text-transform:uppercase;}
        .cat-sheet .role h4{font-family:var(--font-heading);font-size:17px;text-transform:uppercase;margin:3px 0 6px;}
        .cat-sheet .role p{font-size:11.5px;color:var(--color-charcoal);margin:0;}
        .cat-sheet .caliber-wrap{padding:20px 42px 6px;}
        .cat-sheet .caliber{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:8px;}
        .cat-sheet .card{background:var(--warm);border-top:3px solid var(--color-cobalt);padding:12px 13px;}
        .cat-sheet .card .role-tag{font-family:var(--font-mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-cobalt);margin-bottom:5px;}
        .cat-sheet .card p{font-size:11.5px;color:var(--color-charcoal);margin:0;line-height:1.4;}
        .cat-sheet .caliber-note{font-family:var(--font-mono);font-size:10px;color:var(--color-grey-3);margin-top:11px;letter-spacing:.02em;}
        .cat-sheet .ask-wrap{padding:20px 42px 6px;}
        .cat-sheet .ask{background:var(--color-dark-cobalt);color:#fff;padding:22px 24px;}
        .cat-sheet .ask .sec-label{color:var(--sky);}
        .cat-sheet .ask h3{font-family:var(--font-heading);font-size:22px;text-transform:uppercase;margin-bottom:12px;line-height:.98;}
        .cat-sheet .ask-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .cat-sheet .ask-step .n{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;color:var(--sky);text-transform:uppercase;}
        .cat-sheet .ask-step h4{font-family:var(--font-heading);font-size:15px;text-transform:uppercase;margin:4px 0 5px;}
        .cat-sheet .ask-step p{font-size:11.5px;color:#D8D8D8;margin:0;}
        .cat-sheet .about-wrap{padding:20px 42px 4px;}
        .cat-sheet .about-wrap p{font-size:12px;color:var(--color-charcoal);margin-bottom:9px;max-width:96%;}
        .cat-sheet .quote-wrap{padding:16px 42px 20px;}
        .cat-sheet blockquote{background:var(--warm);border-left:5px solid var(--color-cobalt);padding:16px 20px;font-size:14px;font-weight:500;}
        .cat-sheet blockquote cite{font-family:var(--font-mono);display:block;margin-top:11px;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;font-style:normal;color:var(--color-grey-3);}
        .cat-sheet .cs-cta{background:var(--color-true-black);color:var(--color-off-white);padding:22px 42px;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:14px;}
        .cat-sheet .cs-cta .cta{font-family:var(--font-heading);font-size:20px;text-transform:uppercase;line-height:.95;max-width:60%;}
        .cat-sheet .cs-cta .cta .sky{color:var(--sky);}
        .cat-sheet .cs-cta .contact{font-family:var(--font-mono);font-size:11px;text-align:right;line-height:1.7;letter-spacing:.04em;}
        .cat-sheet .cs-cta .contact a{color:var(--sky);text-decoration:none;}
        @media (max-width:680px){
          .cat-sheet .cs-main,.cat-sheet .roles,.cat-sheet .caliber,.cat-sheet .ask-grid{grid-template-columns:1fr;}
          .cat-sheet .cs-stats{grid-template-columns:1fr 1fr;}
          .cat-sheet .cs-header{flex-direction:column;align-items:flex-start;}
          .cat-sheet .cs-header h1{font-size:46px;}
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="cat-sheet"
      >
        <div className="cs-header">
          <div className="head-text">
            <div className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bcc-logo-horizontal-white.png"
                alt="Beyond Code Collective"
              />
            </div>
            <h1>
              Hire
              <br />
              <span className="sky">Ready.</span>
            </h1>
            <p className="tag">
              A cohort of certified, screened, job-ready cybersecurity talent —
              available to interview this October.
            </p>
          </div>
          <div className="head-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://beyondcode-catalyst.vercel.app/hero.jpg"
              alt="Beyond Code Catalyst cohort collaborating"
            />
          </div>
        </div>

        <div className="hook">
          <h2>
            There Are More Open Cyber Roles Than Credentialed People To Fill
            Them.
            <br />
            <span className="blue">
              We&apos;ve Screened The Talent To Close The Gap.
            </span>
          </h2>
          <p>
            Beyond Code&apos;s Cybersecurity cohort is a pre-vetted pipeline of
            career-changers who hold stacked CompTIA industry credentials, have
            completed a live SOC-analyst simulation, and bring extensive work
            experience with transferable skills.{" "}
            <strong>You get first access to proven talent.</strong>
          </p>
        </div>

        <div className="cs-main">
          <div>
            <div className="sec-label">[ Who You&apos;re Hiring ]</div>
            <h3 className="block">Certified &amp; Screened</h3>
            <p>
              Every candidate enters your pipeline already holding a stack of
              CompTIA credentials, with all of them finishing Security+
              certification by Q4 2026.
            </p>
            <div className="chips">
              <span className="chip">CompTIA Tech+</span>
              <span className="chip">CompTIA Network+</span>
              <span className="chip">CompTIA Security+ (SY0-701)</span>
              <span className="chip soft">SOC-Analyst Capstone</span>
              <span className="chip soft">Durable Skills Coaching</span>
            </div>
            <p>
              These aren&apos;t first-time learners. They&apos;re bringing real
              careers in systems administration, QA automation, IT leadership,
              and government audit as they transition into tech careers.
            </p>
            <div className="callout">
              <div className="eyebrow">
                <span className="dot" /> [ Proof, Not Promise ]
              </div>
              <h4>They&apos;ve Done The Work</h4>
              <p>
                Every graduate completes a SOC-analyst simulation — triaging
                real alerts in a SIEM lab, identifying the threat, and writing
                an incident report. It&apos;s the closest thing to an
                entry-level SOC workflow, and you can preview it before you
                interview.
              </p>
            </div>
          </div>

          <div>
            <div className="sec-label">[ Why Catalyst Talent ]</div>
            <h3 className="block">Why The Model Works</h3>
            <div className="pillar">
              <div className="pn">01</div>
              <div>
                <h4>Stacked Credentials</h4>
                <p>
                  Tech+, Network+, and Security+ — industry-recognized proof
                  that compounds, not a single bootcamp certificate.
                </p>
              </div>
            </div>
            <div className="pillar">
              <div className="pn">02</div>
              <div>
                <h4>Hands-On Capstone</h4>
                <p>
                  A completed SOC-analyst simulation demonstrates ability
                  directly, even for candidates without prior security job
                  history.
                </p>
              </div>
            </div>
            <div className="pillar">
              <div className="pn">03</div>
              <div>
                <h4>Durable Skills</h4>
                <p>
                  Our career coaching curriculum builds the reliability,
                  communication, and follow-through that make entry-level hires
                  stick.
                </p>
              </div>
            </div>
            <div className="pillar">
              <div className="pn">04</div>
              <div>
                <h4>Ongoing Support</h4>
                <p>
                  We stay engaged after the hire with wraparound support to
                  protect retention.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-stats">
          <div className="s">
            <div className="num">15</div>
            <div className="lab">Vetted candidates in the inaugural cohort</div>
          </div>
          <div className="s">
            <div className="num">OCT</div>
            <div className="lab">Interview-ready · 2026 placement window</div>
          </div>
        </div>

        <div className="roles-wrap">
          <div className="sec-label">[ Roles They&apos;re Ready For ]</div>
          <div className="roles">
            <div className="role">
              <div className="tn">Track · Operations</div>
              <h4>SOC Analyst I</h4>
              <p>
                Security operations, SIEM monitoring, and alert triage — backed
                directly by the cohort&apos;s capstone. Multiple candidates name
                SOC work as their clear goal.
              </p>
            </div>
            <div className="role">
              <div className="tn">Track · Foundations</div>
              <h4>IT Support &amp; Help Desk</h4>
              <p>
                Service desk, desktop, and technical support — the proven
                on-ramp for candidates with Network+/Tech+ and strong
                transferable experience.
              </p>
            </div>
            <div className="role">
              <div className="tn">Track · Governance</div>
              <h4>GRC &amp; Compliance</h4>
              <p>
                Governance, risk, IT audit, and compliance analysis — a natural
                fit for candidates coming from audit, Salesforce
                administration, and operations.
              </p>
            </div>
            <div className="role">
              <div className="tn">Track · Cloud &amp; Automation</div>
              <h4>Cloud &amp; Security Automation</h4>
              <p>
                Entry cloud security and DevSecOps-adjacent roles — including a
                QA-automation engineer bridging into security automation.
              </p>
            </div>
          </div>
        </div>

        <div className="caliber-wrap">
          <div className="sec-label">[ A Preview Of The Room ]</div>
          <h3 className="block" style={{ fontSize: 19 }}>
            The Caliber You&apos;ll Meet
          </h3>
          <div className="caliber">
            <div className="card">
              <div className="role-tag">SOC · Forensics</div>
              <p>
                Cybersecurity master&apos;s candidate, fluent in ServiceNow,
                Wireshark, and Azure — targeting SOC and digital-forensics
                roles.
              </p>
            </div>
            <div className="card">
              <div className="role-tag">Security Leadership Track</div>
              <p>
                Former Director of Systems Development from the nonprofit IT
                world, bringing management depth into a security pivot.
              </p>
            </div>
            <div className="card">
              <div className="role-tag">Security Automation</div>
              <p>
                QA automation engineer with a clear bridge story: from test
                automation into DevSecOps and security automation.
              </p>
            </div>
            <div className="card">
              <div className="role-tag">GRC · Compliance</div>
              <p>
                Salesforce administrator and consultant moving deliberately
                toward governance, risk, and compliance work.
              </p>
            </div>
            <div className="card">
              <div className="role-tag">Security Operations</div>
              <p>
                Military IT veteran seeking to stay in IT and security
                operations — a repeat, high-commitment learner.
              </p>
            </div>
            <div className="card">
              <div className="role-tag">SOC · SIEM · GRC</div>
              <p>
                Local-government data and audit analyst, ServiceNow user,
                targeting SOC, SIEM, and GRC pathways.
              </p>
            </div>
          </div>
          <p className="caliber-note">
            Anonymized snapshots from the confirmed cohort. Full candidate
            profiles shared with committed hiring partners.
          </p>
        </div>

        <div className="ask-wrap">
          <div className="ask">
            <div className="sec-label">[ How Partnership Works ]</div>
            <h3>Three Ways In — Start Wherever You Like</h3>
            <div className="ask-grid">
              <div className="ask-step">
                <div className="n">Step 01</div>
                <h4>Informational Interview</h4>
                <p>
                  Give 30 minutes to a candidate. Low lift, and it doubles as
                  real-world exposure for our learners.
                </p>
              </div>
              <div className="ask-step">
                <div className="n">Step 02</div>
                <h4>Preview At Demo Day</h4>
                <p>
                  Join us in early September to watch the cohort present their
                  SOC-analyst capstones live.
                </p>
              </div>
              <div className="ask-step">
                <div className="n">Step 03</div>
                <h4>Interview In October</h4>
                <p>
                  Commit to interview job-ready candidates matched to your open
                  roles.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-wrap">
          <div className="sec-label">[ About Beyond Code ]</div>
          <p>
            Beyond Code Collective is a nonprofit bridging the gap between
            inspiration, training, and employment in tech. We connect learners
            to accessible education, hands-on opportunities to build with
            emerging technologies, and clear pathways to launch and grow
            meaningful careers.
          </p>
          <p>
            Designed for learners of all ages and backgrounds, Beyond Code
            prepares people to thrive in a tech-powered world and achieve
            lasting career mobility. Catalyst is our flagship workforce program
            for adults — pairing market-relevant technical skills with durable
            mindset coaching, employer partnerships, and community.
          </p>
        </div>

        <div className="quote-wrap">
          <blockquote>
            &ldquo;Catalyst is how we ensure a human stays in the loop. We
            focus on building access to inspiration, to community, to early
            skills, enabling learners to build meaningful careers and become
            catalysts for change in the tech ecosystem.&rdquo;
            <cite>Cristina Mancini · Founder &amp; CEO, Beyond Code Collective</cite>
          </blockquote>
        </div>

        <div className="cs-cta">
          <div className="cta">
            Meet the talent this summer.{" "}
            <span className="sky">Hire before end of year.</span>
          </div>
          <div className="contact">
            Mica Le John · Executive Director
            <br />
            <a href="mailto:mica@wearebcc.org">mica@wearebcc.org</a>
          </div>
        </div>
      </motion.div>
    </section>
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
    <div className="min-h-screen bg-grey-1">
      <Nav variant="light" />
      {ready ? (
        unlocked ? (
          <CatalystSheet />
        ) : (
          <PasswordGate onUnlock={() => setUnlocked(true)} />
        )
      ) : (
        <div className="min-h-[60vh]" />
      )}
      <Footer />
    </div>
  );
}
