# WorkManGH Backend Implementation Issues

This document outlines the parallel tasks for Backend/API integration.

## Developer 1: Infrastructure & Data Discovery
**Focus:** Database setup and the Customer discovery journey.

### Issue 1.1: Express/Prisma Foundation & DB Seeding
- [x] Initialize Node.js/Express server boilerplate.
- [x] Initialize Prisma client using the existing `schema.prisma`.
- [x] Create a `seed.js` script to populate the `Category` table with the 8 trades (Mason, Carpenter, etc.).
- [x] Seed the database with `SAMPLE_ARTISANS` data from `artisanData.js` to ensure the frontend has data to fetch.

### Issue 1.2: Discovery API (Categories & Artisan Listing)
- [x] Create `GET /api/categories`: Returns all trade categories for the grid view.
- [x] Create `GET /api/artisans`: Returns a list of artisans.
    - [x] Support query params: `?categoryId=...` and `?available=true`.
    - [x] Ensure GPS coordinates are included in the payload for frontend proximity sorting.

---

## Developer 2: Security & Artisan Onboarding
**Focus:** Authentication and the Artisan management journey.

### Issue 2.1: Authentication System
- [x] Implement `POST /api/auth/signup` and `POST /api/auth/login`.
- [x] Use JWT (JSON Web Tokens) for session management.
- [x] Implement backend validation for Ghanaian phone formats (matching frontend regex).
- [x] Create an `authMiddleware` to protect artisan-specific routes.

### Issue 2.2: Artisan Profile & Availability Management (Backend)
- [x] Create `POST /api/artisans/register`: Protected route to create an artisan profile linked to a user.
- [x] Create `PATCH /api/artisans/availability`: Protected route to toggle the `available` boolean.
- [ ] **Frontend Integration**: Update `ArtisanRegistrationScreen.js` to send form data to the new API instead of local logging.

---

## Shared Responsibilities
- **Environment**: Ensure both developers use the shared PostgreSQL connection string in `.env`.
- **Documentation**: Update the `DEVELOPMENT.md` if any new environment variables are added.
- **Testing**: Verify that local distance calculations on the frontend still work correctly with data returned from the API.

**Status Tracking**: Please move tasks to a "Done" section or check them off as they are merged into the main branch.