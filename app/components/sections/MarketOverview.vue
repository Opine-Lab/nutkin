<template>
  <section id="market" class="py-16 px-4 ">
    <div class="max-w-7xl mx-auto">
      
      <div class="text-center mb-12 scroll-animate">
        <h2 class="text-3xl lg:text-4xl font-bold text-white font-heading mb-4">
          {{ $t('market.title') }}
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          {{ $t('market.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <MarketWidget
          class="scroll-animate scroll-animate-delay-1"
          :title="$t('market.totalMarketCap')"
          :value="token.marketCap"
          subtitle="BTC"
          icon="dollar"
        />
        <MarketWidget
          class="scroll-animate scroll-animate-delay-2"
          :title="$t('market.volume24h')"
          :value="token.volume24h"
          subtitle="BTC"
          icon="trending"
        />
        <MarketWidget
          class="scroll-animate scroll-animate-delay-3"
          :title="$t('market.activeTraders')"
          :value="token.holders.toString()"
          subtitle=""
          icon="users"
        />
        <MarketWidget
          class="scroll-animate scroll-animate-delay-4"
          title="TVL"
          :value="formatNumber(Number(token.tvl), { maximumFractionDigits: 4 })"
          subtitle="BTC"
          icon="chart"
        />
      </div>
    <div class="max-w-7xl mx-auto py-16 ">
      <ClientOnly>
        <div class="scroll-animate">
          <AnalyticsBRC20Analytics />
        </div>
      </ClientOnly>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { observeAll } = useScrollAnimation()
import { useBRC20Store } from '~/stores/brc20'
import { computed } from 'vue'

const brc20Store = useBRC20Store()
// 使用 computed 确保响应式，并提供默认值
const token = computed(() => brc20Store.tokens[0] || {
  key: '',
  name: '',
  nameZh: '',
  symbol: '',
  imageUrl: '',
  price: '0',
  change24h: 0,
  allVolume: '0',
  volume24h: '0',
  marketCap: '0',
  holders: '0',
  trustScore: 0,
  tvl: 0,
  gradient: 'from-amber-500 to-orange-600'
})

onMounted(() => {
  observeAll('.scroll-animate')
})
</script>
