import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'LLM Learning',
  description: '面向有编程基础开发者的 AI 应用开发与大模型原理开源教程。',
  base: '/llm-learning/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 应用开发', link: '/第一阶段：AI 应用开发/' },
      { text: '大模型原理与算法', link: '/第二阶段：大模型原理与算法/' },
      { text: '项目实践', link: '/项目实践/' },
      { text: '路线图', link: '/路线图' },
      { text: 'GitHub', link: 'https://github.com/mPandaer/llm-learning' }
    ],
    sidebar: {
      '/第一阶段：AI 应用开发/': [
        {
          text: '第一阶段：AI 应用开发',
          items: [
            { text: '阶段导读', link: '/第一阶段：AI 应用开发/' },
            { text: '环境准备', link: '/第一阶段：AI 应用开发/环境准备' },
            { text: 'LLM 基础认知', link: '/第一阶段：AI 应用开发/LLM 基础认知' },
            { text: 'Prompt Engineering', link: '/第一阶段：AI 应用开发/Prompt Engineering' },
            { text: 'RAG', link: '/第一阶段：AI 应用开发/RAG' },
            { text: 'Agent', link: '/第一阶段：AI 应用开发/Agent' }
          ]
        }
      ],
      '/第二阶段：大模型原理与算法/': [
        {
          text: '第二阶段：大模型原理与算法',
          items: [
            { text: '阶段导读', link: '/第二阶段：大模型原理与算法/' },
            { text: 'Tokenizer', link: '/第二阶段：大模型原理与算法/Tokenizer' },
            { text: 'Transformer', link: '/第二阶段：大模型原理与算法/Transformer' },
            { text: '预训练', link: '/第二阶段：大模型原理与算法/预训练' },
            { text: '微调', link: '/第二阶段：大模型原理与算法/微调' },
            { text: '推理与部署', link: '/第二阶段：大模型原理与算法/推理与部署' }
          ]
        }
      ],
      '/项目实践/': [
        {
          text: '项目实践',
          items: [
            { text: '项目总览', link: '/项目实践/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mPandaer/llm-learning' }
    ],
    footer: {
      message: '以输出倒逼输入，用教程沉淀学习。',
      copyright: 'Copyright © 2026 mPandaer'
    }
  }
})
