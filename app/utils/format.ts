/**
 * 数据格式化工具函数
 */

/**
 * 格式化数字 - 紧凑显示（K, M, B）
 * @param num 数字
 * @param options 配置选项
 */
export const formatNumber = (
  num: number,
  options?: {
    compact?: boolean
    maximumFractionDigits?: number
    minimumFractionDigits?: number
  }
) => {
  const {
    compact = true,
    maximumFractionDigits = 2,
    minimumFractionDigits = 0
  } = options || {}

  if (compact) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits,
      minimumFractionDigits
    }).format(num)
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits
  }).format(num)
}

/**
 * 格式化价格 - 美元显示
 * @param price 价格数字
 * @param decimals 小数位数，默认 2
 */
export const formatPrice = (price: number, decimals: number = 2): string => {
  return `${price.toFixed(decimals)}`
}

/**
 * 格式化百分比
 * @param value 数值
 * @param decimals 小数位数，默认 2
 * @param showSign 是否显示正负号，默认 true
 */
export const formatPercentage = (
  value: number,
  decimals: number = 2,
  showSign: boolean = true
): string => {
  const sign = showSign && value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

/**
 * BTC 单位转换
 */
export const btcUnits = {
  BTC: 1,
  mBTC: 1000, // 毫比特币
  μBTC: 1000000, // 微比特币（位）
  satoshi: 100000000 // 聪
}

/**
 * 将 BTC 转换为其他单位
 * @param btc BTC 数量
 * @param toUnit 目标单位 ('BTC' | 'mBTC' | 'μBTC' | 'satoshi')
 * @param decimals 小数位数
 */
export const convertBTC = (
  btc: number,
  toUnit: keyof typeof btcUnits = 'satoshi',
  decimals?: number
): number => {
  const converted = btc * btcUnits[toUnit]
  
  if (decimals !== undefined) {
    return Number(converted.toFixed(decimals))
  }
  
  return converted
}

/**
 * 将其他单位转换为 BTC
 * @param value 数量
 * @param fromUnit 源单位 ('BTC' | 'mBTC' | 'μBTC' | 'satoshi')
 * @param decimals 小数位数
 */
export const toBTC = (
  value: number,
  fromUnit: keyof typeof btcUnits = 'satoshi',
  decimals: number = 8
): number => {
  const btc = value / btcUnits[fromUnit]
  return Number(btc.toFixed(decimals))
}

/**
 * 格式化 BTC 数量（自动选择合适单位）
 * @param btc BTC 数量
 * @param options 配置选项
 */
export const formatBTC = (
  btc: number,
  options?: {
    unit?: keyof typeof btcUnits
    decimals?: number
    showUnit?: boolean
  }
): string => {
  const { unit, decimals = 2, showUnit = true } = options || {}

  // 如果指定了单位，直接转换
  if (unit) {
    const converted = convertBTC(btc, unit, decimals)
    return showUnit ? `${converted} ${unit}` : converted.toString()
  }

  // 自动选择合适的单位
  if (btc >= 1) {
    return showUnit ? `${btc.toFixed(decimals)} BTC` : btc.toFixed(decimals)
  } else if (btc >= 0.001) {
    const mbtc = convertBTC(btc, 'mBTC', decimals)
    return showUnit ? `${mbtc} mBTC` : mbtc.toString()
  } else if (btc >= 0.000001) {
    const ubtc = convertBTC(btc, 'μBTC', decimals)
    return showUnit ? `${ubtc} μBTC` : ubtc.toString()
  } else {
    const sats = convertBTC(btc, 'satoshi', 0)
    return showUnit ? `${sats} sats` : sats.toString()
  }
}

/**
 * 格式化时间戳为日期字符串
 * @param timestamp 时间戳（秒或毫秒）
 * @param format 格式类型
 */
export const formatTimestamp = (
  timestamp: number | string,
  format: 'date' | 'datetime' | 'time' | 'relative' = 'datetime'
): string => {
  const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
  // 判断是秒还是毫秒
  const date = new Date(ts < 10000000000 ? ts * 1000 : ts)

  if (format === 'relative') {
    return formatRelativeTime(date)
  }

  const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    date: { year: 'numeric', month: 'short', day: 'numeric' },
    datetime: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    time: { hour: '2-digit', minute: '2-digit' }
  }

  return new Intl.DateTimeFormat('en-US', optionsMap[format]).format(date)
}

/**
 * 格式化相对时间（如：2 hours ago）
 * @param date 日期对象或时间戳
 */
export const formatRelativeTime = (date: Date | number): string => {
  const now = new Date()
  const targetDate = date instanceof Date ? date : new Date(date)
  const diffMs = now.getTime() - targetDate.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  }
  if (diffDay < 365) {
    const months = Math.floor(diffDay / 30)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
  const years = Math.floor(diffDay / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}

/**
 * 缩短地址显示（如：0x1234...5678）
 * @param address 地址字符串
 * @param startLength 开头保留长度
 * @param endLength 结尾保留长度
 */
export const shortenAddress = (
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string => {
  if (!address || address.length <= startLength + endLength) {
    return address
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

/**
 * 数字添加千分位分隔符
 * @param num 数字
 */
export const addThousandSeparator = (num: number | string): string => {
  const numStr = num.toString()
  const parts = numStr.split('.')
  if (parts[0]) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return parts.join('.')
}

/**
 * 验证并格式化 URL
 * @param url URL 字符串
 */
export const formatURL = (url: string): string => {
  if (!url) return ''
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`
  }
  return url
}
