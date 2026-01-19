<template>
  <div
    :class="[
      'rounded-2xl border backdrop-blur-xl transition-all duration-200',
      glassClasses,
      hoverClasses,
      $attrs.class
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  glass?: boolean
  hover?: boolean
  variant?: 'default' | 'dark' | 'darker'
}

const props = withDefaults(defineProps<Props>(), {
  glass: true,
  hover: true,
  variant: 'default'
})

const glassClasses = computed(() => {
  if (!props.glass) return 'bg-slate-800 border-slate-700'
  
  const variants = {
    default: 'bg-white/5 border-white/10',
    dark: 'bg-slate-900/50 border-slate-700/50',
    darker: 'bg-slate-950/70 border-slate-800/50'
  }
  return variants[props.variant]
})

const hoverClasses = computed(() => {
  return props.hover ? 'hover:bg-white/10 hover:border-white/20 cursor-pointer' : ''
})
</script>
