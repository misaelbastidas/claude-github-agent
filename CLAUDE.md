# CLAUDE.md

## Project
React + Vite calculator app. Used as a demo project for GitHub + Claude Code integration.

## Stack
- React 19 + Vite
- Plain CSS (no CSS frameworks)
- No backend, no external APIs

## Commands
```bash
npm install       # install dependencies
npm run dev       # start dev server at localhost:5173
npm run build     # production build → dist/
```

## Branch strategy
```
feature/branch → dev → qa → main
```
- Always branch from `dev`
- Always create PRs targeting `dev`
- Never push directly to `main` or `qa`

## Key files
- `src/components/Calculator.jsx` — main component
- `src/components/Calculator.css` — styles
- `src/App.jsx` / `src/App.css` — app shell

## Code conventions
- Functional components with hooks only
- `useCallback` for handlers passed to event listeners
- CSS class naming: `btn-number`, `btn-operator`, `btn-clear`, `btn-equals`
