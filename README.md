# llm-learning

一个面向有编程基础开发者的开源教程仓库，主题覆盖：

- AI 应用开发
- 大模型原理与算法
- 微调、算法复现与工程实践

这个项目希望通过“文档 + 代码”的方式，把学习过程沉淀成可复用的教程内容。

## 仓库结构

- `docs/`：教程文档与静态站点内容
- `projects/`：代码示例、实验与项目实践
- `specs/`：内部规划与需求记录

## 学习路径

### 第一阶段：AI 应用开发

先学习怎样把大模型真正接入应用，包括提示词、RAG、Agent 和项目实践。

### 第二阶段：大模型原理与算法

再学习模型背后的关键原理、训练与微调方式，以及一些可落地的复现实践。

## 本地运行文档站点

```bash
npm install
npm run docs:dev
```

## 构建文档站点

```bash
npm run docs:build
npm run docs:preview
```

## 部署

文档站点通过 GitHub Actions 自动部署到 GitHub Pages。
