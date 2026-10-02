# GOAL prompt — Workspace and tooling (doc 00)

**Uso:** `/goal docs/product/00-workspace-and-tooling-goal-prompt.md`.
**Canon de producto:** [`00-workspace-and-tooling.md`](00-workspace-and-tooling.md). Si se contradicen, gana el documento.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — I1, I5.
**Roadmap:** [`roadmap.md`](./roadmap.md) fila 00.
**Branch de trabajo esperado:** el HEAD actual del worktree; no inventar rama.
**Harness:** documento canónico > `AGENTS.md` > `agent-docs/goal-profile.md` > `docs/product/roadmap.md`.
**Loop:** [`agent-docs/goal-loop.md`](../../agent-docs/goal-loop.md).

---

## 1. Protocolo de fase (obligatorio en cada fase A–E)

Para **cada** fase: implementar según doc 00 (sin reabrir §2 C*/F*/D*) → tests de superficie tocada → verificación con comandos reales del perfil §4 (`npm run typecheck -w @bolthorn/academy-types`, `npm run test -w @bolthorn/academy-content`, `npm run test -w @bolthorn/judge`, `npm run typecheck -w @bolthorn/academy`, `npm run build -w @bolthorn/academy`, `npm run test:academy`) → loop `goal-reviewer` hasta limpio → loop `goal-code-reviewer` hasta limpio → misma foto → puerta humana (perfil §9 sí) → commits. Sin push, sin PR. Máx. 5 rondas. No FASE extra.

---

## 2. Bloque GOAL (copiar tal cual)

```text
GOAL: Implementar al 100 % docs/product/00-workspace-and-tooling.md (npm workspaces, packages, apps/judge, apps/academy placeholder, env/compose, test:academy) en el HEAD actual del worktree.

AUTORIDAD
- Producto: docs/product/00-workspace-and-tooling.md (no reabrir §2 C1–C5, F1–F8, D1–D3). Ante contradicción gana el documento.
- Ingeniería: agent-docs/goal-profile.md §4–§10 + AGENTS.md. internaldocs/ no es autoridad.
- Roadmap: docs/product/roadmap.md fila 00. Deuda: docs/debt/technical-debt.md.

ORDEN DE FASES (doc 00 §7) — secuencial, sin saltar

FASE A — Workspaces y paquetes
- workspaces + test:academy; @bolthorn/config; academy-types AT-01; academy-content stripSecrets + AC-01; content/courses/.gitkeep.
- DoD fase: doc 00 §7 Fase A + §8.1. npm run typecheck -w @bolthorn/academy-types y npm run test -w @bolthorn/academy-content.

FASE B — apps/judge
- Hono GET /health. WS-01.
- DoD fase: doc 00 §7 Fase B. npm run test -w @bolthorn/judge y npm run typecheck -w @bolthorn/judge.

FASE C — apps/academy
- Next.js 16 placeholder español WS-02. typecheck + build.
- DoD fase: doc 00 §7 Fase C. npm run typecheck -w @bolthorn/academy y npm run build -w @bolthorn/academy.

FASE D — Env, compose, scripts raíz
- .env.example; docker-compose redis+judge0 (no en CI); npm run test:academy.
- DoD fase: doc 00 §7 Fase D.

FASE E — Cierre documental y gates globales
- Roadmap 00 hecho en branch; deuda site sin tests / no apps/site. Cobertura: No aplica.
- DoD fase: doc 00 §7 Fase E + §8.3.

PROTOCOLO OBLIGATORIO AL FINAL DE CADA FASE (A, B, C, D, E)
1) Implementación + tests.
2) Verificación perfil §4.
3) LOOP goal-reviewer: aplicar TODAS objeciones/sugerencias/nits; repetir hasta limpio. Máx. 5.
4) LOOP goal-code-reviewer: igual. Máx. 5.
5) Si (4) tocó código, repetir (3): misma foto.
6) Puerta humana. Luego commits. No push/PR.
7) Solo entonces fase siguiente.

RESTRICCIONES
- No push, no PR, no force-push, no reset --hard.
- No reabrir doc 00 §2.
- No tocar zonas perfil §6 (marketing, Navbar, Footer).
- No Drizzle/schema (Goal 01). No Monaco, Stripe, IA, Clerk.
- I1: judge scaffold no evalúa código de usuario. I5: content/courses existe.
- Idioma perfil §1.

CRITERIO DE COMPLETITUD
Fases A–E con ambos reviewers limpios en la misma foto, puerta humana, commits; DoD doc 00 §8; gates §5 en verde.
```

---

## 3. Variantes cortas (una fase)

### 3.1 Solo Fase A
```text
GOAL: Completar solo la FASE A de docs/product/00-workspace-and-tooling.md (workspaces y paquetes). Protocolo: goal-reviewer limpio → goal-code-reviewer limpio → misma foto → puerta humana → commits. No push/PR. No apps/judge ni academy.
```

### 3.2 Solo Fase B
```text
GOAL: Completar solo la FASE B de docs/product/00-workspace-and-tooling.md (apps/judge /health WS-01). Mismo protocolo. Requiere Fase A.
```

### 3.3 Solo Fase C
```text
GOAL: Completar solo la FASE C de docs/product/00-workspace-and-tooling.md (apps/academy placeholder). Mismo protocolo. Requiere A.
```

### 3.4 Solo Fase D
```text
GOAL: Completar solo la FASE D de docs/product/00-workspace-and-tooling.md (env, compose, test:academy). Mismo protocolo.
```

### 3.5 Solo Fase E
```text
GOAL: Completar solo la FASE E de docs/product/00-workspace-and-tooling.md (docs + gates). Mismo protocolo. Requiere A–D.
```

---

## 4. Subagentes a invocar

| Paso | Subagente (`subagent_type`) | Condición de salida |
|------|-----------------------------|---------------------|
| Review de fase | `goal-reviewer` | Cero objeciones, sugerencias y nits |
| Code review de fase | `goal-code-reviewer` | Cero objeciones, sugerencias y nits |

**Orden:** `goal-reviewer` → `goal-code-reviewer` → misma foto → puerta humana → commit.

---

## 5. Commits sugeridos (orientativos)

| Fase | Mensaje orientativo |
|------|---------------------|
| A | `chore(tooling): add npm workspaces and academy packages` |
| B | `feat(judge): add health endpoint` |
| C | `feat(academy): add placeholder next app` |
| D | `chore(tooling): add env example and test:academy` |
| E | `docs(academy): mark workspace DoD` |

---

## 6. Checklist rápido del agente (por fase)

```text
[ ] Alcance leído en el doc 00
[ ] Perfil §4–§7 leído
[ ] Código + tests
[ ] Verificación perfil §4
[ ] goal-reviewer hasta limpio
[ ] goal-code-reviewer hasta limpio
[ ] Misma foto
[ ] Puerta humana
[ ] Commits (sin push, sin PR)
```

---

*La autoridad de producto es el doc 00, no este prompt.*
