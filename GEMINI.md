# WorkManGH - Project Instructions

Foundational mandates for developers and AI agents working on the WorkManGH project.

## 🎯 Project Vision
Connect skilled Ghanaian artisans (masons, carpenters, plumbers, etc.) with customers using GPS-based proximity and direct communication. The app must be grounded in Ghanaian realities (phone-first, trust-based).

## 🛠 Tech Stack & Environment
- **Framework:** React Native 0.81.5 (Expo 54.0.0)
- **State Management:** React Hooks (Future: TanStack Query)
- **Backend:** Node.js + Express (Prisma ORM)
- **Database:** PostgreSQL (Neon Serverless)
- **Navigation:** React Navigation (Stack)
- **Design:** Mobile-first, high contrast theme.

## 🎨 Design System
- **Primary Color:** `#FF6B35` (Orange) - Used for primary actions and branding.
- **Secondary Color:** `#4ECDC4` (Teal) - Used for status indicators and accents.
- **Background:** `#F5F5F5` (Light Gray).
- **Icons:** Use **Emoji characters** for trade recognition (e.g., 🪚 for Carpenter) to maintain a lightweight bundle.
- **Components:** Always use `StyleSheet.create()` for styling.

## 📜 Coding Standards
- **Components:** Functional components with hooks only.
- **Naming:** CamelCase for functions/variables, PascalCase for Components.
- **Functions:** Use arrow functions for all event handlers and internal logic.
- **Data:** Use `src/data/artisanData.js` for local data structures and mock data.
- **Safety:** Always validate Ghanaian phone numbers (e.g., starting with +233 or 0).
- **Location:** Always check for `Location.requestForegroundPermissionsAsync()` before using GPS. Default to Accra coordinates `(5.6037, -0.1870)` if permissions are denied.

## 🚀 Workflows
- **New Screens:** Add to `src/screens/` and register in `App.js`. See `src/screens/GEMINI.md` for screen-specific patterns.
- **Database:** Use `npx prisma generate` after schema changes. Migrations are mandatory for backend updates.
- **Testing:** Perform manual verification of navigation and location sorting after UI changes.

## 🔗 Backend Patterns
- **Endpoints:** Use `GET /api/artisans` for discovery and `GET /api/categories` for selection.
- **Data Fetching:** Always include `latitude` and `longitude` in artisan payloads for frontend sorting.
- **Formatting:** Format backend responses to match the schema defined in `src/data/GEMINI.md`.
- **Error Handling:** Use `try/catch` blocks in all route handlers with 500 status codes for server errors.

## 🤖 AI Interaction Guidelines
- **Research:** Always check `SRS.md` and `DEVELOPMENT.md` for feature specifics before implementation.
- **Refactoring:** Keep logic focused. If a screen exceeds 300 lines, extract sub-components or custom hooks.
- **Documentation:** Update `IMPLEMENTATION_SUMMARY.md` after major feature completions.
