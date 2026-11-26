// Rename the Planet — make.fun competition
// u-motasimfuad-rename-the-planet-094b0369
//
// The task: one line, 1-200 characters, that gives a planet of our solar
// system a funny new name and says why in the same breath. A house judge
// compares lines two at a time on (1) planet named + funny name + why,
// (2) funniness from the idea, not a pun on the planet's real name alone,
// (3) the why earning the name from that planet's own traits, (4) freshness
// of the angle, and (5) tightness of the wording.
//
// Chosen entry:
//   Mars is now "The Red Flag" — it keeps hinting it once had water, then
//   ghosts every rover we send to check.
//
// Why this one: the joke is an idea (Mars as a bad date), not a pun on the
// name "Mars". The why leans on traits only Mars has: it is red, it keeps
// showing evidence of ancient water, and we keep sending rovers to check.
// A red flag that ghosts you after hinting at commitment is a fresh angle;
// nobody else is renaming Mars after a dating metaphor.
//
// Brainstormed candidates that were cut:
//   - Jupiter -> "The Bouncer": its gravity throws asteroids out of the
//     inner solar system's club. Good, but "bouncer" is a well-worn
//     metaphor for any big guard, and the laugh lands a beat slower.
//   - Saturn -> "The Hoarder": it never throws anything away, it just
//     keeps it all in rings. Cute, but the rings-as-clutter idea is
//     thin and the name does not feel like a joke on first read.
//   - Venus -> "The Toxic Ex": hottest in the solar system and still
//     burns you with acid rain. Funny, but "toxic ex" is a tired phrase
//     and the acid-rain punchline does the same job as the heat alone.
//   - Mercury -> "The Commuter": an 88-day year, always in a rush.
//     Accurate, but "commuter" is a label, not a joke; no second beat.
//   - Neptune -> "The Drama Queen": 2,100 km/h winds, always storming
//     about something. Decent, but "drama queen" is generic and could
//     fit any stormy planet, so the why does not earn the name.
//   - Uranus -> anything playing on the name: cut on purpose. The judge
//     explicitly discounts jokes that are only a pun on the real name,
//     and every Uranus angle is that joke, already told a thousand times.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Must stay a single line of 1-200 characters (counted
// per code point), not only whitespace, with no leading/trailing space.
const ENTRY =
  `Mars is now "The Red Flag" — it keeps hinting it once had water, then ghosts every rover we send to check.`;

// Gate checks, mirroring the sealed scorer: UTF-8 text of 1 to 200
// characters, not only whitespace, and a single line.
function validateEntry(text) {
  const chars = [...text]; // spread counts code points, not UTF-16 units
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Valid UTF-8: a round trip through TextEncoder/TextDecoder must be
  // lossless, so no lone surrogates or unpaired code units can slip in.
  const roundTripped = new TextDecoder("utf-8", { fatal: true }).decode(
    new TextEncoder().encode(text),
  );
  if (roundTripped !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
  return chars.length;
}

// Write the validated entry to entry.txt inside the output directory.
// The harness sets MAKEFUN_OUTPUT_DIR; default to /output when unset.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const length = validateEntry(ENTRY);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf-8");
console.log(`Wrote entry.txt (${length} characters) to ${outputDir}`);
