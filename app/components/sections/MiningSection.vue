<template>
  <section id="mining" class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Title -->
      <div class="text-center mb-12 scroll-animate">
        <h2 class="text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
          {{ $t('mining.sectionTitle') }}
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          {{ $t('mining.sectionSubtitle') }}
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-8 mb-12">
        <!-- Left: Mining Overview -->
        <UiCard class="p-8 scroll-animate scroll-animate-left" variant="dark">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/50">
              <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white font-heading mb-2">{{ $t('mining.overviewTitle') }}</h3>
              <p class="text-amber-400 text-sm font-medium">{{ $t('mining.overviewBadge') }}</p>
            </div>
          </div>

          <p class="text-slate-300 mb-6 leading-relaxed">
            {{ $t('mining.overviewDesc') }}
          </p>

          <!-- Features List -->
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">{{ $t('mining.feature1Title') }}</h4>
                <p class="text-sm text-slate-400">{{ $t('mining.feature1Desc') }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">{{ $t('mining.feature2Title') }}</h4>
                <p class="text-sm text-slate-400">{{ $t('mining.feature2Desc') }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-semibold mb-1">{{ $t('mining.feature3Title') }}</h4>
                <p class="text-sm text-slate-400">{{ $t('mining.feature3Desc') }}</p>
              </div>
            </div>
          </div>
        </UiCard>

        <!-- Right: Mining Stats & CTA -->
        <div class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-2 gap-4 scroll-animate scroll-animate-right">
            <!-- Daily Output -->
            <UiCard class="p-6 hover:border-amber-500/50 transition-all duration-300" variant="dark">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text mb-1">
                    547.92K
                  </div>
                  <div class="text-xs text-slate-400 uppercase tracking-wider">{{ $t('mining.dailyOutput') }}</div>
                </div>
              </div>
            </UiCard>

            <!-- Total Supply -->
            <UiCard class="p-6 hover:border-blue-500/50 transition-all duration-300" variant="dark">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text mb-1">
                    200M
                  </div>
                  <div class="text-xs text-slate-400 uppercase tracking-wider">{{ $t('mining.totalSupply') }}</div>
                </div>
              </div>
            </UiCard>

            <!-- Weekly Rewards -->
            <UiCard class="p-6 hover:border-purple-500/50 transition-all duration-300" variant="dark">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-1">
                    3.85M
                  </div>
                  <div class="text-xs text-slate-400 uppercase tracking-wider">{{ $t('mining.weeklyRewards') }}</div>
                </div>
              </div>
            </UiCard>

            <!-- Duration -->
            <UiCard class="p-6 hover:border-green-500/50 transition-all duration-300" variant="dark">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text mb-1">
                    365
                  </div>
                  <div class="text-xs text-slate-400 uppercase tracking-wider">{{ $t('mining.duration') }}</div>
                </div>
              </div>
            </UiCard>
          </div>

          <!-- How It Works -->
          <UiCard class="p-8 scroll-animate scroll-animate-delay-1" variant="darker">
            <h3 class="text-xl font-bold text-white font-heading mb-6 flex items-center gap-2">
              <svg class="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {{ $t('mining.howItWorksTitle') }}
            </h3>

            <div class="space-y-4">
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400 font-bold text-sm">
                  1
                </div>
                <div class="flex-1">
                  <p class="text-slate-300">{{ $t('mining.step1') }}</p>
                </div>
              </div>

              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400 font-bold text-sm">
                  2
                </div>
                <div class="flex-1">
                  <p class="text-slate-300">{{ $t('mining.step2') }}</p>
                </div>
              </div>

              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400 font-bold text-sm">
                  3
                </div>
                <div class="flex-1">
                  <p class="text-slate-300">{{ $t('mining.step3') }}</p>
                </div>
              </div>
            </div>
          </UiCard>

          <!-- CTA Buttons -->
          <div class="scroll-animate scroll-animate-delay-2 flex flex-wrap gap-4">
            <a
              href="https://app.yuzo.xyz/mine/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex-1 min-w-[240px] py-6 px-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transform text-center relative overflow-hidden"
            >
              <!-- Shimmer Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              <span class="relative z-10 flex items-center justify-center gap-2">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {{ $t('mining.startMining') }}
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>

            <a
              href="/mining-guide"
              class="group flex-1 min-w-[240px] py-6 px-8 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-center relative overflow-hidden"
            >
              <span class="relative z-10 flex items-center justify-center gap-2">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                查看教程
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <!-- Info Banner -->
      <UiCard class="p-6 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/40 scroll-animate" variant="dark">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <svg class="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="text-white font-semibold mb-2">{{ $t('mining.infoTitle') }}</h4>
            <p class="text-slate-300 text-sm leading-relaxed">
              {{ $t('mining.infoDesc') }}
            </p>
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
