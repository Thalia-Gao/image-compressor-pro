# 图片压缩工具2.0

## 项目简介
本项目是一个支持PNG、JPG等格式图片上传与压缩的网页应用，用户可自定义压缩比例，在线预览压缩效果，并下载压缩后的图片。界面采用苹果风格设计，简洁美观，兼容桌面和移动端。

## 功能模块
- 图片上传（支持PNG、JPG）
- 压缩比例自定义（10%-100%）
- 原图与压缩图预览
- 文件大小对比展示
- 压缩率计算显示
- 压缩后图片下载
- 响应式设计，支持移动端

## 技术栈
- 前端：React、Ant Design、Vite、现代CSS（苹果风格）
- 后端：FastAPI（Python）、Pillow（图片处理）
- 通信：RESTful API，支持CORS
- 部署：Render平台

## 目录结构
```
图片压缩工具2.0/
├── backend/         # FastAPI后端
│   ├── main.py      # 主应用文件
│   └── requirements.txt
├── frontend/        # React前端
│   ├── src/
│   │   ├── App.jsx  # 主组件
│   │   ├── App.css  # 样式文件
│   │   └── main.jsx # 入口文件
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── render.yaml      # Render部署配置
├── DEPLOYMENT.md    # 部署指南
└── README.md
```

## 快速开始

### 本地开发
```bash
# 克隆项目
git clone <your-repo-url>
cd image-compressor-pro

# 启动后端
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# 启动前端（新终端）
cd frontend
npm install
npm run dev
```

### 在线体验
- 前端地址：[https://image-compressor-frontend.onrender.com](https://image-compressor-frontend.onrender.com)
- 后端API：[https://image-compressor-api.onrender.com](https://image-compressor-api.onrender.com)

## API接口

### 压缩图片
- **POST** `/compress`
- **参数**：
  - `file`: 图片文件（multipart/form-data）
  - `ratio`: 压缩比例（10-100，默认80）
- **返回**：
  ```json
  {
    "image": "base64编码的图片数据",
    "size": 压缩后文件大小,
    "original_size": 原文件大小,
    "compression_ratio": 压缩比例
  }
  ```

### 健康检查
- **GET** `/health`
- **返回**：`{"status": "healthy", "service": "image-compressor-api"}`

## 部署

本项目支持一键部署到Render平台，详细部署指南请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)。

### 部署方式
1. **使用render.yaml（推荐）**：自动创建前后端服务
2. **手动创建**：分别创建Web Service和Static Site

## 开发计划
- [x] 初始化前后端项目结构
- [x] 实现后端图片压缩API
- [x] 实现前端页面与交互
- [x] UI美化与细节优化
- [x] 部署配置与文档
- [ ] 添加更多图片格式支持
- [ ] 批量压缩功能
- [ ] 压缩历史记录
- [ ] 用户认证系统

## 更新记录

### 2024-12-19
- 完成Render平台部署配置
- 添加render.yaml自动部署文件
- 更新前端代码支持生产环境API
- 创建详细部署指南文档
- 优化错误处理和用户体验
- 添加压缩率显示功能

### 2024-05-21
- 项目初始化，梳理功能需求与技术选型
- 创建README.md 