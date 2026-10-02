# GOAL prompt — Academy professionalization (doc 04)

**Uso:** `/goal docs/product/04-academy-professional-goal-prompt.md`.
**Canon de producto:** [`04-academy-professional.md`](04-academy-professional.md). Si se contradicen, gana el documento.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — I1–I6.
**Roadmap:** [`roadmap.md`](./roadmap.md) fila 04.
**Branch de trabajo esperado:** el HEAD actual del worktree; no inventar rama.
**Harness:** documento canónico > `AGENTS.md` > `agent-docs/goal-profile.md`.
**Loop:** [`agent-docs/goal-loop.md`](../../agent-docs/goal-loop.md).

---

## 1. Protocolo de fase (obligatorio en cada fase A–E)

Implementar doc 04 → tests PR-01..05 → perfil §4 (`npm run test:academy`, `npm run typecheck -w @bolthorn/academy`) → `goal-reviewer` limpio → `goal-code-reviewer` limpio → misma foto → puerta humana → commits. Sin push/PR. Máx. 5 rondas.

---

## 2. Bloque GOAL (copiar tal cual)

```text
GOAL: Implementar al 100 % docs/product/04-academy-professional.md (mentor xAI, pipeline de contenido, embed, certificados, JS/TS) en el HEAD actual del worktree.

AUTORIDAD
- Producto: docs/product/04-academy-professional.md (no reabrir §2 F1–F9). Gana el documento.
- Ingeniería: agent-docs/goal-profile.md. Depende de 03-academy-judge-and-pro.
- Roadmap fila 04. Deuda: docs/debt/technical-debt.md.

ORDEN DE FASES (doc 04 §7)

FASE A — ai-service + PR-01/02
- xAI server-side (XAI_API_KEY, https://api.x.ai/v1). Hints sin referenceSolution en easy. Log ai_calls.
- DoD: doc 04 §7 Fase A + PR-01 PR-02.

FASE B — pipeline CLI + jobs + admin UI PR-03
- BullMQ content-generate; no en request del alumno. Admin /admin/generator. Prompts por etapa.
- DoD: doc 04 §7 Fase B + PR-03.

FASE C — embed PR-04
- /embed/challenge/[slug] + EmbedMessage. EMBED_ALLOWED_ORIGINS.
- DoD: doc 04 §7 Fase C + PR-04.

FASE D — certificados + JS/TS harness PR-05
- Hash verificable. Segundo lenguaje JS/TS. No 20 lenguajes.
- DoD: doc 04 §7 Fase D + PR-05.

FASE E — Cierre documental y gates globales
- Roadmap 04 hecho en branch. npm run test:academy. Cobertura No aplica.
- DoD: doc 04 §7 Fase E + §8.

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
- No Kubernetes, microVM, app nativa, más lenguajes SQL/Java/C++/Go.
- No exponer XAI_API_KEY al cliente. No pegar referenceSolution en easy/intermediate.
- No rehacer Stripe/Monaco (Goals 02–03).
```

---

## 3. Variantes cortas (una fase)

### 3.1 Solo Fase A
```text
GOAL: Completar solo la FASE A de docs/product/04-academy-professional.md (ai-service PR-01/02). goal-reviewer → goal-code-reviewer → misma foto → puerta humana → commits. No embed.
```

### 3.2 Solo Fase B
```text
GOAL: Completar solo la FASE B de docs/product/04-academy-professional.md (pipeline + admin PR-03). Mismo protocolo. Requiere Fase A.
```

### 3.3 Solo Fase C
```text
GOAL: Completar solo la FASE C de docs/product/04-academy-professional.md (embed PR-04). Mismo protocolo.
```

### 3.4 Solo Fase D
```text
GOAL: Completar solo la FASE D de docs/product/04-academy-professional.md (certificados + JS/TS PR-05). Mismo protocolo.
```

### 3.5 Solo Fase E
```text
GOAL: Completar solo la FASE E de docs/product/04-academy-professional.md (docs + gates). Mismo protocolo. Requiere A–D.
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
| A | `feat(academy): add xai mentor service` |
| B | `feat(academy): add content generate jobs` |
| C | `feat(academy): add embed challenge frame` |
| D | `feat(academy): add certificates and js harness` |
| E | `docs(academy): mark professional DoD` |

---

## 6. Checklist rápido del agente (por fase)

```text
[ ] Doc 04 fase leída
[ ] PR-* de la fase
[ ] goal-reviewer limpio
[ ] goal-code-reviewer limpio
[ ] Misma foto + puerta humana + commits sin push
```

---

*La autoridad de producto es el doc 04, no este prompt.*
