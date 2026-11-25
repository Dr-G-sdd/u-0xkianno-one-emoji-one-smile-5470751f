// One Emoji, One Smile — entry program.
//
// Writes exactly one emoji, and nothing else, to entry.txt.
// The emoji is U+1FAF6 HEART HANDS: two hands forming a heart —
// a small, deliberate gesture of warmth offered to a stranger,
// warmer and more chosen than a default smiley face, and readable
// the same way at any age and in any language.
//
// Guard: before writing, verify the text is exactly one grapheme
// cluster and that it is a single emoji (Extended_Pictographic),
// so a stray edit can never turn the entry into two characters,
// plain text, or an empty file. Fail loudly instead of writing
// something the gate would reject.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🫶";

const graphemes = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(EMOJI)];
if (graphemes.length !== 1) {
  throw new Error(`expected exactly one grapheme, got ${graphemes.length}`);
}
if (!/^\p{Extended_Pictographic}$/u.test(EMOJI)) {
  throw new Error("expected a single emoji character");
}
if (EMOJI.trim().length === 0) {
  throw new Error("emoji must not be whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
