import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

/**
 * Screening for the public contact forms.
 *
 * BCC is a minority-focused organisation, so the inbound abuse is not generic
 * spam — it is targeted, identity-based hate, and the people who read these
 * messages should not have to. Anything caught here is still stored (nothing
 * is destroyed, and a false positive must be recoverable) but it is kept out
 * of the mailing list, out of notifications, and its text is never written to
 * a log where somebody would read it by accident.
 *
 * The sender always sees success. Telling an abuser which words tripped the
 * filter just teaches them how to get through it.
 */

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

/**
 * Dataset words that are identity-based slurs rather than ordinary swearing.
 * A partnership email saying "this is a damn good program" is not abuse; a
 * message containing one of these is not a message we need delivered.
 */
const SLUR_WORDS = new Set([
  "nigger",
  "abeed",
  "africoon",
  "arabush",
  "boonga",
  "chingchong",
  "chink",
  "kike",
  "fag",
  "dyke",
  "tranny",
  "retard",
  "spastic",
  "abo",
]);

// Deliberately NOT in the list above, though the dataset contains it: "negro".
// It is load-bearing in names a partner would legitimately write — the Negro
// Leagues, the United Negro College Fund — and quarantining those messages
// would cost us more than the rare abusive one it would catch.

/** Slurs the profanity dataset does not carry. Word-bounded to avoid eating
 *  "raccoon", "cocoon" and similar. */
const EXTRA_SLURS =
  /\b(spics?|wetbacks?|coons?|gooks?|beaners?|towelheads?|raghead|jungle bunny|porch monkey)\b/i;

/**
 * Identity-directed harassment the profanity dataset does not catch, because
 * every individual word in it is ordinary English.
 */
const HATE_PATTERNS: [RegExp, string][] = [
  [/\bgo back to (your|where)\b/i, "harassment: go-back-to"],
  [/\byou people\b.{0,40}\b(should|need to|belong|are)\b/i, "harassment: you-people"],
  [/\b(white|aryan)\s*(power|pride|supremacy)\b/i, "hate: supremacist"],
  [/\bheil\s+hitler\b|\bsieg\s+heil\b|\b1488\b/i, "hate: nazi"],
  [/\bk\s*k\s*k\b/i, "hate: klan"],
  [/\b(lynch|hang)\s+(you|them|all)\b/i, "threat: lynching"],
  [/\bracial\s+slur\b/i, "hate: explicit"],
  [/\b(deport|send)\s+(them|you)\s+(all\s+)?back\b/i, "harassment: deport"],
  [/\bdon'?t\s+belong\s+(here|in this country)\b/i, "harassment: belonging"],
];

const THREAT_PATTERNS: [RegExp, string][] = [
  [/\bkill\s+(your\s*self|yourself|urself)\b/i, "threat: kys"],
  [/\bk\s*y\s*s\b/i, "threat: kys"],
  [/\bi('?m| am)?\s*(will|gonna|going to)\s+(kill|hurt|find|come for)\s+(you|u)\b/i, "threat: violence"],
  [/\bwe know where you (live|work)\b/i, "threat: doxx"],
  [/\bwatch your back\b/i, "threat: intimidation"],
  [/\b(shoot|blow)\s+up\b/i, "threat: mass violence"],
  [/\bburn\s+(it|this|your)\s+.{0,15}down\b/i, "threat: arson"],
  [/\byou\s+(should|deserve to)\s+die\b/i, "threat: death"],
];

const SPAM_PATTERNS: [RegExp, string][] = [
  [/\b(seo|backlink|guest post|rank #?1 on google)\b/i, "spam: seo"],
  [/\b(crypto|bitcoin|forex|binary option)\b.{0,40}\b(profit|invest|earn)\b/i, "spam: crypto"],
  [/\bviagra|cialis\b/i, "spam: pharma"],
];

const MAX_MESSAGE_LENGTH = 5000;
const MAX_LINKS = 3;

export type Screening = {
  /** Keep it out of Mailchimp, notifications, and logs. Still stored. */
  blocked: boolean;
  reasons: string[];
};

function countLinks(text: string): number {
  return (text.match(/https?:\/\/|www\./gi) || []).length;
}

/**
 * Screen every piece of free text a visitor controls. The message is the
 * obvious vector, but a name or company field will carry a slur just as well.
 */
export function screen(fields: {
  message?: string;
  firstName?: string;
  company?: string;
  segment?: string;
}): Screening {
  const reasons: string[] = [];
  const parts = [fields.message, fields.firstName, fields.company, fields.segment]
    .filter((v): v is string => typeof v === "string" && v.length > 0);
  const combined = parts.join("\n");

  if (!combined) return { blocked: false, reasons };

  // Slurs, including leetspeak and spacing tricks, via the obscenity dataset.
  for (const match of matcher.getAllMatches(combined, true)) {
    const word = englishDataset.getPayloadWithPhraseMetadata(match).phraseMetadata
      ?.originalWord;
    if (word && SLUR_WORDS.has(word)) {
      // Category only. Echoing the matched word would put the slur into the
      // logs and the flag_reason column — the two places staff actually read.
      reasons.push("slur");
      break;
    }
  }

  if (EXTRA_SLURS.test(combined)) reasons.push("slur");

  for (const [re, reason] of [...HATE_PATTERNS, ...THREAT_PATTERNS, ...SPAM_PATTERNS]) {
    if (re.test(combined)) reasons.push(reason);
  }

  const message = fields.message ?? "";
  if (message.length > MAX_MESSAGE_LENGTH) reasons.push("spam: over-length");
  if (countLinks(message) > MAX_LINKS) reasons.push("spam: link-stuffing");

  return { blocked: reasons.length > 0, reasons: [...new Set(reasons)] };
}
