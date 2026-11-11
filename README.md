# LinguaTales

Read stories. Learn languages. Enjoy the journey.

A mobile-first, story-led language learning app. English master stories are translated into a learner's chosen language and cached per language and difficulty.

## Stack

- React + TypeScript + Vite
- Vercel deployment and serverless API routes
- Neon Postgres for the content catalogue and learning progress
- Browser speech synthesis for the first narration prototype

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `DATABASE_URL` for server-side database features.

## Database

Apply `database/schema.sql` to the Neon database. Never expose `DATABASE_URL` to browser code.

## Status

Early prototype. The first slice includes a story catalogue, vocabulary matching, a reader with contextual word help, and local learning progress. Translation generation, authentication, cloud sync and production narration are planned integrations.
