<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl lg:text-6xl font-bold mb-4 text-white font-heading">
            {{ $t('tutorial.title') }}
          </h1>
          <p class="text-lg text-slate-300 max-w-2xl mx-auto">
            {{ $t('tutorial.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Tutorial Content -->
    <section class="pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Quick Start Guide -->
        <UiCard class="p-8 mb-8" variant="darker">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white">{{ $t('tutorial.quickStart') }}</h2>
          </div>
          
          <div class="grid lg:grid-cols-3 gap-6">
            <UiCard class="p-6 cursor-pointer hover:border-amber-500/50 transition-all duration-300" variant="dark">
              <div class="text-center">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl font-bold text-blue-400">1</span>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">{{ $t('tutorial.step1Title') }}</h3>
                <p class="text-sm text-slate-400">{{ $t('tutorial.step1Desc') }}</p>
              </div>
            </UiCard>

            <UiCard class="p-6 cursor-pointer hover:border-amber-500/50 transition-all duration-300" variant="dark">
              <div class="text-center">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl font-bold text-purple-400">2</span>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">{{ $t('tutorial.step2Title') }}</h3>
                <p class="text-sm text-slate-400">{{ $t('tutorial.step2Desc') }}</p>
              </div>
            </UiCard>

            <UiCard class="p-6 cursor-pointer hover:border-amber-500/50 transition-all duration-300" variant="dark">
              <div class="text-center">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl font-bold text-green-400">3</span>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">{{ $t('tutorial.step3Title') }}</h3>
                <p class="text-sm text-slate-400">{{ $t('tutorial.step3Desc') }}</p>
              </div>
            </UiCard>
          </div>
        </UiCard>

        <!-- Detailed Tutorials -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Wallet Connection -->
          <UiCard class="p-8" variant="darker">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 class="text-xl font-bold text-white">{{ $t('tutorial.walletTitle') }}</h3>
            </div>

            <div class="space-y-4">
              <div v-for="(step, index) in walletSteps" :key="index" class="flex gap-4">
                <div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400 font-semibold text-sm mt-1">
                  {{ index + 1 }}
                </div>
                <div>
                  <h4 class="text-white font-medium mb-1">{{ $t(`tutorial.wallet.step${index + 1}Title`) }}</h4>
                  <p class="text-sm text-slate-400">{{ $t(`tutorial.wallet.step${index + 1}Desc`) }}</p>
                </div>
              </div>
            </div>
          </UiCard>

          <!-- Trading Tutorial -->
          <UiCard class="p-8" variant="darker">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <h3 class="text-xl font-bold text-white">{{ $t('tutorial.tradingTitle') }}</h3>
            </div>

            <div class="space-y-4">
              <div v-for="(step, index) in tradingSteps" :key="index" class="flex gap-4">
                <div class="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 font-semibold text-sm mt-1">
                  {{ index + 1 }}
                </div>
                <div>
                  <h4 class="text-white font-medium mb-1">{{ $t(`tutorial.trading.step${index + 1}Title`) }}</h4>
                  <p class="text-sm text-slate-400">{{ $t(`tutorial.trading.step${index + 1}Desc`) }}</p>
                </div>
              </div>
            </div>
          </UiCard>

          <!-- Mining Tutorial -->
          <UiCard class="p-8" variant="darker">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <h3 class="text-xl font-bold text-white">{{ $t('tutorial.miningTitle') }}</h3>
            </div>

            <div class="space-y-4">
              <div v-for="(step, index) in miningSteps" :key="index" class="flex gap-4">
                <div class="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400 font-semibold text-sm mt-1">
                  {{ index + 1 }}
                </div>
                <div>
                  <h4 class="text-white font-medium mb-1">{{ $t(`tutorial.mining.step${index + 1}Title`) }}</h4>
                  <p class="text-sm text-slate-400">{{ $t(`tutorial.mining.step${index + 1}Desc`) }}</p>
                </div>
              </div>
            </div>
          </UiCard>

          <!-- Security Tips -->
          <UiCard class="p-8" variant="darker">
            <div class="flex items-center gap-3 mb-6">
              <svg class="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 class="text-xl font-bold text-white">{{ $t('tutorial.securityTitle') }}</h3>
            </div>

            <div class="space-y-4">
              <div v-for="(tip, index) in securityTips" :key="index" class="flex gap-4">
                <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 class="text-white font-medium mb-1">{{ $t(`tutorial.security.tip${index + 1}Title`) }}</h4>
                  <p class="text-sm text-slate-400">{{ $t(`tutorial.security.tip${index + 1}Desc`) }}</p>
                </div>
              </div>
            </div>
          </UiCard>
        </div>

        <!-- FAQ Section -->
        <UiCard class="p-8 mt-8" variant="darker">
          <h2 class="text-2xl font-bold text-white mb-6">{{ $t('tutorial.faqTitle') }}</h2>
          
          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="border-b border-slate-700 pb-4 last:border-0">
              <h4 class="text-white font-medium mb-2 flex items-start gap-2">
                <span class="text-amber-400 flex-shrink-0">Q:</span>
                <span>{{ $t(`tutorial.faq.q${index + 1}`) }}</span>
              </h4>
              <p class="text-sm text-slate-400 ml-6">
                <span class="text-green-400 mr-2">A:</span>{{ $t(`tutorial.faq.a${index + 1}`) }}
              </p>
            </div>
          </div>
        </UiCard>

        <!-- Help Section -->
        <UiCard class="p-8 mt-8 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/40" variant="dark">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div class="flex items-start gap-4">
              <svg class="w-8 h-8 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 class="text-xl font-bold text-white mb-2">{{ $t('tutorial.needHelp') }}</h3>
                <p class="text-slate-300">{{ $t('tutorial.needHelpDesc') }}</p>
              </div>
            </div>
            <a 
              href="/#community"
              class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 cursor-pointer whitespace-nowrap"
            >
              {{ $t('tutorial.joinCommunity') }}
            </a>
          </div>
        </UiCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Tutorial step counts
const walletSteps = ref([1, 2, 3, 4])
const tradingSteps = ref([1, 2, 3, 4])
const miningSteps = ref([1, 2, 3, 4])
const securityTips = ref([1, 2, 3, 4])
const faqs = ref([1, 2, 3, 4, 5])
</script>
