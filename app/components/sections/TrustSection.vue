<template>
  <section id="platform" class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 scroll-animate">
        <h2 class="text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
          {{ $t('platform.title') }}
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          {{ $t('platform.subtitle') }}
        </p>
      </div>

      <!-- 主要特性卡片 -->
      <div class="grid lg:grid-cols-3 gap-6 mb-6">
        <!-- DEX 交易 -->
        <UiCard class="p-6 text-center scroll-animate scroll-animate-delay-1" variant="darker">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-4">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white font-heading mb-2">{{ $t('platform.dexTitle') }}</h3>
          <p class="text-sm text-slate-400">{{ $t('platform.dexDesc') }}</p>
        </UiCard>

        <!-- 流动性池 -->
        <UiCard class="p-6 text-center scroll-animate scroll-animate-delay-2" variant="darker">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 mb-4">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white font-heading mb-2">{{ $t('platform.liquidityTitle') }}</h3>
          <p class="text-sm text-slate-400">{{ $t('platform.liquidityDesc') }}</p>
        </UiCard>

        <!-- BRC-20 生态 -->
        <UiCard class="p-6 text-center scroll-animate scroll-animate-delay-3" variant="darker">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white font-heading mb-2">{{ $t('platform.brc20Title') }}</h3>
          <p class="text-sm text-slate-400">{{ $t('platform.brc20Desc') }}</p>
        </UiCard>
      </div>

      <!-- 平台介绍卡片 -->
      <UiCard class="p-8 scroll-animate scroll-animate-delay-4" variant="dark" :hover="false">
        <div class="grid md:grid-cols-1 gap-8">
          <div>
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-2xl font-bold text-white font-heading">{{ $t('platform.aboutTitle') }}</h3>
              <div class="flex gap-3">
                <!-- 24/7 标签 -->
                <div class="inline-flex flex-col items-center px-4 py-2 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-lg backdrop-blur-sm">
                  <div class="text-xl font-bold text-amber-400">24/7</div>
                  <div class="text-xs text-slate-300 whitespace-nowrap">{{ $t('platform.feature247') }}</div>
                </div>
                <!-- 100% 标签 -->
                <div class="inline-flex flex-col items-center px-4 py-2 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-lg backdrop-blur-sm">
                  <div class="text-xl font-bold text-emerald-400">100%</div>
                  <div class="text-xs text-slate-300 whitespace-nowrap">{{ $t('platform.featureDecentralized') }}</div>
                </div>
              </div>
            </div>
            <div class="space-y-4 text-slate-300">
              <p>{{ $t('platform.aboutDesc1') }}</p>
              <p>{{ $t('platform.aboutDesc2') }}</p>
              <p>{{ $t('platform.aboutDesc3') }}</p>
            </div>
            <div class="flex flex-wrap gap-4 mt-6">
              <a
                href="https://bestinslot.xyz"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all"
              >
                <span>{{ $t('platform.visitWebsite') }}</span>
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="https://x.com/bestinslotxyz"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-medium rounded-lg transition-all"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span>{{ $t('platform.featureTwitter') }}</span>
              </a>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollAnimation()

onMounted(() => {
  observeAll('.scroll-animate')
})
</script>
