<template>
  <UiCard class="p-6 relative overflow-hidden" :hover="false" variant="dark">
    <!-- Icon (背景层) -->
    <div
      class="absolute top-4 right-4 p-2 rounded-xl bg-gradient-to-br opacity-100 "
      :class="iconGradient"
    >
      <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="icon === 'chart'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        <path v-else-if="icon === 'trending'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        <path v-else-if="icon === 'users'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <!-- 内容层 -->
    <div class="relative z-10">
    <div class="mb-4 pr-12">
      <h3 class="text-lg font-semibold text-white font-heading">{{ title }}</h3>
    </div>

    <div class="flex items-center justify-between">
      <div class="text-3xl font-bold text-white font-heading">{{ formattedValue }}</div>
      <div class="text-sm text-slate-400">{{ subtitle }}</div>
    </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  subtitle?: string
  change?: number
  showChart?: boolean
  icon?: 'chart' | 'trending' | 'users' | 'dollar'
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  change: 0,
  showChart: true,
  icon: 'chart'
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(props.value)
  }
  return props.value
})

const iconGradient = computed(() => {
  const gradients = {
    chart: 'from-violet-500 to-purple-600',
    trending: 'from-emerald-500 to-teal-600',
    users: 'from-blue-500 to-cyan-600',
    dollar: 'from-amber-500 to-orange-600'
  }
  return gradients[props.icon]
})

</script>
