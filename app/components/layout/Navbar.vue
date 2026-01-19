<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="scrolled ? 'py-0' : 'py-4'">
    <nav class="max-w-7xl mx-auto px-4">
      <UiCard 
        class="px-6 transition-all duration-300" 
        :class="[
          scrolled ? 'py-3 bg-slate-900/98 backdrop-blur-2xl shadow-2xl border-amber-500/30' : 'py-4 bg-white/10',
        ]"
        :hover="false"
        variant="darker"
      >
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a 
            href="#hero" 
            class="flex items-center gap-3 cursor-pointer"
            @click.prevent="scrollToTop"
          >
            <img src="/assets/img/logo.png" alt="Nutkin Logo" class="w-10 h-10 hover:scale-110 transition-transform" />
            <div class="flex flex-col">
              <span class="text-xl font-bold text-amber-400 font-heading">
                Nutkin
              </span>
              <span class="text-xs text-slate-400 ">
                BRC2.0 
              </span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              class="relative text-slate-300 hover:text-amber-400 transition-all duration-300 text-sm font-medium cursor-pointer group"
            >
              {{ $t(item.key) }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Language Toggle -->
            <button
              type="button"
              @click.stop="toggleLanguage"
              class="p-2 rounded-lg hover:bg-amber-500/20 transition-all duration-200 cursor-pointer group relative"
              :aria-label="locale === 'zh' ? 'Switch to English' : '切换到中文'"
            >
              <svg class="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {{ locale === 'zh' ? 'EN' : '中文' }}
              </span>
            </button>
            
            <UiButton 
              size="sm" 
               
              class="hidden sm:inline-flex transition-all duration-200"
              @click="openTradePage"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {{ $t('nav.tradeNow') }}
            </UiButton>

            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg hover:bg-amber-500/20 transition-all duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div
          v-if="mobileMenuOpen"
          class="md:hidden mt-4 pt-4 border-t border-amber-500/20 flex flex-col gap-3 animate-fade-in"
        >
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200 text-sm font-medium cursor-pointer py-2 px-3 rounded-lg"
            @click="mobileMenuOpen = false"
          >
            {{ $t(item.key) }}
          </a>
          
          <!-- Mobile Language Toggle -->
          <button
            type="button"
            @click.stop="toggleLanguage"
            class="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200 rounded-lg cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span class="text-sm font-medium">
              {{ locale === 'zh' ? 'Switch to English' : '切换到中文' }}
            </span>
          </button>
          
            <UiButton size="sm" variant="outline" class="w-full mt-2" @click="openTradePage">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {{ $t('nav.tradeNow') }}
            </UiButton>
        </div>
      </UiCard>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

const emit = defineEmits<{
  'language-switching': [boolean]
}>()

const navItems = [
  { name: 'Market', key: 'nav.market', href: '#market' },
  { name: 'Community', key: 'nav.community', href: '#community' },
  { name: 'Trust Score', key: 'nav.trustScore', href: '#trust' },
]

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('')

const toggleLanguage = async (event?: Event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  // 触发切换动画
  emit('language-switching', true)
  
  // 等待一下，让动画显示
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // 切换语言
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  setLocale(newLocale)
  
  // 动画结束由 app.vue 处理
}

const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const openTradePage = () => {
  if (import.meta.client) {
    window.open('https://bestinslot.xyz/brc2.0/nutkin', '_blank')
  }
}

// 监听滚动事件
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  
  // 更新 active section 和 URL hash
  const sections = ['hero', 'market', 'analytics', 'community', 'trust']
  const scrollPosition = window.scrollY + 100 // 偏移量，提前触发
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetBottom = offsetTop + element.offsetHeight
      
      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        activeSection.value = sectionId
        // 更新 URL hash，但不触发滚动
        if (window.location.hash !== `#${sectionId}`) {
          history.replaceState(null, '', `#${sectionId}`)
        }
        break
      }
    }
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>
