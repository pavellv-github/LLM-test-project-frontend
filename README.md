# LLM Test Project Frontend

React + TypeScript frontend scaffolded with Vite, Ant Design, Axios, and Zustand following a
Feature-Sliced Design (FSD) layout so you can expand individual modules without coupling.

## Описание проекта
Проект аккуратно разбит по принципам FSD: `src/app` содержит корневой `App` и провайдеры
(ThemeProvider/ConfigProvider), `src/pages` собирает страницу и её взаимодействия, `src/features`
охраняет бизнес-логику (Zustand-хранилище для состояния готовности), `src/entities` описывает
типизацию данных запуска, а `src/shared` собирает UI-паттерны и API-обёртки (Axios-подключение).
Используется Ant Design 5, можно расширять темы через `ConfigProvider`, а `PageTitle` — переиспользуемый
шаблон заголовка. Axios вызывает `jsonplaceholder.typicode.com` для демонстрации, Zustand хранит
индикатор готовности и сообщение, и весь UI инкапсулирован в компоненты-виджеты типа `MainPage`.

## Requirements
- Node 20 (as requested)
- npm 10+ (or compatible package manager)

## Project structure highlights
- `src/app` holds the root `App` component and provider bootstrapping (`ThemeProvider`).
- `src/pages/MainPage` renders the Ant Design layout that consumes shared UI and feature logic.
- `src/features/launch/store/useLaunchStore.ts` keeps the Zustand store for busy/ready status.
- `src/entities/launch/types.ts` types the Axios payload that our shared API layer exposes.
- `src/shared/api` centralizes the Axios client plus the `fetchLaunchInfo` call.
- `src/shared/ui` contains reusable UI primitives, like `PageTitle`.
- Global styling lives under `src/styles` to mirror the folder conventions commonly used in FSD.

## Scripts
- `npm install` — install dependencies and generate `package-lock.json`.
- `npm run dev` — start the Vite dev server on http://localhost:5173.
- `npm run build` — batch `tsc --noEmit` with `vite build` to produce `dist/`.
- `npm run preview` — locally preview the production build.
- `npm run check` — run `tsc --noEmit` only.
- `npm run lint` — run ESLint across `src` (configured for React/TypeScript/Prettier).
- `npm run lint:fix` — attempt to fix lint problems.
- `npm run format` — run Prettier on `.ts`, `.tsx`, and `.css` files under `src`.

## Notes
- Axios is configured in `src/shared/api/axiosClient.ts` and used in `src/shared/api/launchApi.ts`.
- Zustand powers a lightweight store (`src/features/launch/store/useLaunchStore.ts`) that toggles
  readiness state and refreshes the launch payload coming from the placeholder API.
- ESLint and Prettier share config files at the repo root; linting enforces the agreed-upon style.
