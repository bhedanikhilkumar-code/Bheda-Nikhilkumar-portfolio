# Quality Standard — Bheda Nikhilkumar Portfolio

This repository has been upgraded from documentation-only to a working static portfolio website with testable data helpers and CI-backed validation.

## Quality Goals

| Goal | What it means |
| --- | --- |
| Working portfolio | `index.html` renders a real single-page portfolio experience. |
| Structured content | Profile, metrics, projects, skills, and timeline live in `src/data.js`. |
| Testable helpers | Category filtering, search, summaries, stack extraction, and repo labels live in `src/portfolio.js`. |
| Professional UI | Responsive dark interface with hero, metrics, filters, project cards, skills, timeline, and contact CTA. |
| CI confidence | App Quality and Repository Health workflows validate app and repository standards. |

## Commands

| Check | Command |
| --- | --- |
| Start local preview | `npm start` |
| Run unit tests | `npm test` |
| Validate project structure | `npm run check` |
| App CI workflow | `.github/workflows/app-quality.yml` |
| Repository health workflow | `.github/workflows/repository-health.yml` |

## Test Coverage Focus

The current tests verify:

- Project data completeness.
- GitHub repository link format.
- Category generation and category filtering.
- Featured project derivation.
- Unique stack extraction.
- Portfolio summary metrics.
- Search behavior.
- Clean GitHub repo slug labels.

## Definition of Strong

A strong portfolio change should satisfy:

- [ ] Project content remains accurate and current.
- [ ] `npm test` passes.
- [ ] `npm run check` passes.
- [ ] Responsive layout works on desktop and mobile.
- [ ] README and docs match the implemented portfolio.
- [ ] External links point to real GitHub repositories.

## Manual Smoke Test

1. Run `npm start`.
2. Open `http://localhost:4174`.
3. Confirm hero, metrics, project cards, skills, timeline, and contact CTA render.
4. Filter projects by category.
5. Open a GitHub project link.
6. Resize to mobile width and test the menu.

## CI Expectations

Both workflows should stay green:

- **App Quality:** Node tests and project validation.
- **Repository Health:** documentation, templates, support, security, and review files.
