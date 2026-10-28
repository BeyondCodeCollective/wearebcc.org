// Static markup (English only) for the Field Ready program page (from the design mockup).
// Trusted, first-party content: rendered with dangerouslySetInnerHTML.
const FIELD_READY_HTML_EN = `<section class="hero cream"><video class="hero-video" id="hero-video" src="/field-ready/hero.mp4" poster="/field-ready/hero-poster.jpg" autoplay muted loop playsinline preload="auto" aria-hidden="true" tabindex="-1"></video><div class="hero-scrim" aria-hidden="true"></div><button type="button" class="vid-toggle" id="vid-toggle" aria-label="Pause background video" aria-pressed="false">Pause</button><div class="wrap">
  <h1>Field<br><span>Ready.</span></h1>
  <p class="sub">An eight-week program that trains anyone, in any function, to think clearly with AI in the room, listen for the real problem, build something that helps, and prove it works.</p>
  <p class="sub2">Field Ready is free of charge to learners, thanks to our funders and partners.</p>
  <div class="cta-row">
    <a class="btn" href="#join">Join the waitlist →</a>
    <a class="btn ghost" href="#how">See how it runs</a>
  </div>
</div></section>

<section class="band navy" id="why"><div class="wrap">
  <div class="sec-head">
    <div class="label">Why Now</div>
    <h2>The AI skills gap is not a tech gap.</h2>
    <p>Employers are asking for AI skills in every function. The people who can scope a problem, build with the tools, and explain their choices are scarce.</p>
  </div>
  <div class="stats">
    <div><b>28%</b><p>Wage premium for AI skills, about $18,000 a year.</p></div>
    <div><b>50%+</b><p>Of 2024 postings asking for AI skills were outside IT and computer science.</p></div>
    <div><b>800%</b><p>Growth in generative AI postings in non-technical sectors since 2022.</p></div>
  </div>
  <div class="viz" role="img" aria-label="Bar chart of growth in job postings requesting AI skills: education generative AI roles up 200 percent, HR up 66 percent a year, marketing up 50 percent, finance up 40 percent.">
    <h3>Job postings asking for AI skills are growing fastest outside tech.</h3>
    <div class="vrow"><span>Education<small>Generative AI roles</small></span><div class="track"><i style="width:100%"></i></div><b>+200%</b></div>
    <div class="vrow"><span>HR<small>Per year</small></span><div class="track"><i style="width:33%"></i></div><b>+66%</b></div>
    <div class="vrow"><span>Marketing<small>Per year</small></span><div class="track"><i style="width:25%"></i></div><b>+50%</b></div>
    <div class="vrow"><span>Finance<small>Per year</small></span><div class="track"><i style="width:20%"></i></div><b>+40%</b></div>
  </div>
  <p class="src">Source: Lightcast research report, "Beyond the Buzz: Developing the AI Skills Employers Actually Need."</p>
</div></section>

<section class="band cream" id="who"><div class="wrap who">
  <div>
    <div class="label" style="margin-bottom:18px">Who It's For</div>
    <h2 style="margin-bottom:28px">Anyone.</h2>
    <ul>
      <li>Marketing</li><li>Finance</li><li>Operations</li><li>Development</li><li>Education</li><li>Healthcare</li><li>Career shifters</li><li>College students</li><li>Entrepreneurs</li><li>Retired / rewired individuals</li><li>You</li>
    </ul>
    <div class="need"><div class="label">All you need</div>
      <p>A computer.</p><p>Something in your work or life you want to improve.</p><p>Willingness to be a beginner for eight weeks.</p>
    </div>
  </div>
  <div class="claim">
    <div class="label" style="margin-bottom:14px">What graduates can do</div>
    <h3>Think. Listen. Build. Defend.</h3>
    <div class="col">
      <p><b>Think critically</b> about AI output and know when to trust it and when to check it.</p>
      <p><b>Interview for a real problem</b> and hand back a statement the problem owner agrees with.</p>
      <p><b>Build and test a working solution</b> with consumer AI tools.</p>
      <p><b>Explain every decision</b> to anyone, expert or not.</p>
    </div>
  </div>
</div>
<div class="wrap"><figure class="strip"><img src="/field-ready/picnic.jpg" alt="Hands typing on a laptop on a picnic blanket, surrounded by notebooks and a coffee cup, with other learners working alongside." width="1280" height="853"></figure></div></section>

<section class="band gray" id="skills"><div class="wrap">
  <div class="sec-head">
    <div class="label">What You Learn</div>
    <h2>Every week.</h2>
    <p>The tools are the vehicle. You practice these skills every week, and they stay with you when the tools change.</p>
  </div>
  <div class="skills">
    <div class="skill"><h3>Think critically</h3><p>An LLM is predictive. It makes an educated guess and does not think. Validate, don't trust. When the stakes are real, one agent does the work and a second checks it.</p></div>
    <div class="skill"><h3>Set it up</h3><p>Choose the voice you want back. Choose the platform that fits the task and say why. Know the boundary on safety, web access, approvals, and training data.</p></div>
    <div class="skill"><h3>Listen deeply</h3><p>Interview before you build. Hear the problem underneath the stated one, in the other person's words.</p></div>
    <div class="skill"><h3>Communicate</h3><p>With yourself and the AI, inside your org where your expertise is the value, and outside it through storytelling, research, and presentation.</p></div>
    <div class="skill"><h3>Judge and defend</h3><p>Know what good looks like before you test. Iterate on evidence. Know how to call it done, and explain it to anyone.</p></div>
  </div>
</div></section>

<section class="band blue" id="how"><div class="wrap">
  <div class="sec-head">
    <div class="label" style="color:var(--on-dark)">How It Runs</div>
    <h2>Built around your schedule.</h2>
    <p>Field Ready is modular, so it meets you where you are. Join the live kickoff at the time that works for your week, work through the content at your own pace, and learn alongside a small pod of people on the same path.</p>
  </div>
  <div class="how-grid">
  <figure class="how-photo"><img src="/field-ready/desk.jpg" alt="A woman smiling on a phone call at a busy desk while a laughing baby sits in her lap." width="1280" height="1920"></figure>
  <div class="run">
    <div class="card"><div class="label">Weekly</div><h3>Live kickoff</h3><p>60 minutes, offered at multiple times. Your facilitator frames the week, teaches the core ideas, and works in the tool live with you.</p></div>
    <div class="card"><div class="label">3+ hrs a week</div><h3>Self-guided content</h3><p>Each unit says what you do, what you must be able to explain, what done looks like, and where people get stuck, with worked examples in different industries.</p></div>
    <div class="card"><div class="label">Pods of 5</div><h3>Your pod</h3><p>Five people learning side by side. Share what you're building, trade feedback, work through stuck points together, and cheer each other on. The lead role rotates, so everyone practices guiding the group.</p></div>
    <div class="card"><div class="label">Thursdays, optional</div><h3>Office hours</h3><p>Each pod's lead joins, and other members are welcome. Ten minutes on what's stuck this week, forty minutes of unsticking each other, ten minutes on the assignment.</p></div>
    <div class="card wide"><div class="label">Then</div><h3>After the program</h3><p>Graduates join the Beyond community layer: a network of other learners, potential mentors, and extra programming.</p></div>
  </div>
  </div>
</div></section>

<section class="band cream" id="lab" hidden style="display:none"><div class="wrap lab">
  <div>
    <div class="label" style="margin-bottom:18px">The Field Ready Lab</div>
    <h2>Start with 90 minutes.</h2>
    <p style="margin-top:22px;font-size:18px;max-width:46ch">A public session anyone can join. It is the way into Field Ready, and it ends with something you built.</p>
    <div style="margin-top:30px"><!-- Placeholder: replace href with the LXP RSVP URL for the next Lab --><a class="btn on-cream" href="#lab">RSVP: sign up for the next one →</a></div>
  </div>
  <div class="agenda">
    <div><b>25<small>min</small></b><p><strong>Intro to AI.</strong> LLMs and critical thinking, tokens and parameters.</p></div>
    <div><b>10<small>min</small></b><p><strong>Tools.</strong> A tour of Claude, ChatGPT, and Open Claw.</p></div>
    <div><b>5<small>min</small></b><p><strong>Workflows versus agents.</strong> And how fast the tools move.</p></div>
    <div><b>30<small>min</small></b><p><strong>Make a skill.</strong> Set the voice you want back.</p></div>
    <div><b>20<small>min</small></b><p><strong>Demo.</strong> Then the backlog and your next step.</p></div>
  </div>
</div></section>

<section class="join" id="join"><div class="in">
  <div class="head">
    <div class="label">Stay in the loop</div>
    <h2>Get on the list</h2>
    <p class="lede">The first Field Ready cohort starts in January, with new cohorts starting on a rolling basis through the year. Join the list to hear first when each one opens.</p>
  </div>
  <form id="signup-form" novalidate>
    <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
    <input type="text" name="first" placeholder="First name" aria-label="First name" required>
    <input type="email" name="email" placeholder="Email address" aria-label="Email address" required>
    <input type="text" name="zip" placeholder="Zip code" aria-label="Zip code" inputmode="numeric" autocomplete="postal-code" maxlength="5">
    <select name="age" aria-label="Age">
      <option value="" selected>Age</option>
      <option>18–24</option>
      <option>25–30</option>
      <option>31–40</option>
      <option>41–50</option>
      <option>51–60</option>
      <option>61+</option>
      <option>Prefer not to say</option>
    </select>
    <p class="note"><em>This information will never be shared publicly. It helps us secure funding to build programs.</em></p>
    <button type="submit" class="btn go">Join the list</button>
    <p class="hint" id="hint-join" aria-live="polite"></p>
  </form>
</div></section>

<section class="band cream" id="employers"><div class="wrap">
  <div class="sec-head">
    <div class="label">For Employers And Partners</div>
    <h2>Partner with us.</h2>
    <p>Bring Field Ready to your team or your community. We can build a custom Field Ready for your people, localize it for your region, and connect you with graduates who arrive with working projects built on real problems from real workplaces.</p>
  </div>
  <figure class="emp-photo"><img src="/field-ready/partner.jpg" alt="Five colleagues of different ages gather around a laptop, a woman pointing at the screen while the others look on." width="2400" height="1600"></figure>
  <div class="emp">
    <div class="card"><div class="label">Employers</div><h3>Build a Field Ready for your team</h3><p>We work with you to shape Field Ready around your people, your tools, and the problems your team is facing. And if you're hiring, talk with us about our graduates.</p></div>
    <div class="card"><div class="label">Workforce boards and agencies</div><h3>Localize it for your region</h3><p>We adapt Field Ready to your learners, your local labor market, and your goals, and run it alongside you.</p></div>
    <div class="card"><div class="label">Academic partners</div><h3>Bring it to your campus</h3><p>Host a cohort, localize the program for your students, or send people from your network.</p></div>
  </div>
  <div class="emp-cta"><a class="btn" href="mailto:partnerships@wearebcc.org">Partner with us →</a><span class="label">partnerships@wearebcc.org</span></div>
</div></section>

`;

export const FIELD_READY_HTML = FIELD_READY_HTML_EN;

export const FIELD_READY_STRINGS = {
  play: "Play",
  pause: "Pause",
  playLabel: "Play background video",
  pauseLabel: "Pause background video",
  needName: "Please add your first name.",
  needEmail: "Please enter a valid email address.",
  sending: "Sending...",
  done: "You're on the list. We'll email you when the first cohort opens.",
  error: "Something went wrong. Please try again.",
} as const;
