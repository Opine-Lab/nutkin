<template>
  <div class="h-96 flex flex-col">
    <!-- 标题栏 -->
    <div class="flex items-center justify-between mb-3 flex-shrink-0">
      <div class="text-sm font-medium text-slate-300">{{ $t('analytics.priceTrend') }}</div>
      <div class="flex items-center gap-2">
        <!-- 时间间隔选择 -->
        <div class="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1" style="transform-origin: center; transform: scale(1); font-size: 12px;">
          <button
            v-for="option in intervalOptions"
            :key="option.value"
            @click="emit('change-interval', option.value)"
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
    <!-- 图表容器 -->
    <div class="flex-1">
      <ClientOnly>
        <div :id="chartId" class="w-full h-full"></div>
        <template #fallback>
          <div class="w-full h-full flex items-center justify-center text-slate-400">
            加载中...
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { fetchKlineData, type KlineData } from '~/api/brc20'

interface IntervalOption {
  label: string
  value: string
}

interface Props {
  chartId: string
  selectedInterval: string
  intervalOptions: IntervalOption[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'change-interval', interval: string): void
}>()

let chartInstance: ECharts | null = null
let refreshTimer: number | null = null

// 处理窗口大小改变
const handleResize = () => {
  if (chartInstance && !chartInstance.isDisposed()) {
    const isMobile = window.innerWidth < 768
    const gridRight = isMobile ? '2px' : '8px'
    
    chartInstance.setOption({
      grid: {
        right: gridRight
      }
    })
    
    chartInstance.resize()
  }
}

// 初始化 ECharts
const initChart = () => {
  const chartContainer = document.getElementById(props.chartId)
  
  if (!chartContainer) {
    console.log('chart-container not found, skipping chart initialization')
    return
  }
  

  chartInstance = echarts.init(chartContainer)

  
  const isMobile = window.innerWidth < 768
  const gridRight = isMobile ? '2px' : '8px'
  
  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '0',
      right: gridRight,
      bottom: '0',
      top: '20px',
      containLabel: true
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
        fontSize: 10,
        margin: 8
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
        barMaxWidth: 20,
        barMinWidth: 3,
        barWidth: '60%',
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

  
    const tokenAddress = '0x5463191b2705596b89e000fdcd60206daa2df8ff'
    const response = await fetchKlineData(tokenAddress, props.selectedInterval, 500)
    
    if (response.klines && response.klines.length > 0) {
      const chartData = response.klines.map((item: KlineData) => [
        item.open_time,
        item.open,
        item.close,
        item.low,
        item.high,
        parseFloat(item.volume_wbtc)
      ])
      
      // 填充空白时间段
      const filledData: any[] = []
      let lastValidPrice = chartData[0] ? chartData[0][2] : 0
      
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
      
      const intervalMs = getIntervalMs(props.selectedInterval)
      
      if (chartData.length > 0 && chartData[0] && chartData[0][0]) {
        const startTime = chartData[0][0] as number
        const lastItem = chartData[chartData.length - 1]
        const endTime = lastItem ? lastItem[0] as number : startTime
        
        let currentTime = startTime
        let dataIndex = 0
        
        while (currentTime <= endTime) {
          const currentData = chartData[dataIndex]
          if (dataIndex < chartData.length && currentData && currentData[0] === currentTime) {
            filledData.push(currentData)
            lastValidPrice = currentData[2] as number
            dataIndex++
          } else {
            filledData.push([
              currentTime,
              lastValidPrice,
              lastValidPrice,
              lastValidPrice,
              lastValidPrice,
              0
            ])
          }
          
          currentTime += intervalMs
        }
      }
      
      
      // 设置缩放比例
      let zoomStart: number
      let zoomEnd: number
      
      if (props.selectedInterval === '1m') {
        zoomStart = 99
        zoomEnd = 100
      } else if (props.selectedInterval === '5m') {
        zoomStart = 83.33
        zoomEnd = 100
      } else if (props.selectedInterval === '15m') {
        zoomStart = 50
        zoomEnd = 100
      } else {
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
          dataZoom: silent ? undefined : [
            {
              start: zoomStart,
              end: zoomEnd
            },
            {
              start: zoomStart,
              end: zoomEnd
            }
          ]
        }, false, silent)
      }
      
      if (!silent) {
        console.log('图表数据更新完成')
      }
    }
  } catch (error) {
    console.error('Failed to load kline data:', error)
  }
}

// 启动自动刷新
const startAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  
  refreshTimer = window.setInterval(() => {
    loadKlineData(true)
  }, 30000)
  
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

// 监听 selectedInterval 变化
watch(() => props.selectedInterval, () => {
  loadKlineData()
})

onMounted(() => {
  
  
  setTimeout(() => {

    const chartContainer = document.getElementById(props.chartId)
  
    
    if (chartContainer) {
      
      initChart()
      
      setTimeout(() => {
        console.log('准备加载 K 线数据')
        loadKlineData()
        
        setTimeout(() => {
          startAutoRefresh()
        }, 1000)
      }, 500)
    } else {
      console.error('chart-container not found')
      setTimeout(() => {
        console.log('再次尝试初始化')
        const container = document.getElementById(props.chartId)
        console.log('container:', container)
        if (container) {
          initChart()
          setTimeout(() => {
            loadKlineData()
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
  
  window.addEventListener('resize', handleResize)
  
  console.log('=== PriceChart onMounted 结束 ===')
})

onUnmounted(() => {
  stopAutoRefresh()
  chartInstance?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>
