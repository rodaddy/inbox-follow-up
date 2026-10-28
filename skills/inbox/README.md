# skills/inbox/

The one skill the kit installs. `SKILL.md` carries the triage gate, the
classification rules, the follow-up windows by kind of thread, the
dollars-at-risk ranking, and the ledger protocol.

`workflows/` holds the five runnable workflows and `scripts/` holds the
plain-Node ledger validator. The installer copies this entire folder
recursively into the host's skills directory as `inbox/`, then adds the
user's own `ledger/`, `branding/`, and `USER-CONFIG.md` beside it.
