# Nutkin 平台组件结构

## 组件目录

```
app/components/
├── ui/                      # 基础 UI 组件
│   ├── Button.vue          # 按钮组件
│   ├── Card.vue            # 卡片容器（支持 glassmorphism）
│   └── SquirrelLogo.vue    # 松鼠 Logo（可配色）
│
├── layout/                  # 布局组件
│   └── Navbar.vue          # 顶部导航栏（含暗色模式切换）
│
├── market/                  # 市场数据组件
│   └── MarketWidget.vue    # 市场数据小工具（带图表）
│
├── analytics/               # 分析组件
│   └── BRC20Analytics.vue  # BRC2.0 代币分析面板
│
└── sections/                # 页面section组件
    └── TrustSection.vue    # 信任和安全仪表板
```

## Nuxt 组件自动导入规则

在 Nuxt 3+ 中，components 目录下的组件会自动导入。嵌套目录的组件使用时需要加上目录前缀：

### 使用示例

```vue
<!-- UI 组件 -->
<UiButton variant="primary" size="lg">点击</UiButton>
<UiCard variant="dark">内容</UiCard>
<UiSquirrelLogo variant="gold" />

<!-- 布局组件 -->
<LayoutNavbar />

<!-- 市场组件 -->
<MarketMarketWidget title="标题" :value="1000" />

<!-- 分析组件 -->
<AnalyticsBRC20Analytics />

<!-- Section 组件 -->
<SectionsTrustSection />
```

## 可复用组件列表

### 1. UiButton
**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'

**用法:**
```vue
<UiButton variant="primary" size="md">按钮文字</UiButton>
```

### 2. UiCard
**Props:**
- `glass`: boolean (默认 true, glassmorphism 效果)
- `hover`: boolean (默认 true, 悬停效果)
- `variant`: 'default' | 'dark' | 'darker'

**用法:**
```vue
<UiCard variant="dark" :hover="false">
  卡片内容
</UiCard>
```

### 3. UiSquirrelLogo
**Props:**
- `variant`: 'default' | 'gold' | 'purple'
- `showText`: boolean (显示 "N" 字母)

**用法:**
```vue
<UiSquirrelLogo variant="gold" class="w-16 h-16" />
```

### 4. MarketMarketWidget
**Props:**
- `title`: string (标题)
- `value`: string | number (数值)
- `subtitle`: string (副标题)
- `change`: number (变化百分比)
- `showChart`: boolean (默认 true)
- `icon`: 'chart' | 'trending' | 'users' | 'dollar'

**用法:**
```vue
<MarketMarketWidget
  title="总市值"
  :value="127000000"
  subtitle="USD"
  :change="5.67"
  icon="dollar"
/>
```

## 设计系统

### 配色方案
- **主色**: Amber (#F59E0B, #FBBF24)
- **次色**: Violet (#8B5CF6)
- **背景**: Slate-950 (#0F172A)
- **文本**: Slate-100 (#F8FAFC)
- **边框**: Slate-700 (#334155)

### 字体
- **标题**: Space Grotesk (font-heading)
- **正文**: DM Sans (font-body)

### 风格特点
- Glassmorphism (毛玻璃效果)
- 暗色模式优先
- 渐变色按钮和图标
- 流畅的过渡动画

## Composables

### useDarkMode
暗色模式管理

**用法:**
```vue
<script setup>
const { isDark, toggleDarkMode, initDarkMode } = useDarkMode()

onMounted(() => {
  initDarkMode()
})
</script>
```

## 依赖
- Nuxt 4.2.2
- @nuxtjs/tailwindcss 6.14.0
- @nuxt/image 2.0.0
- Vue 3.5.26
