# How the Inbox Follow-Up Ledger was built

Sources for this page: the kit's `CHANGELOG.md`, its tests and package check,
the history of the private business repository it was developed in (under
`pocs/kits/` and later `kits/`), the pull request for its 2026-08-13
hardening round, and the internal audit and workout reports from August 2026.
This public repository starts from a single snapshot commit on 2026-10-27.

## The problem and the first version (2026-07-15)

Small businesses lose quotes and payments in the inbox. Version 1.0
(2026-07-15) was a ledger of open threads kept by the AI from pasted email,
with a "who am I ghosting?" report. It already treated pasted email as data
rather than instructions, matched repeat emails on person and thread, kept
the ledger, branding and config in one place inside the installed skill, and
had a version-aware upgrade. It also softened an earlier "nothing can leak"
claim to the honest one: no email account is connected, but pasted text does
go to the user's AI.

## Timeline

| Date | Version | What happened |
| --- | --- | --- |
| 2026-07-15 | 1.0 | Ledger, "who am I ghosting?", upgrade path, untrusted-input rule. |
| 2026-07-30 | 1.0 | First commit of the kit into version control. |
| 2026-08-11 | - | Kit-line audit. Verdict: rework. |
| 2026-08-12 | 1.0.1 | Rework: triage gate, follow-up windows, dollars-at-risk sweep, printable report, worked examples. |
| 2026-08-12 | 1.0.2 | Workout: three rounds of simulated inboxes; money override, direction and hard-date columns. |
| 2026-08-13 | 1.0.3 | Hardening: `ledger-report.mjs` owns validation, ranking and totals; tests; package check. |
| 2026-08-17 | 1.0.4 | Cross-model review: parser fixes, Node floor corrected, 7 tests. |
| 2026-08-24 | 1.0.4 | Kit moved from `pocs/kits/` to `kits/`. |
| 2026-10-27 | 1.0.4 | Public portfolio snapshot. |

## The audit (2026-08-11)

The audit ran the kit on three realistic threads for an HVAC contractor. It
produced one real hit: a forgotten $18,400 quote, 13 days silent, surfaced in
one line. Everything else it did, a bare AI would have done too. Every rule
was prose the AI might or might not follow, nothing ever refused, and the
install check ran on two fake threads shipped with the kit rather than the
owner's own email. The verdict was rework, with the ledger and "who am I
ghosting?" kept as the part worth sharpening.

## Rework (2026-08-12, version 1.0.1)

- **A triage gate.** Before any classification, a thread needs an
  identifiable sender, a clear direction on the last message and an ask. Any
  failure means no ledger row and one question back.
- **A draft gate.** A reply that needs a price, date or decision only the
  owner has stops and asks, rather than drafting around the gap.
- **Follow-up windows by kind**, replacing a flat one-week default: quote out
  at 3, 7 and cold at 14 days; service callback the same day; invoice 7 days
  past due and a phone call at 30.
- **The backlog sweep and dollars-at-risk ranking**, the part a bare chat
  does not do: a month of threads in one paste, returned as a ranked list
  that leads with the total.
- **A printable, branded report page**, and the install check moved onto the
  owner's own email. The fake threads were deleted.
- Two worked examples, including the HVAC sweep that finds the $18,400 quote.

## Simulated inboxes (2026-08-12, version 1.0.2)

A Claude Opus agent ran the kit's own workflows literally against three
invented inboxes (a landscape and masonry contractor, an insurance agency, a
millwork shop), fixing defects between rounds. What it found:

- **The kit closed an unpaid $8,900 invoice** because the last message was
  "thanks, place looks great". A money row now stays open until the owner
  says the money landed.
- **A lead-platform notification passed the gate** and earned an act-today
  slot. The gate gained a fourth question: is this a conversation between two
  people at all?
- **A $70,165 "sitting on them" headline** added a quote the owner hoped to
  win, an estimate not yet written and a credit owed back. A `direction`
  column now separates money coming in from money going out.
- **A board-meeting deadline was dropped** because the date rule only applied
  to one status. A `hard date` column now applies to every row.
- **An injury and MRI detail** would have been written into a plain-text
  ledger. The ledger now records the ask, never the private detail.
- **One email with two asks lost a deadline.** Asks, not emails, become rows.
- **The draft gate was beaten by "about 15-20% more".** A range is now
  refused as an answer.

The changelog marked all of this as agent runs on invented data, not a real
buyer.

## Hardening (2026-08-13, version 1.0.3)

An OpenAI Codex model (GPT-5.6) wrote the hardening pull request. Its main
finding: ledger validation, date checks, ranking and money totals were still
rules the AI applied by reading prose. They moved into a plain-Node script,
`skills/inbox/scripts/ledger-report.mjs`, with its first tests. The same PR
fixed a zip-install path that was built before branding and left out the
ledger and the script, an upgrade that stranded the owner's ledger in the
backup folder, contradictory refusal wording, and an uninstall that could
delete the only copy of the ledger.

## Cross-model review (2026-08-17, version 1.0.4)

Claude Opus and a second model family (Terra) reviewed the kit
independently. The confirmed findings were in the parser:

- A literal `|` from a pasted subject line ("Quote | Building B") broke the
  row. Cells now split on unescaped pipes only, and an unescaped pipe that
  still splits a row is named as the cause.
- A History section written as a table was read into the ledger. The scan now
  stops at the next heading.
- A missing separator row silently swallowed the first real row. It is now
  validated.
- The declared Node floor (18) was below what the kit's own test command
  needs. It was corrected to 22.6.

The four new parser tests were each observed failing against the old parser
before the fix landed.

## How AI was used

- Claude (Fable 5) co-authored the rework and workout commits.
- A Claude Opus agent ran the three simulated-inbox rounds.
- An OpenAI Codex model wrote the 2026-08-13 hardening pass.
- The 2026-08-17 review paired Claude Opus with a second model family, and
  the fixes were proven against failing tests first.

## How it is tested

- `tests/ledger-report.test.mjs`: 7 `node:test` cases for ranking and
  separated totals, refusal of malformed money values, hard-date promotion,
  escaped and raw pipes, the History-table boundary and the separator row.
- `verify-install.mjs`: required files, version alignment across the package
  and no buyer-facing Bun commands.

## What did not work

- Rules stated only in prose. The AI followed them most of the time; a script
  now owns everything with one right answer.
- A demo install on shipped sample threads. It proved nothing about the
  owner's inbox and was removed.
- Classifying by how a thread ended. A friendly last message is not a payment.

## Current state

Version 1.0.4. Tests and the package check pass. Still open, and stated in the
README: the claude.ai web install, the ChatGPT Project save-back path and a
real-device check.
