# ledger/

Holds `follow-ups.md`, the starter ledger that ships with the kit: the running
list of who is waiting on what, the money on each thread, and when to nudge.

The installer copies this file to `inbox/ledger/follow-ups.md` inside the
installed skill folder, which is the skill-relative path the skill reads and
updates every session. On an upgrade the user's copy is carried across
untouched and never cleared.
