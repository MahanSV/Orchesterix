# Orchesterix

Minimal API starter built with Bun, Hono, and TypeScript.

## Getting started

```bash
bun install
bun run dev
```

The server listens on `http://localhost:3000` by default. Set `PORT` in `.env` to change it.

## Scripts

- `bun run dev` — run with file watching
- `bun start` — run once
- `bun test` — run tests
- `bun run typecheck` — check TypeScript types

## Routes

- `GET /` — API welcome message
- `GET /health` — health-check endpoint
- `GET /docs` — generated OpenAPI document
- `GET /api` — lists the migrated API resource groups

The previous Express route map referenced controller modules that are not
present in this repository. The corresponding Hono paths return `501` until
their controllers are added.
