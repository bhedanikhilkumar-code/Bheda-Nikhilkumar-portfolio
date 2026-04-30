# Case Study — Bheda Nikhilkumar Portfolio

## One-Line Summary

A polished single-page developer portfolio that showcases Nikhil Bheda’s strongest project categories, skills, GitHub proof-of-work, and professional presentation layer.

## Why This Repo Was Weak

Before this upgrade, the repository had professional documentation but no actual portfolio app, no package manifest, no tests, and no app-specific CI. It looked clean in README form, but a reviewer would not find a runnable website.

## What Changed

| Area | Upgrade |
| --- | --- |
| Product | Added a responsive portfolio website with hero, metrics, projects, skills, timeline, and CTA. |
| Engineering | Added structured data and pure helper functions for category filtering, search, summaries, and validation. |
| Quality | Added Node unit tests and project validation. |
| CI | Added App Quality workflow in addition to Repository Health. |
| Documentation | Updated README, architecture, quality standard, and roadmap to reflect the real implementation. |

## Product Decisions

- **Static-first:** A portfolio should load fast and be easy to host on GitHub Pages.
- **Zero runtime dependencies:** Keeps setup simple and review-friendly.
- **Structured data:** Projects and metrics live in `src/data.js`, making future edits clean.
- **Testable logic:** Helper functions live in `src/portfolio.js`, separate from DOM code.
- **Recruiter-friendly narrative:** The page highlights outcomes and portfolio signal, not just file names.

## Main Visitor Journey

1. Visitor lands on the hero section and understands the developer positioning.
2. Visitor scans portfolio metrics and quality signals.
3. Visitor filters featured work by category.
4. Visitor reviews project impact and stack.
5. Visitor opens GitHub repositories for deeper proof.
6. Visitor sees the timeline and professional GitHub polish narrative.

## Portfolio Value

This upgrade makes the repository stronger because it now demonstrates:

- Real frontend implementation.
- Strong visual presentation.
- Product/storytelling awareness.
- Testable JavaScript architecture.
- CI-backed quality discipline.
- A focused career-facing asset rather than a docs-only repository.

## Next Strong Upgrade

The next high-impact improvement is GitHub Pages deployment with screenshots and a README demo link. That would turn the project into a live portfolio entry, not just a runnable local app.
