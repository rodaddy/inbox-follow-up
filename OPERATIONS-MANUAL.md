# Inbox Follow-Up Ledger — Operations Manual

Nothing ever falls through the cracks again. You paste your unanswered email,
the AI sorts it out, works out how much money is sitting on each thread, drafts
your replies, and keeps a running list of who's waiting on what. Any morning,
you ask one question — "who am I ghosting?" — and you get the answer in the
order that matters: most expensive first, with the total on top.

Start with the backlog sweep below. That's the sitting where people find the
quote they forgot about.

## The one thing to understand first

The integration is **copy-paste**. There is nothing hooked up to your email.
No login, no password handed over, no permission granted to anything — so
nothing about your email account can be broken into or leak, because nothing is
connected to it. You copy a thread out of your email and paste it into the chat.
That's it. No standing connection to a mailbox means a smaller, simpler surface
than any always-on plugin.

The one honest thing to know: the text you paste does go to whatever AI you're
using — same as anything else you type into it. For everyday email that's
nothing to think about. For confidential or privileged client email (a law
firm, say), the choice of which AI and which plan matters — your AI, your
account, your call. Pick the right tool for the sensitive threads and you're
fine; this is a heads-up, not a warning.

And the line that never moves: **the AI drafts your replies — you send them.**
It writes the email; you read it, tweak it if you want, and hit send yourself
from your own inbox. It cannot and will not send anything for you.

## The five things it does

| You say | What happens |
| --- | --- |
| paste a pile + **"sweep my backlog"** | The big one. Paste a month of unanswered email in one go. It sorts every thread, works out how much money is on each, and hands you back a ranked list: what to chase first, and what it's worth. Start here on day one. |
| paste a thread + "triage this" | The AI reads it and tells you the one thing that matters: does it need YOUR reply, are you WAITING on them, or is it DONE. Then it logs it. |
| "draft a reply" | It writes the reply in your voice (formal or friendly, your signoff), ready to copy into your email. You send it. |
| "who am I ghosting?" | It reads your ledger and hands you the list of people you're leaving hanging — most expensive first, with the dollar total on top. |
| "make me the report" | A one-page report in your colors with your logo, saved to your Documents folder. Double-click it, print it, hand it to whoever does the chasing. |

## Start here: the first sitting

Do this once, before anything else, and the kit pays for itself in the first
ten minutes:

1. Open your email. Go back about 30 days.
2. Copy every thread you haven't answered, or that you're waiting on someone
   for. All of them. One paste is fine. **Don't clean them up** — rough is what
   it expects.
3. Paste, and say **"sweep my backlog."**

You get back every thread sorted, logged, and ranked by what's at risk — with a
line at the top like "6 overdue, $31,900 sitting on them." Most people find at
least one quote they forgot about entirely. That's the point.

If you'd rather see what this looks like before you spend the effort, open the
`examples/` folder that came with the kit. Two complete runs, start to finish,
on real-shaped email.

## It will tell you no. That's on purpose.

Four places this kit stops instead of guessing.

**It won't log a thread it can't read.** If there's no way to tell who sent the
last message, or there's no name on it, or it's one line with no ask in it, you
get told exactly what's missing instead of a ledger row:

> "I can't tell who sent the last message — there are no From lines. Paste it
> again with the headers and I'll sort it."

**It won't log a robot.** Newsletters, lead-platform alerts, no-reply
notifications, out-of-office replies and bounce messages get dropped, not
filed. A row on your list is a person waiting on you; a machine isn't. (Two
exceptions get a mention on the way past: a bounce, because a message you
thought you sent never arrived, and an out-of-office, because it tells the AI
when to start the clock instead of nudging somebody who's away.)

**It won't write a reply around a fact it doesn't have.** Ask it to answer
someone who wants a price, a date, or a decision, and it stops and asks you for
the number rather than writing a polite email that dodges the question or
inventing a figure that ends up in front of somebody's business partner.

**And it won't take a vague answer either.** If you come back with "tell them
about 15-20% more" or "sometime next week," it stops a second time and says so:
a range in an email is a promise of its lowest number, and a customer holds you
to it. It'll offer you the two real choices — give it the firm figure, or send
an honest holding line with a time you picked — and it will never split the
difference for you.

All four can feel like the tool being difficult. They're the opposite. A
follow-up list is only worth acting on if every row in it is real, and a quoted
price that was never yours is the most expensive thing an AI can hand you.

## The follow-up clock is different per thread

A flat "follow up in a week" is what loses quotes. The kit uses a different
clock depending on what kind of thread it is, and tells you which one it used:

| Kind of thread | Nudge | Then | Call it |
| --- | --- | --- | --- |
| **Quote they asked for** (you haven't sent the number yet) | SAME DAY | next morning | 3 days and they've called someone else |
| **Quote you sent** | 3 days | 7 days | 14 days silent means cold — one last "still interested?" |
| **Service callback** (something's broken, a complaint, a recall) | SAME DAY | next morning | It never goes cold. It escalates into a review. |
| **Invoice you sent** | 7 days past due | 14 days | 30 days — pick up the phone |
| **Vendor / supplier** | a week | two weeks | escalate to whoever you actually buy from |
| **Anything else** | a week | two weeks | ask |

Two things override the table. If the email itself names a date ("I need this by
Friday", "our board meets the 12th", "they sign tonight"), that date wins and you
get nudged the day before — and anything with a named date inside the next week
lands on today's list whatever its normal clock says. And if it's a repeat
customer, the nudge comes a day earlier — losing one of those costs more than
the single job.

## The morning ritual

This is the whole habit, and it takes two minutes:

1. **Paste anything new.** Any thread that came in overnight — paste it, say
   "triage this." The AI files each one into your ledger.
2. **Ask: "who am I ghosting?"** You get the list of everyone waiting on you
   right now — **ranked by what's at risk, not by what's oldest**, with the
   dollar total on the first line. A broken-thing callback goes to the top
   whatever it's worth; after that it's biggest money first, and a repeat
   customer edges ahead of a stranger with the same number. The AI checks
   today's real date first — it may confirm the date with you so "overdue" is
   counted right; if it asks, just tell it the date.
3. **Clear the list.** Say "draft replies for those" and it writes each one.
   You copy, tweak, send. Done before your coffee's cold.

That's it. The ledger does the remembering so you don't have to.

## The ledger

Your follow-ups live in `follow-ups.md` — a plain list with these columns:

- **person / company** — who the thread is with.
- **thread** — a short 2-4 word label for the conversation (e.g. "logo
  project"). The AI assigns it once and keeps it the same, so a later email on
  the same topic updates that same row instead of creating a duplicate — even
  when the same person has several conversations going with you at once.
- **what** — one line: what they need from you, or what you're waiting on. It
  records the job, never the private part. If a customer's email has somebody's
  injury, medical report, or ID numbers in it, that stays in your inbox where
  it already is — the ledger just says you owe them an answer. A list that
  lives for years and gets printed is the wrong place to keep that.
- **status** — needs my reply, waiting on them, or closed. **A thread with
  money still owed on it does not go to closed just because the email was
  friendly.** "Invoice received, check is on its way" is a promise, not a
  payment, so that row stays open until you say it landed. That one rule is
  worth the price of the kit on its own.
- **dollars at stake** — the money riding on the thread: the quote total, the
  unpaid invoice, the job you'd book. It copies the number the way it appeared
  in the email. If nobody named a number, it writes "no number named" — it will
  not make one up, because a guessed figure would sort your whole list wrong.
  It also ignores numbers that aren't your money: a customer mentioning their
  own $340 water bill, or the price the other guy quoted, don't count.
- **direction** — is that money coming IN to you (a quote, a deposit, an
  invoice you're owed, a credit you're chasing) or going OUT (something you
  owe)? Only the "coming in" ones are added into the headline number, so what
  you might LOSE never gets mixed up with what you OWE.
- **relationship** — repeat customer, new lead, vendor, or other. This is why a
  long-standing customer gets nudged a day sooner than a stranger.
- **kind** — quote requested, quote out, service callback, invoice out, vendor,
  or general. This is what picks the follow-up clock (see the table above).
  "Quote requested" means they asked for a number and you haven't sent it yet
  — that's the hottest thing in your inbox, because you're the hold-up.
- **hard date** — a date the other side named: "board meets Sept 3", "we sign
  tonight", "policy expires 8/31". It beats the normal clock, and anything with
  one inside the next week shows up on today's list no matter what. If they
  name two — the day they want an answer and the day something actually breaks
  — both go on the row.
- **last touch / next touch** — when you last heard from each other, and when
  to nudge if it goes quiet (counted in plain calendar days).

One more thing the list does that's easy to miss: **if one email asks you for
two different things**, you get two rows, not one. "Send the certificate by
Friday, and also what do I do about the claim?" is two jobs on two clocks, and
the second one is exactly the kind that gets forgotten.

It's **append-only** — nothing gets deleted. The table shows where each thread
stands today; a History log at the bottom keeps the full paper trail. So you
can always see the whole story of any conversation.

- **Coding-agent installs** (Claude Code / Codex): the ledger is a real file on
  your machine, kept inside the installed skill folder so the AI finds it every
  session (its exact path is recorded in the skill's `USER-CONFIG.md`). Any
  finished exports you ask for go to `~/Documents/inbox-follow-up/`.
- **App installs**: the ledger lives in your Project as a saved `follow-ups.md`
  the AI cannot overwrite itself. So the save-back rule is what keeps it working:
  after every triage or ledger update, the AI hands you the WHOLE updated
  `follow-ups.md` (the current-state table plus the History log) as one copy-ready
  block, and you save it into the Project **replacing the previous version** —
  one file, same name, newest wins. Skip that and the next chat reads a stale
  list. On a plain chat with no Project, keep the block in a pinned note and paste
  it back at the start of each session.

## The report you can print

Say **"make me the report"** and you get one page — your logo, your colors —
saved into your Documents folder under `inbox-follow-up`. Double-click it and it
opens in your browser. It works with the wifi off, there's nothing to log into,
and it prints cleanly.

On it: the money line at the top ("6 overdue, $31,900 at risk"), then who to
chase in order with the dollars and the days on each, then what you're waiting
on that isn't due yet. It's dated, so last week's sits next to this week's and
you can see what actually moved.

This is the one you hand to whoever does the chasing, or bring to a Monday
morning huddle. It's also, frankly, the one that makes people ask what you're
using.

## Your voice

The AI reads your `branding/brand.md` before it writes any reply — your name,
whether you sound formal or friendly, and how you sign off. So the drafts sound
like you, not like a robot. Change how you sound any time: "make my replies
more formal" or just edit `brand.md`.

## Works anywhere, even bare

No folders, no files, nothing installed? Paste a thread into any AI chat and it
still triages it, drafts the reply, and keeps the ledger as a text block right
there. The folder and file are a convenience. The job works either way.

## Reinstalling / moving platforms

Hand `installer.md` to the AI on the new platform and say "install inbox
follow-up." The installer adapts the package to whatever that platform needs —
you never repackage anything yourself.

## Uninstall

Ask your coding agent: **"Archive my Inbox Follow-Up skill, but keep a copy of
my ledger and branding in Documents."** It must move the installed `inbox`
folder into an archive location, never permanently delete it, and tell you where
the preserved copy landed. Apps: remove the skill in Settings → Skills only
after saving the latest complete `follow-ups.md` somewhere you control. For a
Project, export or copy the ledger before deleting the Project.

## Credits

Forged in Rico's lab at rTech Digital Consulting.
