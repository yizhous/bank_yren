# 银行智能体应用

一个基于Node.js和Express开发的银行智能体应用，集成了用户认证、账户管理、交易记录和AI聊天功能。

## 功能特性

### 用户管理
- ✅ 用户注册和登录
- ✅ JWT身份验证
- ✅ 安全的密码存储

### 账户管理
- ✅ 创建银行账户
- ✅ 查询账户余额
- ✅ 支持多种账户类型（储蓄账户、活期账户）

### 交易功能
- ✅ 存款操作
- ✅ 取款操作
- ✅ 交易历史记录查询

### AI智能聊天
- ✅ 基于OpenAI的智能聊天功能
- ✅ 专业的银行知识问答
- ✅ 实时响应

## 技术栈

- **后端框架**: Node.js + Express
- **数据库**: MongoDB
- **身份验证**: JWT + bcryptjs
- **AI集成**: OpenAI API
- **前端**: HTML + CSS + JavaScript (EJS模板引擎)

## 安装和运行

### 环境要求

- Node.js 16+ 
- MongoDB 4+ 或使用MongoDB Atlas
- OpenAI API Key

### 本地安装

1. 克隆仓库
```bash
git clone https://github.com/your-username/bank-ai-agent.git
cd bank-ai-agent
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env` 文件并添加以下内容：
```
# Server Configuration
PORT=3000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/bank-ai-agent

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

4. 启动应用
```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

5. 访问应用
打开浏览器访问 `http://localhost:3000`

## 部署到Zeabur

1. 登录Zeabur控制台
2. 点击"创建项目"
3. 选择"从GitHub导入"
4. 选择你的项目仓库
5. Zeabur会自动检测项目类型并配置环境
6. 在"环境变量"中添加所需的环境变量
7. 点击"部署"按钮
8. 等待部署完成，获取访问URL

## API文档

### 用户认证
- `POST /api/auth/register` - 注册新用户
- `POST /api/auth/login` - 用户登录

### 账户管理
- `POST /api/account/create` - 创建新账户
- `GET /api/account` - 获取用户所有账户
- `GET /api/account/:id` - 获取单个账户详情
- `GET /api/account/:id/balance` - 查询账户余额

### 交易功能
- `POST /api/transaction/deposit` - 存款
- `POST /api/transaction/withdraw` - 取款
- `GET /api/transaction/history/:accountId` - 获取交易历史

### AI聊天
- `POST /api/chat` - 与AI智能体聊天

## 项目结构

```
bank-ai-agent/
├── routes/          # API路由
├── models/          # MongoDB模型
├── middleware/      # 中间件
├── views/           # EJS模板
├── public/          # 静态资源
│   ├── css/         # CSS样式
│   └── js/          # JavaScript文件
├── server.js        # 应用入口
├── package.json     # 项目配置
├── .env             # 环境变量
└── README.md        # 项目说明
```

## 使用说明

1. 注册新用户或使用已有账户登录
2. 在仪表盘创建银行账户
3. 进行存款或取款操作
4. 查看交易历史记录
5. 进入智能聊天页面，与AI助手交流银行相关问题

## 注意事项

- 本项目仅供学习和演示使用，请勿用于生产环境
- 确保保护好你的OpenAI API Key和JWT密钥
- 在生产环境中，建议使用HTTPS协议

## 许可证

MIT License
