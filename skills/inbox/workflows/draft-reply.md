# Workflow: Draft Reply

Run this when a thread needs the user's reply and they want it written for
them. The AI writes the draft. **The human sends it.**

## Steps

1. **Read the user's voice first.** Open `branding/brand.md` and read the
   voice notes (formal or friendly), the user's name for the signoff, and the
   business name. If `branding/brand.md` does not exist, ask the user their
   name and whether they want the reply to sound formal or friendly, then
   continue. The draft must sound like the user, not like an AI.

2. **Understand what's being asked.** From the pasted thread, pin down exactly
   what the other person needs and what the user would want to say back.

3. **The missing-fact gate — STOP. ASK.** Before writing a single line, check
   whether the reply requires a fact only the user has:

   - **a price or number** you were not given ("send the revised quote"),
   - **a date or time** ("when can you start?", "does Thursday work?"),
   - **a decision** the user has not made ("are you taking the job?", "can you
     do it for $9,000?"),
   - **a document or attachment** you cannot see.

   If any of those is required → **STOP. ASK.** Do not write the draft, and do
   not write around the hole with a placeholder, a hedge, or a
   get-back-to-you filler. Ask one short, specific question:

   > "Before I write this: what's the revised number with the extra two hours?
   > Karen asked for it directly, so a reply that dodges the number will just
   > start another round."

   **The gate stays shut until the answer is a FACT.** This is where it
   actually gets beaten: the user, under time pressure, answers with a hedge —
   "about 15-20% more", "somewhere around nine grand", "roughly a week", "call
   it the usual". That is not an answer, it is the same gap in the user's own
   handwriting, and drafting it turns their guess into a number their customer
   holds them to. Check the answer mechanically before you write anything:

   - a number must be a single figure, not a range or an "about";
   - a date must be a specific day, not "soon", "next week" or "shortly";
   - a decision must be yes or no, not "probably" or "I think so".

   If the answer fails that check, say so once, plainly, and offer the two real
   options — never split the difference yourself:

   > "15-20% on $9,800 is a $980 spread, and she's signing tonight — if I put a
   > range in the email she'll read the bottom of it. Two ways to go: give me
   > the firm walnut number and I'll send her a real quote, or I write the
   > honest holding line — 'walnut runs more than maple, I'll have the exact
   > number to you by 9am' — and you keep the job alive without committing to a
   > figure. Which one?"

   Then wait again. **Never average a range, never round it, and never write
   "approximately" over the top of it** — a range in an email is a promise of
   its lowest number. If the user picks the holding line, it must carry a
   specific time they chose, and the row's next touch is set to that time.

   Wait for the answer, then draft. **Refusing to draft is the correct outcome
   here**, not a failure — a polite email that answers nothing costs the user
   another week of the same thread, and a made-up number costs them far more
   than that. Never fabricate the fact, never soften it into "I'll follow up
   with pricing shortly" unless the user says that is what they want. If the
   user genuinely does not know yet, say so and offer the honest holding reply
   WITH a date attached ("I'll have that number to you by Thursday") — but only
   after they have told you the date.

4. **Write the draft.** Keep it in the user's voice:
   - Match their formality from `brand.md`.
   - Greet the person by name, answer what they asked, keep it tight.
   - No AI throat-clearing ("I hope this email finds you well" unless that's
     genuinely their style), no invented commitments, no made-up facts.
   - End with the user's normal signoff and name from `brand.md`.

5. **Present it plainly and hand it off.** Show the draft, then say clearly:
   "Here's the draft — copy it into your email and send it when it looks
   right. Change anything you want first." Never say it was sent.

6. **Update the ledger.** Once the user has their draft, the thread has been
   answered from the user's side, so it moves from `needs my reply` to
   `waiting on them` **only after the user confirms they sent it** — do not
   flip the status on their behalf. Offer: "Once you've sent it, tell me and
   I'll mark it as waiting on them with a follow-up date." If they confirm,
   find the row by **person + the stable `thread` label** (read the ledger path
   from the `ledger file:` key in `USER-CONFIG.md`, else `ledger/follow-ups.md`
   beside the skill), update it (status → waiting on them, last touch → TODAY,
   next touch → the window for that thread's `kind` from the follow-up windows
   table in `SKILL.md`, counted in plain calendar days) leaving the `thread`
   label unchanged, and add a History line. Say which window you used.

## Rules

- Sacred pipeline: AI drafts, human sends. No sending, scheduling, or
  transmitting. No email-account connection is implied or promised.
- Never fabricate facts, prices, dates, or commitments. **Stop and ask** — step
  3 is a hard gate, not a suggestion. A draft that invents a number is the
  single most expensive thing this kit could do.
- Keep the draft copy-paste ready — plain text the user can drop straight
  into their email.
