# Workflow: Follow-Up Report (the page they can show someone)

Run this when the user wants their follow-up list as something they can look at
away from the chat: print it, keep it open on a second screen, hand it to the
person who does the chasing, or bring it to a Monday morning huddle.

The output is ONE self-contained page — a single `.html` file that opens in
their browser by double-clicking it, works with no internet and nothing
installed, and carries their logo and colors. Nothing to set up, nothing to
log into.

## Before you build it

1. **The ledger has to have real rows in it.** If it is empty, stop and say so:
   "There's nothing in your ledger yet, so there's no report to make. Paste the
   threads you haven't answered and I'll sweep them first." Never generate a
   report full of example people to show what it would look like — a page with
   invented customers on it is the fastest way to lose the user's trust in
   every number the kit ever shows them.

2. **Anchor today's date honestly** (the rule is in `SKILL.md`). Every "days
   overdue" on the page depends on it, and this page gets printed and looked at
   later, so a wrong date lives longer here than in a chat message.

3. **Read `branding/brand.md`** — business name, logo file, primary color,
   accent color, fonts. The page uses THEIR colors and THEIR logo. This is what
   makes it something they will actually show a colleague instead of retyping
   into a document.

4. **Read `branding/image-setup.md`** for the recorded image lane. If a logo
   file exists, reference it. If the recorded lane is designed SVG/CSS artwork,
   draw a clean wordmark of the business name in their primary color — do not
   pretend to generate a raster image on a platform that cannot, and do not
   leave a broken image box on a page the user is about to print.

5. **Run the mechanical report check when Node is available.** From the
   installed skill folder run
   `node scripts/ledger-report.mjs <ledger-file> <TODAY>`. Use its ordered
   `act_today` rows and separated totals in the page. Exit `1` means STOP and
   correct the exact ledger value it names; exit `3` means the file could not be
   read. At T3 label the source `manual-checklist / script not run`.

## What the page contains

In this order, top to bottom:

1. **Header** — their logo or wordmark, business name, "Follow-Ups" and the
   date the report was made.
2. **The money line, big.** "6 overdue. $31,900 at risk." This is the number
   they came for, and it has to mean exactly one thing: sum `dollars at stake`
   across overdue rows **whose `direction` is `coming in`**, and nothing else.
   A `going out` figure never enters this number — it gets its own small line
   below ("Separately: $1,875 owed back to you"). Note how many rows carry no
   figure rather than estimating one. This page gets printed and shown to other
   people, so a mixed or padded total is the one error with the longest life.
3. **Act today**, ranked by what is at risk (the ranking rules in `SKILL.md`: a
   hard date inside 7 days first, then service callbacks, then quote-requested,
   then dollars largest first among `coming in` rows, repeat customers jump one
   place, ties on days silent). Each row: person and company, the thread label,
   the one-line what, the dollars, how many days silent, its window ("quote
   out, 13 days, past second nudge"), and the hard date if it has one. Overdue
   rows carry the accent color; a service callback carries it and says why; a
   row with a hard date shows that date in the accent color too.
4. **Waiting on them, not due yet** — a quieter table with the next-touch date
   on each.
5. **Closed this period** — a count and names only.
6. **Footer** — one plain line: "Generated from your follow-ups ledger on
   <date>. The AI drafts; you send."

## Building it

Write it as ONE file with the CSS inside the page and no outside references
except the user's own logo file (or an inline SVG wordmark). No web fonts, no
scripts fetched from anywhere, no trackers. It has to open on a laptop with the
wifi off.

- Include a favicon as an inline data URI — a simple mark in their primary
  color. Every page this kit makes has one.
- Include print styles: this gets printed. Sensible margins, no dark page
  backgrounds eating a toner cartridge, tables that do not split a row across
  pages.
- Readable at a glance from arm's length. Someone reads this holding a coffee.

**Where it goes:** `~/Documents/inbox-follow-up/follow-ups-<YYYY-MM-DD>.html` —
the exports folder, never the skill folder (the skill folder is for things the
skill READS). Then open it for them if your host can, and either way tell them
the exact path in plain words: "It's in your Documents folder, in
inbox-follow-up — double-click `follow-ups-2026-08-12.html`."

**Where there is no filesystem** (a chat app with no file writing): hand them
the whole page as one copy-ready block and tell them plainly what to do with
it: "Copy this, paste it into a plain text file, name it `follow-ups.html`, and
double-click it." Same page, one extra step. On a phone, offer the plain-text
version of the list instead — a page they cannot save is not worth the
friction.

## Rules

- Real rows only. No sample data on a page with their logo at the top of it.
- Never estimate a dollar figure to make the total look better.
- The page is a REPORT, not a promise: it never says anything was sent,
  scheduled, or chased. The AI drafts, the user sends.
- Regenerate rather than edit. Each report is dated and stands alone, so the
  user can keep last week's next to this week's and see what moved.
