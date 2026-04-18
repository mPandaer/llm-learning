import { readdirSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const DOCS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORDER_PREFIX_REGEX = /^(\d{3})-/

type AutoSidebarTarget = {
  routeBase: string
  dirName: string
  sectionText: string
}

const AUTO_SIDEBAR_TARGETS: AutoSidebarTarget[] = [
  {
    routeBase: '/第一阶段：AI 应用开发/',
    dirName: '第一阶段：AI 应用开发',
    sectionText: '第一阶段：AI 应用开发'
  },
  {
    routeBase: '/第二阶段：大模型原理与算法/',
    dirName: '第二阶段：大模型原理与算法',
    sectionText: '第二阶段：大模型原理与算法'
  },
  {
    routeBase: '/项目实践/',
    dirName: '项目实践',
    sectionText: '项目实践'
  }
]

const INDEX_TEXT_MAP: Record<string, string> = {
  '/第一阶段：AI 应用开发/': '阶段导读',
  '/第二阶段：大模型原理与算法/': '阶段导读',
  '/项目实践/': '项目总览'
}

function parseOrderPrefix(fileName: string): number | null {
  const match = fileName.match(ORDER_PREFIX_REGEX)
  return match ? Number(match[1]) : null
}

function stripMdExtension(fileName: string): string {
  return fileName.replace(/\.md$/, '')
}

function stripOrderPrefix(nameWithoutExt: string): string {
  return nameWithoutExt.replace(ORDER_PREFIX_REGEX, '')
}

function compareNames(a: string, b: string): number {
  return stripMdExtension(a).localeCompare(stripMdExtension(b), 'zh-CN', {
    numeric: true,
    sensitivity: 'base'
  })
}

function readMarkdownFilesInDir(absDir: string): string[] {
  return readdirSync(absDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name) === '.md')
    .map((entry) => entry.name)
}

function sortMarkdownFiles(fileNames: string[]): string[] {
  return [...fileNames].sort((a, b) => {
    if (a === 'index.md') return -1
    if (b === 'index.md') return 1

    const aPrefix = parseOrderPrefix(a)
    const bPrefix = parseOrderPrefix(b)

    if (aPrefix !== null && bPrefix !== null) {
      return aPrefix - bPrefix || compareNames(a, b)
    }

    if (aPrefix !== null) return -1
    if (bPrefix !== null) return 1

    return compareNames(a, b)
  })
}

function toSidebarItem(routeBase: string, fileName: string): DefaultTheme.SidebarItem {
  if (fileName === 'index.md') {
    return {
      text: INDEX_TEXT_MAP[routeBase],
      link: routeBase
    }
  }

  const nameWithoutExt = stripMdExtension(fileName)

  return {
    text: stripOrderPrefix(nameWithoutExt),
    link: `${routeBase}${nameWithoutExt}`
  }
}

function buildSidebarSection(target: AutoSidebarTarget): DefaultTheme.SidebarItem[] {
  const absDir = join(DOCS_ROOT, target.dirName)
  const fileNames = readMarkdownFilesInDir(absDir)

  if (!fileNames.includes('index.md')) {
    throw new Error(`Missing index.md in ${target.dirName}`)
  }

  return [
    {
      text: target.sectionText,
      items: sortMarkdownFiles(fileNames).map((fileName) =>
        toSidebarItem(target.routeBase, fileName)
      )
    }
  ]
}

function buildAutoSidebarMap(): DefaultTheme.SidebarMulti {
  const sidebar: DefaultTheme.SidebarMulti = {}

  for (const target of AUTO_SIDEBAR_TARGETS) {
    sidebar[target.routeBase] = buildSidebarSection(target)
  }

  return sidebar
}

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
    sidebar: buildAutoSidebarMap(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mPandaer/llm-learning' }
    ],
    footer: {
      message: '以输出倒逼输入，用教程沉淀学习。',
      copyright: 'Copyright © 2026 mPandaer'
    }
  }
})
