# Technical debt

Register uncovered stories and known gaps here when a goal run closes. Do not use this file to hide findings that a reviewer marked actionable.

| Date | Goal | Item | Why it is debt | Owner |
|------|------|------|----------------|-------|
| 2026-09-14 | bootstrap | Marketing site has no test runner | Retrofitting `src/` is out of academy Goal 00; do not pretend coverage exists | — |
| 2026-09-14 | bootstrap | Consultancy app still lives at repo root, not `apps/site` | Avoids a Vercel-root migration; extract later if two Next apps hurt | — |
| 2026-09-14 | 01-academy-foundations | Rich MDX (Callout, CodePlayground) | Goal 02; catalog renders titles/modules only | — |
| 2026-09-14 | 01-academy-foundations | content:sync dry-run without DATABASE_URL | Persist to Postgres when the academy DB URL is configured | — |
| 2026-09-14 | 01-academy-foundations | E2E enrolarse from mother-site session | Covered by AF-01 upsert unit test, not Playwright | — |
| 2026-09-14 | 02-academy-mvp | Live Judge0 compose e2e | Worker maps public tests with fixture when JUDGE0_BASE_URL is unset | — |
| 2026-09-14 | 02-academy-mvp | Playwright playground e2e | Covered by Monaco source + chrome unit tests | — |
| 2026-09-15 | 03-academy-judge-and-pro | Live Stripe Checkout + production webhook | Test-mode HMAC verifier + plan store; no Stripe network | — |
| 2026-09-15 | 03-academy-judge-and-pro | ruff / call-count harness in sandbox | Rubric axes filled from injected fixture metrics | — |
| 2026-09-15 | 04-academy-professional | Live xAI mentor calls | Fixture LLM in tests; `XAI_API_KEY` required at runtime | — |
| 2026-09-15 | 04-academy-professional | BullMQ/Redis content-generate + remaining stage prompts | In-memory queue; only `prompts/architect.md` exists | — |
| 2026-09-15 | 04-academy-professional | Persist ai_calls / certificates / generate jobs to Postgres | Same in-memory store pattern as Goals 01–03 | — |
| 2026-09-15 | 04-academy-professional | Mux / video lessons | Out of Goal 04 scope | — |
