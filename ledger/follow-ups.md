# Follow-Ups Ledger

This is your running list of who is waiting on what. Every time you paste an
email thread, one row here gets added or updated. Any morning, ask **"who am I
ghosting?"** and you'll get the overdue ones instantly.

A note on one character: this is a Markdown table, so a `|` inside a cell would
read as a new column. Any pipe carried in from an email (a subject like
`Quote | Building B`) is written as `\|` in the cell. That is the only rewrite;
everything else is recorded as it appeared.

## How to read the columns

- **person** — who the thread is with.
- **company** — their company or context (blank if you don't know it).
- **thread** — a short 2-4 word label for this conversation (e.g. "logo
  project", "revised quote"). It's the stable key: assigned once and kept the
  same for every later email on the same topic, so a follow-up updates this row
  instead of creating a duplicate. The AI keeps it constant; it doesn't get
  re-worded.
- **what** — one plain line: what they need from you, or what you're waiting on
  from them. (This one CAN get re-worded as things move; the `thread` label is
  what stays put.) It records the ask, never the private detail — health,
  injuries, identifying numbers and other people's names stay in your email,
  not in a file that lives for years and gets printed. "Answer her question
  about the employee claim", not the claim itself.
  If one email brings two unrelated jobs, you get two rows, because they finish
  on different clocks and the bundled second one is the one that gets forgotten.
- **status** — `needs my reply`, `waiting on them`, or `closed`. A thread with
  money still owed on it never goes to `closed` on a friendly ending alone —
  "we'll get a check out" is a promise, not a payment. Only you can close a
  money row, by telling the AI it was paid.
- **dollars at stake** — the money riding on this thread: a quote total, an
  unpaid invoice, a job you'd book. Write the number the way it appeared in the
  thread (`$18,400`). If the thread names no number, write `no number named` —
  never a made-up estimate. This is the column that decides what you chase
  first. Only the money that would move in or out of YOUR business counts — a
  customer mentioning their own $340 water bill is not the stake.
- **direction** — `coming in` (money that would come to you: a quote, a
  deposit, an invoice you're owed, a credit you're chasing), `going out` (money
  you owe someone), or `none`. Only `coming in` rows get added into the "at
  risk" total, so the headline number never mixes what you might lose with
  what you owe.
- **relationship** — `repeat customer`, `new lead`, `vendor`, or `other`. A
  repeat customer outranks a colder thread of the same size, because losing one
  costs more than the single job.
- **kind** — which follow-up clock this thread runs on: `quote requested`
  (they asked for a number you haven't sent — the hottest one), `quote out`
  (number sent, sitting with them), `service callback`, `invoice out`,
  `vendor`, or `general`. The clock for each is in the manual; this is what
  makes "overdue" mean something different for a quote than for a parts order.
- **hard date** — a date the other side named: "board meets Sept 3", "closing
  the 30th". Blank if none. A real deadline beats the normal clock, and a row
  with one inside the next week always shows up on today's list. If a thread
  names two — the day they want an answer and the day something actually breaks
  ("best and final by the 15th; policy expires 8/31") — both go in, soonest
  first, with the breaking one marked.
- **last touch** — the date of the most recent message in the thread.
- **next touch** — when to follow up if nothing happens (counted in plain
  calendar days). Blank when closed.

The table below is the **current state**. The History log underneath is the
**append-only paper trail** — nothing there ever gets deleted, so you always
have the full story of every thread.

## Current follow-ups

| person | company | thread | what | status | dollars at stake | direction | relationship | kind | hard date | last touch | next touch |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| _(empty — paste your first email thread to start the ledger)_ | | | | | | | | | | | |

## History

_Append-only. Newest at the bottom. One dated line each time a row is added or
changed, noting the person and thread — e.g. `2026-07-15 — Sarah Lin (revised
quote): added, waiting on them, follow up 2026-07-18`._
