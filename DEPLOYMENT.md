# 图片压缩工具部署指南

## 部署到Render平台

本项目支持一键部署到Render平台，包含后端API服务和前端静态网站。

### 部署方式一：使用render.yaml（推荐）

1. **准备代码**
   - 确保所有代码已提交到Git仓库
   - 确保render.yaml文件在项目根目录

2. **在Render上创建服务**
   - 登录 [Render Dashboard](https://dashboard.render.com/)
   - 点击 "New" → "Blueprint"
   - 连接您的Git仓库
   - Render会自动检测render.yaml文件并创建服务

3. **等待部署完成**
   - 后端API服务：`image-compressor-api`
   - 前端静态网站：`image-compressor-frontend`

### 部署方式二：手动创建服务

#### 1. 部署后端API服务

1. 在Render Dashboard中点击 "New" → "Web Service"
2. 连接您的Git仓库
3. 配置服务：
   - **Name**: `image-compressor-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

#### 2. 部署前端静态网站

1. 在Render Dashboard中点击 "New" → "Static Site"
2. 连接您的Git仓库
3. 配置服务：
   - **Name**: `image-compressor-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Plan**: Free

4. 设置环境变量：
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-service-name.onrender.com`

### 环境变量配置

#### 后端环境变量
- `PYTHON_VERSION`: `3.9.16`
- `PORT`: 自动设置（Render提供）

#### 前端环境变量
- `VITE_API_URL`: 后端API服务的URL

### 部署后验证

1. **检查后端服务**
   - 访问：`https://your-backend-service-name.onrender.com/`
   - 应该看到：`{"message": "图片压缩工具API服务运行正常", "version": "2.0.0"}`

2. **检查健康检查**
   - 访问：`https://your-backend-service-name.onrender.com/health`
   - 应该看到：`{"status": "healthy", "service": "image-compressor-api"}`

3. **测试前端应用**
   - 访问前端静态网站URL
   - 上传图片测试压缩功能

### 常见问题解决

#### 1. 构建失败
- 检查requirements.txt中的依赖版本
- 确保Python版本兼容
- 查看构建日志中的具体错误

#### 2. 前端无法连接后端
- 确认VITE_API_URL环境变量设置正确
- 检查后端服务是否正常运行
- 确认CORS配置正确

#### 3. 图片上传失败
- 检查文件大小限制
- 确认文件格式支持
- 查看后端日志

### 性能优化建议

1. **启用缓存**
   - 在Render Dashboard中为静态网站启用缓存
   - 设置适当的缓存策略

2. **监控服务**
   - 使用Render的监控功能
   - 设置告警通知

3. **扩展服务**
   - 根据使用情况升级到付费计划
   - 配置自动扩展

### 本地开发

```bash
# 启动后端
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# 启动前端
cd frontend
npm install
npm run dev
```

### 更新部署

1. 推送代码到Git仓库
2. Render会自动检测变更并重新部署
3. 等待部署完成并验证功能

---

**注意**: 免费计划的服务在15分钟无活动后会休眠，首次访问可能需要等待几秒钟唤醒服务。 