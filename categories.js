const express = require('express');
const router = express.Router();
const prisma = require('./db');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;