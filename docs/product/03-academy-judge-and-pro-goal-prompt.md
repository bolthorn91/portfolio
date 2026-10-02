# GOAL prompt — Professional judge and Pro plan (doc 03)

**Uso:** `/goal docs/product/03-academy-judge-and-pro-goal-prompt.md`.
**Canon de producto:** [`03-academy-judge-and-pro.md`](03-academy-judge-and-pro.md). Si se contradicen, gana el documento.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — I2, I3, I6.
**Roadmap:** [`roadmap.md`](./roadmap.md) fila 03.
**Branch de trabajo esperado:** el HEAD actual del worktree; no inventar rama.
**Harness:** documento canónico > `AGENTS.md` > `agent-docs/goal-profile.md`.
**Loop:** [`agent-docs/goal-loop.md`](../../agent-docs/goal-loop.md).

---

## 1. Protocolo de fase (obligatorio en cada fase A–E)

Implementar doc 03 → tests JR-01..07 → perfil §4 (`npm run test:academy`, `npm run typecheck -w @bolthorn/academy`, `npm run typecheck -w @bolthorn/judge`) → `goal-reviewer` limpio → `goal-code-reviewer` limpio → misma foto → puerta humana → commits. Sin push/PR. Máx. 5 rondas.

---

## 2. Bloque GOAL (copiar tal cual)

```text
GOAL: Implementar al 100 % docs/product/03-academy-judge-and-pro.md (hidden tests, rúbrica 0–100, métricas, Stripe Pro, content:validate/sync) en el HEAD actual del worktree.

AUTORIDAD
- Producto: docs/product/03-academy-judge-and-pro.md (no reabrir §2 F1–F9). Gana el documento.
- Ingeniería: agent-docs/goal-profile.md. Depende de 02-academy-mvp.
- Roadmap fila 03. Deuda: docs/debt/technical-debt.md.

ORDEN DE FASES (doc 03 §7)

FASE A — hidden tests + gate I6 + JR-01..04
- Gate: correctness fail ⇒ quality 0. Rúbrica F2/F3. Python harness F9.
- DoD: doc 03 §7 Fase A + JR-01 JR-02 JR-03 JR-04.

FASE B — validate CLI JR-06
- content:validate sin LLM. Rubric weights ≠ 100 rechaza.
- DoD: doc 03 §7 Fase B + JR-06.

FASE C — Stripe + JR-05/07
- Checkout + webhook → users.plan = pro. Free no lee breakdown por API.
- DoD: doc 03 §7 Fase C + JR-05 JR-07.

FASE D — UI breakdown + pricing
- /pricing en español. UI Pro muestra breakdown.
- DoD: doc 03 §7 Fase D.

FASE E — Cierre documental y gates globales
- Roadmap 03 hecho en branch. npm run test:academy. Cobertura No aplica.
- DoD: doc 03 §7 Fase E + §8.

PROTOCOLO OBLIGATORIO AL FINAL DE CADA FASE (A, B, C, D, E)
1) Implementación + tests.
2) Verificación perfil §4.
3) LOOP goal-reviewer hasta limpio. Máx. 5.
4) LOOP goal-code-reviewer hasta limpio. Máx. 5.
5) Misma foto.
6) Puerta humana. Commits. No push/PR.
7) Solo entonces fase siguiente.

RESTRICCIONES
- No push/PR. No reabrir §2.
- No IA mentor, embed, JS/TS, certificados, generator jobs (Goal 04).
- I2 hidden/reference no al cliente. I3 plan en servidor. I6 gate correctness.
- No Monaco redo (ya Goal 02). No Clerk.
```

---

## 3. Variantes cortas (una fase)

### 3.1 Solo Fase A
```text
GOAL: Completar solo la FASE A de docs/product/03-academy-judge-and-pro.md (hidden tests + I6 + JR-01..04). goal-reviewer → goal-code-reviewer → misma foto → puerta humana → commits. No Stripe.
```

### 3.2 Solo Fase B
```text
GOAL: Completar solo la FASE B de docs/product/03-academy-judge-and-pro.md (validate CLI JR-06). Mismo protocolo. Requiere Fase A.
```

### 3.3 Solo Fase C
```text
GOAL: Completar solo la FASE C de docs/product/03-academy-judge-and-pro.md (Stripe JR-05/07). Mismo protocolo.
```

### 3.4 Solo Fase D
```text
GOAL: Completar solo la FASE D de docs/product/03-academy-judge-and-pro.md (UI breakdown + pricing). Mismo protocolo.
```

### 3.5 Solo Fase E
```text
GOAL: Completar solo la FASE E de docs/product/03-academy-judge-and-pro.md (docs + gates). Mismo protocolo. Requiere A–D.
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
| A | `feat(judge): add hidden tests and rubric scoring` |
| B | `feat(academy): add content validate cli` |
| C | `feat(academy): add stripe pro plan` |
| D | `feat(academy): add pro breakdown ui` |
| E | `docs(academy): mark judge-and-pro DoD` |

---

## 6. Checklist rápido del agente (por fase)

```text
[ ] Doc 03 fase leída
[ ] JR-* de la fase
[ ] goal-reviewer limpio
[ ] goal-code-reviewer limpio
[ ] Misma foto + puerta humana + commits sin push
```

---

*La autoridad de producto es el doc 03, no este prompt.*
