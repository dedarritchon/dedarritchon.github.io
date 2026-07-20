# Daniel Darritchon — Portfolio

Personal site built with **React 19**, **Vite**, and **styled-components**. Hosted on Firebase (with optional GitHub Pages deploy).

## Setup

```bash
npm install
npm start
```

## Scripts

| Command | Description |
| --- | --- |
| `npm start` / `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm test` | Vitest |
| `npm run lint` | ESLint |
| `npm run deploy` | Firebase Hosting |
| `npm run deploy:gh-pages` | GitHub Pages |

## CI / CD

- **CI** (`.github/workflows/ci.yml`): lint, test, build on push/PR
- **Deploy** (`.github/workflows/deploy.yml`): Firebase Hosting on `master`/`main`

Required GitHub secret for deploy: `FIREBASE_SERVICE_ACCOUNT` (Firebase service account JSON).

Generate it with:

```bash
npx firebase-tools login
npx firebase-tools init hosting
# or create a service account in Google Cloud Console and paste the JSON into the secret
```

## Stack

- React 19 + Vite 8
- styled-components 6
- Locomotive Scroll 4 (smooth scroll + parallax)
- Sass
- Vitest + Testing Library
