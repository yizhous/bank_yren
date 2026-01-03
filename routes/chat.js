const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @desc    Chat with AI bank agent
// @route   POST /api/chat
// @access  Private
router.post('/', protect, async (req, res) => {
  const { message } = req.body;

  try {
    // Check if AI API Key is configured
    if (!process.env.ALIYUN_API_KEY) {
      return res.json({
        response: "很抱歉，AI聊天功能暂未配置。请联系管理员设置阿里云百炼API密钥。"
      });
    }

    // 使用阿里云百炼API调用
    const apiKey = process.env.ALIYUN_API_KEY;
    const apiUrl = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'system',
              content: '你是一个专业的银行智能助理，专注于回答用户的银行相关问题，包括账户查询、交易历史、存款取款规则、利息计算等。请保持友好、专业的语气，只回答与银行相关的问题。'
            },
            {
              role: 'user',
              content: message
            }
          ]
        },
        parameters: {
          max_tokens: 150,
          temperature: 0.7
        }
      })
    });
    
    const data = await response.json();
    
    if (data.output && data.output.text) {
      res.json({
        response: data.output.text
      });
    } else {
      console.error('AI Error:', data);
      res.json({
        response: "抱歉，我暂时无法回答您的问题。请稍后再试或联系人工客服。"
      });
    }
  } catch (error) {
    console.error('AI Error:', error);
    res.json({
      response: "抱歉，我暂时无法回答您的问题。请稍后再试或联系人工客服。"
    });
  }
});

module.exports = router;