# 图片压缩工具2.0

## 项目简介
本项目是一个支持PNG、JPG等格式图片上传与压缩的网页应用，用户可自定义压缩比例，在线预览压缩效果，并下载压缩后的图片。界面采用苹果风格设计，简洁美观，兼容桌面和移动端。

## 功能模块
- 图片上传（支持PNG、JPG）
- 压缩比例自定义
- 原图与压缩图预览
- 文件大小对比展示
- 压缩后图片下载

## 技术栈
- 前端：React、Ant Design、Axios、现代CSS（苹果风格）
- 后端：FastAPI（Python）、Pillow（图片处理）
- 通信：RESTful API，支持CORS

## 目录结构规划
```
图片压缩工具2.0/
├── backend/         # FastAPI后端
│   ├── main.py
│   └── requirements.txt
├── frontend/        # React前端
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## 开发计划
1. 初始化前后端项目结构
2. 实现后端图片压缩API
3. 实现前端页面与交互
4. UI美化与细节优化
5. 部署与测试

## 更新记录
- 2024-05-21 项目初始化，梳理功能需求与技术选型，创建README.md 