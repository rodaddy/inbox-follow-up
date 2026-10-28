# Workflow: Who's Waiting ("who am I ghosting?")

Run this when the user asks "who am I ghosting?", "who's waiting on me?",
"what's overdue?", or wants their morning follow-up list. This is the daily
magic question.

## Steps

1. **Anchor today's date first — honestly.** This whole report compares
   `next touch` dates against today, so the date has to be right. If your host
   reliably gives you the current date, state it: "Today is <date> — say if
   that's off." If you're not sure, ask the user "What's today's date?" before
   sorting. Never guess it, and never reuse a date from an old email. (One
   plain sentence on the counting: a date is "overdue" if it is today or any
   earlier calendar day; it's "not due yet" if it falls on a later calendar
   day.)

2. **Read the ledger.** Read the ledger path from the `ledger file:` key in
   `USER-CONFIG.md`; if that's missing, open `ledger/follow-ups.md` beside the
   skill. If there is no ledger file at all (bare chat), use whatever ledger
   you've been keeping in the conversation.

2.5 **Ledger empty? Say so and offer the sweep — do not invent rows.** "Your
   ledger is empty, so there's nothing to be overdue on yet. Paste the threads
   you haven't answered from the last month and I'll sweep the lot and rank
   them" (the Backlog Sweep workflow). Never populate a report with example
   people to show what it would look like.

3. **Run the mechanical check when Node is available.** From the installed
   skill folder run `node scripts/ledger-report.mjs <ledger-file> <TODAY>`. Exit
   `1` means STOP and correct the exact ledger value it names; exit `3` means
   the file could not be read. Use the returned `act_today` order and totals —
   do not recalculate them differently. At T3, label the result
   `manual-checklist / script not run` and sort into three plain lists:

   - **You're ghosting these (act today).** Every row with status
     `needs my reply`, plus any `waiting on them` row whose `next touch` date
     is today or already past — the follow-up nudge is due — plus any row whose
     `hard date` falls within the next 7 days, even if its next touch has not
     come up. These are the people the user is, in effect, leaving hanging.
   - **Waiting on them (not due yet).** Rows with status `waiting on them`
     whose `next touch` is still in the future. Nothing to do yet; show the
     date so the user knows when it comes up.
   - **Closed.** Skip these unless the user asks to see closed items.

4. **Lead with the money line.** One sentence before the list: "Four overdue,
   $24,100 sitting on them." Add up `dollars at stake` across the act-today
   rows **whose `direction` is `coming in`, and only those** — never fold a
   `going out` figure into it, because the user reads this number as what they
   might lose. Skip rows marked `no number named` from the total and say how
   many were skipped if any ("plus two with no figure attached"). If there are
   overdue `going out` rows, give them their own short line afterwards
   ("Separately: $1,875 you're owed back from Sunbelt"). Never estimate a
   figure to make the total look complete.

5. **Show the "act today" list, ranked by what is at risk** — not by date. Use
   the ranking rules in `SKILL.md`: a `hard date` inside 7 days first, then
   service callbacks regardless of dollars, then `quote requested`, then
   dollars largest first among `coming in` rows, repeat customers jump one
   place over a same-sized new lead, ties break on days silent, `going out`
   rows last under their own heading. For each: person, company, the thread
   label, the one-line "what," the dollars, how overdue it is against ITS OWN
   window ("quote out, 13 days, past the second nudge"), the hard date if it
   has one, and one short reason it is placed where it is.

6. **Then the rest.** "Waiting on them (not due yet)" with dates, and a count
   of closed rows. Skip closed detail unless asked.

7. **Offer to act.** "Want me to draft replies for the top ones?" — and if they
   say yes, run the Draft Reply workflow for each (its missing-fact gate
   applies every time). Also offer the page: "Want this as a report you can
   print or keep open?" → the Follow-Up Report workflow.

## Rules

- Lead with the money, then who they're ghosting. That's the whole point — an
  instant, no-excuses list with a number on it.
- Plain language, short lines. This is a morning glance, not a report.
- Read-only on the ledger unless the user asks you to update or draft.
- Never claim to have contacted anyone. You're showing the list, not sending.
- Never invent a person, a thread, or a dollar figure to fill out the list. An
  empty or short list is the honest answer.
