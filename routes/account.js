const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Account = require('../models/Account');

// @desc    Create a new bank account
// @route   POST /api/account/create
// @access  Private
router.post('/create', protect, async (req, res) => {
  try {
    // Create account
    const account = await Account.create({
      user: req.user._id,
      accountType: req.body.accountType || 'savings',
    });

    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all accounts for a user
// @route   GET /api/account
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user._id });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get a single account by ID
// @route   GET /api/account/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if the account belongs to the user
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get account balance
// @route   GET /api/account/:id/balance
// @access  Private
router.get('/:id/balance', protect, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if the account belongs to the user
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json({ 
      accountNumber: account.accountNumber,
      balance: account.balance 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
