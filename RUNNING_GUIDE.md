# 银行智能体应用 - 运行指南

## 环境要求

在运行应用之前，请确保您的环境满足以下要求：

- Node.js 16+ 
- MongoDB 4+ 或使用MongoDB Atlas
- OpenAI API Key（可选，仅用于AI聊天功能）

## 本地开发环境运行

### 步骤1：克隆仓库

如果您尚未克隆仓库，请执行以下命令：

```bash
git clone https://github.com/your-username/bank-ai-agent.git
cd bank-ai-agent
```

### 步骤2：安装依赖

使用npm安装项目依赖：

```bash
npm install
```

### 步骤3：配置环境变量

创建 `.env` 文件并添加以下内容：

```
# Server Configuration
PORT=3000

# Database Configuration
# 本地MongoDB或MongoDB Atlas连接字符串
MONGO_URI=mongodb://localhost:27017/bank-ai-agent

# JWT Configuration
# 生成一个随机字符串作为JWT密钥
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# OpenAI Configuration (可选)
# 如果需要使用AI聊天功能，请添加您的OpenAI API密钥
OPENAI_API_KEY=your_openai_api_key_here
```

### 步骤4：启动应用

#### 开发模式

使用nodemon启动应用，支持自动重启：

```bash
npm run dev
```

#### 生产模式

直接使用node启动应用：

```bash
npm start
```

### 步骤5：访问应用

打开浏览器访问：

```
http://localhost:3000
```

## 生产环境部署

### 部署到Zeabur

1. 登录Zeabur控制台：https://dash.zeabur.com/
2. 点击"创建项目"
3. 选择"从GitHub导入"
4. 选择您的项目仓库
5. Zeabur会自动检测项目类型并配置环境
6. 在"环境变量"中添加所需的环境变量（与 `.env` 文件相同）
7. 点击"部署"按钮
8. 等待部署完成，获取访问URL

### 部署到其他平台

您也可以将应用部署到其他平台，如Heroku、Vercel、AWS等，步骤类似：

1. 确保平台支持Node.js应用
2. 配置环境变量
3. 设置启动命令为 `npm start`
4. 部署并测试

## 项目结构说明

```
bank-ai-agent/
├── routes/          # API路由
│   ├── auth.js      # 用户认证路由
│   ├── account.js   # 账户管理路由
│   ├── transaction.js # 交易路由
│   └── chat.js      # AI聊天路由
├── models/          # MongoDB模型
│   ├── User.js      # 用户模型
│   ├── Account.js   # 账户模型
│   └── Transaction.js # 交易模型
├── middleware/      # 中间件
│   └── auth.js      # JWT认证中间件
├── views/           # EJS模板
│   ├── login.ejs    # 登录页面
│   ├── dashboard.ejs # 仪表盘页面
│   └── chat.ejs     # 聊天页面
├── public/          # 静态资源
│   ├── css/         # CSS样式
│   └── js/          # JavaScript文件
├── server.js        # 应用入口
├── package.json     # 项目配置
├── .env             # 环境变量
└── README.md        # 项目说明
```

## 功能测试

### 测试流程

1. 打开应用首页，点击"注册"创建新账户
2. 使用新账户登录
3. 在仪表盘创建一个银行账户
4. 进行存款和取款操作
5. 查看交易历史记录
6. 进入聊天页面，与AI助手交流

### 常见问题排查

1. **数据库连接失败**
   - 检查MONGO_URI是否正确
   - 确保MongoDB服务正在运行
   - 如果使用MongoDB Atlas，检查IP白名单设置

2. **AI聊天功能无法使用**
   - 检查OpenAI API密钥是否正确
   - 确保网络可以访问OpenAI API
   - 检查API密钥是否有足够的配额

3. **应用无法启动**
   - 检查端口是否被占用
   - 检查环境变量配置
   - 查看控制台输出的错误信息

## 开发建议

1. 在开发过程中使用 `npm run dev` 命令，支持自动重启
2. 使用Postman或类似工具测试API端点
3. 定期备份数据库
4. 保护好您的API密钥和JWT密钥

## 联系方式

如有任何问题或建议，欢迎提交Issue或Pull Request。
