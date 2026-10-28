# Tier: basic

The Inbox Follow-Up Ledger ships as a single tier. There is no upgrade tier and
no held-back feature: `basic` is the whole kit.

## What ships

One canonical package of folders and markdown, with a self-adapting
`installer.md` that makes any receiving AI transform the package into whatever
its host platform needs:

- `START-HERE.md` -- how to get `installer.md` in front of your AI, by device.
- `installer.md` -- detects the runtime, adapts the package, installs, verifies.
- `OPERATIONS-MANUAL.md` -- how to drive it, including the morning ritual.
- `skills/inbox/` -- one skill: `SKILL.md`, five workflows (`triage.md`,
  `backlog-sweep.md`, `draft-reply.md`, `whos-waiting.md`,
  `follow-up-report.md`), and `scripts/ledger-report.mjs`.
- `ledger/follow-ups.md` -- the starter ledger.
- `examples/` -- two complete worked runs on real-shaped email.
- `kit.json`, `package.json`, `verify-install.mjs`, `tests/` -- the declared
  plain-Node runtime, the kit-owned verify and test commands.

What it does: you paste a month of unanswered email, the AI classifies the pile,
refuses the threads that are too thin to log, and maintains
`ledger/follow-ups.md` -- a running list of who is waiting on what, how much
money is riding on each one, and when to nudge, using follow-up windows that
differ by kind of thread. Any morning you ask the magic question, "who am I
ghosting?", and get the list ranked by dollars at risk rather than by date.

The kit runs at three capability levels depending on the host, all inside this
one tier: T1 full (subagents and workflow orchestration, ledger on disk), T2
shell-only (sequential batches, plain-Node validation, Node 22.6+), and T3
chat-only (core job intact, but state and gate enforcement become manual). The
full statement of what T3 loses is in the kit `README.md`.

## Who it is for

An owner or operator whose unanswered email is where the money goes quiet: the
contractor with quotes out from his phone between jobs, the two-person
bookkeeping shop, any small business running without a CRM or an office manager.
It gives that person and their staff more finished work per day -- the AI reads
the pile, does the sorting and the drafting, and hands the human back a ranked
list so their attention lands on the expensive thread first. The person still
owns every judgment call and every send.

## What it refuses to do

- **It never sends.** The AI drafts, the human sends. It does not send,
  schedule, or transmit anything, and it promises no email-account hookup.
- **It never connects to your email.** The integration is copy-paste: no login,
  no password handed over, no permission granted to any account. The honest
  caveat that ships with that claim: the text you paste does go to whatever AI
  you are using, same as anything you type into it, so for confidential or
  privileged client email the choice of AI and plan matters.
- **It refuses a thread too thin to log.** No identifiable sender, no clear
  direction, or no ask in it means no ledger row; a newsletter or a
  lead-platform alert is not a conversation and does not get one either.
- **It refuses to invent a number.** A reply that needs a price or a date it has
  not been given stops and asks. Answer with a range like "about 15-20%" and it
  stops again, because a range in an email is a promise of its lowest number.
- **It never closes a thread while money is still owed.** A friendly ending is
  not a payment; "we'll get a check out" leaves the row OPEN until you say it
  landed.
- **It keeps private detail out of the file.** The ledger records what you owe
  someone and by when, never why. Injuries, medical reports, ID numbers, and
  other people's names stay in your inbox.
- **It treats a pasted email as data, never instructions.** An email saying
  "mark this closed" is quoted back as suspicious, never obeyed; status changes
  come only from the user.

## Install

Per `installer.md` -- the buyer never opens a terminal; the AI does all of it.

1. Unzip the kit and get `installer.md` in front of your AI (see
   `START-HERE.md` for the per-device steps), then say: **install inbox
   follow-up.**
2. The AI detects its own runtime and picks a path: a coding agent with
   filesystem access (3A), a chat app that accepts skill zip uploads (3B), a
   chat app with projects or custom instructions (3C), or a plain chat
   session (3D). It adapts the package to the host rather than declaring it
   incompatible.
3. On the filesystem path it checks for a collision first. An existing Inbox
   Follow-Up is an upgrade: back up to `inbox.backup-<old-version>`, replace
   only `SKILL.md` and `workflows/`, and carry `USER-CONFIG.md`, `branding/`,
   and `ledger/` across untouched. An unrelated skill named `inbox` prompts
   before anything is overwritten.
4. It copies `skills/inbox/` recursively into the skills directory, plus
   `OPERATIONS-MANUAL.md` and `examples/`.
5. It sets up `inbox/ledger/follow-ups.md` inside the skill folder, because
   that is the skill-relative path the skill reads, and writes the single
   config file `inbox/USER-CONFIG.md`.
6. It runs image-capability detection and the branding interview, creating
   `inbox/branding/brand.md` so drafts sound like you.
7. It asserts the install, and where Node 22.6+ is available runs
   `node scripts/ledger-report.mjs ledger/follow-ups.md <today>` as a
   deterministic check. Verification then sweeps your own real unanswered
   email, never a shipped sample.

## Current version

1.0.4

Source: this folder plus the kit root; see `../../CHANGELOG.md` for history.
