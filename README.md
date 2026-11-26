# Ship It Friday

[![make.fun](https://make.fun/badge/u-mgwals-ship-it-friday-30bd407a.svg)](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a)
[![Rank](https://make.fun/badge/u-mgwals-ship-it-friday-30bd407a/huydieu9296/u-mgwals-ship-it-friday-30bd407a/rank.svg)](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a)
[![Reward](https://make.fun/badge/u-mgwals-ship-it-friday-30bd407a/huydieu9296/u-mgwals-ship-it-friday-30bd407a/reward.svg)](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a)

Entry for the [Ship It Friday bounty](https://make.fun/bounty/u-mgwals-ship-it-friday-30bd407a) on make.fun.

## Entry

> fix: remove the bug (and, accidentally, the database) — shipping Friday because the weekend can't fire me

105 characters (limit: 200), exactly one line.

## How it works

`main.ts` reads the single funny line from `entry.txt` next to it and writes it byte-identical to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`). It validates the entry first: valid UTF-8, exactly one line with no CR/LF anywhere (including a trailing newline), 1–200 characters counted by code points, and not only whitespace. It then verifies the written file is byte-identical before reporting success. It runs with no network, from any working directory, in a read-only `/bot` directory.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-ship node main.ts
```
