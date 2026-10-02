# Academy professionalization (mentor, pipeline, embed)

**Estado:** done in branch (no merged). Decisiones cerradas 2026-09-14.
**Branch de trabajo:** el HEAD actual del worktree.
**Perfil de proyecto:** I1–I6, I4.
**Roadmap:** fila 04. Depende de `03-academy-judge-and-pro`.

Mentor xAI, pipeline de contenido, embed, certificados, segundo lenguaje JS/TS.

---

## 1. Contexto

Judge profesional y Stripe existen. No hay LLM, ni generator, ni iframe.

---

## 2. Decisiones cerradas

| # | Tema | Decisión |
|---|------|----------|
| F1 | AI provider | SpaceXAI / xAI: `XAI_API_KEY`, `https://api.x.ai/v1`, server-side only |
| F2 | Mentor | hints socráticos + review de submission; prohibido pegar referenceSolution o reescribir el archivo en easy/intermediate |
| F3 | Log | cada llamada en `ai_calls` (userId, challengeId, tipo hint\|review\|generate-tests, tokens) |
| F4 | Pipeline | etapas Architect→Writer→ChallengeSmith→TestForger→Validator→Pedagogue→Reviewer; BullMQ `content-generate`; nunca en el request del alumno |
| F5 | Prompts | un system prompt por etapa en `prompts/`; no un único «haz un curso» en producción |
| F6 | Embed | `/embed/challenge/[slug]` + postMessage `EmbedMessage`; `EMBED_ALLOWED_ORIGINS` |
| F7 | Certificados | hash público verificable; página verify |
| F8 | JS/TS | segundo harness; no 20 lenguajes |
| F9 | Admin | `/admin/generator` brief + job status + publicar; roles author/admin |

---

## 3. Mentor y pipeline

### 3.8 Tests golden

| ID | Escenario | Esperado |
|----|-----------|----------|
| PR-01 | hint easy | no contiene la referenceSolution |
| PR-02 | XAI_API_KEY no en bundle client | grep |
| PR-03 | generate job no corre inline en tRPC mutation del alumno | cola |
| PR-04 | embed origen no allowlisted | rechazo |
| PR-05 | certificate hash verify | 200 / 404 |

---

## 4. Embed y certificados

Web component o iframe; theming CSS variables. Certificado de participación free vs verificable Pro según contexto §10.

---

## 5. Seguridad

LLM solo backend. Origin allowlist. Admin role gate. Código de usuario no se manda a xAI junto con la reference en easy/intermediate.

---

## 6. Textos

| Clave | es |
|-------|----|
| `mentor.hint` | Pedir pista |
| `admin.generator` | Generaciones |
| `cert.verify` | Verificar certificado |

---

## 7. Fases

### Fase A — ai-service + PR-01/02
### Fase B — pipeline CLI + jobs + admin UI PR-03
### Fase C — embed PR-04
### Fase D — certificados + JS/TS harness PR-05
### Fase E — docs

---

## 8. DoD

- [x] Mentor sin spoiler easy
- [x] Generator async
- [x] Embed allowlist
- [x] Certificado verificable
- [x] JS/TS corre un challenge seed

---

## 9. Fuera de alcance

Kubernetes, microVM, app nativa, clonar Codecademy, más lenguajes (SQL/Java/C++/Go).

---

## 10. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| LLM spoilea | tests de substring de reference; system prompt por etapa; Pedagogue gate |
| Coste generate | async + promptVersion + no regenerar published con submissions |

---

## 11–14.

Checklist PR-01–05. Deuda: Mux/vídeo. Orden A → B; C y D en paralelo tras A.

---

*Documento vivo de implementación.*
