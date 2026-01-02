const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// @desc    Deposit money into account
// @route   POST /api/transaction/deposit
// @access  Private
router.post('/deposit', protect, async (req, res) => {
  const { accountId, amount, description } = req.body;

  try {
    // Get account
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if account belongs to user
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update account balance
    account.balance += amount;
    await account.save();

    // Create transaction
    const transaction = await Transaction.create({
      account: accountId,
      type: 'deposit',
      amount,
      description: description || 'Deposit',
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Withdraw money from account
// @route   POST /api/transaction/withdraw
// @access  Private
router.post('/withdraw', protect, async (req, res) => {
  const { accountId, amount, description } = req.body;

  try {
    // Get account
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if account belongs to user
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Check if sufficient balance
    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update account balance
    account.balance -= amount;
    await account.save();

    // Create transaction
    const transaction = await Transaction.create({
      account: accountId,
      type: 'withdrawal',
      amount,
      description: description || 'Withdrawal',
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get transaction history for an account
// @route   GET /api/transaction/history/:accountId
// @access  Private
router.get('/history/:accountId', protect, async (req, res) => {
  try {
    // Get account to verify ownership
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Check if account belongs to user
    if (account.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Get transactions
    const transactions = await Transaction.find({ account: req.params.accountId })
      .sort({ transactionDate: -1 })
      .limit(50);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
