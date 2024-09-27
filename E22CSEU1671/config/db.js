const mongoose = require('mongoose');

// Function to establish a connection with the database
const initializeDB = async () => {
  try {
    // Attempt to connect using the environment variable or a default local URI
    const dbURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/mvc_project'; // changed variable and default DB name
    await mongoose.connect(dbURI, {
      useNewUrlParser: true, // added options for better connection handling
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message); // updated error message format
    process.exit(1); // Exit the process with failure
  }
};

module.exports = initializeDB; // updated the export name
