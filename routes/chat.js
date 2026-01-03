const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @desc    Chat with AI bank agent
// @route   POST /api/chat
// @access  Private
router.post('/', protect, async (req, res) => {
  const { message } = req.body;

  try {
    // 系统提示词
    const systemPrompt = '你是一个专业的银行智能助理，专注于回答用户的银行相关问题，包括账户查询、交易历史、存款取款规则、利息计算等。请保持友好、专业的语气，只回答与银行相关的问题。';

    // 优先使用OpenAI API
    if (process.env.OPENAI_API_KEY) {
      // 使用OpenAI API调用
      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Create chat completion
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
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
    } 
    // 如果没有OpenAI API Key，使用阿里云百炼API
    else if (process.env.ALIYUN_API_KEY) {
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
                content: systemPrompt
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
    }
    // 如果两种API Key都没有配置
    else {
      return res.json({
        response: "很抱歉，AI聊天功能暂未配置。请联系管理员设置OpenAI或阿里云百炼API密钥。"
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