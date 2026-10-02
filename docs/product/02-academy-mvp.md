# Academy MVP (playground, public tests, progress)

**Estado:** implementado en branch (decisiones cerradas 2026-09-14).
**Branch de trabajo:** el HEAD actual del worktree.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — I1, I2, I3, I4.
**Roadmap:** fila 02. Depende de `01-academy-foundations`.

Alumno abre lección, edita en Monaco, lanza run, ve tests **públicos**, progreso y cuota free. Judge0 solo desde `apps/judge`.

---

## 1. Contexto

| Pieza | Estado |
|-------|--------|
| Catálogo + seed | Goal 01 |
| Judge | solo `/health` |
| Navbar consultoría | sin enlace Academia |

---

## 2. Decisiones cerradas

| # | Tema | Decisión |
|---|------|----------|
| C1 | Idioma | UI es |
| C2 | Tests | scoring unitario + poll + quota; e2e mínimo del flujo run si hay Judge0 en compose |
| C3 | Zonas protegidas | `Navbar.tsx` **autorizado** solo para añadir enlace «Academia» a `NEXT_PUBLIC_ACADEMY_URL` |
| C4 | I1 I3 | judge HTTP interno; cuota en API |
| F1 | Editor | Monaco; no textarea |
| F2 | Lenguaje MVP | Python only |
| F3 | Tests | públicos solamente (hidden en Goal 03) |
| F4 | Async | `POST submission` → `queued`; poll; HTTP academy no espera el sandbox >2s |
| F5 | Cuota free | 30 runs / UTC day, enforced server-side |
| F6 | Draft | código en localStorage + último server draft |
| F7 | Webhook | `lesson.completed` HMAC hacia `WEBHOOK_PARENT_URL` |
| F8 | Polling | no websocket |
| F9 | MDX | Callout, CodePlayground, Quiz, Checkpoint |

---

## 3. Playground y judge — Especificación

### 3.1 Objetivo

Gimnasio: escribir código, ver tests públicos.

### 3.2 Modelo

`submissions`: userId, challengeId, code, status, publicResult, createdAt. Sin hiddenScore en este goal.

### 3.3 Algoritmo

```text
student hits Run
  if quota exceeded → 429
  insert submission queued
  enqueue bullmq job
  return { id, status: queued }
worker:
  load spec server-side
  send starter+code to Judge0 (python, no network)
  map public tests → publicResult
  status passed|failed|error
poll:
  GET submission by id if owner
```

### 3.4 Superficies

| Punto | Fichero |
|-------|---------|
| playground UI | `apps/academy/src/app/learn/...`, `.../playground/[challenge]` |
| tRPC | `apps/academy` submissions router |
| worker | `apps/judge` |
| webhook consumer | `src/app/api/academy/webhooks/route.ts` (HMAC) |
| nav | `src/components/Navbar.tsx` |

### 3.5–3.6

Sin migración de datos de scoring. Race: dos runs concurrentes cuentan dos cuotas.

### 3.7 API

| Método | Ruta | Permiso | Errores |
|--------|------|---------|---------|
| POST | tRPC `submission.create` | authed | 429 quota |
| GET | tRPC `submission.byId` | owner | 404 |
| POST | site `/api/academy/webhooks` | HMAC | 401 |

### 3.8 Tests golden

| ID | Escenario | Esperado |
|----|-----------|----------|
| MVP-01 | create returns queued immediately | no wait sandbox |
| MVP-02 | 31st free run same day | 429 |
| MVP-03 | public result never includes hiddenTests | |
| MVP-04 | webhook bad signature | 401 |
| MVP-05 | Judge0 import outside apps/judge | no matches (grep gate) |

---

## 4. UX alumno

Flujo: catálogo → lección MDX → playground → run → tests públicos. Copy de errores de compilación en español cuando sea mensaje de producto; stderr del runner se muestra crudo.

### 4.6 Tests

| ID | Escenario | Esperado |
|----|-----------|----------|
| MVP-06 | lesson page contains editor for playground type | Monaco mount (component test) |

---

## 5. Seguridad

Sandbox no-network, CPU/RAM/wall-clock. Rate limit IP+user. Embed still out of scope.

---

## 6. Textos

| Clave | es |
|-------|----|
| `nav.academy` | Academia |
| `playground.run` | Ejecutar |
| `playground.queued` | En cola |
| `quota.exceeded` | Has agotado las ejecuciones de hoy en el plan gratis. |

---

## 7. Fases

### Fase A — Judge worker + Judge0 client + MVP-01/05
### Fase B — tRPC submissions + quota MVP-02/03
### Fase C — MDX + Monaco playground UI MVP-06
### Fase D — progress, webhook, Navbar MVP-04
### Fase E — docs

**DoD global de fase:** un alumno con seed puede ver un resultado de tests públicos.

---

## 8. DoD

- [x] Run → queued → public tests
- [x] Cuota 30
- [x] Hidden no en cliente
- [x] Enlace Academia
- [x] Webhook HMAC
- [x] I1: solo judge habla con Judge0

---

## 9. Fuera de alcance

Hidden tests, rúbrica 0–100, Stripe, IA, embed, JS/TS, certificados.

---

## 10. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Judge0 no disponible en Windows CI | unit tests del mapper con fixtures; integración marcada opcional si `JUDGE0_BASE_URL` ausente |
| Monaco infla el site | academy es otra app; dynamic import |

---

## 11–12. Checklist y deuda

- [ ] Flujo run en local con compose (Judge0 optional)
- E2E Playwright del playground → deuda si no entra

---

## 13. Referencias

`apps/judge`, `packages/academy-content`, `src/components/Navbar.tsx`

---

## 14. Orden

A (judge) antes de B (API) antes de C (UI). D puede ir en paralelo a C tras B.

---

*Documento vivo de implementación.*
