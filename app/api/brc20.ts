/**
 * BRC20 Token API
 */

// Token 数据类型定义
export interface TokenData {
  tick: string
  image_url: string
  token_address: string
  min_listed_unit_price: number
  avg_price: number
  holder_count: number
  tx_count: number
  deploy_ts: string
  market_cap: number
  mint: {
    progress: number
    self: boolean
  }
  supply: {
    max: number
    current: number
    remaining: number
    listed: number
    listed_ratio: number
  }
  volume: {
    d1: number
    d7: number
    d30: number
    d180: number
    all: number
  }
  price_change: {
    d1: number | null
    d7: number | null
    d30: number | null
    d180: number | null
  }
  pair: {
    pair_address: string
    price: number
    price_change_24h: number
    price_change_7d: number
    volume_24h: string
    volume_7d: string
    lp_fee_tier: number
    tvl: string
    apr: number
    lp_fees_1d: string
    lp_fees_7d: string
    reserves_btc: string
    reserves_token: string
    market_cap: number
    total_lp_tokens: string
  }
}

/**
 * 获取 BRC20 Token 数据
 * @param tick Token 名称（如：nutkin）
 */
export const fetchBRC20TokenData = async (tick: string): Promise<TokenData> => {
  try {
    // 使用代理路径，避免跨域问题
    const response = await fetch(`https://v2api.bestinslot.xyz/brc2.0/api/brc20?tick=${tick}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching BRC20 token data:', error)
    throw error
  }
}

// K线数据类型定义
export interface KlineData {
  open_time: number
  close_time: number
  open: number
  high: number
  low: number
  close: number
  volume_wbtc: string
  trades: number
}

export interface KlineResponse {
  klines: KlineData[]
}

/**
 * 获取 K 线数据（客户端执行）
 * @param tokenAddress Token 地址
 * @param interval 时间间隔（1m, 5m, 15m, 1h, 4h, 1d）
 * @param limit 数据条数
 */
export const fetchKlineData = async (
  tokenAddress: string,
  interval: string = '1h',
  limit: number = 500
): Promise<KlineResponse> => {
  try {
    const endTime = Date.now()
    
    // 根据不同的时间间隔计算合适的时间范围

    let timeRange = 30 * 24 * 60 * 60 * 1000 // 默认30天
    
    const startTime = endTime - timeRange
    
    const url = `https://swap-api.bestinslot.xyz/klines/${tokenAddress}?interval=${interval}&limit=${limit}&startTime=${startTime}&endTime=${endTime}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Kline data:', error)
    throw error
  }
}

// 交易活动数据类型定义
export interface TokenInfo {
  address: string
  symbol: string
  decimals: number
}

export interface ActivityData {
  id: string
  type: string  // swap1(卖出): amount1=BTC, amount2=NUTKIN | swap2(买入): amount1=NUTKIN, amount2=BTC
  timestamp: number
  block_height: number
  success: boolean
  user_address: string
  user_pubkey: string
  amount1: string  // swap1时为BTC，swap2时为NUTKIN
  amount2: string  // swap1时为NUTKIN，swap2时为BTC
  token_1: string
  token_2: string
  pair_address?: string
  token_a?: TokenInfo  // NUTKIN
  token_b?: TokenInfo  // fr-BTC
}

export interface ActivityResponse {
  activities: ActivityData[]
  pair_address?: string
  token_a?: TokenInfo
  token_b?: TokenInfo
}

/**
 * 获取交易活动数据
 * @param tokenAddress Token 地址
 * @param limit 数据条数
 * @param offset 偏移量
 */
export const fetchPairActivity = async (
  tokenAddress: string,
  limit: number = 200,
  offset: number = 0
): Promise<ActivityResponse> => {
  try {
    const url = `https://swap-api.bestinslot.xyz/pair-activity/${tokenAddress}?limit=${limit}&offset=${offset}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching pair activity:', error)
    throw error
  }
}
