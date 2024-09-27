const express = require('express');
const { 
  registerAccount, 
  fetchAllAccounts, 
  fetchAccountById, 
  updateAccount, 
  removeAccount, 
  authenticateAccount 
} = require('../controllers/userController');

const router = express.Router();

// Register new account
router.post('/accounts', registerAccount);

// Get all accounts
router.get('/accounts', fetchAllAccounts);

// Get a single account by ID
router.get('/accounts/:id', fetchAccountById);

// Update an account by ID
router.put('/accounts/:id', updateAccount);

// Delete an account by ID
router.delete('/accounts/:id', removeAccount);

// Account login
router.post('/accounts/login', authenticateAccount);

module.exports = router;
