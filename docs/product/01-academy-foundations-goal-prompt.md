# GOAL prompt — Academy foundations (doc 01)

**Uso:** `/goal docs/product/01-academy-foundations-goal-prompt.md`, o copiar el bloque `GOAL` de §2 a una sesión de implementación.
**Canon de producto:** [`01-academy-foundations.md`](01-academy-foundations.md). Este prompt **no** manda: si se contradicen, gana el documento.
**Perfil de proyecto:** [`agent-docs/goal-profile.md`](../../agent-docs/goal-profile.md) — invariantes §7 aplicables: I1, I2, I5.
**Roadmap:** [`roadmap.md`](./roadmap.md) fila 01.
**Branch de trabajo esperado:** el HEAD actual del worktree; no inventar rama.
**Harness:** documento canónico en curso > `AGENTS.md` > `agent-docs/goal-profile.md` > `docs/product/roadmap.md`. `internaldocs/` no es autoridad.
**Loop:** [`agent-docs/goal-loop.md`](../../agent-docs/goal-loop.md).

---

## 1. Protocolo de fase (obligatorio en cada fase A–E)

Para **cada** fase, en este orden **estricto**:

1. **Implementar** el alcance de la fase según el doc 01 (sin reabrir las decisiones §2:
   C1–C5, F1–F9, D1–D2).
2. **Tests** de toda la superficie tocada en el mismo cambio; no diluir los gates del perfil §5
   (superficie nueva en `apps/` / `packages/` con test; DTO público sin `hiddenTests` /
   `referenceSolution` / `generation`). Cobertura numérica: **No aplica**.
3. **Verificación local** proporcional al riesgo, con los comandos **reales** del perfil §4:
   - toque `apps/academy` → `npm run typecheck -w @bolthorn/academy`
   - toque `packages/academy-content` → `npm run typecheck -w @bolthorn/academy-content`
   - toque `packages/academy-types` → `npm run typecheck -w @bolthorn/academy-types`
   - toque `apps/judge` → `npm run typecheck -w @bolthorn/judge` (esta goal no debe tocarlo)
   - toque `src/` → `npx tsc --noEmit` y `npm run lint` (esta goal no debe tocar marketing)
   - tests focalizados: `npm run test -w <paquete> -- <fichero>`
   - cierre de fase grande y de programa: `npm run test:academy`
   - fases de esquema (A, y C/D si tocan migraciones): `npm run db:generate -w @bolthorn/academy`
     (si el script aún no existe al **empezar** A, crearlo en A; no inventar otro nombre)
   - build academy al cierre de programa si se tocó academy: `npm run build -w @bolthorn/academy`
   - Cobertura: No aplica. No exigir `npm test` genérico ni umbral de coverage.
4. **Loop subagente `goal-reviewer`** (persona de corrección) sobre el diff de la fase:
   - **Implementar íntegramente todas** las objeciones, sugerencias y nits que devuelva (sin
     cherry-pick, sin «lo dejamos en deuda»), salvo que el hallazgo sea **demostrablemente** fuera
     del alcance del doc 01 o un falso positivo con evidencia registrada.
   - Relanzar sobre el diff actualizado.
   - **Repetir** hasta ronda con **cero** ítems accionables de cualquier severidad.
5. **Loop subagente `goal-code-reviewer`** (persona de mantenibilidad) sobre el mismo alcance:
   - **Implementar íntegramente todas** las objeciones, sugerencias y nits.
   - Relanzar. **Repetir** hasta ronda limpia.
6. **Puerta de misma foto:** si el paso 5 tocó código, la ronda limpia del paso 4 caducó → volver al
   paso 4. Ambos subagentes deben tener su última ronda limpia sobre el **mismo hash** del diff de
   la fase.
7. **Puerta humana** (perfil §9: fases supervisadas = sí). Parar, informar fase / ficheros /
   verificación / rondas / snapshot; **no commitear** hasta que el humano diga go.
8. **Solo entonces:** crear los **commits** de la fase (estilo del perfil §10; sin secretos; sin
   amend de commits ajenos). Sin push, sin PR.
9. **Solo entonces** iniciar la fase siguiente. **Prohibido** empezar la fase N+1 con hallazgos
   abiertos, con un solo subagente limpio, sin puerta humana, o sin los commits de la fase N.

### Definición de ronda limpia

Una ronda está limpia **solo si** el subagente no devuelve ninguna objeción, ninguna sugerencia de
cambio y ningún nit. `VERDICT: CLEAN` / lista vacía → limpio. **Cualquier** ítem accionable → no
limpio: aplicar y re-ejecutar el **mismo** subagente.

### Límites de convergencia

- Máximo **5 rondas** por subagente y fase (perfil §9). Al agotarlas: parar, listar los hallazgos
  abiertos y pedir decisión al humano. Nunca declarar limpio por cansancio.
- Si una ronda devuelve el mismo conjunto `(file:line, severidad)` que la anterior, el loop no
  converge: parar y escalar en vez de reaplicar.
- Rechazar un hallazgo exige evidencia verificable, registrada en el estado del run y en el body del
  commit de la fase. Un hallazgo rechazado dos veces se escala, no se rechaza otra vez.

### Si los dos subagentes se contradicen

1. Preferir la interpretación que **cumple el doc 01** y la cadena de autoridad del perfil §2.
2. Aplicar ambas si son compatibles.
3. Si son mutuamente excluyentes: implementar la que preserve los invariantes I1, I2, I5 y el
   DoD de la fase; documentar la otra en el body del commit como «considerado / no aplicado por
   conflicto con doc 01 §X».

### Reglas globales del goal

- **No push / no PR** salvo que el humano lo pida explícitamente después (perfil §10).
- **No reabrir** las decisiones cerradas del doc 01 §2.
- **No bajar** umbrales de los gates del perfil §5 ni ampliar excludes para «pasarlos».
- **No tocar** las zonas protegidas del perfil §6. El doc 01 **no** autoriza `Navbar.tsx` ni páginas
  de marketing ni `src/types/api.ts`.
- **Invariantes del perfil §7** aplicables: I1, I2, I5 — no romperlos ni dejar que se rompan en el
  código tocado. I3/I4/I6 no son el foco de esta goal (no hay scoring, Stripe ni embed aquí).
- **Idioma y comentarios** según perfil §1: UI es, identificadores en, comentarios escasos.
- Si el contexto se compacta o la sesión se reinicia: **continuar** desde el worktree
  (`/goal --resume`); no resetear ni reescribir la feature desde cero.
- **No saltar fases.** No marcar el programa completo si una fase quedó a medias.

---

## 2. Bloque GOAL (copiar tal cual)

```text
GOAL: Implementar al 100 % la funcionalidad canónica de docs/product/01-academy-foundations.md (schema Drizzle, puente Supabase → users.external_id, loaders reales, seed python-fundamentals, catálogo /courses), cumpliendo todos los gates, decisiones cerradas y criterios de hecho del documento, hasta el desarrollo completo en el worktree/branch actual (el HEAD actual del worktree; no inventar rama).

AUTORIDAD
- Producto y alcance: docs/product/01-academy-foundations.md (leer completo antes de codificar; no reabrir §2 decisiones C1–C5, F1–F9, D1–D2). Ante contradicción con este prompt, gana el documento.
- Ingeniería: agent-docs/goal-profile.md (comandos §4, gates §5, zonas protegidas §6, invariantes §7, arquitectura §8, git §10) + AGENTS.md + docs/product/roadmap.md. internaldocs/ no es autoridad.
- Roadmap a actualizar al cerrar: docs/product/roadmap.md fila 01.
- Deuda: docs/debt/technical-debt.md — al final registrar las filas del doc 01 §12 que queden sin cubrir.
- Relacionado ya hecho (no reimplementar): docs/product/00-workspace-and-tooling.md — reutilizar packages/academy-types, packages/academy-content (stripSecrets + AC-01), apps/academy placeholder, apps/judge /health, src/lib/supabase.ts.

ORDEN DE FASES (doc 01 §7) — secuencial, sin saltar

FASE A — Schema Drizzle + migrate
- Drizzle only (C5) en apps/academy/src/db/; tablas F4: users, courses, modules, lessons, challenges, challenge_specs (server-only), submissions, progress, certificates (vacía), ai_calls (vacía).
- Script npm run db:generate -w @bolthorn/academy; migraciones versionadas y reversibles.
- Tests de superficie del schema en el mismo cambio.
- DoD fase: doc 01 §7 Fase A + §8.1 (tablas F4). npm run db:generate -w @bolthorn/academy produce migración. npm run typecheck -w @bolthorn/academy.

FASE B — Loaders reales + seed YAML/MDX + AC-01
- Implementar de verdad loadCourses, loadCourse, loadLesson, loadChallengePublic, loadChallengeSpec (F7). Spec completa solo server-side (server-only / no Client Components).
- Seed content/courses/python-fundamentals/** (F6): curso easy Python, módulo funciones, challenge normalize-name (o two-sum-lite).
- Tests AC-01 (doc 01 §3.8) y AF-03 (doc 01 §4.6). AC-01 no debe dejar de pasar.
- DoD fase: doc 01 §7 Fase B + §8.2 en lo que sea loaders/seed. npm run typecheck -w @bolthorn/academy-content y npm run test -w @bolthorn/academy-content.

FASE C — Auth upsert + AF-01
- users.external_id = Supabase user.id; upsert en el primer request autenticado a academy (F1). Roles F2, plan F3. No Clerk.
- Test AF-01: mismo external_id no duplica. Loader tests no requieren Postgres; upsert usa drizzle mock o skip documentado si no hay DATABASE_URL (doc 01 §10).
- DoD fase: doc 01 §7 Fase C + resto §8.1 (upsert). npm run typecheck -w @bolthorn/academy y test focalizado AF-01.

FASE D — /courses + /courses/[slug] + content:sync seed + AF-02
- Rutas F8: lista y detalle en español (doc 01 §6). Sin playground. Solo published (D2).
- content:sync upserta metadata pública + challenge_specs privadas; tRPC challenge.publicBySlug sin hidden; challenge.specBySlug no existe en cliente (doc 01 §3.7).
- Tests AF-02 (unpublished no sale) + catálogo visible del seed published. npm run test:academy.
- DoD fase: doc 01 §7 Fase D + resto §8.2.

FASE E — Cierre documental y gates globales
- Marcar DoD en doc 01 §8 y roadmap fila 01 de forma honesta (hecho en branch).
- Registrar la deuda del doc 01 §12 en docs/debt/technical-debt.md (E2E enrolarse cubierto con AF-01, no Playwright; MDX rico → Goal 02 si aplica). Inventario E2E: No aplica.
- Ejecutar los gates del perfil §5 y dejarlos en verde de verdad. npm run test:academy. npm run typecheck -w @bolthorn/academy. npm run build -w @bolthorn/academy. Cobertura: No aplica.
- Limpieza residual: wiring muerto, traducciones incompletas, tests obsoletos.
- DoD programa: doc 01 §8 Global + fases A–D cerradas. I2, I5, §6 intacto, UI es.

PROTOCOLO OBLIGATORIO AL FINAL DE CADA FASE (A, B, C, D, E)
1) Implementación + tests de la fase.
2) Verificación local con los comandos del perfil §4 (typecheck del workspace tocado; tests focalizados; npm run test:academy al cerrar fases grandes y E; npm run db:generate -w @bolthorn/academy en fases de esquema).
3) LOOP subagente goal-reviewer sobre el diff de la fase:
   - Aplicar TODAS las objeciones, sugerencias y nits devueltas.
   - Re-ejecutar hasta ronda LIMPIA (cero ítems). Máx. 5 rondas; luego escalar.
4) LOOP subagente goal-code-reviewer sobre el mismo alcance:
   - Aplicar TODAS las objeciones, sugerencias y nits devueltas.
   - Re-ejecutar hasta ronda LIMPIA. Máx. 5 rondas; luego escalar.
5) Si (4) tocó código, repetir (3): ambos deben quedar limpios sobre el MISMO estado del código.
6) Puerta humana (perfil §9 supervisadas = sí): no commit hasta go del humano.
7) Solo entonces: commits de la fase (lógicos y claros; no push; no PR).
8) Solo entonces: fase siguiente. Si un re-check posterior encuentra regresión, no avanzar hasta nueva ronda limpia + commits de fix.

RESTRICCIONES
- No push, no abrir PR, no force-push, no git reset --hard, no descartar trabajo ajeno.
- No reabrir decisiones del doc 01 §2.
- No bajar umbrales de gates ni ampliar excludes.
- No tocar las zonas protegidas del perfil §6: páginas de marketing, Navbar, Footer, internaldocs, src/types/api.ts. Esta goal no autoriza el enlace Academia (eso es 02-academy-mvp).
- No romper los invariantes del perfil §7: I1 (no Judge0 / eval / vm.run en el proceso web; no tocar apps/judge salvo que el doc lo pida — no lo pide), I2 (hiddenTests / referenceSolution / generation fuera del cliente y del tRPC público), I5 (contenido canónico en content/courses/; Postgres no es CMS de enunciados).
- No Monaco / run / playground (Goal 02).
- No Stripe (Goal 03).
- No pipeline IA / generator jobs (Goal 04).
- No Clerk, no Auth.js, no Prisma (C3, C5, perfil §8).
- No ejecutar código de usuario; submissions table unused (F9).
- Idioma y comentarios según perfil §1.
- Continuar desde el worktree actual si hay progreso parcial; no reiniciar la feature.
- No empezar la fase N+1 sin commits de la fase N tras ambos loops limpios y la puerta humana.

CRITERIO DE COMPLETITUD DEL GOAL
El goal solo está completo cuando las fases A–E están implementadas, cada una pasó (1) implementación+tests, (2) loop goal-reviewer limpio, (3) loop goal-code-reviewer limpio sobre la misma foto, (4) puerta humana, (5) commits; los DoD del doc 01 §8 se cumplen en código y tests; los gates del perfil §5 están en verde; y la documentación de roadmap/deuda/doc 01 refleja el estado real.

ENTREGABLE FINAL
Resumen por fase: qué se hizo, commits (hash + mensaje), comandos de verificación ejecutados con su resultado, número de rondas de cada subagente hasta limpio, y residuos o deuda documentada.
```

---

## 3. Variantes cortas (una fase)

Usar solo si el humano pide acotar. **Mismo protocolo:** implementar → tests → loop `goal-reviewer`
limpio → loop `goal-code-reviewer` limpio → misma foto → puerta humana → commits. No push/PR.

### 3.1 Solo Fase A

```text
GOAL: Completar solo la FASE A de docs/product/01-academy-foundations.md (schema Drizzle + migrate, tablas F4). Leer doc 01 §2 F4/C5, §3.2, §7 Fase A y agent-docs/goal-profile.md. Tests de toda superficie tocada. Verificar con npm run db:generate -w @bolthorn/academy y npm run typecheck -w @bolthorn/academy. Al terminar: loop goal-reviewer hasta limpio (aplicar TODO), luego loop goal-code-reviewer hasta limpio (aplicar TODO), re-verificar goal-reviewer si hubo cambios, puerta humana, luego commits. No push/PR. No implementar loaders, seed, auth, ni /courses.
```

### 3.2 Solo Fase B

```text
GOAL: Completar solo la FASE B de docs/product/01-academy-foundations.md (loaders reales + seed python-fundamentals + AC-01/AF-03). Leer doc 01 §2 F6/F7, §3.8, §4.6, §7 Fase B y agent-docs/goal-profile.md. Verificar con npm run typecheck -w @bolthorn/academy-content y npm run test -w @bolthorn/academy-content. Mismo protocolo: goal-reviewer limpio → goal-code-reviewer limpio → misma foto → puerta humana → commits. No push/PR. Requiere la Fase A ya en el branch. No implementar upsert ni rutas /courses.
```

### 3.3 Solo Fase C

```text
GOAL: Completar solo la FASE C de docs/product/01-academy-foundations.md (auth upsert AF-01). Leer doc 01 §2 F1–F3, §3.3, §7 Fase C y agent-docs/goal-profile.md. Verificar con npm run typecheck -w @bolthorn/academy y el test AF-01. Mismo protocolo: goal-reviewer limpio → goal-code-reviewer limpio → misma foto → puerta humana → commits. No push/PR. Requiere A (y B si el upsert toca loaders). No Clerk. No /courses.
```

### 3.4 Solo Fase D

```text
GOAL: Completar solo la FASE D de docs/product/01-academy-foundations.md (/courses + content:sync + AF-02). Leer doc 01 §2 F8, §3.7, §6, §7 Fase D y agent-docs/goal-profile.md. Verificar con npm run test:academy y npm run typecheck -w @bolthorn/academy. Mismo protocolo. No push/PR. Requiere A–C. No Monaco / playground.
```

### 3.5 Solo Fase E

```text
GOAL: Completar solo la FASE E de docs/product/01-academy-foundations.md (cierre documental y gates). Leer doc 01 §8, §12, docs/product/roadmap.md, docs/debt/technical-debt.md y agent-docs/goal-profile.md §4–§5. Ejecutar npm run test:academy, npm run typecheck -w @bolthorn/academy, npm run build -w @bolthorn/academy. Mismo protocolo. No push/PR. Requiere A–D hechas.
```

---

## 4. Subagentes a invocar

| Paso | Subagente (`subagent_type`) | Condición de salida |
|------|-----------------------------|---------------------|
| Review de fase | `goal-reviewer` | Cero objeciones, sugerencias y nits |
| Code review de fase | `goal-code-reviewer` | Cero objeciones, sugerencias y nits |
| Puerta de fase | — | Ambos limpios sobre el mismo hash de diff |

**Orden fijo por fase:** `goal-reviewer` (loop) → `goal-code-reviewer` (loop) → misma foto →
puerta humana → `git commit`. No invertir el orden. Repetir cada subagente en bucle hasta cero
hallazgos accionables, aplicando **todas** las correcciones en el mismo worktree antes de la
siguiente invocación.

---

## 5. Commits sugeridos (orientativos)

Commits lógicos **tras** las rondas limpias y la puerta humana de la fase, no antes. Estilo
Conventional Commits del perfil §10 (`feat(academy):`, `docs(academy):`).

| Fase | Mensaje orientativo |
|------|---------------------|
| A | `feat(academy): add drizzle schema and migrations` |
| B | `feat(academy): load course content and python-fundamentals seed` |
| C | `feat(academy): upsert users from supabase jwt` |
| D | `feat(academy): publish catalog routes and content sync` |
| E | `docs(academy): mark foundations DoD and register debt` |

Ajustar al estilo real del repo (`git log --oneline -20`).

---

## 6. Checklist rápido del agente (por fase)

```text
[ ] Alcance de la fase leído en el doc 01
[ ] Perfil del proyecto leído (§4 comandos, §5 gates, §6 zonas, §7 invariantes)
[ ] Código + tests de la fase
[ ] Verificación local ejecutada (comandos reales del perfil §4)
[ ] goal-reviewer → aplicar todo → goal-reviewer … hasta limpio
[ ] goal-code-reviewer → aplicar todo → goal-code-reviewer … hasta limpio
[ ] Ambos limpios sobre la misma foto del código
[ ] Puerta humana (perfil §9 sí)
[ ] Commits de fase (sin push, sin PR)
[ ] No se ha iniciado la fase siguiente antes de lo anterior
```

---

*Generado para delegación GOAL. La autoridad de producto sigue siendo el doc 01, no este prompt.*
