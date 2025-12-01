## Frontend layout (conventional Vite + React + Tailwind)

- Everything for the UI lives in `frontend/`.
- Entry HTML: `frontend/index.html`.
- Source: `frontend/src` (React, TypeScript, Tailwind).
- Static assets: `frontend/public`.
- Build output: `frontend/dist` (ignored in git).

### Scripts (run inside `frontend/` or via root helpers)
- `npm run dev` — Vite dev server with HMR.
- `npm run build` — Type-check + production build to `dist/`.
- `npm run preview` — Serve the built app locally.
- From repo root you can also use `npm run dev-frontend` / `build-frontend`.

### Tailwind setup
- Config: `frontend/tailwind.config.js` (edit `theme.extend` to customize tokens).
- PostCSS: `frontend/postcss.config.js` (Tailwind + autoprefixer).
- Global styles: `frontend/src/index.css` includes `@tailwind base/components/utilities` and a small background treatment; add shared styles here with `@layer`.
- Example usage: `frontend/src/App.tsx` uses Tailwind utility classes directly in JSX.

Add new utilities or theme values in `tailwind.config.js`, then use them in components. Vite will pick up classes in `src/**/*.{js,ts,jsx,tsx}` and `index.html`.
