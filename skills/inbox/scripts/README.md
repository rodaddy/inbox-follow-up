# skills/inbox/scripts/

The kit's deterministic spine: plain Node, no dependencies, no build step.

`ledger-report.mjs` parses the ledger table, validates the twelve required
columns, dates, and allowed values, then returns act-today membership, the
ranking, and the coming-in and going-out money totals kept separate. The AI
runs it inside its own sandbox as
`node scripts/ledger-report.mjs <ledger-file> <YYYY-MM-DD>`; the buyer never
opens a terminal. Requires Node 22.6+.
