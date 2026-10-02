# Professional judge and Pro plan

**Estado:** implementado en branch (decisiones cerradas 2026-09-14).
**Branch de trabajo:** el HEAD actual del worktree.
**Perfil de proyecto:** I2, I3, I6.
**Roadmap:** fila 03. Depende de `02-academy-mvp`.

Hidden tests, rúbrica 0–100, métricas, Stripe Pro, CLIs `content:validate` y `content:sync`.

---

## 1. Contexto

MVP con tests públicos y cuota. No hay breakdown ni pago.

---

## 2. Decisiones cerradas

| # | Tema | Decisión |
|---|------|----------|
| F1 | Gate | correctness fail (public o hidden de corrección) ⇒ score calidad 0 |
| F2 | Rúbrica default | correctnessHidden 40, computationalCost 20, memory 15, callEconomy 10, styleQuality 10, robustness 5; override por challenge; suma 100 |
| F3 | Easy override | two-sum-lite / normalize-name: correctness 80 / style 20; ignorar memoria salvo explosión |
| F4 | Free vs Pro | Free: pass/fail público + score global opaco o redondeado. Pro: breakdown por criterio. **API niega breakdown a free** |
| F5 | Stripe | Checkout + webhook → `users.plan = pro`. Test mode hasta sign-off humano |
| F6 | CLIs | `content:validate` sin LLM; `content:sync` upsert metadata + specs |
| F7 | Versionado | no pisar hidden tests de un challenge con submissions reales sin `publish.version++` |
| F8 | Feedback | `blocker \| suggestion \| nit`, tono review, no examen escolar |
| F9 | Python harness | contar llamadas objetivo; ruff lint |

---

## 3. Scoring — Especificación

### 3.1 Objetivo

Profesionalizar: no basta con el sample.

### 3.2–3.3

```text
run public tests
run hidden tests (never in response to free beyond counts? free: no breakdown, no hidden names)
if correctness gate fail: quality = 0
else weighted sum
Pro response includes byCriterion; Free includes total rounded or omitted per visibility.free
```

### 3.8 Tests golden

| ID | Escenario | Esperado |
|----|-----------|----------|
| JR-01 | referenceSolution seed | score alto |
| JR-02 | starter vacío | no pasa hidden |
| JR-03 | hardcode del sample público | falla hidden |
| JR-04 | n² vs dict en two-sum easy | n² puede pasar easy |
| JR-05 | free token pide breakdown | forbidden |
| JR-06 | rubric weights ≠ 100 | validate rechaza |
| JR-07 | Stripe webhook firma mala | 400 |

---

## 4. Stripe y UI Pro

Checkout; página `/pricing` en español. UI Pro muestra breakdown.

---

## 5. Seguridad

Breakdown no se calcula en el cliente. Stripe webhook secret. Specs siguen server-only.

---

## 6. Textos

| Clave | es |
|-------|----|
| `pricing.pro` | Plan Pro |
| `score.breakdown` | Desglose |
| `plan.upgrade` | Mejora a Pro |

---

## 7. Fases

### Fase A — hidden tests + gate I6 + JR-01..04
### Fase B — validate CLI JR-06
### Fase C — Stripe + JR-05/07
### Fase D — UI breakdown + pricing
### Fase E — docs

---

## 8. DoD

- [x] Hidden + rúbrica determinista
- [x] Free no lee breakdown por API
- [x] Stripe test mode
- [x] validate/sync
- [x] I6

---

## 9. Fuera de alcance

IA mentor, embed, JS/TS, certificados, generator jobs.

---

## 10. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Flaky Judge0 timings | budgets holgados en easy; tests de rúbrica con métricas fixture, no wall-clock real |

---

## 11–14.

Checklist: JR-01–07. Deuda: webhooks Stripe en producción. Referencias: `apps/judge`, schema submissions. Orden: A → B → C → D.

---

*Documento vivo de implementación.*
