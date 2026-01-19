<template>
  <UiCard class="p-6" variant="darker">
    <h3 class="text-lg font-semibold text-white font-heading mb-4">{{ $t('platform.networkStatus') }}</h3>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">{{ $t('platform.blockHeight') }}</span>
        <span class="text-sm font-medium text-white font-mono">8,234,567</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">{{ $t('platform.gasPrice') }}</span>
        <span class="text-sm font-medium text-emerald-400 font-mono">12 Gwei</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-slate-400">{{ $t('platform.tps') }}</span>
        <span class="text-sm font-medium text-amber-400 font-mono">2,341/s</span>
      </div>
      <div class="pt-3 border-t border-white/10">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-xs text-emerald-400">{{ $t('platform.allSystemsOperational') }}</span>
        </div>
      </div>
    </div>
  </UiCard>
</template>
