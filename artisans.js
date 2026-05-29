const express = require('express');
const authMiddleware = require('./auth');
const prisma = require('./db');

const router = express.Router();

/**
 * POST /api/artisans/register
 * Protected: Registers the logged-in user as an artisan.
 */
router.post('/register', authMiddleware, async (req, res) => {
  const { categoryId, experienceYears, bio, latitude, longitude, address } = req.body;
  const userId = req.user.userId;

  // Basic validation
  if (!categoryId || experienceYears === undefined || latitude === undefined || longitude === undefined || !address) {
    return res.status(400).json({ error: 'Please provide all required profile fields (category, experience, location).' });
  }

  try {
    // Check if user already has an artisan profile
    const existingProfile = await prisma.artisanProfile.findUnique({
      where: { userId }
    });

    if (existingProfile) {
      return res.status(400).json({ error: 'This user is already registered as an artisan.' });
    }

    // Use a transaction to create the profile and update the User role atomically
    const profile = await prisma.$transaction(async (tx) => {
      const newProfile = await tx.artisanProfile.create({
        data: {
          userId,
          categoryId,
          experienceYears: parseInt(experienceYears, 10),
          bio,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          address
        }
      });

      await tx.user.update({
        where: { id: userId },
        data: { role: 'ARTISAN' }
      });

      return newProfile;
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error('Artisan registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

/**
 * PATCH /api/artisans/availability
 * Protected: Toggles the "available" status for the logged-in artisan.
 */
router.patch('/availability', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { available } = req.body;

  try {
    const profile = await prisma.artisanProfile.update({
      where: { userId },
      data: { available: !!available }
    });
    res.json({ available: profile.available });
  } catch (error) {
    res.status(500).json({ error: 'Could not update availability status.' });
  }
});

/**
 * GET /api/artisans/dashboard
 * Protected: Returns profile data and stats for the logged-in artisan.
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const profile = await prisma.artisanProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: { name: true, email: true, phone: true, profileImage: true, role: true }
        },
        category: true,
        _count: {
          select: { reviews: true }
        }
      }
    });

    if (!profile) return res.status(404).json({ error: 'Artisan profile not found.' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data.' });
  }
});

module.exports = router;