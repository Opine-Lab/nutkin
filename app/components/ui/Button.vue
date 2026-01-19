<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
      variantClasses,
      sizeClasses,
      $attrs.disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-900 focus:ring-amber-500',
    secondary: 'bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500',
    outline: 'border-2 border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 text-amber-400 focus:ring-amber-500',
    ghost: 'hover:bg-white/5 text-slate-300 hover:text-white focus:ring-slate-500'
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-base rounded-xl',
    lg: 'px-7 py-3.5 text-lg rounded-xl'
  }
  return sizes[props.size]
})
</script>
