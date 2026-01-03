# MongoDB Community Server 安装指南（Windows）

## 1. 下载MongoDB Community Server

1. 访问MongoDB官方下载页面：[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. 在下载页面，选择以下选项：
   - **版本**：选择最新的稳定版本（Stable）
   - **操作系统**：Windows
   - **软件包**：MSI（推荐，易于安装）
   - **平台**：根据您的系统选择（x86_64）
3. 点击"Download"按钮开始下载

## 2. 安装MongoDB Community Server

1. 双击下载的MSI文件，启动安装向导
2. 在安装向导中，选择"Custom"（自定义）安装类型
3. 选择安装位置，建议使用默认路径：`C:\Program Files\MongoDB\Server\<version>\`
4. 在"Service Configuration"页面，选择：
   - 勾选"Install MongoDB as a Service"
   - 选择"Run service as Network Service user"（推荐）
   - 勾选"Start MongoDB Service after installation"
5. 在"MongoDB Compass"页面，您可以选择是否安装MongoDB Compass（图形化管理工具），建议安装
6. 点击"Install"开始安装
7. 等待安装完成，点击"Finish"关闭向导

## 3. 启动MongoDB服务

### 方法1：通过服务管理器启动（推荐）
1. 按下 `Win + R` 键，输入 `services.msc`，点击"确定"
2. 在服务列表中找到"MongoDB Server"或"MongoDB"
3. 右键点击，选择"Start"启动服务
4. 确认服务状态变为"Running"

### 方法2：通过命令行启动
1. 以管理员身份打开命令提示符
2. 执行以下命令启动MongoDB服务：
   ```
   net start MongoDB
   ```

## 4. 验证MongoDB连接

1. 打开命令提示符
2. 执行以下命令连接到MongoDB：
   ```
   mongosh
   ```
3. 如果连接成功，您将看到MongoDB Shell的提示符：
   ```
   test> 
   ```
4. 执行以下命令测试数据库操作：
   ```
   show dbs
   ```
   您应该能看到默认的数据库列表

## 5. 连接到我们的应用程序数据库

1. 在MongoDB Shell中，执行以下命令创建我们的应用数据库：
   ```
   use bank-ai-agent
   ```
2. 执行以下命令创建一个测试集合：
   ```
   db.test.insertOne({ message: "Hello, MongoDB!" })
   ```
3. 执行以下命令验证数据插入：
   ```
   db.test.find()
   ```
   您应该能看到刚插入的数据

## 6. 停止MongoDB服务

### 方法1：通过服务管理器停止
1. 按下 `Win + R` 键，输入 `services.msc`，点击"确定"
2. 在服务列表中找到"MongoDB Server"或"MongoDB"
3. 右键点击，选择"Stop"停止服务

### 方法2：通过命令行停止
1. 以管理员身份打开命令提示符
2. 执行以下命令停止MongoDB服务：
   ```
   net stop MongoDB
   ```

## 7. 常见问题解决

### 问题1：MongoDB服务无法启动
- 检查服务日志：`C:\Program Files\MongoDB\Server\<version>\log\mongod.log`
- 确保数据目录存在且有读写权限：默认路径为 `C:\data\db\`

### 问题2：无法连接到MongoDB
- 检查MongoDB服务是否正在运行
- 检查防火墙设置，确保允许MongoDB的端口（默认27017）

### 问题3：mongosh命令无法识别
- 将MongoDB的bin目录添加到系统环境变量PATH中
- 默认路径：`C:\Program Files\MongoDB\Server\<version>\bin\`

## 8. 卸载MongoDB

1. 打开"控制面板" > "程序" > "卸载程序"
2. 找到"MongoDB Community Server"，右键点击，选择"卸载"
3. 按照卸载向导完成卸载
4. 删除数据目录（如果需要）：`C:\data\db\`
5. 删除日志目录（如果需要）：`C:\Program Files\MongoDB\Server\<version>\log\`

# 安装完成后

安装并启动MongoDB服务后，您可以返回项目目录，执行 `npm run dev` 启动我们的银行AI代理应用程序。

应用程序将自动连接到MongoDB数据库，使用我们在 `.env` 文件中配置的连接字符串：
```
MONGO_URI=mongodb://localhost:27017/bank-ai-agent
```
