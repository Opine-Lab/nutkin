<template>
  <section id="community" class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 scroll-animate">
        <h2 class="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
          {{ $t('community.title') }}
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          {{ $t('community.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <!-- Discord -->
        <UiCard 
          class="p-6 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer scroll-animate scroll-animate-delay-1" 
          variant="dark"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white font-heading mb-2">Discord</h3>
          <p class="text-sm text-slate-400 mb-3">{{ $t('community.discord') }}</p>
          <div class="text-2xl font-bold text-indigo-400 font-heading">12.5K+</div>
          <div class="text-xs text-slate-500 mt-1">{{ $t('community.members') }}</div>
        </UiCard>

        <!-- Twitter -->
        <UiCard 
          class="p-6 text-center hover:border-blue-500/50 transition-all duration-300 cursor-pointer scroll-animate scroll-animate-delay-2" 
          variant="dark"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white font-heading mb-2">Twitter</h3>
          <p class="text-sm text-slate-400 mb-3">{{ $t('community.twitter') }}</p>
          <div class="text-2xl font-bold text-blue-400 font-heading">28.3K+</div>
          <div class="text-xs text-slate-500 mt-1">{{ $t('community.followers') }}</div>
        </UiCard>

        <!-- Telegram -->
        <UiCard 
          class="p-6 text-center hover:border-cyan-500/50 transition-all duration-300 cursor-pointer scroll-animate scroll-animate-delay-3" 
          variant="dark"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white font-heading mb-2">Telegram</h3>
          <p class="text-sm text-slate-400 mb-3">{{ $t('community.telegram') }}</p>
          <div class="text-2xl font-bold text-cyan-400 font-heading">15.8K+</div>
          <div class="text-xs text-slate-500 mt-1">{{ $t('community.members') }}</div>
        </UiCard>

        <!-- GitHub -->
        <UiCard 
          class="p-6 text-center hover:border-gray-500/50 transition-all duration-300 cursor-pointer scroll-animate scroll-animate-delay-4" 
          variant="dark"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white font-heading mb-2">GitHub</h3>
          <p class="text-sm text-slate-400 mb-3">{{ $t('community.github') }}</p>
          <div class="text-2xl font-bold text-gray-400 font-heading">3.2K+</div>
          <div class="text-xs text-slate-500 mt-1">{{ $t('community.stars') }}</div>
        </UiCard>
      </div>

      <!-- Community Highlights -->
      <div class="grid md:grid-cols-3 gap-6">
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
