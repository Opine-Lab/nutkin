<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
        {{ $t('market.title') }}
      </h1>
      <p class="text-lg text-slate-300 max-w-2xl mx-auto">
        {{ $t('market.subtitle') }}
      </p>
    </div>

    <!-- 市场分析组件 -->
    <div class="max-w-7xl mx-auto">
      <AnalyticsBRC20Analytics />
    </div>
    
    <!-- 交易活动分析 -->
    <div class="max-w-7xl mx-auto mt-12">
      <AnalyticsTradeActivityAnalysis />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Market Analytics',
  description: 'Real-time market data and analytics for BRC2.0 tokens'
})

useSeoMeta({
  title: 'Market Analytics - Nutkin BRC-2.0 Analysis Platform',
  description: 'Real-time market data and analytics for BRC2.0 tokens on Nutkin platform',
  ogTitle: 'Market Analytics - Nutkin',
  ogDescription: 'Real-time market data and analytics for BRC2.0 tokens',
  ogType: 'website',
  ogUrl: 'https://nutkin.io/market'
})

// 手动导入组件以确保正确注册
import AnalyticsTradeActivityAnalysis from '~/components/analytics/TradeActivityAnalysis.vue'
</script>

<style scoped>
/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
}
</style>