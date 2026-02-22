# Angular folder structure (enterprise architecture)

This app follows the **core / features / shared** layout.

## `src/app/`

- **core/** – App-wide, singleton, non-feature code.
  - `core.ts` – Root providers (router, HTTP, etc.).
  - `layout/sidebar/` – Shell layout (sidebar).

- **features/** – One folder per business feature (by domain, not by technical type).
  - `dashboard/` – Dashboard (overview, portfolio summary).
  - `portfolios/` – Portfolio list and portfolio-list component.
  - `portfolio-detail/` – Single portfolio view, resolver, investment form.
  - `history/` – History feature.
  - `settings/` – Settings (profile, preferences tabs).

- **shared/** – Reusable building blocks used across features. No imports from `core` or `features`.
  - `models/` – Shared interfaces (e.g. `portfolio.model.ts`).
  - `services/` – Shared services (e.g. `currency.service`, `portfolio.service`, `mock-data.service`).
  - `pipes/` – Shared pipes (e.g. `currency-converter.pipe`).
  - `ui/` – Shared UI (e.g. `tab`).

## Rules of thumb

- **Core**: Layout, app bootstrap, global singletons. Do not import from `features`.
- **Features**: Domain-specific components and routes. Can use `shared` and `core`.
- **Shared**: Reusable components, services, pipes, models. Do not import from `core` or `features`.
