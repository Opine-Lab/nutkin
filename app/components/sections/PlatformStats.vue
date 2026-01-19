<template>
  <UiCard class="p-6" variant="darker">
    <h3 class="text-lg font-semibold text-white font-heading mb-4">{{ $t('platform.stats') }}</h3>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">{{ $t('platform.totalTokens') }}</span>
        <span class="text-lg font-bold text-white font-heading">1,247</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">{{ $t('platform.verifiedTokens') }}</span>
        <span class="text-lg font-bold text-emerald-400 font-heading">1,198</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">{{ $t('platform.newToday') }}</span>
        <span class="text-lg font-bold text-amber-400 font-heading">23</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">{{ $t('platform.audited') }}</span>
        <span class="text-lg font-bold text-violet-400 font-heading">856</span>
      </div>
    </div>
  </UiCard>
</template>
