const Account = require('../models/User'); // changed User to Account
const bcryptjs = require('bcryptjs');

// Register a new account
const registerAccount = async (req, res) => {
  const { fullname, useremail, userpassword } = req.body;

  try {
    // Check if the account already exists
    let existingAccount = await Account.findOne({ useremail });
    if (existingAccount) {
      return res.status(400).json({ message: 'Account already exists' });
    }

    // Encrypt the password before saving
    const saltRounds = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(userpassword, saltRounds);

    const newAccount = new Account({
      fullname,
      useremail,
      hashedPassword: encryptedPassword, // store encrypted password
    });

    await newAccount.save();
    res.status(201).json({ message: 'Account successfully created' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Login for an existing account
const authenticateAccount = async (req, res) => {
  const { useremail, userpassword } = req.body;

  try {
    // Check if the account exists
    const account = await Account.findOne({ useremail });
    if (!account) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const passwordMatches = await bcryptjs.compare(userpassword, account.hashedPassword);
    if (!passwordMatches) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: account._id, name: account.fullname });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Retrieve all accounts (without passwords)
const fetchAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().select('-hashedPassword');
    res.status(200).json(accounts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Retrieve a specific account by ID (without password)
const fetchAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id).select('-hashedPassword');
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update an account's details
const updateAccount = async (req, res) => {
  const { fullname, useremail, userpassword } = req.body;

  try {
    let account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    account.fullname = fullname || account.fullname;
    account.useremail = useremail || account.useremail;

    if (userpassword) {
      const saltRounds = await bcryptjs.genSalt(10);
      account.hashedPassword = await bcryptjs.hash(userpassword, saltRounds);
    }

    await account.save();
    res.status(200).json({ message: 'Account updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete an account by ID
const removeAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Export all controller functions
module.exports = {
  registerAccount,
  authenticateAccount,
  fetchAllAccounts,
  fetchAccountById,
  updateAccount,
  removeAccount
};
