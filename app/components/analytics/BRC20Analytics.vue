<template>
  <UiCard class="p-6" :hover="false" variant="darker">
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
      <div
        v-for="token in brc20Store.tokens"
        :key="token.symbol"
        class="group p-4 rounded-xl    transition-all cursor-pointer"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <!-- Token Icon -->
            <div class="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br flex items-center justify-center"
              :class="token.gradient"
            >
              <img 
                v-if="token.imageUrl" 
                :src="token.imageUrl" 
                :alt="token.symbol"
                class="w-full h-full object-cover"
                @error="handleImageError($event, token)"
              />
              <span v-else class="text-white font-bold text-sm">
                {{ token.symbol.slice(0, 2) }}
              </span>
            </div>
            
            <div>
              <div class="font-semibold text-white font-heading">{{ token.symbol }}</div>
            </div>
          </div>

          <div class="text-right">
            <div class="text-lg font-bold text-white font-heading transition-all duration-300">{{ token.price }}</div>
            <div
              :class="[
                'px-2 py-1 rounded-lg text-xs font-medium inline-block',
                token.change24h >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              ]"
            >
              {{ token.change24h >= 0 ? '+' : '' }}{{ token.change24h }}%
            </div>
          </div>
        </div>

        <!-- Additional Metrics -->
        <div class="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-3">
          <div>
            <div class="text-xs text-slate-500">{{ $t('analytics.volume24h') }}</div>
            <div class="text-sm font-medium text-slate-300 transition-all duration-300">{{ token.volume24h }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">{{ $t('analytics.marketCap') }}</div>
            <div class="text-sm font-medium text-slate-300 transition-all duration-300">{{ token.marketCap }}</div>
          </div>
          <div>
            <div class="text-xs text-slate-500">{{ $t('analytics.holders') }}</div>
            <div class="text-sm font-medium text-slate-300 transition-all duration-300">{{ token.holders }}</div>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-white/5">
          <div class="flex items-center justify-between mb-3">
            <div class="text-sm font-medium text-slate-300">价格走势</div>
            <div class="flex items-center gap-2">
              <!-- 时间间隔选择 -->
              <div class="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1" style="transform-origin: center; transform: scale(1); font-size: 12px;">
                <button
                  v-for="option in intervalOptions"
                  :key="option.value"
                  @click="changeInterval(option.value)"
                  :class="[
                    'px-2 py-1 rounded transition-all',
                    selectedInterval === option.value
                      ? 'bg-amber-500/30 text-amber-400 font-medium'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                  ]"
                  style="font-size: 12px; min-width: 32px;"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>
          <ClientOnly>
            <div id="chart-container" class="w-full h-96"></div>
            <template #fallback>
              <div class="w-full h-96 flex items-center justify-center text-slate-400">
                加载中...
              </div>
            </template>
          </ClientOnly>
        </div>

      </div>
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
import { fetchKlineData, type KlineData } from '~/api/brc20'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'

const brc20Store = useBRC20Store()
let chartInstance: ECharts | null = null
let refreshTimer: number | null = null // 自动刷新定时器

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
  loadKlineData()
  
  // 设置图表缩放，最新数据显示在三分之二处
  if (chartInstance && !chartInstance.isDisposed()) {
    let zoomStart: number
    let zoomEnd: number
    
    if (interval === '1m') {
      // 1m 时放大 100 倍，显示最后 1% 的数据
      zoomStart = 99
      zoomEnd = 100
    } else if (interval === '5m') {
      // 5m 时放大 6 倍，显示最后 16.67% 的数据
      zoomStart = 83.33
      zoomEnd = 100
    } else if (interval === '15m') {
      // 15m 时放大 2 倍，显示最后 50% 的数据
      zoomStart = 50
      zoomEnd = 100
    } else {
      // 其他时间间隔，显示后 2/3 的数据（最新数据在屏幕右侧 2/3 位置）
      zoomStart = 33.33
      zoomEnd = 100
    }
    
    chartInstance.setOption({
      dataZoom: [
        {
          start: zoomStart,
          end: zoomEnd
        },
        {
          start: zoomStart,
          end: zoomEnd
        }
      ]
    })
  }
}

// 启动自动刷新（每30秒）
const startAutoRefresh = () => {
  // 清除已有的定时器
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  
  // 每30秒静默刷新一次
  refreshTimer = window.setInterval(() => {
    // 使用静默模式刷新，不显示日志，不重置缩放
    loadKlineData(true)
  }, 30000) // 30秒 = 30000毫秒
  
  console.log('K 线图自动刷新已启动（每30秒，静默模式）')
}

// 停止自动刷新
const stopAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
    console.log('K 线图自动刷新已停止')
  }
}

// 处理图片加载失败
const handleImageError = (event: Event, token: any) => {
  // 图片加载失败时，隐藏图片，显示文字
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// 初始化 ECharts
const initChart = () => {
  const chartContainer = document.getElementById('chart-container')
  console.log('initChart called, chartContainer:', chartContainer)
  
  if (!chartContainer) {
    console.log('chart-container not found, skipping chart initialization')
    return
  }
  
  console.log('开始初始化 ECharts 实例...')
  chartInstance = echarts.init(chartContainer)
  console.log('ECharts 实例创建成功:', chartInstance)
  
  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '3%',
      right: '80px',
      bottom: '3%',
      top: '3%',
      containLabel: false
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(148, 163, 184, 0.2)',
      textStyle: {
        color: '#f1f5f9'
      },
      axisPointer: {
        type: 'cross',
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.3)'
        }
      },
      formatter: (params: any) => {
        const data = params[0]
        if (!data) return ''
        const time = new Date(data.value[0]).toLocaleString('zh-CN', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
        return `
          <div style="padding: 4px;">
            <div style="margin-bottom: 4px; color: #94a3b8;">${time}</div>
            <div>开: <span style="color: #f1f5f9;">${data.value[1]}</span></div>
            <div>收: <span style="color: ${data.value[2] >= data.value[1] ? '#10b981' : '#ef4444'};">${data.value[2]}</span></div>
            <div>高: <span style="color: #f1f5f9;">${data.value[3]}</span></div>
            <div>低: <span style="color: #f1f5f9;">${data.value[4]}</span></div>
            <div>量: <span style="color: #f1f5f9;">${data.value[5]}</span></div>
          </div>
        `
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      show: false,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      position: 'right',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        padding: [0, 0, 0, 10]
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      },
      {
        type: 'slider',
        show: false,
        start: 0,
        end: 100,
        height: 20,
        bottom: 0,
        borderColor: 'rgba(148, 163, 184, 0.2)',
        fillerColor: 'rgba(251, 191, 36, 0.2)',
        handleStyle: {
          color: '#fbbf24',
          borderColor: '#f59e0b'
        },
        textStyle: {
          color: '#94a3b8'
        },
        dataBackground: {
          lineStyle: {
            color: 'rgba(148, 163, 184, 0.3)'
          },
          areaStyle: {
            color: 'rgba(148, 163, 184, 0.1)'
          }
        }
      }
    ],
    series: [
      {
        type: 'candlestick',
        data: [],
        barMaxWidth: 20, // 限制 K 线柱最大宽度，避免 1d 时柱子太宽
        barMinWidth: 3,  // 设置最小宽度，保证柱子可见
        barWidth: '60%', // 柱子宽度相对于类目间隔的百分比，让柱子更紧凑
        itemStyle: {
          color: '#10b981',
          color0: '#ef4444',
          borderColor: '#10b981',
          borderColor0: '#ef4444'
        },
        emphasis: {
          itemStyle: {
            color: '#34d399',
            color0: '#f87171',
            borderColor: '#34d399',
            borderColor0: '#f87171'
          }
        }
      }
    ]
  }
  
  chartInstance.setOption(option)
  console.log('ECharts 配置已设置')
  
  // 监听缩放事件
  chartInstance.on('datazoom', (params: any) => {
    const option = chartInstance!.getOption()
    const dataZoom = option.dataZoom as any[]
    if (dataZoom && dataZoom.length > 0) {
      const zoom = dataZoom[0]
      console.log('=== 走势图缩放信息 ===')
      console.log('缩放开始位置:', zoom.start + '%')
      console.log('缩放结束位置:', zoom.end + '%')
      console.log('显示范围:', (zoom.end - zoom.start).toFixed(2) + '%')
      console.log('缩放比例:', (100 / (zoom.end - zoom.start)).toFixed(2) + 'x')
      console.log('=====================')
    }
  })
}

// 加载 K 线数据
const loadKlineData = async (silent: boolean = false) => {
  if (!chartInstance || chartInstance.isDisposed()) {
    console.log('Chart instance not ready or disposed')
    return
  }
  
  try {
    if (!silent) {
      console.log('开始加载 K 线数据...')
      console.log('当前时间间隔:', selectedInterval.value)
    }
    // 使用固定的 token 地址
    const tokenAddress = '0x5463191b2705596b89e000fdcd60206daa2df8ff'
    const response = await fetchKlineData(tokenAddress, selectedInterval.value, 500)
    
    if (!silent) {
      console.log('K 线数据加载成功:', response)
    }
    
    if (response.klines && response.klines.length > 0) {
      // 转换数据格式为 ECharts 需要的格式
      // [时间, 开盘, 收盘, 最低, 最高, 成交量]
      const chartData = response.klines.map((item: KlineData) => [
        item.open_time,
        item.open,
        item.close,
        item.low,
        item.high,
        parseFloat(item.volume_wbtc)
      ])
      
      // 填充空白时间段，使用前一个价格保持水平
      const filledData: any[] = []
      let lastValidPrice = chartData[0] ? chartData[0][2] : 0 // 使用第一个收盘价作为初始值
      
      // 计算时间间隔（毫秒）
      const getIntervalMs = (interval: string): number => {
        const map: { [key: string]: number } = {
          '1m': 60 * 1000,
          '5m': 5 * 60 * 1000,
          '15m': 15 * 60 * 1000,
          '1h': 60 * 60 * 1000,
          '4h': 4 * 60 * 60 * 1000,
          '1d': 24 * 60 * 60 * 1000
        }
        return map[interval] || 60 * 1000
      }
      
      const intervalMs = getIntervalMs(selectedInterval.value)
      
      if (chartData.length > 0 && chartData[0] && chartData[0][0]) {
        const startTime = chartData[0][0] as number
        const lastItem = chartData[chartData.length - 1]
        const endTime = lastItem ? lastItem[0] as number : startTime
        
        let currentTime = startTime
        let dataIndex = 0
        
        while (currentTime <= endTime) {
          // 检查当前时间是否有数据
          const currentData = chartData[dataIndex]
          if (dataIndex < chartData.length && currentData && currentData[0] === currentTime) {
            // 有数据，直接使用
            filledData.push(currentData)
            lastValidPrice = currentData[2] as number // 更新最后有效价格
            dataIndex++
          } else {
            // 没有数据，使用上一个有效价格填充（开盘=收盘=最高=最低）
            filledData.push([
              currentTime,
              lastValidPrice, // 开盘价
              lastValidPrice, // 收盘价
              lastValidPrice, // 最低价
              lastValidPrice, // 最高价
              0 // 成交量为0
            ])
          }
          
          currentTime += intervalMs
        }
      }
      
      if (!silent) {
        console.log('原始数据条数:', chartData.length)
        console.log('填充后数据条数:', filledData.length)
      }
      
      // 静默刷新时，只更新数据，不更新缩放
      if (silent) {
        // 静默更新，保持当前缩放状态
        if (!chartInstance.isDisposed()) {
          chartInstance.setOption({
            series: [
              {
                data: filledData.length > 0 ? filledData : chartData
              }
            ]
          }, false, true) // notMerge=false, lazyUpdate=true 实现静默更新
        }
      } else {
        // 非静默更新，设置缩放比例
        let zoomStart: number
        let zoomEnd: number
        
        if (selectedInterval.value === '1m') {
          // 1m 时放大 100 倍，显示最后 1% 的数据
          zoomStart = 99
          zoomEnd = 100
        } else if (selectedInterval.value === '5m') {
          // 5m 时放大 6 倍，显示最后 16.67% 的数据
          zoomStart = 83.33
          zoomEnd = 100
        } else if (selectedInterval.value === '15m') {
          // 15m 时放大 2 倍，显示最后 50% 的数据
          zoomStart = 50
          zoomEnd = 100
        } else {
          // 其他时间间隔，显示后 2/3 的数据
          zoomStart = 33.33
          zoomEnd = 100
        }
        
        if (!chartInstance.isDisposed()) {
          chartInstance.setOption({
            series: [
              {
                data: filledData.length > 0 ? filledData : chartData
              }
            ],
            dataZoom: [
              {
                start: zoomStart,
                end: zoomEnd
              },
              {
                start: zoomStart,
                end: zoomEnd
              }
            ]
          })
        }
      }
      
      if (!silent) {
        console.log('图表数据更新完成')
      }
    }
  } catch (error) {
    console.error('Failed to load kline data:', error)
  }
}

// 组件挂载时开始自动刷新
onMounted(() => {
  console.log('=== BRC20Analytics onMounted 开始 ===')
  brc20Store.startAutoRefresh()
  
  // 使用 setTimeout 替代 nextTick，给 ClientOnly 更多时间渲染
  setTimeout(() => {
    console.log('延迟 100ms 后检查 chart-container')
    const chartContainer = document.getElementById('chart-container')
    console.log('chartContainer:', chartContainer)
    
    if (chartContainer) {
      console.log('chart-container 已就绪，开始初始化图表')
      initChart()
      
      // 再延迟加载数据
      setTimeout(() => {
        console.log('准备加载 K 线数据')
        loadKlineData()
        
        // 数据加载后启动自动刷新
        setTimeout(() => {
          startAutoRefresh()
        }, 1000)
      }, 500)
    } else {
      console.error('chart-container not found')
      // 再次尝试
      setTimeout(() => {
        console.log('再次尝试初始化')
        const container = document.getElementById('chart-container')
        console.log('container:', container)
        if (container) {
          initChart()
          setTimeout(() => {
            loadKlineData()
            // 启动自动刷新
            setTimeout(() => {
              startAutoRefresh()
            }, 1000)
          }, 500)
        } else {
          console.error('第二次尝试失败，chart-container 仍未找到')
        }
      }, 1000)
    }
  }, 100)
  
  // 窗口大小改变时重绘图表
  window.addEventListener('resize', () => {
    if (chartInstance && !chartInstance.isDisposed()) {
      chartInstance.resize()
    }
  })
  
  console.log('=== BRC20Analytics onMounted 结束 ===')
})

// 组件销毁时停止自动刷新
onUnmounted(() => {
  brc20Store.stopAutoRefresh()
  stopAutoRefresh() // 停止 K 线图自动刷新
  chartInstance?.dispose()
  window.removeEventListener('resize', () => {
    chartInstance?.resize()
  })
})
</script>
