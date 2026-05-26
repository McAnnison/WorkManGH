require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

// Root endpoint for testing server status
app.get('/', (req, res) => {
  res.send('WorkManGH Backend API is running!');
});

// Issue 1.2: Discovery API - GET /api/categories
// Returns all trade categories for the grid view.
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
      },
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Issue 1.2: Discovery API - GET /api/artisans
// Returns a list of artisans, filtered by categoryId and available status.
// Ensures GPS coordinates are included for frontend proximity sorting.
app.get('/api/artisans', async (req, res) => {
  const { categoryId, available } = req.query;
  const where = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  // Only filter by 'available' if it's explicitly 'true' or 'false'
  if (available !== undefined) {
    where.available = available === 'true';
  }

  try {
    const artisans = await prisma.artisanProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            profileImage: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Format the output to match frontend expectations (e.g., include average rating)
    const formattedArtisans = artisans.map(artisan => ({
      ...artisan.user, // Spread user details directly
      artisanProfileId: artisan.id, // Keep artisan profile ID separate
      category: artisan.category,
      experienceYears: artisan.experienceYears,
      bio: artisan.bio,
      available: artisan.available,
      latitude: artisan.latitude,
      longitude: artisan.longitude,
      address: artisan.address,
      averageRating: artisan.reviews.length > 0 ? artisan.reviews.reduce((sum, review) => sum + review.rating, 0) / artisan.reviews.length : 0,
      reviewCount: artisan.reviews.length,
    }));

    res.json(formattedArtisans);
  } catch (error) {
    console.error('Error fetching artisans:', error);
    res.status(500).json({ error: 'Failed to fetch artisans' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});