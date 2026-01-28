/**
 * BRC20 Token Store
 * 用于管理 BRC20 Token 数据的全局状态
 */
import { defineStore } from 'pinia'
import { fetchBRC20TokenData, type TokenData, fetchPairActivity, type ActivityData, type ActivityResponse } from '~/api/brc20'
import { formatNumber, formatPrice,toBTC } from '~/utils/format'

// 格式化后的 Token 数据接口
export interface FormattedToken {
  key: string
  name: string
  nameZh: string
  symbol: string
  imageUrl: string
  price: string
  change24h: number
  volume24h: string
  volume7d: string
  allVolume: string
  marketCap: string
  holders: string
  trustScore: number
  tvl: number
  apr: number
  gradient: string
}

export const useBRC20Store = defineStore('brc20', {
  state: () => ({
    // 原始数据
    tokenData: null as TokenData | null,
    // 加载状态
    loading: false,
    // 首次加载标记
    isInitialLoad: true,
    // 错误信息
    error: null as string | null,
    // 自动刷新定时器 ID
    refreshInterval: null as ReturnType<typeof setInterval> | null,
    // Pair Activity 数据
    pairActivity: [] as ActivityData[],
    // Pair Activity 加载状态
    pairActivityLoading: false,
    // Pair Activity 错误信息
    pairActivityError: null as string | null
  }),

  getters: {
    /**
     * 格式化后的 Token 列表
     */
    tokens(state): FormattedToken[] {
      if (!state.tokenData) return []

      const data = state.tokenData
      const store = useBRC20Store()
      
      return [
        {
          key: 'nutkinToken',
          name: 'Nutkin',
          nameZh: 'Nutkin',
          symbol: data.tick.toUpperCase(),
          imageUrl: store.getImageUrl(data.image_url),
          price: formatPrice(data.pair.price),
          change24h: Number(data.pair.price_change_24h.toFixed(2)),
          allVolume: `${toBTC(data.volume.all)}`,
          volume24h: `${toBTC(parseFloat(data.pair.volume_24h))}`,
          volume7d: `${toBTC(data.volume.all)}`,
          marketCap: `${toBTC(data.pair.market_cap)}`,
          holders: formatNumber(data.holder_count),
          trustScore: store.calculateTrustScore(data),
          tvl: toBTC(parseFloat(data.pair.tvl)),
          apr: data.pair.apr,
          
          gradient: 'from-amber-500 to-orange-600'
        }
      ]
    },

    /**
     * 总交易量
     */
    totalVolume(state): string {
      if (!state.tokenData) return '$0'
      return `$${formatNumber(parseFloat(state.tokenData.pair.volume_24h))}`
    },

    /**
     * Token 总数
     */
    totalTokens(): string {
      return this.tokens.length.toString()
    },

    /**
     * 总市值
     */
    marketCap(state): number {
      if (!state.tokenData) return 0
      return state.tokenData.pair.market_cap
    }
  },

  actions: {
    /**
     * 获取 Token 数据
     * @param silent 是否静默更新（不显示 loading 状态）
     */
    async fetchTokenData(silent = false) {
      try {
        // 只在首次加载时显示 loading
        if (!silent) {
          this.loading = true
        }
        this.error = null

        const data = await fetchBRC20TokenData('nutkin')
        this.tokenData = data
      } catch (e) {
        // 静默更新时不显示错误
        if (!silent) {
          this.error = e instanceof Error ? e.message : 'Failed to fetch token data'
        }
        console.error('Error in BRC20 store:', e)
      } finally {
        this.loading = false
        this.isInitialLoad = false
      }
    },

    /**
     * 开始自动刷新（每 30 秒）
     */
    startAutoRefresh() {
      // 清除已存在的定时器
      this.stopAutoRefresh()

      // 首次加载
      this.fetchTokenData()

      // 设置定时刷新
      this.refreshInterval = setInterval(() => {
        this.fetchTokenData(true) // silent = true，无感更新
      }, 30000)
    },

    /**
     * 停止自动刷新
     */
    stopAutoRefresh() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval)
        this.refreshInterval = null
      }
    },

    /**
     * 计算信任评分（基于多个指标）
     */
    calculateTrustScore(data: TokenData): number {
      let score = 0

      // 根据 holder 数量
      if (data.holder_count > 4000) score += 1

      // 根据 mint 进度
      if (data.mint.progress === 100) score += 1

      // 根据流动性
      if (parseFloat(data.pair.tvl) > 300000000) score += 1

      // 根据交易量
      if (parseFloat(data.pair.volume_24h) > 20000000) score += 1

      // 根据 APR
      if (data.pair.apr > 5) score += 1

      return Math.min(score, 5)
    },

    /**
     * 拼接完整的图片 URL
     */
    getImageUrl(imageUrl: string): string {
      if (!imageUrl) return ''

      // 替换 brc-20.png 为 brc20.png
      let processedUrl = imageUrl.replace('brc-20.png', 'brc20.png')

      // 如果是相对路径（如 brc20.png），拼接完整 URL
      if (!processedUrl.startsWith('http')) {
        return `https://bestinslot.xyz/img/icon/${processedUrl}`
      }
      return processedUrl
    },

    /**
     * 获取 Pair Activity 数据
     * @param tokenAddress 代币地址
     * @param limit 返回记录数量
     * @param offset 偏移量
     * @param silent 是否静默更新（不显示 loading 状态）
     */
    async fetchPairActivity(tokenAddress: string, limit: number = 200, offset: number = 0, silent: boolean = false) {
      try {
        if (!silent) {
          this.pairActivityLoading = true
        }
        this.pairActivityError = null
        
        const data = await fetchPairActivity(tokenAddress, limit, offset)
        this.pairActivity = data.activities
        
        return data
      } catch (e) {
        if (!silent) {
          this.pairActivityError = e instanceof Error ? e.message : 'Failed to fetch pair activity data'
        }
        console.error('Error fetching pair activity:', e)
        throw e
      } finally {
        if (!silent) {
          this.pairActivityLoading = false
        }
      }
    },

    /**
     * 清空 Pair Activity 数据
     */
    clearPairActivity() {
      this.pairActivity = []
    }
  }
})
