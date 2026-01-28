<template>
  <UiCard class="p-3 md:p-6" :hover="false" variant="darker">
    <div class="flex items-start justify-between mb-6">
      <div>

        <p class="text-sm text-slate-400">{{ $t('analytics.subtitle') }}</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span class="text-xs text-emerald-400">{{ $t('analytics.live') }}</span>
      </div>
    </div>

    <!-- Token List -->
    <div v-if="brc20Store.loading && brc20Store.isInitialLoad" class="space-y-3 mb-6">
      <div class="p-4 rounded-xl bg-white/5 border border-white/5 animate-pulse">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-700"></div>
            <div>
              <div class="h-4 w-24 bg-slate-700 rounded mb-2"></div>
              <div class="h-3 w-16 bg-slate-700 rounded"></div>
            </div>
          </div>
          <div class="text-right">
            <div class="h-5 w-20 bg-slate-700 rounded mb-2"></div>
            <div class="h-3 w-16 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="brc20Store.error" class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
      <p class="text-sm text-red-400">{{ brc20Store.error }}</p>
    </div>

    <div v-else class="space-y-3 mb-6">
      <AnalyticsTokenCard
        v-for="token in brc20Store.tokens"
        :key="token.symbol"
      >
        <template #metrics>
          <AnalyticsTokenMetrics :token="token" />
        </template>
        
        <template #chart>
          <AnalyticsPriceChart
            chart-id="chart-container"
            :selected-interval="selectedInterval"
            :interval-options="intervalOptions"
            @change-interval="changeInterval"
          />
        </template>
        
        <template #trades>
          <UiTradeList
            :title="$t('analytics.tradeHistory')"
            :trades="trades"
          />
        </template>
      </AnalyticsTokenCard>
    </div>

    <!-- Stats Grid -->
    <!--<div class="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-violet-500/10 border border-amber-500/20">
      <div class="text-center">
        <div class="text-2xl font-bold text-white font-heading">{{ totalTokens }}</div>
        <div class="text-xs text-slate-400 mt-1">{{ $t('analytics.activeTokens') }}</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-white font-heading">{{ totalVolume }}</div>
        <div class="text-xs text-slate-400 mt-1">{{ $t('analytics.totalVolume') }}</div>
      </div>
    </div>-->
  </UiCard>
</template>

<script setup lang="ts">
import { useBRC20Store } from '~/stores/brc20'
import { type ActivityData, type ActivityResponse } from '~/api/brc20'
import type { Trade } from '~/components/ui/TradeList.vue'
import { CryptoConverter } from '~/utils/BaseUnit'


const brc20Store = useBRC20Store()

// 交易数据
const trades = ref<Trade[]>([])

// 转换 API 数据为 Trade 类型
const convertActivityToTrade = (activity: ActivityData, response: ActivityResponse): Trade | null => {
  // 根据 type 字段判断交易类型
  // swap2 = 买入, swap1 = 卖出, add_liq = 添加流动性, remove_liq = 移除流动性
  // 只处理 swap1 和 swap2，忽略流动性操作
  if (activity.type !== 'swap1' && activity.type !== 'swap2') {
    return null // 不是交易，返回 null
  }
  
  // 定义 token 地址常量
  const BTC_TOKEN_ADDRESS = '0xdbb5b6a1d422fca2813cf486e5f986adb09d8337'  // BTC地址
  const NUTKIN_TOKEN_ADDRESS = '0x81f0ef688b8dcad3f3ddaba69ad529a99f03a1b7' // NUTKIN地址
  
  let nutkinAmount: string
  let btcAmount: string
  let type: 'buy' | 'sell'
  
  // 根据 token_1 地址判断交易类型
  if (activity.token_1.toLowerCase() === BTC_TOKEN_ADDRESS.toLowerCase()) {
    // token_1 是 BTC → 买入 NUTKIN
    type = 'buy'
    btcAmount = CryptoConverter.satoshiToBtc(activity.amount1)      // amount1 是 BTC
    nutkinAmount = CryptoConverter.weiToEth(activity.amount2)       // amount2 是 NUTKIN
  } else if (activity.token_1.toLowerCase() === NUTKIN_TOKEN_ADDRESS.toLowerCase()) {
    // token_1 是 NUTKIN → 卖出 NUTKIN
    type = 'sell'
    nutkinAmount = CryptoConverter.weiToEth(activity.amount1)       // amount1 是 NUTKIN
    btcAmount = CryptoConverter.satoshiToBtc(activity.amount2)      // amount2 是 BTC
  } else {
    // 未知的 token 地址，跳过
    console.warn('Unknown token address:', activity.token_1)
    return null
  }
  
  console.log('Trade Data:', btcAmount, nutkinAmount);
  
  // 计算均价：BTC / NUTKIN
  const price = parseFloat(CryptoConverter.btcToSatoshi((parseFloat(btcAmount) / parseFloat(nutkinAmount)).toString())).toFixed(2)

  return {
    type,
    price,
    nutkinAmount,
    btcAmount,
    timestamp: activity.timestamp
  }
}

// 加载交易数据
const loadTrades = async () => {
  try {
    const tokenAddress = '0x5463191b2705596b89e000fdcd60206daa2df8ff'
    
    // 使用store获取数据（定时刷新时使用静默模式）
    const response = await brc20Store.fetchPairActivity(tokenAddress, 200, 0, true)
    
    if (brc20Store.pairActivity && brc20Store.pairActivity.length > 0) {
      
      trades.value = brc20Store.pairActivity
        .filter(activity => activity.success) // 只显示成功的交易
        .map(activity => convertActivityToTrade(activity, { activities: brc20Store.pairActivity }))
        .filter((trade): trade is Trade => trade !== null) // 过滤掉 null（流动性操作）
        .slice(0, 50) // 只显示最近50条
      
      console.log('交易数据加载成功:', trades.value.length, '条')
    } 
  } catch (error) {
    console.error('加载交易数据失败:', error)
    // 失败时使用空数组
    trades.value = []
  }
}

// 时间间隔选项
const intervalOptions = [
  { label: '1m', value: '1m' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '1h', value: '1h' },
  { label: '4h', value: '4h' },
  { label: '1d', value: '1d' }
]

// 当前选中的时间间隔
const selectedInterval = ref('1h')

// 切换时间间隔
const changeInterval = (interval: string) => {
  selectedInterval.value = interval
}

// 交易数据自动刷新定时器
let tradesRefreshTimer: ReturnType<typeof setInterval> | null = null

// 组件挂载时开始自动刷新
onMounted(() => {
  console.log('=== BRC20Analytics onMounted 开始 ===')
  brc20Store.startAutoRefresh()
  
  // 加载交易数据
  loadTrades()
  
  // 启动交易数据30秒自动刷新
  tradesRefreshTimer = setInterval(() => {
    loadTrades()
  }, 30000) // 30秒 = 30000毫秒
  
  console.log('=== BRC20Analytics onMounted 结束 ===')
})

// 组件销毁时停止自动刷新
onUnmounted(() => {
  brc20Store.stopAutoRefresh()
  
  // 清除交易数据刷新定时器
  if (tradesRefreshTimer) {
    clearInterval(tradesRefreshTimer)
    tradesRefreshTimer = null
  }
})
</script>

<style scoped>
/* 响应式布局：宽度 <= 920px 时垂直排列 */
@media (max-width: 920px) {
  .flex-col.lg\:flex-row {
    flex-direction: column !important;
  }
  
  .flex-1.lg\:flex-\[3\],
  .flex-1.lg\:flex-\[2\] {
    flex: 1 1 auto !important;
  }
}
</style>
