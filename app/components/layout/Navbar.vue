<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="scrolled ? 'py-0' : 'py-4'">
    <nav class="max-w-7xl mx-auto px-4">
      <UiCard 
        class="px-6 transition-all duration-300" 
        :class="[
          scrolled ? 'py-3 bg-slate-900/98 backdrop-blur-2xl shadow-2xl border-amber-500/30' : 'py-4 bg-white/10',
        ]"
        :hover="false"
        variant="darker"
      >
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a 
            href="/" 
            class="flex items-center gap-3 cursor-pointer"
            @click="handleLogoClick"
          >
            <img 
              src="/logo.png" 
              alt="NUTKIN Logo"
              class="w-10 h-10 hover:scale-110 transition-transform"
            />
            <div class="flex flex-col">
              <span class="text-xl font-bold text-amber-400 font-heading">
                NUTKIN
              </span>
              <span class="text-xs text-slate-400 ">
                BRC2.0 
              </span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-8">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              @click="!item.external ? handleNavClick($event, item.href) : null"
              class="relative text-slate-300 hover:text-amber-400 transition-all duration-300 text-sm font-medium cursor-pointer group flex items-center gap-1.5"
            >
              <!-- Icon for Home -->
              <svg v-if="item.name === 'Home'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <!-- Icon for Market -->
              <svg v-if="item.name === 'Market'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <!-- Icon for Staking -->
              <svg v-if="item.name === 'Staking'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <!-- Icon for Community -->
              <svg v-if="item.name === 'Community'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <!-- Icon for Platform (DEX) -->
              <svg v-if="item.name === 'Platform'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <!-- Icon for Mining -->
              <svg v-if="item.name === 'Mining'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <!-- Icon for Mining Guide -->
              <svg v-if="item.name === 'MiningGuide'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="relative">
                {{ $t(item.key) }}
                <!-- External Link Icon -->
                <svg v-if="item.external" class="w-3 h-3 absolute -top-1 -right-3 text-amber-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Language Toggle -->
            <button
              type="button"
              @click.stop="toggleLanguage"
              class="p-2 rounded-lg hover:bg-amber-500/20 transition-all duration-200 cursor-pointer group relative"
              :aria-label="locale === 'zh' ? 'Switch to English' : '切换到中文'"
            >
              <svg class="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {{ locale === 'zh' ? 'EN' : '中文' }}
              </span>
            </button>

            <!-- Wallet Connection Button -->
            <button
              v-if="!isConnected"
              type="button"
              @click="handleConnectWallet"
              class="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 cursor-pointer font-medium text-sm shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>{{ $t('wallet.connectWallet') }}</span>
            </button>

            <!-- Connected Wallet Info -->
            <div
              v-else
              class="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg transition-all duration-200 cursor-pointer group relative wallet-dropdown-container"
              @click="toggleWalletMenu"
            >
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-slate-300 text-sm font-medium">{{ formattedAddress }}</span>
              <svg class="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>

              <!-- Wallet Dropdown Menu -->
              <div
                v-if="walletMenuOpen"
                class="absolute top-full right-0 mt-2 w-64 bg-slate-900 rounded-lg border border-amber-500/30 shadow-2xl overflow-hidden animate-fade-in"
                @click.stop
              >
                <div class="p-4 border-b border-amber-500/20">
                  <div class="text-xs text-slate-400 mb-1">{{ walletName }}</div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-white font-mono">{{ formattedAddress }}</span>
                    <button
                      @click="copyAddress"
                      class="p-1 hover:bg-amber-500/20 rounded transition-colors cursor-pointer"
                      :title="$t('wallet.copyAddress')"
                    >
                      <svg class="w-4 h-4 text-slate-400 hover:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="p-4 border-b border-amber-500/20">
                  <div class="text-xs text-slate-400 mb-1">{{ $t('wallet.balance') }}</div>
                  <div class="text-lg text-white font-bold">{{ formattedBalance }} BTC</div>
                </div>
                <div class="p-2">
                  <button
                    @click="handleDisconnect"
                    class="w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer text-sm flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {{ $t('wallet.disconnect') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden p-2 rounded-lg hover:bg-amber-500/20 transition-all duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div
          v-if="mobileMenuOpen"
          class="lg:hidden mt-4 pt-4 border-t border-amber-500/20 flex flex-col gap-3 animate-fade-in"
        >
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            @click="!item.external ? handleNavClick($event, item.href) : null"
            class="text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200 text-sm font-medium cursor-pointer py-2 px-3 rounded-lg flex items-center gap-2"
          >
            <!-- Icon for Home -->
            <svg v-if="item.name === 'Home'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <!-- Icon for Market -->
            <svg v-if="item.name === 'Market'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <!-- Icon for Staking -->
            <svg v-if="item.name === 'Staking'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <!-- Icon for Community -->
            <svg v-if="item.name === 'Community'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <!-- Icon for Platform (DEX) -->
            <svg v-if="item.name === 'Platform'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <!-- Icon for Mining -->
            <svg v-if="item.name === 'Mining'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <!-- Icon for Mining Guide -->
            <svg v-if="item.name === 'MiningGuide'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span class="relative">
              {{ $t(item.key) }}
              <!-- External Link Icon -->
              <svg v-if="item.external" class="w-3 h-3 absolute -top-1 -right-3 text-amber-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
          


          <!-- Mobile Wallet Connection -->
          <button
            v-if="!isConnected"
            type="button"
            @click="handleConnectWallet"
            class="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 cursor-pointer font-medium text-sm"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>{{ $t('wallet.connectWallet') }}</span>
          </button>

          <!-- Mobile Connected Wallet -->
          <button
            v-else
            @click="showMobileDisconnectModal = true"
            class="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div class="flex flex-col items-start">
                <span class="text-slate-300 text-sm font-medium">{{ formattedAddress }}</span>
                <span class="text-xs text-slate-400">
                  {{ formattedBalance }} BTC
                </span>
              </div>
            </div>
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </UiCard>
    </nav>

    <!-- Wallet Selection Modal -->
    <WalletModal
      v-model="showWalletModal"
      @connected="handleWalletConnected"
    />

    <!-- Mobile Disconnect Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showMobileDisconnectModal"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="showMobileDisconnectModal = false"
          @touchstart="handleModalTouchStart"
          @touchmove="handleModalTouchMove"
        >
          <!-- Backdrop -->
          <div 
            class="absolute inset-0 bg-black/70 backdrop-blur-sm"
            @click="showMobileDisconnectModal = false"
          ></div>

          <!-- Modal Content -->
          <UiCard
            class="relative w-full max-w-sm animate-scale-in"
            :hover="false"
            variant="darker"
          >
            <!-- Header -->
            <div class="flex flex-col items-center p-6 border-b border-amber-500/20">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">
                {{ walletName }}
              </h3>
              <p class="text-sm text-slate-400 font-mono">{{ formattedAddress }}</p>
            </div>

            <!-- Balance -->
            <div class="p-6 border-b border-amber-500/20 text-center">
              <div class="text-xs text-slate-400 mb-1">{{ $t('wallet.balance') }}</div>
              <div class="text-2xl text-white font-bold">{{ formattedBalance }} BTC</div>
            </div>

            <!-- Actions -->
            <div class="p-4 flex gap-3">
              <button
                @click="showMobileDisconnectModal = false"
                class="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors cursor-pointer font-medium"
              >
                {{ $t('wallet.cancel') }}
              </button>
              <button
                @click="handleDisconnect; showMobileDisconnectModal = false"
                class="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors cursor-pointer font-medium flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {{ $t('wallet.disconnect') }}
              </button>
            </div>
          </UiCard>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

// Wallet connection
const { isConnected, address, balance, connectWallet, disconnectWallet, formatAddress, formatBalance, walletType } = useWallet()

const emit = defineEmits<{
  'language-switching': [boolean]
}>()

const navItems = [
  { name: 'Home', key: 'nav.home', href: '/', external: false },
  { name: 'Market', key: 'nav.market', href: '/#market', external: false },
  { name: 'Staking', key: 'nav.staking', href: '/#mining', external: false },
  { name: 'Community', key: 'nav.community', href: '/#community', external: false },
  { name: 'Platform', key: 'nav.platform', href: '/#platform', external: false },
  { name: 'MiningGuide', key: 'nav.miningGuide', href: '/mining-guide', external: false },
  { name: 'Mining', key: 'nav.mining', href: 'https://app.yuzo.xyz/mine/', external: true },
]

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('')
const walletMenuOpen = ref(false)
const showWalletModal = ref(false)
const showMobileDisconnectModal = ref(false)

// Wallet computed properties
const formattedAddress = computed(() => {
  if (!address.value) return ''
  return formatAddress(address.value)
})

const formattedBalance = computed(() => {
  if (!balance.value) return '0.00000000'
  return formatBalance(balance.value)
})

// 获取钱包显示名称
const walletName = computed(() => {
  const walletMap: Record<string, string> = {
    'unisat': 'UniSat',
    'okx': 'OKX',
    'xverse': 'Xverse',
    'leather': 'Leather',
    'magiceden': 'Magic Eden'
  }
  return walletType.value ? walletMap[walletType.value] || walletType.value : ''
})

// Wallet actions
const handleConnectWallet = () => {
  showWalletModal.value = true
}

const handleWalletConnected = () => {
  console.log('钱包连接成功')
}

const handleDisconnect = () => {
  disconnectWallet()
  walletMenuOpen.value = false
}

const toggleWalletMenu = () => {
  walletMenuOpen.value = !walletMenuOpen.value
}

const copyAddress = async () => {
  if (!address.value) return
  
  try {
    await navigator.clipboard.writeText(address.value)
    console.log('地址已复制')
    // 可以添加一个 Toast 提示
  } catch (error) {
    console.error('复制失败:', error)
  }
}

// 触摸事件处理 - 用于移动端弹窗外滑动关闭
let touchStartY = 0
const handleModalTouchStart = (event: TouchEvent) => {
  const touches = event.touches
  if (!touches || touches.length === 0) return
  const target = event.target as HTMLElement
  // 如果触摸的是背景遮罩，记录起始位置
  if (target.classList.contains('bg-black\/70') || target === event.currentTarget) {
    touchStartY = touches[0]?.clientY || 0
  }
}

const handleModalTouchMove = (event: TouchEvent) => {
  const touches = event.touches
  if (!touches || touches.length === 0) return
  const target = event.target as HTMLElement
  // 如果在背景遮罩上滑动，关闭弹窗
  if (target.classList.contains('bg-black\/70') || target === event.currentTarget) {
    const touchY = touches[0]?.clientY || 0
    const diff = Math.abs(touchY - touchStartY)
    // 滑动超过 30px 就关闭
    if (diff > 30) {
      showMobileDisconnectModal.value = false
    }
  }
}

// Close wallet menu when clicking outside
if (import.meta.client) {
  onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // 检查是否点击了钱包下拉菜单外部
      if (walletMenuOpen.value && !target.closest('.wallet-dropdown-container')) {
        walletMenuOpen.value = false
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
  })
}

const toggleLanguage = async (event?: Event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  
  // 触发切换动画
  emit('language-switching', true)
  
  // 等待一下，让动画显示
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // 切换语言
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  setLocale(newLocale)
  
  // 动画结束由 app.vue 处理
}

const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const handleNavClick = (event: Event, href: string) => {
  // 关闭移动端菜单
  mobileMenuOpen.value = false
  
  // 如果是首页链接
  if (href === '/') {
    const currentPath = import.meta.client ? window.location.pathname : '/'
    // 如果已经在首页，阻止默认行为并滚动到顶部
    if (currentPath === '/' || currentPath === '') {
      event.preventDefault()
      scrollToTop()
    }
    // 否则让默认行为处理（跳转到首页）
    return
  }
  
  // 如果是挖矿页面链接，使用路由跳转
  if (href === '/mining') {
    return // 让默认行为处理
  }
  
  // 如果是锚点链接
  if (href.startsWith('#')) {
    event.preventDefault()
    
    // 检查当前是否在首页
    const currentPath = import.meta.client ? window.location.pathname : '/'
    
    if (currentPath !== '/' && currentPath !== '') {
      // 如果不在首页，先跳转到首页，然后滚动到对应区域
      if (import.meta.client) {
        window.location.href = '/' + href
      }
    } else {
      // 在首页，直接滚动到对应区域
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        // 更新 URL hash
        history.pushState(null, '', href)
      }
    }
  }
}

const handleLogoClick = (event: Event) => {
  const currentPath = import.meta.client ? window.location.pathname : '/'
  
  // 如果已经在首页，阻止默认行为并滚动到顶部
  if (currentPath === '/' || currentPath === '') {
    event.preventDefault()
    scrollToTop()
  }
  // 否则让默认行为处理（跳转到 / ）
}

const openTradePage = () => {
  if (import.meta.client) {
    window.open('https://bestinslot.xyz/brc2.0/nutkin', '_blank')
  }
}

// 监听滚动事件
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  
  // 滚动时关闭钱包下拉框
  if (walletMenuOpen.value) {
    walletMenuOpen.value = false
  }
  
  // 更新 active section 和 URL hash
  const sections = ['hero', 'market', 'mining', 'community', 'platform']
  const scrollPosition = window.scrollY + 100 // 偏移量，提前触发
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetBottom = offsetTop + element.offsetHeight
      
      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        activeSection.value = sectionId
        // 更新 URL hash，但不触发滚动
        if (window.location.hash !== `#${sectionId}`) {
          history.replaceState(null, '', `#${sectionId}`)
        }
        break
      }
    }
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
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
