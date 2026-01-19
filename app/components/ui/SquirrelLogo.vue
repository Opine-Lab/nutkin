<template>
  <svg
    viewBox="0 0 200 200"
    :class="['transition-transform duration-300', $attrs.class]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- 松鼠身体 -->
    <ellipse cx="100" cy="120" rx="35" ry="45" :fill="bodyColor" />
    
    <!-- 松鼠头部 -->
    <circle cx="100" cy="70" r="30" :fill="bodyColor" />
    
    <!-- 松鼠耳朵 -->
    <ellipse cx="85" cy="50" rx="8" ry="15" :fill="bodyColor" />
    <ellipse cx="115" cy="50" rx="8" ry="15" :fill="bodyColor" />
    
    <!-- 松鼠眼睛 -->
    <circle cx="90" cy="70" r="4" fill="#0F172A" />
    <circle cx="110" cy="70" r="4" fill="#0F172A" />
    <circle cx="91" cy="69" r="1.5" fill="white" />
    <circle cx="111" cy="69" r="1.5" fill="white" />
    
    <!-- 松鼠鼻子 -->
    <circle cx="100" cy="78" r="3" fill="#334155" />
    
    <!-- 松鼠嘴巴 -->
    <path d="M 100 78 Q 95 82 92 80" stroke="#334155" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <path d="M 100 78 Q 105 82 108 80" stroke="#334155" stroke-width="1.5" fill="none" stroke-linecap="round" />
    
    <!-- 松鼠前爪 -->
    <ellipse cx="75" cy="130" rx="10" ry="18" :fill="bodyColor" />
    <ellipse cx="125" cy="130" rx="10" ry="18" :fill="bodyColor" />
    
    <!-- 松鼠大尾巴 (标志性特征) -->
    <path
      d="M 130 110 Q 160 100 170 70 Q 175 40 165 20 Q 155 10 140 15 Q 130 20 125 35 Q 120 50 118 70 Q 117 90 120 105"
      :fill="tailColor"
      opacity="0.9"
    />
    
    <!-- 尾巴细节 -->
    <path
      d="M 135 105 Q 160 95 168 68 Q 172 45 163 28"
      stroke="#F59E0B"
      stroke-width="2"
      fill="none"
      opacity="0.5"
    />
    
    <!-- Nutkin 字母 N (融入设计) -->
    <text
      v-if="showText"
      x="100"
      y="190"
      text-anchor="middle"
      :fill="textColor"
      font-size="24"
      font-weight="700"
      font-family="Space Grotesk, sans-serif"
    >
      N
    </text>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'gold' | 'purple'
  showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showText: false
})

const bodyColor = computed(() => {
  const colors = {
    default: '#F59E0B',
    gold: '#FBBF24',
    purple: '#8B5CF6'
  }
  return colors[props.variant]
})

const tailColor = computed(() => {
  const colors = {
    default: '#F59E0B',
    gold: '#FBBF24',
    purple: '#A78BFA'
  }
  return colors[props.variant]
})

const textColor = computed(() => {
  return props.variant === 'purple' ? '#A78BFA' : '#F59E0B'
})
</script>
