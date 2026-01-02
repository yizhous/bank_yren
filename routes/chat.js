const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Chat with AI bank agent
// @route   POST /api/chat
// @access  Private
router.post('/', protect, async (req, res) => {
  const { message } = req.body;

  try {
    // Create chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一个专业的银行智能助理，专注于回答用户的银行相关问题，包括账户查询、交易历史、存款取款规则、利息计算等。请保持友好、专业的语气，只回答与银行相关的问题。",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    res.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ message: 'Failed to get AI response' });
  }
});

module.exports = router;
