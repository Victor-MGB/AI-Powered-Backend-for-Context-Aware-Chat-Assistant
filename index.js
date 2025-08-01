
require('dotenv').config();
const app = require('./src/app');
const config = require('./src/config');

app.listen(config, () => {
console.log(`🚀 Server running in ${config.env} mode on port ${config.port}`);
});
