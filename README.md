This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Alternatively, you can view the deployed site instead of building locally:

- Visit the live deployment at: https://mecash.onrender.com/

If you prefer to build and run locally for production testing, run:

```bash
npm run build
npm start
```

## Testing

This project includes unit tests using Vitest and React Testing Library.

1. Install dependencies (if you haven't already):

```bash
npm install
```

2. Run the full test suite:

```bash
npm test
```

This runs Vitest in non-watch mode using the jsdom environment (see `vitest` in `devDependencies`).

3. Run a single test file or run in watch mode:

```bash
# run a single test file
npx vitest src/components/__tests__/SearchBar.test.tsx --run

# or run tests in watch mode
npm test -- --watch
```

Troubleshooting
- Ensure you have a compatible Node version installed. The project uses Next.js 16 which requires Node >= 20.9.0 for production builds — use `nvm` to switch node versions if needed.
- If tests fail due to DOM APIs (e.g. `document is not defined`), ensure Vitest is running with the `jsdom` environment. The project includes a `vitest.config.ts` that sets this; you can also pass `--environment jsdom` to the `vitest` command.

If you'd like, I can add a short `CONTRIBUTING.md` section with commands for running tests and common troubleshooting steps.