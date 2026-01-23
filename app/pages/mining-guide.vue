<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span class="text-sm font-medium text-amber-400">{{ $t('miningGuide.badge') }}</span>
          </div>
          <h1 class="text-4xl lg:text-6xl font-bold mb-4 text-white font-heading">
            {{ $t('miningGuide.title') }}
          </h1>
          <p class="text-lg text-slate-300 max-w-3xl mx-auto">
            {{ $t('miningGuide.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20 px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Step 1: Deposit BTC -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-amber-400">1</span>
            </div>
            <h2 class="text-2xl font-bold text-white">{{ $t('miningGuide.step1.title') }}</h2>
          </div>

          <div class="space-y-4 ml-11">
            <p class="text-slate-300 leading-relaxed">{{ $t('miningGuide.step1.desc1') }}</p>
            <a 
              href="https://bestinslot.xyz/brc2.0/nutkin" 
              target="_blank"
              class="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-sm"
            >
              https://bestinslot.xyz/brc2.0/nutkin
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <!-- Screenshot: BestinSlot AMM Website -->
            <div class="rounded-lg overflow-hidden border border-slate-700/50">
              <img src="/img/0.jpg" alt="BestinSlot AMM 网站界面" class="w-full h-auto" />
            </div>

            <div class="bg-blue-500/5 border-l-4 border-blue-500 p-4 rounded">
              <h4 class="text-white font-semibold mb-2 text-sm">💡 {{ $t('miningGuide.step1.tipTitle') }}</h4>
              <p class="text-sm text-slate-300 leading-relaxed">{{ $t('miningGuide.step1.tipDesc') }}</p>
            </div>

            <!-- Screenshot: Deposit Flow -->
            <div class="rounded-lg overflow-hidden border border-slate-700/50">
              <img src="/img/2.png" alt="存款流程" class="w-full h-auto" />
            </div>

            <div class="bg-amber-500/5 border-l-4 border-amber-500 p-4 rounded">
              <h4 class="text-amber-400 font-semibold mb-2 text-sm">⚠️ {{ $t('miningGuide.step1.warningTitle') }}</h4>
              <p class="text-sm text-slate-300 leading-relaxed">{{ $t('miningGuide.step1.warningDesc') }}</p>
            </div>

            <!-- Screenshot: Minimum LP Warning -->
            <div class="rounded-lg overflow-hidden border border-slate-700/50">
              <img src="/img/3.jpg" alt="最小LP要求" class="w-full h-auto" />
            </div>
          </div>
        </div>

        <!-- Step 2: Deposit NUTKIN -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-blue-400">2</span>
            </div>
            <h2 class="text-2xl font-bold text-white">{{ $t('miningGuide.step2.title') }}</h2>
          </div>

          <div class="space-y-4 ml-11">
            <p class="text-slate-300 leading-relaxed">{{ $t('miningGuide.step2.desc1') }}</p>

            <!-- Screenshot: Deposit NUTKIN -->
            <div class="rounded-lg overflow-hidden border border-slate-700/50">
              <img src="/img/4.png" alt="存入NUTKIN代币" class="w-full h-auto" />
            </div>
            
            <div class="bg-purple-500/5 border-l-4 border-purple-500 p-4 rounded">
              <h4 class="text-white font-semibold mb-2 text-sm">📝 {{ $t('miningGuide.step2.noteTitle') }}</h4>
              <p class="text-sm text-slate-300 leading-relaxed">{{ $t('miningGuide.step2.noteDesc') }}</p>
            </div>

            <!-- Screenshots: Signature and Confirmation -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="rounded-lg overflow-hidden border border-slate-700/50">
                <img src="/img/5.jpg" alt="签名确认" class="w-full h-auto" />
              </div>
              <div class="rounded-lg overflow-hidden border border-slate-700/50">
                <img src="/img/6.jpg" alt="区块确认" class="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Add LP -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-purple-400">3</span>
            </div>
            <h2 class="text-2xl font-bold text-white">{{ $t('miningGuide.step3.title') }}</h2>
          </div>

          <div class="space-y-4 ml-11">
            <p class="text-slate-300 leading-relaxed">{{ $t('miningGuide.step3.desc1') }}</p>

            <!-- Screenshot: Add Liquidity -->
            <div class="rounded-lg overflow-hidden border border-slate-700/50">
              <img src="/img/7.png" alt="添加流动性" class="w-full h-auto" />
            </div>

            <p class="text-slate-300 leading-relaxed">{{ $t('miningGuide.step3.desc2') }}</p>

            <!-- Screenshots: Withdraw LP Token -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="rounded-lg overflow-hidden border border-slate-700/50">
                <img src="/img/8.png" alt="提取LP Token" class="w-full h-auto" />
              </div>
              <div class="rounded-lg overflow-hidden border border-slate-700/50">
                <img src="/img/9.png" alt="提取确认" class="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Start Mining -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <span class="text-lg font-bold text-green-400">4</span>
            </div>
            <h2 class="text-2xl font-bold text-white">{{ $t('miningGuide.step4.title') }}</h2>
          </div>

          <div class="space-y-4 ml-11">
            <p class="text-slate-300 leading-relaxed">{{ $t('miningGuide.step4.desc1') }}</p>
            <a 
              href="https://app.yuzo.xyz/mine/" 
              target="_blank"
              class="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-sm"
            >
              https://app.yuzo.xyz/mine/
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <!-- Screenshot: Connect Wallet -->
            <div class="rounded-lg overflow-hidden border border-slate-700/50">
              <img src="/img/10.jpg" alt="连接钱包" class="w-full h-auto" />
            </div>

            <p class="text-slate-300 leading-relaxed">{{ $t('miningGuide.step4.desc2') }}</p>

            <!-- Screenshots: Start Mining -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="rounded-lg overflow-hidden border border-slate-700/50">
                <img src="/img/11.jpg" alt="开始挖矿" class="w-full h-auto" />
              </div>
              <div class="rounded-lg overflow-hidden border border-slate-700/50">
                <img src="/img/12.jpg" alt="操作完成" class="w-full h-auto" />
              </div>
            </div>

            <div class="bg-green-500/5 border-l-4 border-green-500 p-4 rounded">
              <h4 class="text-green-400 font-semibold mb-2 text-sm">✅ {{ $t('miningGuide.step4.successTitle') }}</h4>
              <p class="text-sm text-slate-300 leading-relaxed">{{ $t('miningGuide.step4.successDesc') }}</p>
            </div>
          </div>
        </div>

        <!-- Mining Analysis -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 class="text-2xl font-bold text-white">{{ $t('miningGuide.analysis.title') }}</h2>
          </div>

          <div class="space-y-4 ml-9">
            <p class="text-slate-300 leading-relaxed">{{ $t('miningGuide.analysis.intro') }}</p>

            <div class="grid lg:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg font-bold text-amber-400">1</span>
                  <h3 class="font-semibold text-white text-sm">{{ $t('miningGuide.analysis.benefit1Title') }}</h3>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">{{ $t('miningGuide.analysis.benefit1Desc') }}</p>
              </div>

              <div class="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg font-bold text-blue-400">2</span>
                  <h3 class="font-semibold text-white text-sm">{{ $t('miningGuide.analysis.benefit2Title') }}</h3>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">{{ $t('miningGuide.analysis.benefit2Desc') }}</p>
              </div>

              <div class="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-lg p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg font-bold text-purple-400">3</span>
                  <h3 class="font-semibold text-white text-sm">{{ $t('miningGuide.analysis.benefit3Title') }}</h3>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">{{ $t('miningGuide.analysis.benefit3Desc') }}</p>
              </div>
            </div>

            <div class="bg-gradient-to-r from-amber-900/10 to-orange-900/10 border-l-4 border-amber-500 p-4 rounded">
              <h4 class="text-amber-400 font-semibold mb-2 text-sm flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {{ $t('miningGuide.analysis.modelTitle') }}
              </h4>
              <p class="text-slate-300 text-sm leading-relaxed">{{ $t('miningGuide.analysis.modelDesc') }}</p>
            </div>

            <!-- Screenshot: Mining Dashboard -->
            <div class="rounded-lg overflow-hidden border border-slate-700/50">
              <img src="/img/14.jpg" alt="挖矿情况仪表盘" class="w-full h-auto" />
            </div>
          </div>
        </div>

        <!-- Source & CTA -->
        <div class="grid lg:grid-cols-2 gap-6">
          <UiCard class="p-6 bg-slate-800/50" variant="dark">
            <div class="flex items-center gap-3 mb-3">
              <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-lg font-semibold text-white">{{ $t('miningGuide.source.title') }}</h3>
            </div>
            <a 
              href="https://x.com/SkyAAmen" 
              target="_blank"
              class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer text-sm"
            >
              @SkyAAmen
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </UiCard>

          <UiCard class="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30" variant="dark">
            <h3 class="text-lg font-semibold text-white mb-4">{{ $t('miningGuide.cta.title') }}</h3>
            <div class="flex flex-wrap gap-3">
              <a
                href="https://app.yuzo.xyz/mine/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 cursor-pointer"
              >
                {{ $t('miningGuide.cta.button') }}
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="/tutorial"
                class="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                查看教程
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </a>
            </div>
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: 'LP挖矿教程 - Nutkin',
  meta: [
    { name: 'description', content: 'Nutkin代币LP流动性挖矿完整教程，从存款BTC到开始挖矿的详细步骤指南' }
  ]
})
</script>
