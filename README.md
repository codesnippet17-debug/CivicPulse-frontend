# CivicPulse

A demo-ready civic issue reporting interface built with Next.js, TypeScript and Tailwind CSS. It uses a typed mock-data layer so it can be demonstrated immediately and replaced with an API later.

## Run locally

```bash
npm install
npm run dev
```

Routes: `/`, `/report`, `/map`, `/issues/CIV-1024`, `/admin`.

## Architecture

- `src/types/issue.ts` — central `CivicIssue` types and status system
- `src/data/demoIssues.ts` — 12 realistic demo issues
- `src/components/ui.tsx` — shared navigation, badges, cards and map presentation
- `src/app` — route-level interfaces

The map presentation is deliberately a lightweight static intelligence-map visual, keeping the demo reliable without map-tile credentials. The package includes Leaflet/React-Leaflet so a live map can replace `MapCanvas` without changing the data model or pages.
