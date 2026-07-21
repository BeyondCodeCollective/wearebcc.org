"use client";

import StringField from "./StringField";
import TextareaField from "./TextareaField";
import { ArrayEditorString, ArrayEditorObject } from "./ArrayEditor";
import KeyedGroupEditor from "./KeyedGroupEditor";

/* eslint-disable @typescript-eslint/no-explicit-any */
type V = Record<string, any>;
type OnChange = (v: V) => void;

function set(value: V, key: string, v: unknown, onChange: OnChange) {
  onChange({ ...value, [key]: v });
}

// ─── [01] HERO ───────────────────────────────────────────────────

export function HeroEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <ArrayEditorString label="Rotating Words" items={value.rotatingWords || []} onChange={(v) => set(value, "rotatingWords", v, onChange)} addLabel="Add Word" />
      <StringField label="Human in the Loop Label" value={value.humanInTheLoop || ""} onChange={(v) => set(value, "humanInTheLoop", v, onChange)} />
      <StringField label="Tagline" value={value.tagline || ""} onChange={(v) => set(value, "tagline", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={3} />
      <StringField label="Primary CTA" value={value.getStarted || ""} onChange={(v) => set(value, "getStarted", v, onChange)} />
      <StringField label="Secondary CTA" value={value.joinNewsletter || ""} onChange={(v) => set(value, "joinNewsletter", v, onChange)} />
      <StringField label="Community Label" value={value.ourCommunity || ""} onChange={(v) => set(value, "ourCommunity", v, onChange)} />
    </div>
  );
}

// ─── [02] ABOUT ──────────────────────────────────────────────────

export function AboutEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} />
      <KeyedGroupEditor
        label="Pillars"
        keys={[
          { key: "intergenerationalOpportunity", displayName: "Intergenerational Opportunity" },
          { key: "allTechnologies", displayName: "All Technologies" },
          { key: "todayAndTomorrow", displayName: "Today & Tomorrow" },
          { key: "adaptiveProgramming", displayName: "Adaptive Programming" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        value={value.pillars || {}}
        onChange={(v) => set(value, "pillars", v, onChange)}
      />
    </div>
  );
}

// ─── [03] TESTIMONIALS ───────────────────────────────────────────

export function TestimonialsEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline" value={value.headline || ""} onChange={(v) => set(value, "headline", v, onChange)} />
      <StringField label="Subheading" value={value.subheading || ""} onChange={(v) => set(value, "subheading", v, onChange)} />
      <ArrayEditorObject
        label="Testimonials"
        items={value.items || []}
        fields={[
          { key: "quote", label: "Quote", multiline: true },
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "location", label: "Location" },
        ]}
        onChange={(v) => set(value, "items", v, onChange)}
        addLabel="Add Testimonial"
      />
    </div>
  );
}

// ─── [04] AUDIENCE / WHO WE SERVE ────────────────────────────────

export function AudienceEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <KeyedGroupEditor
        label="Personas"
        keys={[
          { key: "forTheFuture", displayName: "For The Future" },
          { key: "understandingOurWorld", displayName: "Understanding Our World" },
          { key: "changingDirection", displayName: "Changing Direction" },
          { key: "makingADifference", displayName: "Making A Difference" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "segments", label: "Segments", type: "string-array" },
        ]}
        value={value.personas || {}}
        onChange={(v) => set(value, "personas", v, onChange)}
      />
    </div>
  );
}

// ─── [05] STATS ──────────────────────────────────────────────────

export function StatsEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <ArrayEditorObject
        label="Stats"
        items={value.items || []}
        fields={[
          { key: "value", label: "Value (text — e.g. '77' or 'ALL')" },
          { key: "suffix", label: "Suffix (e.g. '%', '+', 'st')" },
          { key: "label", label: "Label" },
        ]}
        onChange={(v) => set(value, "items", v, onChange)}
        addLabel="Add Stat"
      />
    </div>
  );
}

// ─── [06] INITIATIVES ────────────────────────────────────────────

export function InitiativesEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <StringField label="Subheading" value={value.subheading || ""} onChange={(v) => set(value, "subheading", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} />
      <StringField label="Learn More CTA" value={value.learnMore || ""} onChange={(v) => set(value, "learnMore", v, onChange)} />
      <StringField label="Career Quiz CTA" value={value.takeCareerQuiz || ""} onChange={(v) => set(value, "takeCareerQuiz", v, onChange)} />
      <KeyedGroupEditor
        label="Initiatives"
        keys={[
          { key: "forge", displayName: "Beyond Code Centers" },
          { key: "catalysts", displayName: "Beyond Code Catalysts" },
          { key: "codeAlong", displayName: "Code Along" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "tags", label: "Tags", type: "string-array" },
        ]}
        value={value.items || {}}
        onChange={(v) => set(value, "items", v, onChange)}
      />
    </div>
  );
}

// ─── [07] FOUNDER ────────────────────────────────────────────────

export function FounderEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Section Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <StringField label="Title" value={value.title || ""} onChange={(v) => set(value, "title", v, onChange)} />
      <TextareaField label="Bio" value={value.bio || ""} onChange={(v) => set(value, "bio", v, onChange)} rows={6} />
      <TextareaField label="Quote" value={value.quote || ""} onChange={(v) => set(value, "quote", v, onChange)} rows={4} />
      <StringField label="Quote Attribution" value={value.quoteAttribution || ""} onChange={(v) => set(value, "quoteAttribution", v, onChange)} />
      <StringField label="As Seen On Label" value={value.asSeenOn || ""} onChange={(v) => set(value, "asSeenOn", v, onChange)} />
    </div>
  );
}

// ─── [08] RESOURCES ──────────────────────────────────────────────

export function ResourcesEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <StringField label="Subheading" value={value.subheading || ""} onChange={(v) => set(value, "subheading", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={3} />
      <StringField label="Featured Video Label" value={value.featuredVideo || ""} onChange={(v) => set(value, "featuredVideo", v, onChange)} />
      <StringField label="Downloads Label" value={value.downloads || ""} onChange={(v) => set(value, "downloads", v, onChange)} />
      <KeyedGroupEditor
        label="Resource Items"
        keys={[
          { key: "onePager", displayName: "BCC One-Pager" },
          { key: "forgeOverview", displayName: "The Forge Overview" },
          { key: "brandFlipbook", displayName: "Brand Flipbook" },
        ]}
        fields={[
          { key: "title", label: "Title", type: "string" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        value={value.items || {}}
        onChange={(v) => set(value, "items", v, onChange)}
      />
    </div>
  );
}

// ─── [09] CTA BRIDGE / PARTNERS ──────────────────────────────────

export function CtaBridgeEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Section Label" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={3} />
      <StringField label="Logo Section Label" value={value.logoLabel || ""} onChange={(v) => set(value, "logoLabel", v, onChange)} />
      <StringField label="Partner CTA" value={value.partnerWithUs || ""} onChange={(v) => set(value, "partnerWithUs", v, onChange)} />
    </div>
  );
}

// ─── [10] GET INVOLVED ───────────────────────────────────────────

export function GetInvolvedEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
    </div>
  );
}

// ─── [11] NEWS ───────────────────────────────────────────────────

export function NewsEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <p
        className="text-[11px] leading-relaxed text-black/40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        The newest 3 posts appear on the homepage. All posts appear on the /news page.
        Posts are ordered automatically by date (newest first).
      </p>
      <StringField label="Section Label (e.g. [ NEWSROOM ])" value={value.label || ""} onChange={(v) => set(value, "label", v, onChange)} />
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <TextareaField label="Subheading" value={value.subheading || ""} onChange={(v) => set(value, "subheading", v, onChange)} rows={2} />
      <ArrayEditorObject
        label="Posts"
        items={value.items || []}
        fields={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category (e.g. Event, Announcement, Press)" },
          { key: "date", label: "Date (YYYY-MM-DD)" },
          { key: "slug", label: "URL slug (make one up — lowercase-with-dashes, e.g. my-new-article)" },
          { key: "excerpt", label: "Excerpt (short summary for cards)", multiline: true },
          { key: "image", label: "Image", image: true },
          { key: "imageAlt", label: "Image alt text (describe the photo)" },
          { key: "body", label: "Body (leave a blank line between paragraphs)", multiline: true },
          { key: "linkUrl", label: "External link URL (optional — e.g. a press article)" },
          { key: "linkLabel", label: "External link label (optional — e.g. Read on CNBC)" },
          { key: "imagePosition", label: "Image focal point (optional — top, center, bottom)" },
        ]}
        onChange={(v) => set(value, "items", v, onChange)}
        addLabel="Add Post"
      />
    </div>
  );
}

// ─── BEYOND CODE CENTERS (FORGE) ─────────────────────────────────

export function ForgeEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Initiative Label" value={value.initiative || ""} onChange={(v) => set(value, "initiative", v, onChange)} />
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={4} />
      <StringField label="Primary CTA" value={value.learnMore || ""} onChange={(v) => set(value, "learnMore", v, onChange)} />
      <StringField label="Eventbrite CTA" value={value.eventbriteCta || ""} onChange={(v) => set(value, "eventbriteCta", v, onChange)} />
      <StringField label="ATL Headline Line 1" value={value.atlHeadline1 || ""} onChange={(v) => set(value, "atlHeadline1", v, onChange)} />
      <StringField label="ATL Headline Line 2" value={value.atlHeadline2 || ""} onChange={(v) => set(value, "atlHeadline2", v, onChange)} />
      <TextareaField label="ATL Description" value={value.atlText || ""} onChange={(v) => set(value, "atlText", v, onChange)} rows={3} />
      <StringField label="ATL Schedule" value={value.atlSchedule || ""} onChange={(v) => set(value, "atlSchedule", v, onChange)} />
      <StringField label="ATL Dates" value={value.atlDates || ""} onChange={(v) => set(value, "atlDates", v, onChange)} />
      <StringField label="ATL Location" value={value.atlLocation || ""} onChange={(v) => set(value, "atlLocation", v, onChange)} />
      <TextareaField label="Founder Quote" value={value.quoteText || ""} onChange={(v) => set(value, "quoteText", v, onChange)} rows={4} />
      <StringField label="Quote Author" value={value.quoteAuthor || ""} onChange={(v) => set(value, "quoteAuthor", v, onChange)} />
      <StringField label="Quote Role" value={value.quoteRole || ""} onChange={(v) => set(value, "quoteRole", v, onChange)} />
      <ArrayEditorObject
        label="Programming Types"
        items={value.programmingTypes || []}
        fields={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description", multiline: true },
          { key: "format", label: "Format" },
          { key: "audience", label: "Audience" },
          { key: "price", label: "Price" },
        ]}
        onChange={(v) => set(value, "programmingTypes", v, onChange)}
        addLabel="Add Programming Type"
      />
      <ArrayEditorObject
        label="How It Works Steps"
        items={value.howItWorksSteps || []}
        fields={[
          { key: "step", label: "Step Number (e.g. 01)" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description", multiline: true },
        ]}
        onChange={(v) => set(value, "howItWorksSteps", v, onChange)}
        addLabel="Add Step"
      />
      <ArrayEditorObject
        label="Community Pillars"
        items={value.pillars || []}
        fields={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description", multiline: true },
        ]}
        onChange={(v) => set(value, "pillars", v, onChange)}
        addLabel="Add Pillar"
      />
      <StringField label="Signup Form Headline Line 1" value={value.formHeadline1 || ""} onChange={(v) => set(value, "formHeadline1", v, onChange)} />
      <StringField label="Signup Form Headline Line 2" value={value.formHeadline2 || ""} onChange={(v) => set(value, "formHeadline2", v, onChange)} />
      <TextareaField label="Signup Form Description" value={value.formDescription || ""} onChange={(v) => set(value, "formDescription", v, onChange)} rows={2} />
    </div>
  );
}

// ─── BEYOND THE GAME ───────────────────────────────────────────────

export function AtgEditor({ value, onChange }: { value: V; onChange: OnChange }) {
  return (
    <div className="space-y-4">
      <StringField label="Next Cohort Label" value={value.nextCohort || ""} onChange={(v) => set(value, "nextCohort", v, onChange)} />
      <StringField label="Headline Line 1" value={value.headline1 || ""} onChange={(v) => set(value, "headline1", v, onChange)} />
      <StringField label="Headline Line 2" value={value.headline2 || ""} onChange={(v) => set(value, "headline2", v, onChange)} />
      <TextareaField label="Description" value={value.description || ""} onChange={(v) => set(value, "description", v, onChange)} rows={4} />
      <StringField label="Primary CTA" value={value.joinWaitlist || ""} onChange={(v) => set(value, "joinWaitlist", v, onChange)} />
      <TextareaField label="Problem Text 1" value={value.problemText || ""} onChange={(v) => set(value, "problemText", v, onChange)} rows={3} />
      <TextareaField label="Problem Text 2" value={value.problemText2 || ""} onChange={(v) => set(value, "problemText2", v, onChange)} rows={3} />
      <ArrayEditorObject
        label="Stats Bar"
        items={value.problemStats || []}
        fields={[
          { key: "stat", label: "Stat (e.g. <2%)" },
          { key: "label", label: "Label" },
        ]}
        onChange={(v) => set(value, "problemStats", v, onChange)}
        addLabel="Add Stat"
      />
      <StringField label="Program Headline Line 1" value={value.programHeadline1 || ""} onChange={(v) => set(value, "programHeadline1", v, onChange)} />
      <StringField label="Program Headline Line 2" value={value.programHeadline2 || ""} onChange={(v) => set(value, "programHeadline2", v, onChange)} />
      <ArrayEditorString
        label="Program Items (checklist)"
        items={value.programItems || []}
        onChange={(v) => set(value, "programItems", v, onChange)}
        addLabel="Add Item"
      />
      <StringField label="Classroom Headline Line 1" value={value.classroomHeadline1 || ""} onChange={(v) => set(value, "classroomHeadline1", v, onChange)} />
      <StringField label="Classroom Headline Line 2" value={value.classroomHeadline2 || ""} onChange={(v) => set(value, "classroomHeadline2", v, onChange)} />
      <TextareaField label="Classroom Text" value={value.classroomText || ""} onChange={(v) => set(value, "classroomText", v, onChange)} rows={3} />
      <StringField label="Curriculum Headline Line 1" value={value.curriculumHeadline1 || ""} onChange={(v) => set(value, "curriculumHeadline1", v, onChange)} />
      <StringField label="Curriculum Headline Line 2" value={value.curriculumHeadline2 || ""} onChange={(v) => set(value, "curriculumHeadline2", v, onChange)} />
      <TextareaField label="Curriculum Text" value={value.curriculumText || ""} onChange={(v) => set(value, "curriculumText", v, onChange)} rows={3} />
      <StringField label="Signup Form Headline Line 1" value={value.formHeadline1 || ""} onChange={(v) => set(value, "formHeadline1", v, onChange)} />
      <StringField label="Signup Form Headline Line 2" value={value.formHeadline2 || ""} onChange={(v) => set(value, "formHeadline2", v, onChange)} />
      <TextareaField label="Signup Form Description" value={value.formDescription || ""} onChange={(v) => set(value, "formDescription", v, onChange)} rows={2} />
    </div>
  );
}
