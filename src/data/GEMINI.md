# Data Layer Instructions

Guidelines for managing artisan data and utility functions in `src/data/`.

## 🗂 Data Structure
All artisan objects MUST contain:
- `id`: Unique string.
- `name`: Full name.
- `category`: String matching an ID in `ARTISAN_CATEGORIES`.
- `phone`: String in Ghanaian format (+233...).
- `experience`: Number of years.
- `location`: Object with `latitude`, `longitude`, and `address`.
- `available`: Boolean.

## 🏷 Categories
- When adding new categories, ensure they have a unique `id`, `name`, `pluralName`, and a relevant **Emoji icon**.
- Maintain the alphabetical order or group by industry if the list grows significantly.

## 📏 Geospatial Logic
- Always use the `calculateDistance` function for consistency across screens.
- Do NOT modify the Haversine formula implementation without cross-verifying with the ArtisanList sorting logic.
- Log errors if coordinates are outside valid ranges (-90 to 90 for lat, -180 to 180 for lon).

## 🧪 Mocking
- `SAMPLE_ARTISANS` should be used for UI prototyping.
- When transitioning to a real API, ensure the response schema matches the `SAMPLE_ARTISANS` structure to avoid breaking the UI components.
