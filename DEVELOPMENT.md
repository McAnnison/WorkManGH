# WorkManGH Development Guide

## Architecture

WorkManGH is a React Native application built with Expo 54 and React Native 0.81.5. The mobile client uses React Navigation and React Native Paper. The API is a Node.js/Express service backed by PostgreSQL through Prisma 7 and the Prisma PostgreSQL driver adapter.

### Repository layout

- `App.js` — Expo application entry point.
- `src/screens/` — mobile screens.
- `src/config/api.js` — shared mobile API base URL.
- `src/data/` — sample data and client utilities.
- `server.js` — **canonical backend entry point**.
- `auth.js`, `artisans.js` — Express route modules.
- `categories.js` — category route module retained for modular routing; the canonical server currently exposes the category endpoint directly.
- `db.js` — shared Prisma client and PostgreSQL adapter.
- `schema.prisma` — database schema.
- `prisma.config.ts` — Prisma CLI datasource and migration configuration.

Do not start the API using the removed legacy `index.js`. Use the scripts below.

## Requirements

- Node.js 20 LTS or newer (Node 22 LTS recommended).
- npm.
- PostgreSQL database (local or hosted).
- Expo Go or an Android/iOS development environment for mobile testing.

## Installation and environment

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and provide your PostgreSQL connection string and a long, random JWT secret. Never commit `.env` or share its contents.

   - `DATABASE_URL` — PostgreSQL connection string.
   - `JWT_SECRET` — secret used to sign and verify authentication tokens.
   - `PORT` — optional API port; defaults to `3000`.
   - `EXPO_PUBLIC_API_URL` — API base URL exposed to the Expo client. This is a public URL, not a secret.

4. Generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Apply database migrations during development (after configuring a valid database):

   ```bash
   npm run prisma:migrate:dev -- --name init
   ```

   If the database already has a migration history, use the normal migration workflow rather than creating a second initial migration.

## Running the services

Run the mobile app and API in separate terminals.

### Mobile app

```bash
npm start
# or: npm run android / npm run ios / npm run web
```

### Backend API

```bash
npm run dev:api
# or, without file watching:
npm run start:api
```

The API listens on `0.0.0.0` and defaults to port `3000`. Check process health at:

- `GET http://localhost:3000/health` — returns a small JSON health response.
- `GET http://localhost:3000/` — API identity and status.

The health route checks that the HTTP process is responding; it does not prove that PostgreSQL is reachable.

## Connecting a physical Android phone

A phone cannot normally reach the development computer through the phone's own `localhost` address.

1. Connect the phone and computer to the same Wi-Fi network.
2. Find the computer's private LAN IPv4 address (for example, `192.168.1.10`).
3. Set `EXPO_PUBLIC_API_URL=http://192.168.1.10:3000` in `.env`.
4. Restart Expo with a cleared cache: `npx expo start --clear`.
5. Ensure the computer firewall allows inbound connections to the API port.

For an Android emulator, use the host address supported by that emulator (Android Studio's standard emulator commonly uses `10.0.2.2`). For web on the same computer, `http://localhost:3000` is suitable.

All mobile screens should import the shared URL from `src/config/api.js`; do not hard-code a machine-specific IP in screen files.

## API routes currently wired in the canonical server

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/artisans/register` (authenticated)
- `PATCH /api/artisans/availability` (authenticated)
- `GET /api/artisans/dashboard` (authenticated)
- `GET /api/categories`
- `GET /api/artisans?categoryId=<id>&available=true|false`

## Git workflow

- Create a branch for each issue.
- Keep changes within the approved issue scope.
- Include Prisma migrations when changing the database schema.
- Run the relevant checks before opening a pull request.
- Link the pull request to its issue and merge only after review.

## Security notes

- Never commit `.env`, database credentials, or production secrets.
- Use HTTPS for deployed API traffic.
- Use a strong, unique JWT secret in each environment.
- Treat `EXPO_PUBLIC_*` values as public: they are bundled into the client application.
- The current API uses permissive CORS for development. Restrict allowed origins before production deployment.
- The current health endpoint is a liveness check, not a database readiness check.
