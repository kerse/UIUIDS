# UIUIDS

**A controlled-generation experiment for data-intensive professional interfaces.**

[Open the live prototype](https://kerse.github.io/UIUIDS/)

UIUIDS explores how a broad family of management, monitoring, analytics, and operational screens can be generated from a shared semantic contract without reducing every workflow to the same dashboard template.

The project is intentionally data-dense. It tests whether generated interfaces can remain coherent and predictable while handling live events, large tables, filters, financial impact, alerts, workflow queues, audit history, configuration forms, missing values, long labels, and multiple visualization types.

This is not a marketing site or a collection of isolated mockups. It is an interactive, framework-free prototype designed to behave like a working internal system.

## Research question

Can interface generation be constrained enough to preserve system-level consistency, while remaining flexible enough to produce screens with genuinely different information architectures?

UIUIDS approaches this through a semantic UI contract. The contract defines the stable decisions that should not be improvised per screen; individual pages remain free to choose the composition best suited to their task.

| Contract layer | Controlled responsibility |
| --- | --- |
| Application shell | Navigation, page header, responsive behavior, profile area, theme and density state |
| Typography | A small hierarchy of page, section, body, metadata, axis, and metric roles |
| Color | Semantic surfaces, borders, text levels, interaction accents, and operational states |
| Controls | Shared heights, radii, focus treatment, labels, and interaction hierarchy |
| Data display | Table density, numeric alignment, status representation, truncation, and expansion behavior |
| Visualization | Question-led chart selection, shared chart palette, readable axes, and exact-value access |
| State | Loading, empty, error, no-results, selection, live, delayed, and resolved states |

The contract controls visual grammar and behavior. It does not prescribe one universal layout. Monitoring remains signal-led, Data Explorer remains table-led, Alerts uses a triage list and inspector, Settings uses section navigation and forms, and Audit Log remains an event-history workspace.

## Included workspaces

The prototype contains twelve connected screens within one Operations Intelligence domain:

1. Executive Overview
2. Realtime Command Dashboard
3. Realtime Monitoring
4. Geospatial Operations
5. Data Explorer
6. Entity Detail
7. Analytics Workspace
8. Alerts & Anomalies
9. Operations Queue
10. Audit Log
11. Admin & Settings
12. Component Gallery

Shared entities, owners, locations, events, alerts, tasks, costs, confidence values, and SLA states create continuity between the screens without repeating identical datasets everywhere.

## Interaction coverage

The prototype includes functional local interactions rather than decorative controls:

- search, composed filters, active filter chips, and reset states;
- table sorting, pagination, selection, expansion, row actions, and bulk actions;
- tabs, saved views, metric and period switching;
- chart hover and keyboard-focus values;
- detail drawers and inspectors;
- alert acknowledgement, assignment, and resolution;
- workflow updates and operational notes;
- settings validation and save feedback;
- compact and comfortable density modes;
- persistent light and dark color schemes.

All behavior runs against connected mock data in the browser. No backend is required.

## Architecture

UIUIDS is built with static HTML, CSS, and JavaScript.

- `assets/js/system-contract.js` provides the canonical `OpsShell`, global density, and theme behavior.
- `assets/css/system-contract.css` owns shared shell geometry and cross-screen component rules.
- `assets/css/themes.css` defines semantic color variables independently from components.
- `assets/css/tokens.css` contains foundational size, spacing, motion, and chart tokens.
- Page composition modules own only the information architecture and interactions below the shared shell.

Geospatial Operations uses Leaflet for pan, zoom, markers, route overlays, and controlled regional clustering. The demonstration basemap is provided by OpenStreetMap with visible attribution; a production deployment should use a tile provider and capacity policy appropriate to its traffic.

Static pages use the `<ops-shell>` custom element. Generated workspace pages use `OpsShell.mount()`. Both paths produce the same runtime shell, header, navigation, theme, and density contract.

### Color schemes

The light scheme is the default. The dark scheme uses a graphite canvas, layered neutral surfaces, restrained borders, and a cool blue interaction accent.

Schemes are defined through semantic variables such as:

```css
html[data-theme="dark"] {
  --scheme-canvas: #292a32;
  --scheme-surface: #32333d;
  --scheme-border: #454751;
  --scheme-text: #f2f3f6;
  --scheme-accent: #2da7ff;
}
```

A new scheme can be added by defining the same `--scheme-*` contract under another `data-theme` value. Components do not need to be rewritten.

## Running locally

No build step is required. Open `index.html` directly or serve the directory with any static HTTP server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Current scope

UIUIDS is a first-iteration research prototype, not a production application. Data mutations, exports, assignments, and destructive actions are simulated locally. Charts use native SVG, state is intentionally lightweight, and dense tables remain horizontally scrollable on narrow screens.

The project is intended as a practical testbed for reviewing controlled interface generation, semantic design-system constraints, information density, component reuse, and cross-screen consistency.
