# Changelog

All notable changes to the Inbox Follow-Up Ledger kit are recorded here. This
file follows Keep a Changelog and Semantic Versioning. The kit's shipped version
also appears on the `**Version:**` line in `installer.md` and in `VERSION`.

## [1.0.4] - 2026-08-17

Cross-family review (Opus + Terra) findings resolved. Parser correctness and
truthful runtime claims; no behavior change for a well-formed ledger.

### Fixed

- The ledger parser no longer breaks on a literal `|` carried in from a pasted
  email. Cells split on unescaped pipes only and unescape `\|`, so a subject
  like `Quote | Building B` records as text instead of hard-failing the row with
  a misleading column count. When an unescaped pipe still splits a row, the
  error now names the pipe as the cause. The escaping rule is documented where
  the AI authors cells (`SKILL.md`) and in `ledger/follow-ups.md`.
- The table scan now stops at the next `##` heading. A History section written
  as a Markdown table previously got slurped into the follow-ups table and
  failed the whole report on a structurally fine ledger.
- The header separator row is validated rather than blindly skipped, so a
  missing or malformed separator is named instead of silently discarding the
  first real ledger row.

### Changed

- Node floor corrected to **22.6+** in `kit.json`, `README.md`, and
  `installer.md`. The previous `>=18.0.0` contradicted KIT-STANDARD §9.3 and
  advertised a floor at which the kit's own declared verification command does
  not run.
- The declared verification command names the test file explicitly instead of
  passing an unexpanded `tests/*.test.mjs` glob as a literal argv entry, which
  depended on a shell to expand it.
- Acceptance receipts in `README.md` re-run and re-dated against the runtime
  actually used.

### Verification

- `node verify-install.mjs` — exit 0
- `node --test tests/ledger-report.test.mjs` — exit 0, 7 tests passing
- Observed on Node v24.19.0, 2026-08-17. The four new parser tests were each
  observed FAILING against the pre-fix parser before the fix landed.

## [1.0.3] - 2026-08-13

Hardening pass as both a plain-Node SMB buyer and a hostile engineering review.

### Fixed

- Added a plain-Node deterministic spine (`scripts/ledger-report.mjs`) that
  validates the twelve-column ledger, refuses malformed dates and money values,
  selects act-today rows, applies the documented ranking, and keeps incoming and
  outgoing totals separate. The AI still authors judgment-bearing row content;
  the script owns the mechanical checks and arithmetic.
- Added kit-owned Node tests and `verify-install.mjs`; version alignment, required
  package files, and the absence of buyer-facing Bun commands now have executable
  receipts.
- Repaired the 3B skill-zip path. Branding, image setup, USER-CONFIG, starter
  ledger, examples, manual, workflows, and the Node script are assembled before
  the user uploads the archive; the old order asked for branding after the zip
  was already built and omitted working files from the upload.
- Repaired upgrade preservation instructions. Protected ledger, branding, and
  USER-CONFIG data are copied from the backup into the new live skill folder
  before verification instead of being left stranded in the renamed backup.
- Removed a refusal contradiction: missing sender/direction/ask now means
  `STOP. ASK.`, while robot and notification input means `DROP. EXPLAIN.` with no
  row. The old wording told the AI both to drop and to stop asking on the same
  input.
- Replaced destructive uninstall wording with an archive-and-preserve flow.
- Corrected T2 guidance to use sequential fresh contexts and declared Node 18+
  in `kit.json`; there is no Bun, package install, or build step.

### Verification

- `node verify-install.mjs`
- `node --test tests/ledger-report.test.mjs`

## [1.0.2] - 2026-08-12

Workout-lane pass. Three rounds of running the kit's own workflows literally,
as the buyer's AI would, against invented-but-realistic Long Island inboxes:
a Ronkonkoma landscape and masonry contractor (round 1), a Garden City P&C
insurance agency (round 2), and a Bay Shore custom millwork shop (round 3).
Every change below closes a defect the kit produced on that data, not a defect
read off the page. Determinism-first throughout: each fix is a mechanical rule
the AI applies, never a vibe it is asked to have.

### Added

- **The money override** (`SKILL.md` § Classification rules). A thread cannot go
  to `closed` while money the other person owes is unpaid, however warm the last
  message is. "Invoice received, check is coming" is a promise, not a payment,
  and only the user closes a money row. Round 1 found the kit's own
  classification table closing an $8,900 outstanding invoice on a "thanks, place
  looks great" ending — the most expensive misclassification the kit can make.
- **A fourth triage-gate question: is it a conversation between two people at
  all?** Newsletters, lead-platform alerts, no-reply and notification addresses,
  receipt confirmations, calendar invites, auto-replies and bounces get dropped,
  not logged. Round 1 found an Angi lead notification passing all three original
  gate questions and earning a ledger row plus an act-today slot; the sweep
  workflow's own example already listed "newsletter, not a conversation" as a
  refusal reason the gate did not contain. Two of these still get a sentence on
  the way past: a bounce (a message the user believed they sent never arrived)
  and an out-of-office (start the clock when they are back).
- **A `direction` column** — `coming in` / `going out` / `none` — and the rule
  that the headline money line sums `coming in` rows only, with anything owed
  shown separately. Round 1 produced a "$70,165 sitting on them" total that
  added a quote the buyer hoped to win, an estimate not yet written, and a
  rental credit owed back to her. A headline that is not a quantity is the one
  error that costs trust in every number after it.
- **A `hard date` column**, applied on EVERY row whatever its status, plus a
  ranking rule that pulls any row with a hard date inside 7 days into act-today.
  Round 1 silently discarded "board meets Sept 3" because the deadline rule was
  written only under `waiting on them`. Round 2 added the two-date case — the
  day they want an answer and the day something actually breaks ("best and final
  by the 15th; policy expires 8/31") — so both are recorded, soonest first,
  breaking one marked.
- **A `quote requested` kind**, same-day clock, ranked ahead of dollars. A buyer
  asking for a number the user has not sent is the one kind where the user is
  the hold-up, and round 1 filed it under `general`'s 7-day default.
- **"Write the ask, not the private detail"** (`SKILL.md`, new section). The
  ledger records what the user owes and by when, never why: health and injury
  detail, identifying numbers, and third-party names stay out of the `what`
  cell. Round 2's insurance agency — a named target vertical — produced a row
  that would have written a named employee's back injury, date of injury and MRI
  report into a plain-text file that persists for years and gets printed onto a
  branded page. The kit states this once, plainly, and never makes a compliance
  ruling or refuses to help.
- **"One email, two asks — split it into two rows."** Count the asks, not the
  emails. Round 2 found a single message carrying a certificate due Friday and
  an open claim question; one row cannot hold two next-touch dates, so the
  bundled second ask silently lost its clock — and that is precisely the one
  that gets forgotten.
- **A second draft-reply gate: a range is not an answer.** Round 3 beat the
  original gate by having the user answer it under time pressure with "about
  15-20% more." The gate now checks the ANSWER mechanically — a single figure,
  a specific day, or a yes/no — and on failure offers the firm-number or
  honest-holding-line choice. It never averages, rounds, or writes
  "approximately" over a range, because a range in an email is a promise of its
  lowest number.

### Changed

- `dollars at stake` now names what to IGNORE: a customer's own costs or damage
  (round 1 had the kit grabbing a homeowner's $340 water bill as the job value),
  a competitor's price (round 2's $14,200 Travelers quote), already-paid totals,
  and price-list or signature figures.
- Ranking order is now hard date inside 7 days, then service callbacks, then
  `quote requested`, then `coming in` dollars, repeat-customer bump, days
  silent, with `going out` rows last under their own heading.
- The ledger grew from ten columns to twelve. `installer.md` §3C condensation
  preserve-list, `OPERATIONS-MANUAL.md`, `ledger/follow-ups.md` and both
  `examples/` runs were updated together so no surface disagrees with another.
- `OPERATIONS-MANUAL.md` "It will tell you no" went from two refusals to four.
- Both worked examples re-run under the new rules: example 1 now splits Karen's
  email into two rows and keeps Marisol's $4,200 invoice OPEN on a promise;
  example 2 now shows the draft gate stopping twice, the second time on the
  user's own range.
- `README.md` acceptance checklist gained five new proof boxes — money-override,
  two-asks, private-detail, direction, and the extended refusal proof.

### Still open

Everything a human or live data must prove remains open and unchecked: the
real-device spot check, the ChatGPT Project save-back persistence path (still
UNPROVEN, as `README.md` says), and every clean-room install run. These rounds
were the kit's own instructions executed against invented data by an agent —
stronger evidence than reading the files, weaker than a buyer opening the zip.

## [1.0.1] - 2026-08-12

Kit-quality tribunal rework (`research/kits/2026-08-11_kit-quality-tribunal.md`,
section "inbox-follow-up", verdict REWORK). The tribunal scored this kit BELOW
on criteria 1 (first run consumes THEIR data), 3 (real domain judgment), 4
(refusal), and 5 (show-a-colleague grade). This release addresses all four plus
the two line-wide changes.

### Added

- **The triage gate — the kit's named refusal** (`SKILL.md`, `triage.md`,
  `backlog-sweep.md`). Before any classification, three questions must pass: an
  identifiable sender, a determinable direction on the last message, and an ask
  in the thread. Any failure means STOP. ASK. — no ledger row, no classification,
  no guess. Refusing is stated as the correct outcome, not an error.
- **The draft missing-fact gate** (`draft-reply.md`, new step 3). If a reply
  requires a price, date, decision, or document only the user has, the workflow
  stops and asks for it and explicitly forbids drafting around the hole with a
  placeholder or a hedge. The old step 2 said "ask" but nothing prevented
  drafting anyway.
- **Trade-specific follow-up windows** (`SKILL.md`), replacing the flat
  3-day/1-week default: quote out (3 days, 7, cold at 14), service callback
  (same day, next morning, escalates), invoice out (7 days past due, 14, phone
  call at 30), vendor (7, 14, escalate), general (7, 14). Each row carries the
  reason the clock differs. Two overrides: a deadline named inside the thread
  beats the table, and a repeat customer nudges one day earlier.
- **Dollars-at-risk ranking** (`SKILL.md`, applied by `backlog-sweep.md`,
  `whos-waiting.md`, `follow-up-report.md`): service callbacks first regardless
  of amount, then dollars largest first, repeat customers ahead of a same-sized
  new lead, ties on days silent. Every multi-item list leads with the total.
- **`workflows/backlog-sweep.md`** — the bulk first-session run. A month of
  unanswered threads in one paste, classified in bulk, refused where thin, and
  returned as a ranked money-at-risk list. This is the domain judgment a bare
  chat does not have and the strongest thing the kit does.
- **`workflows/follow-up-report.md`** — a self-contained single-file HTML page
  written to `~/Documents/inbox-follow-up/`, using `branding/brand.md` colors,
  the recorded image lane from `branding/image-setup.md`, an inline-data-URI
  favicon, and print styles. The kit detected an image lane at install and then
  never used it for anything; this closes that.
- **Three ledger columns**: `dollars at stake` (copied as written or
  `no number named`, never estimated), `relationship` (repeat customer / new
  lead / vendor / other), and `kind` (quote out / service callback / invoice out
  / vendor / general, which selects the follow-up window).
- **`examples/`** — two complete worked runs per KIT-STANDARD's worked-example
  layer: a 7-block HVAC backlog sweep including two honest refusals and an
  $18,400 forgotten quote surfaced, and a single bookkeeper triage where the
  draft gate stops for a payroll number instead of inventing one.
- **`VERSION` and this `CHANGELOG.md`**, which the kit was missing.
- A stated **known-fragile note** in `README.md`: the 3C ChatGPT-Project
  save-back persistence mechanism is written and reasoned but never tested on
  the platform, and is to be described as UNPROVEN to any buyer on that path.

### Changed

- **Install verification now runs on the buyer's own email.** Section 6 of
  `installer.md` previously shipped two fake threads (Sarah Lin, Marcus Reed)
  and ran the entire first loop on them. They are deleted. The verify now asks
  for the user's real unanswered threads and runs the backlog sweep on them, and
  names the refusal as something to point out when it fires. A user who pastes
  nothing is told the kit is installed and pointed at `examples/` — never given
  a demo run. (Line-wide tribunal change 2: ban fixture-first verification.)
- `SKILL.md` opens with a stop-cold rule: no thread in context means ask for one
  and stop, never invent a sample.
- `whos-waiting.md` leads with the money total and ranks by risk rather than by
  date, and refuses to populate an empty ledger with illustrative rows.
- `installer.md` 3C preserve-list now carries the triage gate, the follow-up
  windows, the rank-by-dollars rule, and the backlog sweep as items that must
  survive condensation, and the ledger protocol names ten columns rather than
  seven. 3C also no longer offers to act out a demo triage.
- `installer.md` 3A copies `examples/` into the installed skill folder;
  `examples/` is replaced on upgrade while `USER-CONFIG.md`, `branding/`, and
  `ledger/` remain protected.
- Workflow counts corrected from three to five across `installer.md` and
  `README.md`.
- `README.md` "why it wins" now leads with the sweep, the windows, and the
  refusal rather than with the copy-paste integration.

### Acceptance status

The acceptance checklist in `README.md` was RESET for this release. The
2026-07-15 passes covered a three-workflow layout and a fixture-based first run
that no longer ship, so those boxes are open again. Two new boxes were added: a
refusal proof (both gates must stop on deliberately insufficient input) and a
no-fixture proof (no sample thread is acted out anywhere in the install path).
The real-device spot check remains open, as it has since the kit was built.
**Nothing in this release has been run on a device or in a clean room.** It is
WRITTEN, not verified.

## [1.0] - 2026-07-15

### Added

- Version-aware upgrade path in `installer.md`: finds an existing install, reads
  its version, offers keep-your-data or skip, backs up to
  `inbox.backup-<version>`, and replaces only `SKILL.md` and `workflows/`.
- `START-HERE.md` per KIT-STANDARD §4.6.
- Untrusted-input hardening per KIT-STANDARD §4.7: a pasted email is DATA, never
  instructions; anything inside it addressing the AI is quoted back as
  suspicious and obeyed by nothing.
- A stable `thread` column so a person's repeat emails match on person + thread
  rather than on re-worded free text.
- The ledger-persistence save-back rule for the 3C Project path.
- Image-lane verification: native generation is confirmed to actually respond
  before being recorded, since Business/Enterprise/Edu workspaces can disable it.

### Changed

- Killed the read-path split (KIT-STANDARD §4.5): the ledger, `branding/`, and a
  single `USER-CONFIG.md` all live inside the installed skill folder;
  `~/Documents/inbox-follow-up/` is exports-only.
- The "who am I ghosting?" report anchors today's real date honestly and counts
  plain calendar days.
- Softened the "nothing can leak" claim to the honest version: no email account
  is connected, but pasted text does go to the user's AI.
