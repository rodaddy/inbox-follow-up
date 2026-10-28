import test from "node:test";
import assert from "node:assert/strict";
import { buildLedgerReport } from "../skills/inbox/scripts/ledger-report.mjs";

const header = `# Follow-Ups Ledger\n\n## Current follow-ups\n\n| person | company | thread | what | status | dollars at stake | direction | relationship | kind | hard date | last touch | next touch |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |`;

test("ranks deterministic act-today rows and keeps money directions separate", () => {
  const ledger = `${header}\n| Pat | Pat HVAC | repair callback | Call about failed repair | waiting on them | no number named | none | repeat customer | service callback | | 2026-08-10 | 2026-08-12 |\n| Lee | Lee Foods | freezer quote | Follow up on quote | waiting on them | $18,400 | coming in | new lead | quote out | | 2026-08-01 | 2026-08-04 |\n| Sam | Supply Co | parts bill | Pay parts invoice | needs my reply | $900 | going out | vendor | vendor | | 2026-08-12 | 2026-08-13 |`;
  const report = buildLedgerReport(ledger, "2026-08-13");
  assert.deepEqual(report.act_today.map((row) => row.person), ["Pat", "Lee", "Sam"]);
  assert.equal(report.coming_in_total, 18400);
  assert.equal(report.going_out_total, 900);
  assert.equal(report.without_number, 1);
});

test("refuses malformed mechanical ledger values", () => {
  const ledger = `${header}\n| Pat | Pat HVAC | repair callback | Call about failed repair | waiting on them | about $900 | coming in | repeat customer | service callback | | 2026-08-10 | 2026-08-12 |`;
  assert.throws(() => buildLedgerReport(ledger, "2026-08-13"), /dollars at stake must be a dollar figure/);
});

test("pulls a future hard date into act today", () => {
  const ledger = `${header}\n| Lee | Lee Foods | board quote | Send final quote | waiting on them | $2,000 | coming in | repeat customer | quote out | 2026-08-18 board meeting | 2026-08-12 | 2026-08-20 |`;
  const report = buildLedgerReport(ledger, "2026-08-13");
  assert.equal(report.act_today.length, 1);
  assert.equal(report.act_today[0].deadlineSoon, true);
});

test("keeps an escaped pipe inside a free-text cell as literal text", () => {
  const ledger = `${header}\n| Sarah | Bldg Co | rev b quote | Answer her 'Quote \\| Rev B' question | needs my reply | $4,000 | coming in | new lead | quote out | | 2026-08-12 | 2026-08-14 |`;
  const report = buildLedgerReport(ledger, "2026-08-13");
  assert.equal(report.rows, 1);
  assert.equal(report.act_today[0].what, "Answer her 'Quote | Rev B' question");
  assert.equal(report.coming_in_total, 4000);
});

test("names the pipe as the cause when a raw pipe splits a row", () => {
  const ledger = `${header}\n| Sarah | Bldg Co | rev b quote | Answer her 'Quote | Rev B' question | needs my reply | $4,000 | coming in | new lead | quote out | | 2026-08-12 | 2026-08-14 |`;
  assert.throws(() => buildLedgerReport(ledger, "2026-08-13"), /literal \| from the pasted thread/);
});

test("stops the table scan at the next heading so a History table is ignored", () => {
  const ledger = `${header}\n| Lee | Lee Foods | freezer quote | Follow up on quote | needs my reply | $18,400 | coming in | new lead | quote out | | 2026-08-01 | 2026-08-04 |\n\n## History\n\n| date | person | note |\n| --- | --- | --- |\n| 2026-08-04 | Lee | added |`;
  const report = buildLedgerReport(ledger, "2026-08-13");
  assert.equal(report.rows, 1);
  assert.equal(report.act_today[0].person, "Lee");
});

test("refuses a table whose separator row is missing instead of eating a real row", () => {
  const noSeparator = `# Follow-Ups Ledger\n\n## Current follow-ups\n\n| person | company | thread | what | status | dollars at stake | direction | relationship | kind | hard date | last touch | next touch |\n| Lee | Lee Foods | freezer quote | Follow up on quote | needs my reply | $18,400 | coming in | new lead | quote out | | 2026-08-01 | 2026-08-04 |`;
  assert.throws(() => buildLedgerReport(noSeparator, "2026-08-13"), /separator row/);
});
