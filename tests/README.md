# tests/

Kit-owned deterministic tests, run with the plain-Node test runner via the
`package.json` test command. No dependencies and no build step.

`ledger-report.test.mjs` exercises `skills/inbox/scripts/ledger-report.mjs`
directly: act-today ranking order, the separated coming-in and going-out money
totals, and the count of rows carrying no number.
