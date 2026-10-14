# Frontend Openings

A one-page site listing 24 frontend developer openings, compiled from the spreadsheet
`Test - 25 September 2026.pdf`. Every opening has one button that goes straight to the company's
careers page, its hiring email (with a copy button), or its application form.

Built with Vite, React 19, TypeScript, and Tailwind CSS v4.

## Running

```bash
npm install
npm run dev          # development server
npm run check        # data check + lint + build
npm run check:links  # open every link (needs internet)
```

## Structure

```
src/
  types/job.ts       Job and ApplyRoute types
  data/jobs.ts       The openings (all copy lives here)
  data/routes.ts     Labels and colors for website / email / form
  lib/               Filtering, grouping, dates, mailto and host helpers
  hooks/             "I've applied" marks, stored in the visitor's browser
  components/        Hero, RouteBar, Toolbar, JobGroup, JobItem, ApplyPanel, JobDetails, Footer
scripts/
  check-data.ts      Unique ids, https links, no LinkedIn or short links, valid emails
  check-links.ts     Opens every link; 401/403/406/429 are listed as "refused a script", not broken
```

## Adding an opening

1. Add an entry to `src/data/jobs.ts`. Set `requirements: null` if the posting's requirements
   were not copied, and use `caution` for anything a candidate should check before applying.
2. Run `npm run check`, then `npm run check:links`.

## Deploy

Live at https://frontend-openings.vercel.app (Vercel project `frontend-openings`).

```bash
npm run deploy:vercel  # deploy to Vercel production
npm run deploy         # GitHub Pages copy: build with the repo sub-path and push dist/ to gh-pages
```
