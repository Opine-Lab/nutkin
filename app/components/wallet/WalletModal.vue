<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <UiCard
          class="relative w-full max-w-md animate-scale-in"
          :hover="false"
          variant="darker"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-amber-500/20">
            <h3 class="text-xl font-bold text-white">
              {{ $t('wallet.selectWallet') }}
            </h3>
            <button
              @click="close"
              class="p-2 hover:bg-amber-500/20 rounded-lg transition-colors cursor-pointer"
              :aria-label="$t('wallet.close')"
            >
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Wallet List -->
          <div class="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
            <button
              v-for="wallet in supportedWallets"
              :key="wallet.id"
              @click="selectWallet(wallet)"
              class="w-full flex items-center justify-between p-4 rounded-lg border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all cursor-pointer group"
              :class="{
                'opacity-50': connecting && connectingWallet === wallet.id
              }"
              :disabled="connecting && connectingWallet === wallet.id"
            >
              <div class="flex items-center gap-4">
                <!-- Wallet Icon -->
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <component :is="getWalletIcon(wallet.icon)" class="w-8 h-8" />
                </div>

                <!-- Wallet Info -->
                <div class="text-left">
                  <div class="text-white font-medium group-hover:text-amber-400 transition-colors">
                    {{ wallet.name }}
                  </div>
                  <div class="text-xs text-slate-400">
                    {{ wallet.installed ? $t('wallet.installed') : $t('wallet.notInstalled') }}
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div v-if="connecting && connectingWallet === wallet.id" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs text-slate-400">{{ $t('wallet.connecting') }}</span>
              </div>
              <div v-else-if="!wallet.installed" class="text-xs text-orange-400">
                {{ $t('wallet.install') }}
              </div>
              <svg v-else class="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-amber-500/20">
            <p class="text-sm text-slate-400 text-center">
              {{ $t('wallet.secureConnection') }}
            </p>
          </div>
        </UiCard>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { WalletType } from '~/stores/wallet'
import type { WalletInfo } from '~/composables/useWallet'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'connected': []
}>()

const { supportedWallets, connectWallet } = useWallet()

const connecting = ref(false)
const connectingWallet = ref<WalletType | null>(null)

const close = () => {
  if (!connecting.value) {
    emit('update:modelValue', false)
  }
}

const selectWallet = async (wallet: WalletInfo) => {
  if (connecting.value) return
  
  connecting.value = true
  connectingWallet.value = wallet.id

  try {
    const success = await connectWallet(wallet.id)
    
    if (success) {
      emit('connected')
      emit('update:modelValue', false)
    }
  } finally {
    connecting.value = false
    connectingWallet.value = null
  }
}

// 获取钱包图标组件
const getWalletIcon = (icon: string) => {
  const icons: Record<string, any> = {
    unisat: h('div', { class: 'relative w-full h-full' }, [
      h('div', { class: 'absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg' }),
      h('div', { class: 'absolute inset-0 flex items-center justify-center' }, [
        h('svg', { viewBox: '0 0 24 24', fill: 'white', class: 'w-5 h-5' }, [
          h('path', { d: 'M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18L17.82 7 12 9.82 6.18 7 12 4.18zM6 8.82l5 2.86v6.68l-5-3.13V8.82zm7 9.54v-6.68l5-2.86v6.41l-5 3.13z' })
        ])
      ])
    ]),
    okx: h('div', { class: 'relative w-full h-full' }, [
      h('div', { class: 'absolute inset-0 bg-black rounded-lg' }),
      h('div', { class: 'absolute inset-0 flex items-center justify-center' }, [
        h('svg', { viewBox: '0 0 24 24', fill: 'white', class: 'w-5 h-5' }, [
          h('rect', { x: '3', y: '3', width: '7', height: '7', rx: '1' }),
          h('rect', { x: '14', y: '3', width: '7', height: '7', rx: '1' }),
          h('rect', { x: '3', y: '14', width: '7', height: '7', rx: '1' }),
          h('rect', { x: '14', y: '14', width: '7', height: '7', rx: '1' })
        ])
      ])
    ]),
    xverse: h('div', { class: 'relative w-full h-full' }, [
      h('div', { class: 'absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg' }),
      h('div', { class: 'absolute inset-0 flex items-center justify-center' }, [
        h('svg', { viewBox: '0 0 24 24', fill: 'white', class: 'w-5 h-5' }, [
          h('path', { d: 'M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5' })
        ])
      ])
    ]),
    leather: h('div', { class: 'relative w-full h-full' }, [
      h('div', { class: 'absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg' }),
      h('div', { class: 'absolute inset-0 flex items-center justify-center' }, [
        h('svg', { viewBox: '0 0 24 24', fill: 'white', class: 'w-5 h-5' }, [
          h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }),
          h('polyline', { points: '9 22 9 12 15 12 15 22' })
        ])
      ])
    ]),
    magiceden: h('div', { class: 'relative w-full h-full' }, [
      h('div', { class: 'absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg' }),
      h('div', { class: 'absolute inset-0 flex items-center justify-center' }, [
        h('svg', { viewBox: '0 0 24 24', fill: 'white', class: 'w-5 h-5' }, [
          h('circle', { cx: '12', cy: '12', r: '10' }),
          h('path', { d: 'M8 14s1.5 2 4 2 4-2 4-2', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }),
          h('line', { x1: '9', y1: '9', x2: '9.01', y2: '9' }),
          h('line', { x1: '15', y1: '9', x2: '15.01', y2: '9' })
        ])
      ])
    ])
  }
  
  return icons[icon] || icons.unisat
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease;
}
</style>
