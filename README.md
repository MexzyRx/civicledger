# CivicLedger

**Promises. Projects. Evidence.**

CivicLedger is an open civic-accountability platform that connects political commitments to real-world delivery and inspectable evidence. The hackathon MVP follows one complete journey:

`Location → Leaders → Promises → Projects → Evidence → Citizen Verification`

The seeded demo covers Rivers State, with Port Harcourt City LGA as the primary experience.

## What works in this vertical slice

- Location-based “My Area” dashboard and responsibility labels
- Searchable promise register with status and evidence confidence
- Promise detail with original source, progress and “Why CivicLedger says this”
- Project records with a full promise/funding/implementation responsibility chain
- Evidence ledger with original-source links
- Explicit “Unpromised Delivery” classification
- Citizen observation form and manual moderation demo
- Grounded Ask CivicLedger answers with record citations and an evidence-gap fallback
- Public methodology and status definitions

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

## Demo route

1. Select **Rivers State → Port Harcourt City** on the home page.
2. Open **Complete the Port Harcourt Ring Road**.
3. Inspect its status, confidence and explanation.
4. Open the connected project and its evidence ledger.
5. Submit a citizen observation through **Verify it on the ground**.
6. Open `/admin/submissions` and approve the observation.
7. Ask “Which education promises are still outstanding?” in **Ask CivicLedger**.
8. Ask an untracked question to demonstrate the “not enough evidence” guardrail.

## Data and persistence

Seed data currently lives in `lib/data.ts`, making the demo reproducible without external credentials. Citizen submissions and moderation decisions use browser `localStorage` for the same reason.

The production persistence target is Supabase/Postgres with these principal entities:

- `locations`, `governments`, `leaders`
- `promises`, `promise_changes`
- `projects`, `agencies`, `contractors`
- `evidence`, `citizen_submissions`, `audit_log`

Citizen media should live in private object storage until a moderator approves publication. No submitted personal information should be exposed without explicit consent.

## AI guardrails

Ask CivicLedger is currently deterministic and retrieval-based. It only answers from the bundled CivicLedger records. A future LLM-backed implementation must preserve the same contract:

- Ground every material claim in CivicLedger records.
- Show links to the supporting record or source.
- Say **“CivicLedger does not have enough evidence yet”** when retrieval is insufficient.
- Never infer corruption, criminality, intent or personal wrongdoing.
- Never reduce a leader to a partisan “good/bad” score.

## Status methodology

Records use: **Completed**, **In Progress**, **Not Started**, **Modified**, **Broken / Abandoned**, and **Insufficient Evidence**. Confidence is **High**, **Medium**, **Low**, or **Unrated**.

Citizen observations are additive evidence. They never automatically change an official CivicLedger status.

## Scope

The MVP intentionally excludes nationwide coverage, rankings, accounts, notifications, saved searches, forums, automated reputation scoring and automated status changes.

## Open source

The repository is being prepared for public release. The final application licence should be confirmed against the OSS Hackathon rules; AGPL-3.0 is the current candidate.
