
require('dotenv').config();
const app = require('./src/app');
const config = require('./src/config');
const connectDB = require('./src/config/db');

// Connect to MongoDB
connectDB();

app.listen(config, () => {
console.log(`🚀 Server running in ${config.env} mode on port ${config.port}`);
});
