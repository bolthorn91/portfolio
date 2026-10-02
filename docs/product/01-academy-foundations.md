# Academy foundations (schema, auth, seed)

**Estado:** implementado en branch (decisiones cerradas 2026-09-14).
**Branch de trabajo:** el HEAD actual del worktree.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — I1, I2, I5.
**Roadmap:** [`roadmap.md`](./roadmap.md) fila 01.
**Relacionado:** depende de `00-workspace-and-tooling`. Fuente de dominio: dumps `internaldocs/` (no autoridad).

Schema Drizzle, puente Supabase → `users.external_id`, loader real, un curso easy de Python seed, catálogo `/courses`.

| Referencia | Tema | Resumen v1 |
|------------|------|------------|
| **Fase 0 contexto** | cimientos | User/Course/Lesson/Challenge/Submission + seed |

---

## 1. Contexto del software actual (punto de partida)

### 1.1 Lo que Goal 00 deja

| Pieza | Ubicación | Comportamiento |
|-------|-----------|----------------|
| Types | `packages/academy-types` | unions de dominio |
| Loaders stub | `packages/academy-content` | stripSecrets + AC-01 |
| Academy | `apps/academy` | home placeholder |
| Judge | `apps/judge` | `/health` |
| Auth madre | `src/lib/supabase.ts` | Supabase Google/email |

**No existe** Drizzle, tablas, sync a Postgres, ni curso seed.

---

## 2. Decisiones cerradas (no reabrir en v1)

### 2.1 Comunes

| # | Tema | Decisión |
|---|------|----------|
| C1 | Idioma | UI es, código en |
| C2 | Tests | vitest en packages + academy; AC-01 sigue pasando |
| C3 | Zonas protegidas | no tocar marketing; no añadir Clerk |
| C4 | Invariantes | I2 (strip), I5 (git canonical) |
| C5 | ORM | Drizzle only, contra Supabase Postgres (`DATABASE_URL`) |

### 2.2 Auth y schema

| # | Tema | Decisión |
|---|------|----------|
| F1 | Identidad | `users.external_id` = Supabase `user.id` (UUID). Upsert en el primer request autenticado a academy. |
| F2 | Roles | `student \| author \| admin`; default `student` |
| F3 | Plan | `free \| pro`; default `free` |
| F4 | Tablas | `users`, `courses` (metadata de publish), `modules`, `lessons`, `challenges` (metadata pública), `challenge_specs` (server-only), `submissions`, `progress`, `certificates` (vacía de filas), `ai_calls` (vacía) |
| F5 | IDs | UUID. Slugs únicos estables. |
| F6 | Seed | curso `python-fundamentals` easy, módulo funciones, challenge `normalize-name` (o `two-sum-lite` si se prefiere el fixture del contexto). YAML/MDX en `content/courses/`. |
| F7 | Loader | implementa de verdad `loadCourses`, `loadCourse`, `loadLesson`, `loadChallengePublic`, `loadChallengeSpec`. Spec completa solo server-side. |
| F8 | Rutas | `/courses`, `/courses/[slug]` listan el seed. Sin playground. |
| F9 | Judge | no Judge0; submissions table exists, unused |

### 2.3 Enums

| # | Tema | Decisión |
|---|------|----------|
| D1 | Lesson.type | `reading \| playground \| quiz \| project` |
| D2 | publish.status | `draft \| review \| published \| archived` |

---

## 3. Persistencia — Especificación

### 3.1 Objetivo de negocio

Guardar progreso y submissions sin convertir Postgres en CMS.

### 3.2 Modelo de datos

Drizzle en `apps/academy/src/db/`. `courses` / `lessons` en DB son **proyección** de git (slug, title, published, version), no el MDX. `challenge_specs` guarda YAML privado tras `content:sync` (en este goal el sync puede ser un script que upserta el seed).

Migraciones versionadas y reversibles.

### 3.3 Algoritmo canónico

```text
on authenticated academy request:
  read supabase jwt
  upsert users where external_id = jwt.sub
content:sync:
  for each course.yaml with publish.status=published
    upsert public metadata
    upsert challenge_specs from full yaml (never exposed)
```

### 3.4 Superficies

| Punto | Fichero | Nota |
|-------|---------|------|
| schema | `apps/academy/src/db/schema.ts` | |
| loaders | `packages/academy-content` | |
| seed files | `content/courses/python-fundamentals/**` | |

### 3.5 Migración

Schema nuevo. No hay datos que migrar.

### 3.6 Casos límite

Usuario de la web madre sin fila academy: se crea en el primer hit. Email unique.

### 3.7 API

| Método | Ruta | Permiso |
|--------|------|---------|
| GET | `/courses` | público (solo published) |
| GET | `/courses/[slug]` | público si published |
| GET | tRPC `challenge.publicBySlug` | público; sin hidden |
| GET | tRPC `challenge.specBySlug` | **no existe en cliente**; solo server module |

### 3.8 Tests golden

| ID | Escenario | Esperado |
|----|-----------|----------|
| AC-01 | public DTO | sin hiddenTests/referenceSolution/generation |
| AF-01 | upsert user | mismo external_id no duplica |
| AF-02 | unpublished course | no sale en `/courses` |

---

## 4. Catálogo — Especificación

### 4.1 Objetivo de negocio

Ver el curso seed.

### 4.2–4.5

Páginas academy en español: lista + detalle de módulos/lecciones (MDX renderido como texto si MDX completo espera al Goal 02; en este goal se permite frontmatter + markdown básico).

### 4.6 Tests golden

| ID | Escenario | Esperado |
|----|-----------|----------|
| AF-03 | loadCourse(`python-fundamentals`) | title y módulos del YAML |

---

## 5. Seguridad

- Service role solo servidor.
- `loadChallengeSpec` no importable desde Client Components.
- No secretos en el seed YAML committed (el referenceSolution del seed **sí** vive en git; no se envía al cliente).

---

## 6. Textos de interfaz

| Clave | es |
|-------|----|
| `courses.title` | Cursos |
| `courses.empty` | No hay cursos publicados. |

---

## 7. Plan de implementación (fases)

### Fase A — Schema Drizzle + migrate

**DoD fase A:** `npm run db:generate -w @bolthorn/academy` produce migración; schema cubre las tablas de F4.

### Fase B — Loaders reales + seed YAML/MDX + AC-01

**DoD fase B:** AC-01 y AF-03 pasan.

### Fase C — Auth upsert + AF-01

**DoD fase C:** test de upsert sin duplicar.

### Fase D — `/courses` + `/courses/[slug]` + content:sync seed + AF-02

**DoD fase D:** unpublished no se lista; published seed sí.

### Fase E — Cierre documental

**DoD fase E:** roadmap 01 «hecho en branch»; deuda si MDX rico queda para 02.

---

## 8. Criterios de aceptación (DoD)

### 8.1 Schema y auth

- [x] Tablas F4. Upsert por external_id. AF-01.

### 8.2 Contenido

- [x] Seed en git. AC-01, AF-02, AF-03. Catálogo visible.

### 8.3 Global

- [x] Roadmap / deuda. §1 idioma. §6 intacto. I2, I5.

---

## 9. Fuera de alcance (v1)

| Ítem | Notas |
|------|-------|
| Monaco / run | Goal 02 |
| Stripe | Goal 03 |
| Pipeline IA | Goal 04 |
| Clerk | nunca |

---

## 10. Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| DATABASE_URL ausente en local | `.env.example`; tests de loader no requieren Postgres (fixtures); tests de upsert usan drizzle mock o skip documentado si no hay URL |
| Filtrar spec por import client | test + carpeta `server/` o `import 'server-only'` |

---

## 11. Casos de prueba mínimos

- [x] Catálogo muestra el seed published
- [x] DevTools del JSON de challenge no revela hidden tests

---

## 12. Deuda explícita

### 12.1 E2E — enrolarse

- Historia: alumno de la web madre abre academy y existe su user.
- Detectada en: §3.3. Cubrir con test de upsert, no Playwright aún.

---

## 13. Referencias de código

| Área | Rutas |
|------|-------|
| Types | `packages/academy-types` |
| Loaders | `packages/academy-content` |
| Auth madre | `src/lib/supabase.ts`, `src/app/auth/callback/route.ts` |

---

## 14. Orden de trabajo

```text
  Fase A schema → Fase B content → Fase C auth → Fase D routes → Fase E docs
```

B no depende de Postgres. C y D sí (o de mock). A antes de C.

---

*Documento vivo de implementación.*
