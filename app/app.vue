<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Language Switch Overlay -->
    <Transition name="fade">
      <div 
        v-if="isLanguageSwitching" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
      >
        <div class="text-center">
          <!-- Spinning Icon -->
          <div class="relative w-16 h-16 mx-auto mb-4">
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin"></div>
          </div>
          
          <!-- Switching Text -->
          <p class="text-lg text-amber-400 font-medium animate-pulse">
            {{ locale === 'zh' ? '切换中...' : 'Switching...' }}
          </p>
        </div>
      </div>
    </Transition>

    <NuxtRouteAnnouncer />
    
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- Gradient Orbs -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
    </div>

    <!-- Content -->
    <Transition name="page" mode="out-in">
      <div :key="locale" class="relative z-10">
        <LayoutNavbar @language-switching="handleLanguageSwitching" />
        
        <main class="pt-20">
          <NuxtPage />
        </main>

        <LayoutFooter />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const isLanguageSwitching = ref(false)

const handleLanguageSwitching = async (switching: boolean) => {
  isLanguageSwitching.value = switching
  if (switching) {
    // 语言切换动画持续时间
    await new Promise(resolve => setTimeout(resolve, 500))
    isLanguageSwitching.value = false
  }
}
</script>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Page transition for language switch */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
