<template>
  <div class="mt-12">

    <div v-if="brc20Store.pairActivityLoading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
      <p class="mt-2 text-slate-400">{{ t('loading') }}</p>
    </div>
    
    <div v-else-if="brc20Store.pairActivityError" class="text-center py-8">
      <p class="text-red-400">{{ brc20Store.pairActivityError }}</p>
    </div>
    
    <div v-else-if="!brc20Store.pairActivity || brc20Store.pairActivity.length === 0" class="text-center py-8">
      <p class="text-slate-400">{{ t('noData') }}</p>
    </div>
    
    <div v-else class="overflow-x-auto">
      <!-- 活跃地址统计 -->
      <div class="mb-6 " >
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h3 class="text-lg font-semibold text-white">{{ t('activeAddressesStats') }}</h3>
        </div>
        <div class="bg-slate-950/70 rounded-xl border border-slate-800/50 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-800/50">
              <thead class="sm:hidden">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('address') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('buyTimes') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('sellTimes') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('liquidityOps') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('totalTrades') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('operation') }}</th>
                </tr>
              </thead>
              <thead class="hidden sm:table-header-group">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('address') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('buyTimes') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('sellTimes') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('liquidityOps') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('totalTrades') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('operation') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                <template v-for="addr in Object.values(paginatedAddressSummary) as AddressSummary[]" :key="addr.userAddress">
                  <tr @click="toggleAddressDetails(addr.userAddress)" class="cursor-pointer hover:bg-slate-800/50">
                    <td class="px-4 py-3 text-sm font-mono text-slate-300">
                      <span class="truncate max-w-[100px] sm:max-w-xs inline-block">{{ truncateAddress(addr.userAddress) }}</span>
                    </td>
                    <td class="px-4 py-3 text-sm text-emerald-400">{{ addr.buyCount }}</td>
                    <td class="px-4 py-3 text-sm text-violet-400">{{ addr.sellCount }}</td>
                    <td class="px-4 py-3 text-sm text-amber-400">{{ addr.liquidityCount }}</td>
                    <td class="px-4 py-3 text-sm text-white">{{ addr.totalCount }}</td>
                    <td class="px-4 py-3 text-sm">
                      <button 
                        @click.stop="toggleAddressDetails(addr.userAddress)" 
                        class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm transition-colors"
                      >
                        {{ expandedAddresses.includes(addr.userAddress) ? t('collapse') : t('expand') }}
                      </button>
                    </td>
                  </tr>
                  <tr v-if="expandedAddresses.includes(addr.userAddress)" :key="`${addr.userAddress}-details-row`">
                    <td colspan="6" class="p-0">
                      <div class="border-b border-slate-900/50 p-4 bg-slate-900/50">
                        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
                          <div class="lg:col-span-3">
                            <div class="overflow-x-auto">
                              <table class="min-w-full rounded-lg border-b border-slate-900/50">
                                <thead class="sm:hidden">
                                  <tr>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('time') }}</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('type') }}</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('NUTKIN') }}</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('BTC') }}</th>
                                  </tr>
                                </thead>
                                <thead class="hidden sm:table-header-group bg-slate-900/50">
                                  <tr>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('time') }}</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('type') }}</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('NUTKIN') }}</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-slate-300 text-left">{{ t('BTC') }}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="activity in getUserActivities(addr.userAddress)" :key="activity.id" class="border-b border-slate-900/50">
                                    <td class="px-3 py-2 text-sm text-slate-300">{{ formatDate(activity.timestamp) }}</td>
                                    <td class="px-3 py-2 text-sm">
                                      <span :class="[
                                        'px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap',
                                        getActivityTypeClass(activity.type)
                                      ]">
                                        {{ getActivityTypeName(activity.type) }}
                                      </span>
                                    </td>
                                    <td class="px-3 py-2 text-sm text-slate-300">
                                      {{ getNutkinAmount(activity) }}
                                    </td>
                                    <td class="px-3 py-2 text-sm text-slate-300">
                                      {{ getBtcAmount(activity) }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="lg:col-span-1">
                            <div class="bg-slate-800/50 rounded-lg p-4">
                              <h4 class="font-semibold text-white mb-3">{{ t('summaryInfo') }}</h4>
                              <div class="space-y-2">
                                <div class="flex justify-between">
                                  <span class="text-slate-300">{{ t('buyNUTKIN') }}:</span>
                                  <span class="text-emerald-400 font-medium">{{ getBuyNUTKINAmount(addr.userAddress) }}</span>
                                </div>
                                <div class="flex justify-between">
                                  <span class="text-slate-300">{{ t('payBTC') }}:</span>
                                  <span class="text-violet-400 font-medium">{{ getSellBTCAmount(addr.userAddress) }}</span>
                                </div>
                                <div class="flex justify-between">
                                  <span class="text-slate-300">{{ t('sellNUTKIN') }}:</span>
                                  <span class="text-amber-400 font-medium">{{ getSellNUTKINAmount(addr.userAddress) }}</span>
                                </div>
                                <div class="flex justify-between">
                                  <span class="text-slate-300">{{ t('receiveBTC') }}:</span>
                                  <span class="text-blue-400 font-medium">{{ getBuyBTCAmount(addr.userAddress) }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          <!-- 分页控件 -->
          <div class="flex justify-between items-center mt-4 p-4">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-slate-400">{{ t('perPage') }}</span>
                <select 
                  v-model="pageSize" 
                  @change="handlePageSizeChangeEvent"
                  class="bg-slate-700 text-slate-300 border border-gray-500 rounded-md px-2 py-1 text-sm"
                >
                  <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
                </select>
              </div>
              <div class="text-sm text-slate-400">
                {{ t('records') }} {{ totalAddresses }} {{ t('records') }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1" 
                class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ t('prev') }}
              </button>
              
              <div class="flex space-x-1">
                <button 
                  v-for="page in getPageNumbers()" 
                  :key="page" 
                  @click="handlePageChange(page)" 
                  :class="[
                    'px-3 py-1 rounded-md text-sm',
                    currentPage === page 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages" 
                class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ t('next') }}
              </button>
              <div class="text-sm text-slate-400 ml-2">
                ({{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, totalAddresses) }})
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 交易活动表格 -->
      <div class="mt-12">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h3 class="text-lg font-semibold text-white">{{ t('tradingDetails') }}</h3>
        </div>
        <div class="bg-slate-950/70 rounded-xl p-4 border border-slate-800/50">
          <div class="overflow-x-auto">
            <table class="min-w-full rounded-lg border-b border-slate-800/50">
              <thead class="sm:hidden">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('time') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('type') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('userAddress') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('NUTKIN') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('BTC') }}</th>
                </tr>
              </thead>
              <thead class="hidden sm:table-header-group">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('time') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('type') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('userAddress') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('NUTKIN') }}</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">{{ t('BTC') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                <tr v-for="activity in paginatedTrades" :key="activity.id">
                  <td class="px-4 py-3 text-sm text-slate-300">{{ formatDate(activity.timestamp) }}</td>
                  <td class="px-4 py-3 text-sm">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap',
                      getActivityTypeClass(activity.type)
                    ]">
                      {{ getActivityTypeName(activity.type) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm font-mono text-slate-300">
                    <span class="truncate max-w-[100px] sm:max-w-xs inline-block">{{ truncateAddress(activity.user_address) }}</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-slate-300">{{ getNutkinAmount(activity) }}</td>
                  <td class="px-4 py-3 text-sm text-slate-300">{{ getBtcAmount(activity) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 交易明细分页控件 -->
          <div class="flex justify-between items-center mt-4 p-4">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-slate-400">{{ t('perPage') }}</span>
                <select 
                  v-model="tradePageSize" 
                  @change="handleTradePageSizeChangeEvent"
                  class="bg-slate-700 text-slate-300 border border-gray-500 rounded-md px-2 py-1 text-sm"
                >
                  <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
                </select>
              </div>
              <div class="text-sm text-slate-400">
                {{ t('records') }} {{ totalTradeRecords }} {{ t('records') }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="prevTradePage" 
                :disabled="currentTradePage === 1" 
                class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ t('prev') }}
              </button>
              
              <div class="flex space-x-1">
                <button 
                  v-for="page in getTradePageNumbers()" 
                  :key="page" 
                  @click="handleTradePageChange(page)" 
                  :class="[
                    'px-3 py-1 rounded-md text-sm',
                    currentTradePage === page 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="nextTradePage" 
                :disabled="currentTradePage === totalTradePages" 
                class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ t('next') }}
              </button>
              <div class="text-sm text-slate-400 ml-2">
                ({{ (currentTradePage - 1) * tradePageSize + 1 }} - {{ Math.min(currentTradePage * tradePageSize, totalTradeRecords) }})
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBRC20Store } from '~/stores/brc20'
import { CryptoConverter } from '~/utils/BaseUnit'
import { type ActivityData } from '~/api/brc20'
import { useI18n } from 'vue-i18n'

const brc20Store = useBRC20Store()
const { t } = useI18n({
  locale: 'zh',
  messages: {
    zh: {
      dragonTigerBoard: '龙虎榜',
      activeAddressesStats: '活跃地址统计',
      tradingDetails: '交易明细',
      perPage: '每页:',
      records: '条记录',
      onlyShowTop: '仅展示前',
      recordsTotal: '条数据',
      buyNUTKIN: '买入NUTKIN',
      sellNUTKIN: '卖出NUTKIN',
      payBTC: '支付BTC',
      receiveBTC: '获得BTC',
      summaryInfo: '汇总信息',
      expand: '展开',
      collapse: '收起',
      address: '地址',
      buyTimes: '买入次数',
      sellTimes: '卖出次数',
      liquidityOps: '流动性操作',
      totalTrades: '总交易数',
      operation: '操作',
      time: '时间',
      type: '类型',
      userAddress: '用户地址',
      NUTKIN: 'NUTKIN',
      BTC: 'BTC',
      loading: '正在加载交易数据...',
      noData: '暂无数据',
      prev: '上一页',
      buy: '买入',
      sell: '卖出',
      addLiquidity: '添加流动性',
      removeLiquidity: '移除流动性',
      next: '下一页'
    },
    en: {
      dragonTigerBoard: 'Dragon Tiger Board',
      activeAddressesStats: 'Active Addresses Stats',
      tradingDetails: 'Trading Details',
      perPage: 'Per page:',
      records: 'records',
      onlyShowTop: 'Only show top',
      recordsTotal: 'records',
      buyNUTKIN: 'Buy NUTKIN',
      sellNUTKIN: 'Sell NUTKIN',
      payBTC: 'Pay BTC',
      receiveBTC: 'Receive BTC',
      summaryInfo: 'Summary Info',
      expand: 'Expand',
      collapse: 'Collapse',
      address: 'Address',
      buyTimes: 'Buy Times',
      sellTimes: 'Sell Times',
      liquidityOps: 'Liquidity Ops',
      totalTrades: 'Total Trades',
      operation: 'Operation',
      time: 'Time',
      type: 'Type',
      userAddress: 'User Address',
      NUTKIN: 'NUTKIN',
      BTC: 'BTC',
      loading: 'Loading trading data...',
      noData: 'No data',
      prev: 'Prev',
      buy: 'Buy',
      sell: 'Sell',
      addLiquidity: 'Add Liquidity',
      removeLiquidity: 'Remove Liquidity',
      next: 'Next'
    }
  }
})

interface AddressSummary {
  userAddress: string
  buyCount: number
  sellCount: number
  liquidityCount: number
  totalCount: number
}

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizes = [10, 20, 50, 100]

// 展开的地址列表
const expandedAddresses = ref<string[]>([])

// 切换地址详情显示状态
const toggleAddressDetails = (address: string) => {
  const index = expandedAddresses.value.indexOf(address)
  if (index > -1) {
    expandedAddresses.value.splice(index, 1)
  } else {
    expandedAddresses.value.push(address)
  }
}

// 获取特定用户地址的所有活动
const getUserActivities = (userAddress: string) => {
  if (!brc20Store.pairActivity) return []
  return brc20Store.pairActivity
    .filter(activity => activity.user_address === userAddress)
    .sort((a, b) => b.timestamp - a.timestamp) // 按时间倒序排列
}

// 定义 token 地址常量
const BTC_TOKEN_ADDRESS = '0xdbb5b6a1d422fca2813cf486e5f986adb09d8337'  // BTC地址
const NUTKIN_TOKEN_ADDRESS = '0x81f0ef688b8dcad3f3ddaba69ad529a99f03a1b7' // NUTKIN地址

// 获取 NUTKIN 金额
const getNutkinAmount = (activity: ActivityData) => {
  // 根据 token_1 地址判断交易类型
  if (activity.token_1.toLowerCase() === BTC_TOKEN_ADDRESS.toLowerCase()) {
    // token_1 是 BTC → 买入 NUTKIN
    return CryptoConverter.weiToEth(activity.amount2) // amount2 是 NUTKIN
  } else if (activity.token_1.toLowerCase() === NUTKIN_TOKEN_ADDRESS.toLowerCase()) {
    // token_1 是 NUTKIN → 卖出 NUTKIN
    return CryptoConverter.weiToEth(activity.amount1) // amount1 是 NUTKIN
  }
  // 默认返回 amount1
  return activity.amount1
}

// 获取 BTC 金额
const getBtcAmount = (activity: ActivityData) => {
  // 根据 token_1 地址判断交易类型
  if (activity.token_1.toLowerCase() === BTC_TOKEN_ADDRESS.toLowerCase()) {
    // token_1 是 BTC → 买入 NUTKIN
    return CryptoConverter.satoshiToBtc(activity.amount1) // amount1 是 BTC
  } else if (activity.token_1.toLowerCase() === NUTKIN_TOKEN_ADDRESS.toLowerCase()) {
    // token_1 是 NUTKIN → 卖出 NUTKIN
    return CryptoConverter.satoshiToBtc(activity.amount2) // amount2 是 BTC
  }
  // 默认返回 amount2
  return activity.amount2
}

// 截断地址显示
const truncateAddress = (address: string) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

// 格式化时间
const formatDate = (timestamp: number) => {
  // 检查时间戳是否已经是毫秒单位
  let date;
  if (timestamp > 1e10) { // 如果时间戳大于10位数，可能是毫秒单位
    date = new Date(timestamp);
  } else { // 否则是秒单位
    date = new Date(timestamp * 1000);
  }
  return date.toLocaleString('zh-CN');
}

// 获取活动类型名称
const getActivityTypeName = (type: string) => {
  switch (type) {
    case 'swap2': return t('buy')
    case 'swap1': return t('sell')
    case 'add_liq': return t('addLiquidity')
    case 'remove_liq': return t('removeLiquidity')
    default: return type
  }
}

// 获取活动类型样式类
const getActivityTypeClass = (type: string) => {
  switch (type) {
    case 'swap2': return 'bg-emerald-500/20 text-emerald-400'  // 买入
    case 'swap1': return 'bg-red-500/20 text-red-400'  // 卖出
    case 'add_liq': return 'bg-amber-500/20 text-amber-400'  // 添加流动性
    case 'remove_liq': return 'bg-blue-500/20 text-blue-400'  // 移除流动性
    default: return 'bg-slate-500/20 text-slate-400'
  }
}

// 计算统计摘要
const summary = computed(() => {
  if (!brc20Store.pairActivity) return { totalTrades: 0, buyTrades: 0, sellTrades: 0, liquidityActivities: 0 }
  
  const totalTrades = brc20Store.pairActivity.length
  const buyTrades = brc20Store.pairActivity.filter(a => a.type === 'swap2').length
  const sellTrades = brc20Store.pairActivity.filter(a => a.type === 'swap1').length
  const liquidityActivities = brc20Store.pairActivity.filter(a => a.type === 'add_liq' || a.type === 'remove_liq').length
  
  return { totalTrades, buyTrades, sellTrades, liquidityActivities }
})

// 计算地址统计
const addressSummary = computed(() => {
  if (!brc20Store.pairActivity) return {}
  
  const summaryMap: Record<string, AddressSummary> = {}
  
  brc20Store.pairActivity.forEach((activity: ActivityData) => {
    const address = activity.user_address
    if (!summaryMap[address]) {
      summaryMap[address] = {
        userAddress: address,
        buyCount: 0,
        sellCount: 0,
        liquidityCount: 0,
        totalCount: 0
      }
    }
    
    const addrSummary = summaryMap[address]
    addrSummary.totalCount++
    
    switch (activity.type) {
      case 'swap2':
        addrSummary.buyCount++
        break
      case 'swap1':
        addrSummary.sellCount++
        break
      case 'add_liq':
      case 'remove_liq':
        addrSummary.liquidityCount++
        break
    }
  })
  
  // 按总交易数排序
  const sortedAddresses = Object.values(summaryMap)
    .sort((a, b) => b.totalCount - a.totalCount)
  
  return sortedAddresses.reduce((acc, item) => ({ ...acc, [item.userAddress]: item }), {})
})

// 计算分页后的地址统计
const paginatedAddressSummary = computed(() => {
  const addresses: AddressSummary[] = Object.values(addressSummary.value)
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  
  return addresses.slice(startIndex, endIndex)
    .reduce((acc: Record<string, AddressSummary>, item: AddressSummary) => ({ ...acc, [item.userAddress]: item }), {} as Record<string, AddressSummary>)
})

// 总页数
const totalPages = computed(() => {
  const totalAddresses = Object.keys(addressSummary.value).length
  return Math.ceil(totalAddresses / pageSize.value)
})

// 总记录数
const totalAddresses = computed(() => {
  return Object.keys(addressSummary.value).length
})

// 计算指定地址买入的NUTKIN数量 (swap2: amount1=NUTKIN)
const getBuyNUTKINAmount = (address: string) => {
  const activities = getUserActivities(address)
  return activities
    .filter(activity => activity.type === 'swap2')
    .reduce((sum, activity) => sum + parseFloat(getNutkinAmount(activity)), 0)
    .toFixed(4)
}

// 计算指定地址卖出的NUTKIN数量 (swap1: amount2=NUTKIN)
const getSellNUTKINAmount = (address: string) => {
  const activities = getUserActivities(address)
  return activities
    .filter(activity => activity.type === 'swap1')
    .reduce((sum, activity) => sum + parseFloat(getNutkinAmount(activity)), 0)
    .toFixed(4)
}

// 计算指定地址买入的BTC数量 (swap1: user gets BTC)
const getBuyBTCAmount = (address: string) => {
  const activities = getUserActivities(address)
  return activities
    .filter(activity => activity.type === 'swap1')
    .reduce((sum, activity) => sum + parseFloat(getBtcAmount(activity)), 0)
    .toFixed(8)
}

// 计算指定地址卖出的BTC数量 (swap2: user pays BTC)
const getSellBTCAmount = (address: string) => {
  const activities = getUserActivities(address)
  return activities
    .filter(activity => activity.type === 'swap2')
    .reduce((sum, activity) => sum + parseFloat(getBtcAmount(activity)), 0)
    .toFixed(8)
}

// 交易明细分页相关状态
const currentTradePage = ref(1)
const tradePageSize = ref(10)

// 计算分页后的交易明细
const paginatedTrades = computed(() => {
  if (!brc20Store.pairActivity) return []
  
  const startIndex = (currentTradePage.value - 1) * tradePageSize.value
  const endIndex = startIndex + tradePageSize.value
  
  return brc20Store.pairActivity.slice(startIndex, endIndex)
})

// 交易明细总页数
const totalTradePages = computed(() => {
  if (!brc20Store.pairActivity) return 1
  return Math.ceil(brc20Store.pairActivity.length / tradePageSize.value)
})

// 交易明细总记录数
const totalTradeRecords = computed(() => {
  return brc20Store.pairActivity ? brc20Store.pairActivity.length : 0
})

// 交易明细上一页
const prevTradePage = () => {
  if (currentTradePage.value > 1) {
    currentTradePage.value--
  }
}

// 交易明细下一页
const nextTradePage = () => {
  if (currentTradePage.value < totalTradePages.value) {
    currentTradePage.value++
  }
}

// 交易明细页码跳转
const handleTradePageChange = (page: number) => {
  if (page >= 1 && page <= totalTradePages.value) {
    currentTradePage.value = page
  }
}

// 交易明细页面大小变更
const handleTradePageSizeChange = (size: number) => {
  tradePageSize.value = size
  currentTradePage.value = 1 // 切换页面大小时回到第一页
}

// 交易明细页面大小变更事件处理器
const handleTradePageSizeChangeEvent = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const size = parseInt(target.value);
  handleTradePageSizeChange(size);
}

// 交易明细页码范围
const getTradePageNumbers = (): number[] => {
  const pages: number[] = []
  const totalPagesNum = totalTradePages.value
  const currentPageNum = currentTradePage.value
  
  if (totalPagesNum <= 5) {
    // 如果总页数不超过5页，显示所有页码
    for (let i = 1; i <= totalPagesNum; i++) {
      pages.push(i)
    }
  } else {
    // 如果总页数超过5页，显示当前页附近的页码
    if (currentPageNum <= 3) {
      // 当前页在前面，显示前5页
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (currentPageNum >= totalPagesNum - 2) {
      // 当前页在后面，显示后5页
      for (let i = totalPagesNum - 4; i <= totalPagesNum; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间，显示当前页及前后各两页
      for (let i = currentPageNum - 2; i <= currentPageNum + 2; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
}

// 更改页面大小
const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 切换页面大小时回到第一页
}

// 事件处理器：更改页面大小
const handlePageSizeChangeEvent = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const size = parseInt(target.value);
  handlePageSizeChange(size);
}

// 切换页码
const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 获取显示的页码范围
const getPageNumbers = (): number[] => {
  const pages: number[] = []
  const totalPagesNum = totalPages.value
  const currentPageNum = currentPage.value
  
  if (totalPagesNum <= 5) {
    // 如果总页数不超过5页，显示所有页码
    for (let i = 1; i <= totalPagesNum; i++) {
      pages.push(i)
    }
  } else {
    // 如果总页数超过5页，显示当前页附近的页码
    if (currentPageNum <= 3) {
      // 当前页在前面，显示前5页
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (currentPageNum >= totalPagesNum - 2) {
      // 当前页在后面，显示后5页
      for (let i = totalPagesNum - 4; i <= totalPagesNum; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间，显示当前页及前后各两页
      for (let i = currentPageNum - 2; i <= currentPageNum + 2; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
}

// 组件挂载时加载数据
onMounted(async () => {
  const tokenAddress = '0x5463191b2705596b89e000fdcd60206daa2df8ff'
  
  // 首次加载显示加载状态
  await brc20Store.fetchPairActivity(tokenAddress, 200, 0).catch(error => {
    console.error('加载交易活动数据失败:', error)
  })
  
  // 启动静默更新定时器
  const refreshInterval = setInterval(() => {
    // 静默更新，不显示加载状态
    brc20Store.fetchPairActivity(tokenAddress, 200, 0, true).catch(error => {
      console.error('静默更新交易活动数据失败:', error)
    })
  }, 30000) // 每30秒静默更新一次
  
  // 组件卸载时清除定时器
  onUnmounted(() => {
    clearInterval(refreshInterval)
  })
})
</script>

<style scoped>
/* 响应式表格 */
@media (max-width: 768px) {
  .overflow-x-auto {
    overflow-x: auto;
  }
  
  table {
    min-width: 600px;
  }
}
</style>