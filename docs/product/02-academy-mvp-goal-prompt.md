# GOAL prompt — Academy MVP (doc 02)

**Uso:** `/goal docs/product/02-academy-mvp-goal-prompt.md`.
**Canon de producto:** [`02-academy-mvp.md`](02-academy-mvp.md). Si se contradicen, gana el documento.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — I1, I2, I3, I4.
**Roadmap:** [`roadmap.md`](./roadmap.md) fila 02.
**Branch de trabajo esperado:** el HEAD actual del worktree; no inventar rama.
**Harness:** documento canónico > `AGENTS.md` > `agent-docs/goal-profile.md` > `docs/product/roadmap.md`.
**Loop:** [`agent-docs/goal-loop.md`](../../agent-docs/goal-loop.md).

---

## 1. Protocolo de fase (obligatorio en cada fase A–E)

Implementar doc 02 §2 (C1–C4, F1–F9) → tests (MVP-01..06) → perfil §4 (`npm run typecheck -w @bolthorn/academy`, `npm run typecheck -w @bolthorn/judge`, `npm run test:academy`, tests focalizados) → `goal-reviewer` limpio → `goal-code-reviewer` limpio → misma foto → puerta humana → commits. Sin push/PR. Máx. 5 rondas.

---

## 2. Bloque GOAL (copiar tal cual)

```text
GOAL: Implementar al 100 % docs/product/02-academy-mvp.md (Monaco, tests públicos, poll queued, cuota free 30, progress, webhook HMAC, enlace Academia) en el HEAD actual del worktree.

AUTORIDAD
- Producto: docs/product/02-academy-mvp.md (no reabrir §2). Gana el documento.
- Ingeniería: agent-docs/goal-profile.md. Depende de 01-academy-foundations ya en branch.
- Roadmap fila 02. Deuda: docs/debt/technical-debt.md.

ORDEN DE FASES (doc 02 §7)

FASE A — Judge worker + Judge0 client + MVP-01/05
- Worker + cliente Judge0 solo en apps/judge. POST submission → queued sin esperar sandbox >2s.
- DoD: doc 02 §7 Fase A + MVP-01, MVP-05. npm run typecheck -w @bolthorn/judge.

FASE B — tRPC submissions + quota MVP-02/03
- Cuota 30/día UTC server-side. publicResult sin hiddenTests.
- DoD: doc 02 §7 Fase B + MVP-02, MVP-03. npm run typecheck -w @bolthorn/academy.

FASE C — MDX + Monaco playground UI MVP-06
- Monaco no textarea. Python only. MDX Callout/CodePlayground/Quiz/Checkpoint.
- DoD: doc 02 §7 Fase C + MVP-06.

FASE D — progress, webhook, Navbar MVP-04
- Navbar.tsx autorizado solo para enlace Academia → NEXT_PUBLIC_ACADEMY_URL.
- Webhook HMAC src/app/api/academy/webhooks/route.ts. MVP-04.
- DoD: doc 02 §7 Fase D.

FASE E — Cierre documental y gates globales
- Roadmap 02 hecho en branch. npm run test:academy. Cobertura No aplica.
- DoD: doc 02 §7 Fase E + §8.

PROTOCOLO OBLIGATORIO AL FINAL DE CADA FASE (A, B, C, D, E)
1) Implementación + tests.
2) Verificación perfil §4.
3) LOOP goal-reviewer hasta limpio (aplicar TODO). Máx. 5.
4) LOOP goal-code-reviewer hasta limpio. Máx. 5.
5) Misma foto.
6) Puerta humana. Commits. No push/PR.
7) Solo entonces fase siguiente.

RESTRICCIONES
- No push/PR. No reabrir §2.
- Hidden tests, rúbrica 0–100, Stripe: Goal 03. IA/embed/certificados/JS: Goal 04.
- I1: solo apps/judge habla con Judge0. I2: no hiddenTests al cliente. I3: cuota en API.
- Polling, no websocket (F8).
```

---

## 3. Variantes cortas (una fase)

### 3.1 Solo Fase A
```text
GOAL: Completar solo la FASE A de docs/product/02-academy-mvp.md (judge worker + MVP-01/05). goal-reviewer → goal-code-reviewer → misma foto → puerta humana → commits. No Monaco ni Stripe.
```

### 3.2 Solo Fase B
```text
GOAL: Completar solo la FASE B de docs/product/02-academy-mvp.md (tRPC + cuota MVP-02/03). Mismo protocolo. Requiere Fase A.
```

### 3.3 Solo Fase C
```text
GOAL: Completar solo la FASE C de docs/product/02-academy-mvp.md (MDX + Monaco MVP-06). Mismo protocolo.
```

### 3.4 Solo Fase D
```text
GOAL: Completar solo la FASE D de docs/product/02-academy-mvp.md (progress, webhook, Navbar). Mismo protocolo.
```

### 3.5 Solo Fase E
```text
GOAL: Completar solo la FASE E de docs/product/02-academy-mvp.md (docs + gates). Mismo protocolo. Requiere A–D.
```

---

## 4. Subagentes a invocar

| Paso | Subagente (`subagent_type`) | Condición de salida |
|------|-----------------------------|---------------------|
| Review de fase | `goal-reviewer` | Cero objeciones, sugerencias y nits |
| Code review de fase | `goal-code-reviewer` | Cero objeciones, sugerencias y nits |

---

## 5. Commits sugeridos (orientativos)

| Fase | Mensaje orientativo |
|------|---------------------|
| A | `feat(judge): queue public-test runs` |
| B | `feat(academy): add submission tRPC and free quota` |
| C | `feat(academy): add monaco playground` |
| D | `feat(site): add academy nav link and webhook consumer` |
| E | `docs(academy): mark mvp DoD` |

---

## 6. Checklist rápido del agente (por fase)

```text
[ ] Doc 02 fase leída
[ ] Perfil §4–§7
[ ] Código + tests MVP-*
[ ] goal-reviewer limpio
[ ] goal-code-reviewer limpio
[ ] Misma foto + puerta humana + commits sin push
```

---

*La autoridad de producto es el doc 02, no este prompt.*
