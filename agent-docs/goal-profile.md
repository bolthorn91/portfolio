# Perfil de proyecto — goal loop

Rellenado para Bolthorn Makers (consultoría + academia). Numeración §1–§10 estable.

---

## §1 Identidad y lenguaje

| Campo | Valor |
|-------|-------|
| Proyecto | Bolthorn Makers |
| Stack | TypeScript, Next.js 16 App Router, React 19, Tailwind 4, Supabase Auth, Drizzle + Postgres, Hono judge service, BullMQ/Redis, Judge0 |
| Gestor de paquetes / runner | npm workspaces |
| Idioma de los textos de usuario | es |
| Idioma de identificadores y código | en |
| Política de comentarios | Escasos y solo el porqué; prohibido narrar el cambio; sin comentarios de relleno |
| Rama base | v2 |

---

## §2 Autoridad documental (orden de precedencia)

De mayor a menor. Ante contradicción gana el de arriba; si dos empatan, gana el documento de la goal en curso.

1. Documento canónico de la goal en curso (`docs/product/NN-*.md`)
2. `AGENTS.md` — convenciones del repo
3. Este perfil (`agent-docs/goal-profile.md`)
4. `docs/product/roadmap.md`
5. `internaldocs/` — **No aplica como autoridad**. Son dumps de sesión git-ignored. Informaron los docs de producto; no se citan como spec una vez existe el documento canónico.

---

## §3 Rutas canónicas

| Rol | Ruta | Obligatoria |
|-----|------|-------------|
| Documentos de goal | `docs/product/NN-<slug>.md` | sí |
| Prompt de handover | junto al doc, `<basename>-goal-prompt.md` | sí |
| Instrucciones de agentes | `AGENTS.md` | sí |
| Política de tests / cobertura | No aplica (aún no hay umbral numérico) | no |
| Registro de deuda técnica | `docs/debt/technical-debt.md` | sí |
| Inventario de historias E2E | No aplica | no |
| Roadmap a actualizar al cerrar | `docs/product/roadmap.md` | sí |
| Estado de los runs (git-ignored) | `.grok/goal-runs/` | sí |
| Plantillas del loop | `agent-docs/templates/` | sí |

---

## §4 Comandos de verificación

Comandos ejecutables tal cual desde la raíz del repo.

| Nivel | Comando | Cuándo se ejecuta |
|-------|---------|-------------------|
| Typecheck site | `npx tsc --noEmit` | cada fase que toque `src/` |
| Typecheck academy | `npm run typecheck -w @bolthorn/academy` | cada fase que toque `apps/academy` |
| Typecheck judge | `npm run typecheck -w @bolthorn/judge` | cada fase que toque `apps/judge` |
| Typecheck packages | `npm run typecheck -w @bolthorn/academy-types` y `npm run typecheck -w @bolthorn/academy-content` | cada fase que toque `packages/` |
| Lint | `npm run lint` | cada fase que toque el site |
| Tests focalizados | `npm run test -w <paquete> -- <fichero>` | cada fase, solo lo tocado |
| Suite packages + academy + judge | `npm run test:academy` | cierre de fase grande |
| Cobertura | No aplica | — |
| Build site | `npm run build` | cierre de programa si se tocó el site |
| Build academy | `npm run build -w @bolthorn/academy` | cierre de programa si se tocó academy |
| Migraciones / esquema | `npm run db:generate -w @bolthorn/academy` (cuando exista Drizzle) | fases que tocan datos |
| Otros checks propios | No aplica | — |

No inventar comandos que no estén aquí. Si un workspace aún no declara el script, parar y decirlo.

---

## §5 Gates de calidad (bloqueantes)

| Gate | Umbral | Alcance |
|------|--------|---------|
| Tests de superficie nueva | toda superficie nueva o modificada en `apps/`, `packages/` lleva test en el mismo cambio | academy, judge, packages |
| Cobertura numérica | No aplica (sin baseline) | — |
| Hidden-test leak | el DTO público de un challenge no contiene `hiddenTests`, `referenceSolution` ni `generation` | `packages/academy-content`, tRPC público |

Reglas fijas:

- No bajar umbrales ni ampliar `exclude` para pasar un gate.
- Un gate que no se ha ejecutado se reporta como «no ejecutado», nunca como «pasa».
- No exigir tests de las páginas de marketing existentes salvo que el documento de goal las autorice.

---

## §6 Zonas protegidas (no modificar)

| Ruta / patrón | Motivo | Excepción autorizada |
|---------------|--------|----------------------|
| `src/app/page.tsx`, `src/app/nosotros/**`, `src/app/servicios/**`, `src/app/productos/**`, `src/app/portfolio/**`, `src/app/testimonios/**`, `src/app/contact/**`, `src/app/presupuesto/**` | consultoría en producción | solo si el doc de goal lo nombra |
| `src/components/sections/**` | chrome de marketing | no |
| `src/components/Navbar.tsx` | chrome de marketing | un enlace «Academia» cuando lo autorice `02-academy-mvp` |
| `src/components/Footer.tsx` | chrome de marketing | no |
| `internaldocs/**` | dumps locales git-ignored | no versionar ni tratar como spec |
| `src/types/api.ts` | contratos de presupuestos, no de academy | no mezclar tipos de academy |

Duplicación inevitable causada por una zona protegida → `docs/debt/technical-debt.md`.

---

## §7 Invariantes transversales

Se comprueban en **todas** las fases, toque lo que toque el diff.

| # | Invariante | Cómo se verifica | Severidad si se rompe |
|---|------------|------------------|-----------------------|
| I1 | El código de usuario nunca se ejecuta en el proceso web; solo `apps/judge` habla con Judge0 | grep de `judge0` / `eval(` / `vm.run` fuera de `apps/judge`; academy solo tiene un cliente HTTP al judge | bug |
| I2 | `referenceSolution`, `hiddenTests` y `generation` no viajan al cliente ni al router tRPC público | test golden `AC-01` y grep de esos campos en loaders públicos | bug |
| I3 | Límites de plan (`free`/`pro`: cuota, breakdown, catálogo hard/pro) se aplican en servidor | tests de procedimiento; no hay flag de cliente que desbloquee | bug |
| I4 | Embed con allowlist de origen; webhooks HMAC | tests de origen/firma cuando esas superficies existan | bug |
| I5 | El contenido canónico vive en `content/courses/`; Postgres no es un segundo CMS de enunciados | schema: lecciones/challenges en git; DB = progreso, submissions, publish metadata | bug |
| I6 | Si falla el gate de correctness, el score de calidad es 0; las rúbricas suman 100 | tests de scoring en judge | bug |

---

## §8 Convenciones de arquitectura

- **Capas y ubicación:** consultoría en `src/` (Next raíz). LMS en `apps/academy`. Ejecución en `apps/judge`. Contratos en `packages/academy-types`. Loaders YAML/MDX en `packages/academy-content`. Cursos en `content/courses/`.
- **Naming de ficheros:** kebab-case para módulos y rutas; PascalCase para componentes React; camelCase para funciones.
- **Imports:** externos → alias `@/` o workspace `@bolthorn/*` → relativos. Sin barrels opacos que reexporten hidden specs.
- **Patrones obligatorios:** Server Components por defecto en academy; Client Components solo para editor, poll y auth UI. Tipos de dominio extendiendo `packages/academy-types`, no campos paralelos.
- **Patrones prohibidos:** Judge0 desde `src/` o desde route handlers de academy más allá del cliente HTTP del judge. Mezclar Prisma y Drizzle. Clerk/Auth.js. Exponer `XAI_API_KEY` o tokens de Judge0 al bundle.
- **Reutilización:** auth de alumnos = Supabase ya existente (`User.externalId` = `user.id`). UI en español.

---

## §9 Parámetros del loop

| Parámetro | Defecto | Este proyecto |
|-----------|---------|---------------|
| Severidades accionables | `bug`, `suggestion`, `nit` | `bug`, `suggestion`, `nit` |
| Máx. rondas por subagente y fase | 5 | 5 |
| Umbral de tamaño de fichero | 1000 líneas | 1000 |
| Aviso por diff grande | 1 MB | 1 MB |
| Parada por diff enorme | 10 MB | 10 MB |
| Orden de subagentes | `goal-reviewer` → `goal-code-reviewer` | igual |
| Fases supervisadas | no | **sí** |

---

## §10 Política de git

| Punto | Valor |
|-------|-------|
| Commits por fase | uno lógico por entregable; nunca antes de las dos rondas limpias |
| Estilo de mensaje | Conventional Commits: `feat(academy):`, `feat(judge):`, `feat(site):`, `chore(tooling):` |
| Índice | sí se permite `git add -A -N` para recolectar el diff |
| Push | prohibido salvo petición explícita del humano |
| Pull request | prohibido salvo petición explícita del humano |
| Operaciones prohibidas | force-push, `reset --hard`, amend de commits ajenos, descartar trabajo ajeno |
| Firma / hooks | no saltarse hooks |

---

*Rellenado por: Grok Build · Última revisión: 2026-09-14. Mantener este fichero al día es lo que mantiene honesto al loop.*
