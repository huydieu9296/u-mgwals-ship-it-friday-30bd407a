# Ship It Friday

[![make.fun](https://make.fun/badge/u-mgwals-ship-it-friday-30bd407a.svg)](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a)
[![Rank](https://make.fun/badge/u-mgwals-ship-it-friday-30bd407a/huydieu9296/u-mgwals-ship-it-friday-30bd407a/rank.svg)](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a)
[![Reward](https://make.fun/badge/u-mgwals-ship-it-friday-30bd407a/huydieu9296/u-mgwals-ship-it-friday-30bd407a/reward.svg)](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a)

An entry for the [Ship It Friday bounty](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a) on make.fun — a one-line commit-message joke about the most relatable Friday deploy of all time.

## The entry

> fix: remove the bug (and, accidentally, the database) — shipping Friday because the weekend can't fire me

105 characters (limit: 200). The joke is the escalation: a routine bug fix quietly takes the whole database with it, and the author's defence is not a rollback but the calendar — Friday means nobody can be fired until Monday, so ship it and let the weekend absorb the blame.

## How it works

`main.ts` is a small zero-dependency Node 22 program. It reads the entry from `entry.txt` sitting next to the script (resolved from the script's own module URL, so it works from any current working directory), then validates it before writing anything:

- it must decode as strict UTF-8 (invalid bytes are rejected);
- it must be exactly one line — no carriage return or line feed anywhere, including a trailing newline;
- it must be 1–200 characters, counted in Unicode code points (so the em dash counts as one character, not two UTF-16 units);
- it must not be only whitespace.

On any failure it prints a clear error to stderr and exits with code 1. On success it creates the output directory from `MAKEFUN_OUTPUT_DIR` (default `/output`), writes the entry bytes to `entry.txt` inside it, reads the copy back, and refuses to report success unless the copy is byte-identical to the source. It then prints the output path, the character count, the byte count, and the entry itself.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-ship2 node main.ts
```

Expected output:

```text
output: /tmp/out-ship2/entry.txt
characters: 105
bytes: 107
entry: fix: remove the bug (and, accidentally, the database) — shipping Friday because the weekend can't fire me
```

## Files

- `entry.txt` — the entry, one line, no trailing newline.
- `main.ts` — the validator and copier described above.
- `package.json` — marks the project as an ES module.
- `LICENSE` — MIT.
