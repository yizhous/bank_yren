const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountNumber: {
    type: String,
    unique: true,
    required: false,
  },
  accountName: {
    type: String,
    required: [true, '账户名不能为空'],
  },
  accountType: {
    type: String,
    enum: ['savings', 'current', 'checking'],
    default: 'savings',
  },
  balance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate account number before saving
AccountSchema.pre('save', function (next) {
  if (!this.accountNumber) {
    // Generate 10-digit account number
    this.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }
  next();
});

module.exports = mongoose.model('Account', AccountSchema);
