const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/artisans?category=slug
router.get('/', async (req, res) => {
  const { category } = req.query;

  try {
    const artisans = await prisma.artisanProfile.findMany({
      where: category ? {
        category: { slug: category }
      } : {},
      include: {
        user: {
          select: { name: true, phone: true, profileImage: true }
        },
        category: true,
        _count: {
          select: { reviews: true }
        }
      }
    });
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artisans' });
  }
});

// GET /api/artisans/:id
router.get('/:id', async (req, res) => {
  try {
    const artisan = await prisma.artisanProfile.findUnique({
      where: { id: req.params.id },
      include: { user: true, category: true, reviews: true, portfolio: true }
    });
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });
    res.json(artisan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artisan details' });
  }
});

module.exports = router;