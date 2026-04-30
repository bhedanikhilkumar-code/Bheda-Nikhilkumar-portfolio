# Architecture — Bheda Nikhilkumar Portfolio

## Purpose

This repository is a responsive, recruiter-friendly portfolio website for Nikhil Bheda. It presents project highlights, skills, timeline, metrics, and GitHub links through a polished static web experience.

## System Context

```mermaid
flowchart LR
    Visitor[Recruiter / Reviewer] --> UI[Portfolio UI]
    UI --> App[src/app.js]
    App --> Data[src/data.js]
    App --> Helpers[src/portfolio.js]
    Helpers --> Output[Cards, Filters, Metrics, Timeline]
    Tests[Node Unit Tests] --> Helpers
```

## Runtime Boundaries

| Boundary | Responsibility | Files |
| --- | --- | --- |
| Page shell | Semantic sections, navigation, SEO metadata, call-to-action | `index.html` |
| Styling | Responsive dark UI, cards, grid layouts, mobile navigation | `src/styles.css` |
| Rendering | Creates metrics, filters, project cards, skill pills, and timeline entries | `src/app.js` |
| Data model | Profile, metrics, projects, skills, and timeline content | `src/data.js` |
| Pure helpers | Categories, filtering, search, stack extraction, summaries, validation | `src/portfolio.js` |
| Quality | Unit tests and structure validation | `tests/`, `scripts/`, GitHub Actions |

## Primary Workflow

```mermaid
sequenceDiagram
    participant V as Visitor
    participant UI as Portfolio UI
    participant Data as Portfolio Data
    participant Logic as Helper Logic
    V->>UI: Open portfolio
    UI->>Data: Load projects, skills, metrics, timeline
    UI->>Logic: Build categories and summary
    Logic-->>UI: Render-ready view model
    V->>UI: Filter selected work by category
    UI->>Logic: Apply category filter
    Logic-->>UI: Updated project grid
    V->>UI: Open GitHub repository link
```

## Data Model

```mermaid
classDiagram
    class Project {
      string title
      string category
      string description
      string[] stack
      string repo
      string impact
      boolean featured
    }

    class Metric {
      string label
      string value
      string detail
    }

    class TimelineItem {
      string title
      string description
    }

    class PortfolioSummary {
      number totalProjects
      number featuredCount
      number categoryCount
      string[] categories
      number skillCount
    }

    PortfolioSummary --> Project
    PortfolioSummary --> Metric
```

## Quality Gates

- `npm test` validates portfolio helper behavior and project data completeness.
- `npm run check` validates expected files and README content.
- `.github/workflows/app-quality.yml` runs app tests and validation on push/PR.
- `.github/workflows/repository-health.yml` validates the professional repository layer.

## Extension Points

- Add GitHub Pages deployment.
- Add project detail pages or modal case studies.
- Add screenshots and preview GIFs.
- Add downloadable resume section.
- Add Playwright smoke tests for browser-level interactions.
