<template>
  <div class="trade-list h-96 flex flex-col">
    <div class="flex items-center justify-between mb-3 flex-shrink-0">
      <h3 class="text-sm font-medium text-slate-300">{{ title }}</h3>
      <div class="flex items-center gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-2 py-1 text-xs rounded transition-all',
            activeTab === tab.value
              ? 'bg-amber-500/30 text-amber-400 font-medium'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
          ]"
        >
          {{ tab.label.value }}
        </button>
      </div>
    </div>

    <!-- 表头 -->
    <div class="grid grid-cols-4 gap-2 px-3 py-2 text-xs text-slate-400 border-b border-slate-700/50 flex-shrink-0">
      <div class="text-center">{{ t('trade.nutkin') }}</div>
      <div class="text-center">{{ t('trade.btc') }}</div>
      <div class="text-center">{{ t('trade.price') }}</div>
      <div class="text-center">{{ t('trade.time') }}</div>
    </div>

    <!-- 交易列表 -->
    <div class="trade-items overflow-y-auto flex-1">
      <div
        v-for="(trade, index) in filteredTrades"
        :key="index"
        class="grid grid-cols-4 gap-2 px-3 py-2 text-xs hover:bg-slate-800/30 transition-colors"
      >
        <div class="text-slate-300 text-center">
          {{ trade.nutkinAmount}}
        </div>
        <div class="text-slate-300 text-center">
          {{ trade.btcAmount }}
        </div>
        <div :class="trade.type === 'buy' ? 'text-green-400' : 'text-red-400'" class="text-center">
          {{ trade.price }}
        </div>
        <div class="text-slate-400 text-center">
          {{ formatTime(trade.timestamp) }}
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredTrades.length === 0" class="text-center py-8 text-slate-500 text-sm">
        {{ t('trade.noData') }}
      </div>
    </div>

    <!-- 立即去交易按钮 -->
    <div class="mt-auto pt-3 border-t border-slate-700/50 flex-shrink-0">
      <a
        href="https://bestinslot.xyz/brc2.0/nutkin"
        target="_blank"
        rel="noopener noreferrer"
        class="block w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-all text-center"
      >
        {{ t('trade.tradeNow') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface Trade {
  type: 'buy' | 'sell'
  price: number | string
  nutkinAmount: number | string
  btcAmount: number | string
  timestamp: number
}

interface Props {
  title?: string
  trades: Trade[]
  showTabs?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '交易记录',
  showTabs: true
})

const { t } = useI18n()

const tabs = [
  { label: computed(() => t('trade.all')), value: 'all' as const },
  { label: computed(() => t('trade.buy')), value: 'buy' as const },
  { label: computed(() => t('trade.sell')), value: 'sell' as const }
]



const activeTab = ref<'all' | 'buy' | 'sell'>('all')

// 根据选中的标签过滤交易
const filteredTrades = computed(() => {
  if (activeTab.value === 'all') {
    return props.trades
  }
  return props.trades.filter(trade => trade.type === activeTab.value)
})

// 格式化价格
const formatPrice = (price: number | string) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return numPrice.toFixed(8)
}

// 格式化数量
const formatAmount = (amount: number | string) => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  if (numAmount >= 1000000) {
    return (numAmount / 1000000).toFixed(2) + 'M'
  } else if (numAmount >= 1000) {
    return (numAmount / 1000).toFixed(2) + 'K'
  }
  return numAmount.toFixed(2)
}

// 格式化 BTC 数量
const formatBTC = (amount: number | string) => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return numAmount.toFixed(8)
}

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 小于1分钟
  if (diff < 60000) {
    return '刚刚'
  }
  // 小于1小时
  if (diff < 3600000) {
    return Math.floor(diff / 60000) + '分钟前'
  }
  // 小于1天
  if (diff < 86400000) {
    return Math.floor(diff / 3600000) + '小时前'
  }
  // 显示日期
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.trade-list {
  @apply rounded-lg border border-slate-700/50 p-4;
}

.trade-items::-webkit-scrollbar {
  width: 4px;
}

.trade-items::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 2px;
}

.trade-items::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 2px;
}

.trade-items::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>
