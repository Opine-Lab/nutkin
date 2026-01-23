<template>
  <section id="hero" class="py-20 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <div class="flex justify-center mb-8 scroll-animate scroll-animate-scale">
        <img 
          src="/logo.png" 
          alt="Nutkin Logo" 
          class="w-32 h-32 hover:scale-110 transition-transform"
        />
      </div>
      
      <h1 class="text-5xl lg:text-7xl font-bold text-white font-heading mb-6 leading-tight scroll-animate scroll-animate-delay-1">
        {{ $t('hero.title') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Nutkin</span>
      </h1>
      
      <p class="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed scroll-animate scroll-animate-delay-2">
        {{ $t('hero.subtitle') }}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 mb-12 scroll-animate scroll-animate-delay-3">
        <UiButton size="lg" @click="openTradePage">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {{ $t('hero.getStarted') }}
        </UiButton>
        <UiButton size="lg" variant="outline" @click="scrollToAnalytics">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {{ $t('hero.viewAnalytics') }}
        </UiButton>
      </div>

      <!-- Stats Bar -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto scroll-animate scroll-animate-delay-4">
        <UiCard class="p-4 text-center" :hover="false" variant="dark">
          <div v-if="brc20Store.loading && brc20Store.isInitialLoad" class="animate-pulse">
            <div class="h-8 w-24 bg-slate-700 rounded mx-auto mb-2"></div>
            <div class="h-4 w-16 bg-slate-700 rounded mx-auto"></div>
          </div>
          <template v-else>
            <div class="text-2xl font-bold text-amber-400 font-heading">{{ formatNumber(Number(token.marketCap), { maximumFractionDigits: 4 }) }} BTC</div>
            <div class="text-xs text-slate-400 mt-1">{{ $t('hero.stats.totalVolume') }}</div>
          </template>
        </UiCard>
        <UiCard class="p-4 text-center" :hover="false" variant="dark">
          <div v-if="brc20Store.loading && brc20Store.isInitialLoad" class="animate-pulse">
            <div class="h-8 w-24 bg-slate-700 rounded mx-auto mb-2"></div>
            <div class="h-4 w-16 bg-slate-700 rounded mx-auto"></div>
          </div>
          <template v-else>
            <div class="text-2xl font-bold text-violet-400 font-heading">{{ token.holders}}</div>
            <div class="text-xs text-slate-400 mt-1">{{ $t('hero.stats.activeUsers') }}</div>
          </template>
        </UiCard>
        <UiCard class="p-4 text-center" :hover="false" variant="dark">
          <div v-if="brc20Store.loading && brc20Store.isInitialLoad" class="animate-pulse">
            <div class="h-8 w-24 bg-slate-700 rounded mx-auto mb-2"></div>
            <div class="h-4 w-16 bg-slate-700 rounded mx-auto"></div>
          </div>
          <template v-else>
            <div class="text-2xl font-bold text-emerald-400 font-heading">{{ token.price }}</div>
            <div class="text-xs text-slate-400 mt-1">{{ $t('hero.stats.price') }}</div>
          </template>
        </UiCard>
        <UiCard class="p-4 text-center" :hover="false" variant="dark">
          <div v-if="brc20Store.loading && brc20Store.isInitialLoad" class="animate-pulse">
            <div class="h-8 w-24 bg-slate-700 rounded mx-auto mb-2"></div>
            <div class="h-4 w-16 bg-slate-700 rounded mx-auto"></div>
          </div>
          <template v-else>
            <div class="text-2xl font-bold text-orange-400 font-heading">{{ formatNumber(Number(token.tvl), { maximumFractionDigits: 4 }) }} BTC</div>
            <div class="text-xs text-slate-400 mt-1">{{ $t('hero.stats.tvl') }}</div>
          </template>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollAnimation()
import { computed } from 'vue'

const brc20Store = useBRC20Store()

// 使用 computed 确保响应式，并提供默认值
const token = computed(() => brc20Store.tokens[0] || {
  key: '',
  name: '',
  nameZh: '',
  symbol: '',
  imageUrl: '',
  price: '0',
  change24h: 0,
  allVolume: '0',
  volume24h: '0',
  marketCap: '0',
  holders: '0',
  trustScore: 0,
  tvl: 0,
  gradient: 'from-amber-500 to-orange-600'
})

const scrollToAnalytics = () => {
  if (import.meta.client) {
    const marketSection = document.getElementById('market')
    if (marketSection) {
      const navbarHeight = 80 // 导航栏高度
      const targetPosition = marketSection.offsetTop - navbarHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }
}

const openTradePage = () => {
  if (import.meta.client) {
    window.open('https://bestinslot.xyz/brc2.0/nutkin', '_blank')
  }
}

onMounted(() => {
  observeAll('.scroll-animate')
})
</script>
