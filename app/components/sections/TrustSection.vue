<template>
  <section id="trust" class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 scroll-animate">
        <h2 class="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
          {{ $t('trust.title') }}
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          {{ $t('trust.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <!-- Platform Trust Score -->
        <UiCard class="p-6 text-center scroll-animate scroll-animate-delay-1" variant="darker">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-4">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div class="text-4xl font-bold text-white font-heading mb-2">98.5%</div>
          <div class="text-sm text-slate-400 mb-4">{{ $t('trust.platformTrustScore') }}</div>
          <div class="flex items-center justify-center gap-1">
            <div v-for="i in 5" :key="i" class="w-3 h-3 rounded-full" :class="i <= 5 ? 'bg-emerald-500' : 'bg-slate-700'" />
          </div>
        </UiCard>

        <!-- Security Audits -->
        <UiCard class="p-6 text-center scroll-animate scroll-animate-delay-2" variant="darker">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 mb-4">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div class="text-4xl font-bold text-white font-heading mb-2">12</div>
          <div class="text-sm text-slate-400 mb-4">{{ $t('trust.securityAuditsPassed') }}</div>
          <div class="text-xs text-violet-400 font-medium">{{ $t('trust.lastAudit') }}: 2 {{ $t('trust.daysAgo') }}</div>
        </UiCard>

        <!-- Active Validators -->
        <UiCard class="p-6 text-center scroll-animate scroll-animate-delay-3" variant="darker">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="text-4xl font-bold text-white font-heading mb-2">1,247</div>
          <div class="text-sm text-slate-400 mb-4">{{ $t('trust.activeValidators') }}</div>
          <div class="flex items-center justify-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span class="text-xs text-emerald-400">{{ $t('trust.allSystemsOperational') }}</span>
          </div>
        </UiCard>
      </div>

      <!-- Trust Indicators -->
      <UiCard class="mt-6 p-6 scroll-animate scroll-animate-delay-4" variant="dark">
        <h3 class="text-lg font-semibold text-white font-heading mb-4">{{ $t('trust.trustIndicators') }}</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">{{ $t('trust.smartContractVerification') }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style="width: 100%"></div>
                </div>
                <span class="text-xs font-medium text-emerald-400">100%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">{{ $t('trust.liquidityLock') }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style="width: 95%"></div>
                </div>
                <span class="text-xs font-medium text-emerald-400">95%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">{{ $t('trust.teamTransparency') }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-amber-500 to-orange-500" style="width: 88%"></div>
                </div>
                <span class="text-xs font-medium text-amber-400">88%</span>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">{{ $t('trust.communityTrust') }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-violet-500 to-purple-500" style="width: 92%"></div>
                </div>
                <span class="text-xs font-medium text-violet-400">92%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">{{ $t('trust.codeQuality') }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style="width: 97%"></div>
                </div>
                <span class="text-xs font-medium text-emerald-400">97%</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-400">{{ $t('trust.historicalPerformance') }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-amber-500 to-orange-500" style="width: 90%"></div>
                </div>
                <span class="text-xs font-medium text-amber-400">90%</span>
              </div>
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
