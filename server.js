require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');
const artisanRoutes = require('./artisans');
const prisma = require('./db');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
  res.json({ name: 'WorkManGH API', status: 'running' });
});

// Liveness check: confirms that the API process is responding.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'workmangh-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/artisans', artisanRoutes);

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true, icon: true },
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/artisans', async (req, res) => {
  const { categoryId, available } = req.query;
  const where = {};

  if (categoryId) where.categoryId = String(categoryId);
  if (available === 'true' || available === 'false') {
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
            reviewsReceived: { select: { rating: true } },
          },
        },
        category: {
          select: { id: true, name: true, slug: true, icon: true },
        },
      },
    });

    const formattedArtisans = artisans.map((artisan) => {
      const reviews = artisan.user.reviewsReceived;
      const { reviewsReceived, ...user } = artisan.user;
      const ratingTotal = reviews.reduce((sum, review) => sum + review.rating, 0);

      return {
        ...user,
        artisanProfileId: artisan.id,
        category: artisan.category,
        experienceYears: artisan.experienceYears,
        bio: artisan.bio,
        available: artisan.available,
        latitude: artisan.latitude,
        longitude: artisan.longitude,
        address: artisan.address,
        averageRating: reviews.length ? ratingTotal / reviews.length : 0,
        reviewCount: reviews.length,
      };
    });

    res.json(formattedArtisans);
  } catch (error) {
    console.error('Error fetching artisans:', error);
    res.status(500).json({ error: 'Failed to fetch artisans' });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled API error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WorkManGH API listening on port ${PORT}`);
  });
}

module.exports = app;
