const express = require('express');
const initializeDB = require('./config/db'); // changed function name to `initializeDB`
const accountRoutes = require('./routes/userRoutes'); // changed variable name to `accountRoutes`

require('dotenv').config(); // Load environment variables
const app = express();

// Initialize database connection
initializeDB();

// Middleware for parsing JSON requests
app.use(express.json());

// Define routes with a different path
app.use('/api/v1', accountRoutes); // changed '/api' to '/api/v1'

// Start server on the defined port or default to 5000
const PORT = process.env.PORT || 4000; // changed default port to 4000
app.listen(PORT, () => {
  console.log(`Application is live on port ${PORT}`);
});
