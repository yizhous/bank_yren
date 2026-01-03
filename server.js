const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine for frontend
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bank-ai-agent')
.then(() => console.log('Database connected'))
.catch(err => {
  console.error('Database connection error:', err);
  console.log('Server will continue running without database connection. Some features may be limited.');
});

// Routes
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const transactionRoutes = require('./routes/transaction');
const chatRoutes = require('./routes/chat');

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/chat', chatRoutes);

// Frontend routes
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

// Start server
// 优先使用Zeabur的WEB_PORT环境变量，然后使用PORT环境变量，最后使用默认值3000
const PORT = process.env.WEB_PORT || process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
