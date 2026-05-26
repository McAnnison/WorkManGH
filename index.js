const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const categoryRoutes = require('./routes/categories');
const artisanRoutes = require('./routes/artisans');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/artisans', artisanRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'WorkManGH API is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});