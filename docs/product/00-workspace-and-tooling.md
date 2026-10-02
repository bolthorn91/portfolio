# Workspace and tooling (academy subproject)

**Estado:** implementado en branch (decisiones cerradas 2026-09-14).
**Branch de trabajo:** el HEAD actual del worktree.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — invariantes §7 aplicables: I1, I5.
**Roadmap:** [`roadmap.md`](./roadmap.md) fila 00.
**Relacionado:** kit `/goal` en `Documents/webprojects/goal-loop-kit`; dumps en `internaldocs/` (no autoridad).

Convierte el repo de consultoría en un workspace npm que aloja el LMS y el judge **sin mover** `src/`. Deja comandos de verificación reales para el resto de goals.

| Referencia | Tema | Resumen v1 |
|------------|------|------------|
| **D2** | Forma del subproyecto | `apps/academy`, `apps/judge`, `packages/*` junto al site raíz |
| **D11** | internaldocs | gitignored |

---

## 1. Contexto del software actual (punto de partida)

### 1.1 Consultoría

| Pieza | Ubicación | Comportamiento |
|-------|-----------|----------------|
| Next.js 16 site | `src/app/**`, `package.json` | marketing, presupuestos, Supabase auth |
| Vercel | raíz del repo | no cambiar el root directory |
| Tests | no existen | `package.json` no tiene script `test` |
| Auth | `src/lib/supabase.ts`, `AuthContext.tsx` | Google + email |

**No existe** workspace, app academy, judge, paquetes compartidos, ni runner de tests.

### 1.2 Tooling de agentes

| Pieza | Estado |
|-------|--------|
| `agent-docs/goal-profile.md` | relleno (este goal no lo reescribe salvo comandos que deban cuadrar con scripts nuevos) |
| `/goal` skill | usuario (`~/.grok/skills/goal`) |
| `internaldocs/` | gitignored |

---

## 2. Decisiones cerradas (no reabrir en v1)

### 2.1 Comunes

| # | Tema | Decisión |
|---|------|----------|
| C1 | Idioma | UI es, identificadores en. Este goal casi no tiene UI. |
| C2 | Tests | vitest en `apps/academy`, `apps/judge`, `packages/*`. No retrofit del site. |
| C3 | Zonas protegidas | no tocar páginas de marketing ni `Navbar`/`Footer` |
| C4 | Invariantes | I1: el scaffold del judge no ejecuta código de usuario. I5: `content/courses/` existe aunque vacío de cursos reales. |
| C5 | Site raíz | el package raíz sigue siendo el site Next.js; workspaces `apps/*` y `packages/*` |

### 2.2 Workspace

| # | Tema | Decisión |
|---|------|----------|
| F1 | Nombres | `@bolthorn/academy`, `@bolthorn/judge`, `@bolthorn/academy-types`, `@bolthorn/academy-content`, `@bolthorn/config` |
| F2 | Package manager | npm workspaces (el repo ya usa npm) |
| F3 | Academy | Next.js 16 App Router, React 19, TypeScript strict, Tailwind 4. Layout propio, sin Navbar de marketing. Página `/` placeholder en español. |
| F4 | Judge | servicio TS con Hono, script `dev` y `start`, endpoint `GET /health` → `{ ok: true }`. Sin Judge0 en este goal. |
| F5 | Types | `Difficulty`, `Plan`, `SubmissionStatus`, `RubricWeights`, `JudgeMetrics`, `ScoreBreakdown`, `EmbedMessage` exactamente como el contexto de producto (no campos paralelos). |
| F6 | Content loader | funciones exportadas: `loadCourses`, `loadCourse`, `loadLesson`, `loadChallengePublic`, `loadChallengeSpec`. En este goal: stub que lee `content/courses` y un test `AC-01` de strip de secretos sobre un YAML de fixture. |
| F7 | Env | `.env.example` en la raíz con las claves del plan; no secretos. `!.env.example` en gitignore. |
| F8 | Compose | `docker-compose.yml` con Redis y Judge0 **documentado**, no arrancado por los tests de este goal. |

### 2.3 Enums

| # | Tema | Decisión |
|---|------|----------|
| D1 | Difficulty | `easy \| intermediate \| hard \| pro` |
| D2 | Plan | `free \| pro` |
| D3 | SubmissionStatus | `queued \| running \| passed \| failed \| error` |

---

## 3. Workspace — Especificación de implementación

### 3.1 Objetivo de negocio

Poder desarrollar academy y judge en el mismo git que la consultoría, con builds y tests independientes, sin romper el deploy actual.

### 3.2 Modelo de datos

No aplica (sin Drizzle todavía).

### 3.3 Algoritmo canónico (pseudocódigo)

```text
root package.json += workspaces ["apps/*", "packages/*"]
create apps/academy (Next.js minimal that `next build`s)
create apps/judge (Hono /health)
create packages/academy-types (domain types + test that they export)
create packages/academy-content (stripSecrets + loaders stub + AC-01)
create content/courses/.gitkeep
root scripts: test:academy runs vitest in academy, judge, types, content
```

### 3.4 Superficies de escritura a unificar

| Punto de escritura | Fichero | Nota |
|--------------------|---------|------|
| workspaces | `package.json` | no cambiar `name` del site ni scripts `dev`/`build`/`start`/`lint` existentes |
| ignore | `.gitignore` | ya incluye `internaldocs/` y `.grok/goal-runs/` |
| AGENTS | `AGENTS.md` | estructura; no reescribir el resto |

### 3.5 Migración / recálculo de datos existentes

No aplica.

### 3.6 Casos límite

- `npm install` en la raíz debe seguir instalando el site.
- `npm run build` en la raíz debe seguir construyendo el site (no academy).
- `next-env.d.ts` de academy no se commitea (gitignore).

### 3.7 API (orientativa)

| Método | Ruta | Request | Response | Permiso | Errores |
|--------|------|---------|----------|---------|---------|
| GET | `http://localhost:4001/health` (judge) | — | `{ ok: true }` | público interno | 500 si el proceso está caído |

### 3.8 Tests golden Workspace (mínimos)

| ID | Escenario | Esperado |
|----|-----------|----------|
| WS-01 | `GET /health` del judge | `{ ok: true }` |
| AC-01 | `loadChallengePublic` sobre fixture con `hiddenTests` y `referenceSolution` | el objeto público no contiene esas claves ni `generation` |
| AT-01 | `@bolthorn/academy-types` exporta `Difficulty` union | type-level + runtime const array `DIFFICULTIES` |

---

## 4. Placeholders de producto — Especificación

### 4.1 Objetivo de negocio

Que Goal 01 tenga un sitio donde colgar schema y catálogo.

### 4.2 Modelo de datos

No aplica.

### 4.3 Flujo UX

Academy `/` muestra un título en español «Academia Bolthorn» y un párrafo de placeholder. Sin chrome de marketing.

### 4.4 API

Judge `/health` únicamente.

### 4.5 UI

`apps/academy/src/app/layout.tsx` y `page.tsx`. `lang="es"`.

### 4.6 Tests golden

| ID | Escenario | Esperado |
|----|-----------|----------|
| WS-02 | render de la home de academy (react-dom/server o vitest) | contiene «Academia Bolthorn» |

---

## 5. Seguridad, permisos y aislamiento

- El scaffold del judge no evalúa código.
- `.env*` sigue ignorado; solo se versiona `.env.example`.
- No se copian claves de `internaldocs/`.

---

## 6. Textos de interfaz (claves orientativas)

| Clave | es |
|-------|----|
| `academy.home.title` | Academia Bolthorn |
| `academy.home.placeholder` | Cursos interactivos de programación. Próximamente. |

---

## 7. Plan de implementación (fases)

### Fase A — Workspaces y paquetes

1. Añadir `workspaces` y scripts `test:academy` al `package.json` raíz sin romper scripts del site.
2. Crear `@bolthorn/config` (tsconfig base).
3. Crear `@bolthorn/academy-types` con unions + `AT-01`.
4. Crear `@bolthorn/academy-content` con `stripChallengeSecrets`, loaders stub, fixture YAML, `AC-01`.
5. `content/courses/.gitkeep`.

**DoD fase A:** `npm run typecheck -w @bolthorn/academy-types` y `npm run test -w @bolthorn/academy-content` pasan; `AC-01` rojo si alguien deja `hiddenTests` en el DTO público.

### Fase B — apps/judge

1. Paquete Hono + vitest.
2. `GET /health`.
3. `WS-01`.

**DoD fase B:** `npm run test -w @bolthorn/judge` y `npm run typecheck -w @bolthorn/judge` pasan.

### Fase C — apps/academy

1. Next.js 16 minimal (App Router, Tailwind 4, TypeScript).
2. Home placeholder en español.
3. `WS-02`.
4. Script `typecheck` (`tsc --noEmit`) y `build`.

**DoD fase C:** `npm run typecheck -w @bolthorn/academy` pasa. `npm run build -w @bolthorn/academy` pasa. El site raíz `npm run build` no se exige en esta fase salvo que se haya tocado `src/` (no se debe tocar).

### Fase D — Env, compose, scripts raíz

1. `.env.example` con las variables del plan.
2. `docker-compose.yml` (redis + judge0) con comentario de que no corre en CI de este goal.
3. Script raíz `test:academy` que dispara los vitest de los cuatro paquetes.

**DoD fase D:** `npm run test:academy` pasa en frío.

### Fase E — Cierre documental y gates globales

1. Marcar DoD de este documento y la fila 00 del roadmap («hecho en branch»).
2. Deuda: site sin tests; site no movido a `apps/site`.
3. No inventar coverage gate.

**DoD fase E:** roadmap y debt honestos; perfil §4 comandos existen de verdad.

---

## 8. Criterios de aceptación (DoD)

### 8.1 Workspace

- [x] `package.json` raíz declara workspaces y conserva `dev`/`build`/`lint` del site.
- [x] AT-01, AC-01, WS-01, WS-02 existen y pasan.
- [x] `npm run test:academy` pasa.

### 8.2 Apps

- [x] Academy build independiente.
- [x] Judge `/health`.
- [x] Home academy en español, sin Navbar de marketing.

### 8.3 Global

- [x] Roadmap fila 00 actualizada.
- [x] Deuda registrada.
- [x] Idioma y comentarios del perfil §1.
- [x] Zonas protegidas §6 intactas.
- [x] Gates §5 ejecutados de verdad (`npm run test:academy`, typecheck workspaces, `npm run build -w @bolthorn/academy`, root `tsc --noEmit`).
- [x] I1 e I5 no rotos.

---

## 9. Fuera de alcance (v1)

| Ítem | Notas |
|------|-------|
| Mover site a `apps/site` | deuda explícita |
| Drizzle / schema | Goal 01 |
| Monaco, Judge0 real, Stripe, IA | Goals 02–04 |
| Tests del site de marketing | no |
| Publicar kit a GitHub | el kit vive en disco; push solo si el humano lo pide |

---

## 10. Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| npm workspaces rompe el site | no cambiar `dev`/`build` del raíz; verificar que `package-lock` sigue resolviendo next del site |
| Next anidado confunde tsc del raíz | academy tiene su tsconfig; el raíz no incluye `apps/` |
| Windows execution policy en scripts del kit | ya documentado Bypass; este goal no depende de esos scripts |

---

## 11. Casos de prueba mínimos (checklist de revisión)

### Workspace

- [ ] `npm run test:academy` verde
- [ ] AC-01 falla si el loader público reenvía `hiddenTests`

### Apps

- [ ] Judge health
- [ ] Academy home copy

---

## 12. Deuda explícita (registrar al implementar)

### 12.1 E2E — marketing

- Historia: como visitante, la home de consultoría no cambia.
- Detectada en: este doc §9. No hay E2E; verificación = no tocar `src/app/**`.

---

## 13. Referencias de código (pre-feature)

| Área | Rutas |
|------|-------|
| Site | `package.json`, `src/app/layout.tsx`, `tsconfig.json` |
| Ignore | `.gitignore` |
| Perfil | `agent-docs/goal-profile.md` |

---

## 14. Orden de trabajo sugerido en el branch

```text
HEAD actual
  Fase A  → workspaces + packages + AC-01
  Fase B  → judge /health
  Fase C  → academy Next placeholder
  Fase D  → env + compose + test:academy
  Fase E  → docs + deuda
```

No empezar B o C antes de que A instale workspaces (si no, `-w` no resuelve).

---

*Documento vivo de implementación. Actualizar los checkboxes del DoD y el estado del encabezado al cerrar cada fase.*
