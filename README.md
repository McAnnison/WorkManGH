# WorkManGH — Artisan Marketplace & Locator App

WorkManGH connects customers in Ghana with local skilled artisans such as masons, carpenters, plumbers, painters, electricians, welders, tilers, and mechanics. The mobile application supports category-based discovery, location-aware listings, artisan profiles, direct contact, and artisan onboarding.

## Current technology

- **Mobile:** React Native 0.81.5, Expo 54, React Navigation, React Native Paper
- **Backend:** Node.js, Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma 7 with the PostgreSQL driver adapter
- **Location:** Expo Location

## Current capabilities

- Browse artisan categories.
- Retrieve artisan listings with category and availability filters.
- View artisan profile information and location coordinates.
- Create an account and sign in using the API.
- Register an authenticated account as an artisan.
- Update artisan availability and retrieve an artisan dashboard.
- Calculate nearby distances on the client.

Some user-facing screens and marketplace features are still under development. Do not assume that every dashboard, job, payment, messaging, review-submission, or identity-verification flow is production-ready merely because related data models or UI elements exist.

## Getting started

### 1. Install

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Set `DATABASE_URL` to your PostgreSQL connection string and replace `JWT_SECRET` with a long random secret. Keep the real `.env` file private and out of version control.

### 3. Generate Prisma Client and migrate

```bash
npm run prisma:generate
npm run prisma:migrate:dev -- --name init
```

Only create an initial migration if the database does not already have migration history.

### 4. Start the API

```bash
npm run dev:api
```

The canonical backend entry point is `server.js`. Verify it at `http://localhost:3000/health`.

### 5. Start the Expo app

In another terminal:

```bash
npm start
```

For a physical Android device, set `EXPO_PUBLIC_API_URL` in `.env` to your computer's LAN address, for example `http://192.168.1.10:3000`, then restart Expo. See [DEVELOPMENT.md](DEVELOPMENT.md) for emulator, device, database, and workflow details.

## Project structure

```
WorkManGH/
├── App.js
├── server.js                 # Canonical Express API entry point
├── auth.js                   # Authentication routes and middleware
├── artisans.js               # Artisan routes
├── categories.js             # Category route module
├── db.js                     # Prisma/PostgreSQL client
├── schema.prisma
├── prisma.config.ts
├── src/
│   ├── config/api.js          # Shared mobile API URL
│   ├── screens/
│   └── data/
├── .env.example
├── package.json
└── DEVELOPMENT.md
```

## Development workflow

Use GitHub issues to define scope and acceptance criteria. Implement each issue on a dedicated branch, test the changes, open a linked pull request, and review it before merging. See [DEVELOPMENT.md](DEVELOPMENT.md).

## License

MIT
