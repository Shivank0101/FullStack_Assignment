const mongoose = require('mongoose');

// Define the schema for user data
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true, // added to remove extra spaces
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // ensure emails are stored in lowercase
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 6, // enforce a minimum length for passwords
  },
});

// Exporting the User model based on the schema
module.exports = mongoose.model('Account', UserSchema);
