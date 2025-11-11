# Development README — my-github-explorer

## Requirements

- Node.js >= 20.9.0
- npm (or yarn / pnpm)

## Install

```bash
cd /path/to/my-github-explorer
npm install
```

## Development server

```bash
npm run dev
```

Open http://localhost:3000 (or set `PORT=3002 npm run dev`).

## Production

```bash
npm run build
npm run start
```

## Tests

There is a unit test for the `SearchBar` at `src/components/__tests__/SearchBar.test.tsx`.

To run tests, add a test runner (recommended: Vitest):

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add a script to `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

Run tests:

```bash
npm run test
```

## Lint & typecheck

TypeScript typecheck:

```bash
npx tsc --noEmit
```

ESLint:

```bash
npm run lint
```

## Notes on filters and usage

- Filters supported: Language, Stars (string like `>1000` or range `10..100`), License (SPDX id), Sort (stars/forks/updated) and Order (asc/desc).
- The GitHub search hook composes qualifiers and calls the GitHub Search API.
- GitHub Search caps results at 1000; the UI caps pagination accordingly.

---