const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'AI Backend API is working!' });
});

module.exports = app;
