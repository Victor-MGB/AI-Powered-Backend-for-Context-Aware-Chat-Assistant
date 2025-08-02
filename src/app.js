const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ REQUIRED

// Default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'AI Backend API is working!' });
});

// Auth routes
app.use('/api/auth', authRoutes);

module.exports = app;
