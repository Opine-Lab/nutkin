<template>
  <div class="flex flex-col md:flex-row gap-3 md:gap-2 items-start md:items-center">
    <!-- 左侧：Token 图标和名称（横向布局） -->
    <div class="flex items-center gap-2 md:gap-3 flex-shrink-0">
      <!-- 图标 -->
      <div 
        class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gradient-to-br flex items-center justify-center"
        :class="token.gradient"
      >
        <img 
          v-if="token.imageUrl" 
          :src="token.imageUrl" 
          :alt="token.symbol"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
        <span v-else class="text-white font-bold text-sm lg:text-base">
          {{ token.symbol.slice(0, 2) }}
        </span>
      </div>
      <!-- 名称 -->
      <div class="text-lg lg:text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
        {{ token.symbol }}
      </div>
    </div>
    
    <!-- 右侧：数据指标 -->
    <div class="w-full md:flex-1 md:min-w-0 flex justify-start md:justify-end">
      <!-- 移动端：网格布局（4列2行） -->
      <div class="grid grid-cols-4 gap-2 lg:hidden w-full">
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.change24h') }}</div>
          <div 
            :class="[
              'text-sm font-medium',
              token.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
            ]"
          >
            {{ token.change24h >= 0 ? '+' : '' }}{{ token.change24h }}%
          </div>
        </div>
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.price') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.price }}</div>
        </div>
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.volume24h') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.volume24h }}</div>
        </div>
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.apr') }}</div>
          <div class="text-sm font-medium text-slate-300">
            {{ token.apr ? token.apr.toFixed(2) + '%' : '-' }}
          </div>
        </div>
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.tvl') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ formatTvl(token.tvl) }}</div>
        </div>
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.marketCap') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.marketCap }}</div>
        </div>
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.volume7d') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.volume7d }}</div>
        </div>
        <div class="text-left">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.holders') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.holders }}</div>
        </div>
      </div>

      <!-- PC端：单行布局 -->
      <div class="hidden lg:inline-flex gap-4 lg:gap-6">
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.change24h') }}</div>
          <div 
            :class="[
              'text-sm font-medium',
              token.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
            ]"
          >
            {{ token.change24h >= 0 ? '+' : '' }}{{ token.change24h }}%
          </div>
        </div>
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.price') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.price }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.volume24h') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.volume24h }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.apr') }}</div>
          <div class="text-sm font-medium text-slate-300">
            {{ token.apr ? token.apr.toFixed(2) + '%' : '-' }}
          </div>
        </div>
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.tvl') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ formatTvl(token.tvl) }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.marketCap') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.marketCap }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.volume7d') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.volume7d }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-slate-500 mb-0.5">{{ $t('analytics.holders') }}</div>
          <div class="text-sm font-medium text-slate-300">{{ token.holders }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormattedToken } from '~/stores/brc20'

interface Props {
  token: FormattedToken
}

defineProps<Props>()

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

const formatTvl = (tvl: number) => {
  return `${tvl} BTC`
}
</script>
