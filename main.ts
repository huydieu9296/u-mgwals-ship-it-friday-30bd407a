// Ship It Friday — make.fun text bounty entry.
//
// The entry itself is a one-line commit-message joke about the most
// relatable Friday deploy of all time:
//
//   fix: remove the bug (and, accidentally, the database) — shipping
//   Friday because the weekend can't fire me
//
// The humour is the escalation: a routine bug fix quietly takes the whole
// database with it, and the author's defence is not a rollback or a
// post-mortem but the calendar — Friday means nobody can be fired until
// Monday, so ship it and let the weekend absorb the blame. The em dash
// before "shipping" is the punchline's pause: everything before it is the
// confession, everything after it is the shrug.
//
// What this program does: it reads that one line from entry.txt sitting
// next to this script, validates it (strict UTF-8, exactly one line,
// 1–200 Unicode code points, not blank), and copies it byte-for-byte
// into the output directory the judge provides via MAKEFUN_OUTPUT_DIR
// (default /output). It then reads the copy back and refuses to report
// success unless the copy is byte-identical to the source.
//
// Usage:
//   MAKEFUN_OUTPUT_DIR=/some/dir node main.ts
// With no environment variable set, the entry lands in /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The script lives next to entry.txt, so resolve from the module URL.
// That keeps the program working no matter which directory it is run from.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const raw = readFileSync(sourcePath);

// Strict UTF-8: a fatal decoder rejects any invalid byte sequence.
let entry: string;
try {
  entry = new TextDecoder("utf-8", { fatal: true }).decode(raw);
} catch {
  fail("entry.txt is not valid UTF-8");
}

// Validate the decoded entry and return its length in Unicode code
// points. Any problem is fatal: a clear message goes to stderr and the
// process exits with code 1, so a bad entry can never slip through
// silently and produce an output file.
function validateEntry(text: string): number {
  // One line only: no carriage return or line feed anywhere, trailing
  // or not. A trailing newline would make this two lines ("entry" plus
  // an empty one), so entry.txt is stored without one.
  if (text.includes("\r") || text.includes("\n")) {
    fail("entry must be exactly one line — found a CR or LF character");
  }

  // Count Unicode code points, so characters outside the BMP (and the em
  // dash in this entry) each count as one, not as two UTF-16 units.
  // [...text] splits on code points, while text.length would not.
  const count = [...text].length;
  if (count < 1) {
    fail("entry is empty; it must contain at least 1 character");
  }
  if (count > MAX_CHARS) {
    fail(`entry is ${count} characters, over the ${MAX_CHARS}-character limit`);
  }

  // A line of only spaces or tabs is not an entry.
  if (text.trim().length === 0) {
    fail("entry must not be only whitespace");
  }

  return count;
}

const charCount = validateEntry(entry);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, raw);

// Read the copy back and confirm it matches the source byte for byte.
const written = readFileSync(outputPath);
if (!written.equals(raw)) {
  fail(`output at ${outputPath} does not match entry.txt`);
}

console.log(`output: ${outputPath}`);
console.log(`characters: ${charCount}`);
console.log(`bytes: ${raw.length}`);
console.log(`entry: ${entry}`);
