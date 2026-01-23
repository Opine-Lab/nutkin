<template>
  <section id="community" class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 scroll-animate">
        <h2 class="text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
          {{ $t('community.title') }}
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          {{ $t('community.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        <!-- QQ群 -->
        <UiCard 
          class="p-6 text-center hover:border-indigo-500/50 transition-all duration-300 scroll-animate scroll-animate-delay-1" 
          variant="dark"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 1024 1024">
              <path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white font-heading mb-2">QQ群</h3>
          <p class="text-sm text-slate-400 mb-4">{{ $t('community.qq') }}</p>
          <a
            href="https://qm.qq.com/q/Zvwyr7b8ga"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all"
          >
            {{ $t('community.joinGroup') }}
          </a>
        </UiCard>

        <!-- Twitter -->
        <UiCard 
          class="p-6 text-center hover:border-blue-500/50 transition-all duration-300 scroll-animate scroll-animate-delay-2" 
          variant="dark"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white font-heading mb-2">Twitter</h3>
          <p class="text-sm text-slate-400 mb-4">{{ $t('community.twitter') }}</p>
          <a
            href="https://x.com/BRC_20oula"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all"
          >
            {{ $t('community.followTwitter') }}
          </a>
        </UiCard>

        <!-- Telegram -->
        <UiCard 
          class="p-6 text-center hover:border-cyan-500/50 transition-all duration-300 scroll-animate scroll-animate-delay-3" 
          variant="dark"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white font-heading mb-2">Telegram</h3>
          <p class="text-sm text-slate-400 mb-4">{{ $t('community.telegram') }}</p>
          <a
            href="https://t.me/ChineseNUTKIN"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block w-full py-2 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-sm font-medium rounded-lg transition-all"
          >
            {{ $t('community.joinChannel') }}
          </a>
        </UiCard>
      </div>

      <!-- Community Highlights -->
      <div class="grid lg:grid-cols-3 gap-6">
        <UiCard class="p-6 scroll-animate scroll-animate-left" variant="darker">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white font-heading mb-2">{{ $t('community.activeCommunity') }}</h3>
              <p class="text-sm text-slate-400">{{ $t('community.activeCommunityDesc') }}</p>
            </div>
          </div>
        </UiCard>

        <UiCard class="p-6 scroll-animate scroll-animate-delay-1" variant="darker">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white font-heading mb-2">{{ $t('community.openSource') }}</h3>
              <p class="text-sm text-slate-400">{{ $t('community.openSourceDesc') }}</p>
            </div>
          </div>
        </UiCard>

        <UiCard class="p-6 scroll-animate scroll-animate-right" variant="darker">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white font-heading mb-2">{{ $t('community.events') }}</h3>
              <p class="text-sm text-slate-400">{{ $t('community.eventsDesc') }}</p>
            </div>
          </div>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollAnimation()

onMounted(() => {
  observeAll('.scroll-animate')
})
</script>
