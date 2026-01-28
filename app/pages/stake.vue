<template>
  <div class="container mx-auto px-4 py-16">
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
        {{ $t('stake.title') }}
      </h1>
      <p class="text-lg text-slate-300 max-w-2xl mx-auto">
        {{ $t('stake.subtitle') }}
      </p>
    </div>

    <!-- Pool Statistics -->
    <div class="max-w-6xl mx-auto mb-16">
      <UiCard class="p-8 mb-10" variant="darker">
        <h3 class="text-xl font-semibold text-white mb-6">{{ $t('stake.poolStatistics') }}</h3>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/20 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 transform hover:scale-105">
            <div class="text-3xl font-bold text-amber-400 font-heading">{{ formatNumber(totalStaked) }}</div>
            <div class="text-sm text-slate-400 mt-1">{{ $t('stake.totalStaked') }}</div>
          </div>
          <div class="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 transform hover:scale-105">
            <div class="text-3xl font-bold text-emerald-400 font-heading">{{ formatNumber(participantCount) }}</div>
            <div class="text-sm text-slate-400 mt-1">{{ $t('stake.participantCount') }}</div>
          </div>
          <div class="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/20 border border-violet-500/30 hover:border-violet-400 transition-all duration-300 transform hover:scale-105">
            <div class="text-3xl font-bold text-violet-400 font-heading">26.68</div>
            <div class="text-sm text-slate-400 mt-1">挖矿速度 TH/s</div>
          </div>
        </div>
      </UiCard>

      <!-- My Stake Data and Actions -->
      <div class="grid lg:grid-cols-2 gap-10">
        <!-- My Stake Data -->
        <UiCard class="p-8" variant="darker">
          



          <!-- Top Stakers -->
          <div>
            <h4 class="text-lg font-semibold text-white mb-4">{{ $t('stake.topStakers') }}</h4>
            <div class="space-y-3">
              <div 
                v-for="(staker, index) in topStakers" 
                :key="index"
                class="flex items-center justify-between p-3 rounded-lg bg-slate-800/50"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {{ index + 1 }}
                  </div>
                  <div class="font-mono text-slate-300">{{ truncateAddress(staker.address) }}</div>
                </div>
                <div class="text-white font-medium">{{ formatNumber(staker.amount) }}</div>
              </div>
            </div>
          </div>
        </UiCard>

        <!-- Staking Actions -->
        <UiCard class="p-8" variant="darker">
          <h3 class="text-xl font-semibold text-white mb-6">{{ $t('stake.data.stakingActions') }}</h3>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/20 border border-amber-500/30">
              <div class="text-2xl font-bold text-amber-400 font-heading">{{ formatNumber(userInfo.balance) }}</div>
              <div class="text-sm text-slate-400 mt-1">{{ $t('stake.lpBalance') }}</div>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 border border-emerald-500/30">
              <div class="text-2xl font-bold text-emerald-400 font-heading flex items-center">
                {{ miningSpeed }}
                <span class="ml-1 text-sm">TH/s</span>
              </div>
              <div class="text-sm text-slate-400 mt-1">挖矿速度</div>
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/20 border border-blue-500/30">
              <div class="text-2xl font-bold text-blue-400 font-heading">{{ formatNumber(myStakeAmount) }}</div>
              <div class="text-sm text-slate-400 mt-1">{{ $t('stake.myStakeAmount') }}</div>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/20 border border-rose-500/30">
              <div class="text-2xl font-bold text-rose-400 font-heading">{{ formatNumber(myRewards) }}</div>
              <div class="text-sm text-slate-400 mt-1">{{ $t('stake.myRewards') }}</div>
            </div>
          </div>

          <div class="mb-8">
            <!-- 切换存款/取款界面 -->
            <div class="flex mb-6 border-b border-slate-700 pb-2">
              <button 
                @click="activeTab = 'deposit'"
                :class="['px-4 py-2 rounded-lg mr-2 transition-colors', activeTab === 'deposit' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white']"
              >
                {{ $t('stake.depositLpTokens') }}
              </button>
              <button 
                @click="activeTab = 'withdraw'"
                :class="['px-4 py-2 rounded-lg transition-colors', activeTab === 'withdraw' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'text-slate-400 hover:text-white']"
              >
                {{ $t('stake.withdrawLpTokens') }}
              </button>
            </div>
            
            <!-- 存款表单 -->
            <div v-if="activeTab === 'deposit'" class="mb-6">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-semibold text-white">{{ $t('stake.depositLpTokens') }}</h4>
                <div class="text-sm text-slate-400 flex items-center">
                  {{ $t('stake.available') }}: {{ formatNumber(availableBalance) }}
                  <button 
                    @click="setDepositMax" 
                    class="ml-3 px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>
              
              <div class="flex gap-3">
                <input 
                  v-model="depositAmount" 
                  type="number" 
                  :placeholder="$t('stake.enterAmount')" 
                  class="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  @click="deposit"
                  :disabled="!isConnected || !depositAmount || depositAmount <= 0"
                  class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ $t('stake.deposit') }}
                </button>
              </div>
            </div>
            
            <!-- 取款表单 -->
            <div v-if="activeTab === 'withdraw'" class="mb-6">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-semibold text-white">{{ $t('stake.withdrawLpTokens') }}</h4>
                <div class="text-sm text-slate-400 flex items-center">
                  {{ $t('stake.locked') }}: {{ formatNumber(userInfo.balance) }}
                  <button 
                    @click="setWithdrawMax" 
                    class="ml-3 px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>
              
              <div class="flex gap-3">
                <input 
                  v-model="withdrawAmount" 
                  type="number" 
                  :placeholder="$t('stake.enterAmount')" 
                  class="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  @click="withdraw"
                  :disabled="!isConnected || !withdrawAmount || withdrawAmount <= 0 || withdrawAmount > userInfo.balance"
                  class="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ $t('stake.withdraw') }}
                </button>
              </div>
            </div>
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWallet } from '~/composables/useWallet'
import { formatNumber } from '~/utils/format'

definePageMeta({
  layout: 'default',
  title: 'Staking & Mining',
  description: 'Stake LP tokens and earn rewards'
})

useSeoMeta({
  title: 'Staking & Mining - Nutkin BRC-20 Analysis Platform',
  description: 'Stake LP tokens and earn rewards on Nutkin platform',
  ogTitle: 'Staking & Mining - Nutkin',
  ogDescription: 'Stake LP tokens and earn rewards',
  ogType: 'website',
  ogUrl: 'https://nutkin.io/stake'
})

// 使用现有的比特币钱包连接
const { isConnected, address } = useWallet()

// 合约信息
const contractAddress = '0x3e6E167F074d3C9a35F06F6Ccce6D1d76438Ba5F'
const rpcUrl = 'https://mvp-6m4r.onrender.com/eth-rpc/rpc'

// 状态变量
const activeTab = ref<'deposit' | 'withdraw'>('deposit')
const depositAmount = ref<number | null>(null)
const withdrawAmount = ref<number | null>(null)
const userInfo = ref({
  balance: 0,
  lastUpdateBlock: 0,
  xp: 0
})
const claimableRewards = ref(0)
const availableBalance = ref(0)
const totalLPLocked = ref(0)
const rewardPerBlock = ref(0)
const participantCount = ref(0)
const miningSpeed = ref(26.68)

// 质押数据
const totalStaked = ref(0)
const myStakeAmount = ref(0)
const myRewards = ref(0)
const topStakers = ref([
  { address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', amount: 125000 },
  { address: 'bc1qwqdg6squsna38e46795at95yu84l600k5v3cjh', amount: 98000 },
  { address: 'bc1qgdcc3l03nh4rex4f8uwr8m40tg9m6k8cqjl05t', amount: 76500 },
  { address: 'bc1qxz4rtcsru0j74gqad0l03w7vxcyxxf2vyl6ezc', amount: 65200 },
  { address: 'bc1q07fs2yhdl900uj750p9kmncnw99kytljw666pj', amount: 54300 }
])

// 计算平均质押数量
const averageStake = computed(() => {
  if (participantCount.value === 0) return 0
  return totalStaked.value / participantCount.value
})

// 计算我的质押占比
const stakePercentage = computed(() => {
  if (totalStaked.value === 0) return 0
  return Math.round((myStakeAmount.value / totalStaked.value) * 100)
})

// 截断地址显示
const truncateAddress = (addr: string) => {
  if (!addr) return ''
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
}

// 初始化数据
const initializeData = async () => {
  if (!isConnected.value || !address.value) return

  try {
    // 模拟API调用获取用户数据 - 实际应用中需要替换为真实的API端点
    // 这里只是模拟返回数据，实际应该调用后端API
    userInfo.value = {
      balance: 1000,
      lastUpdateBlock: 1234567,
      xp: 500
    }
    
    claimableRewards.value = 50
    availableBalance.value = 2000
    totalLPLocked.value = 1000000
    rewardPerBlock.value = 10
    participantCount.value = 500
    
    // 质押数据
    totalStaked.value = 2450000
    myStakeAmount.value = isConnected.value && address.value 
      ? Math.floor(Math.random() * 10000) + 1000 
      : 0
    myRewards.value = isConnected.value && address.value 
      ? Math.floor(Math.random() * 500) + 50 
      : 0
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

// 发送RPC请求的辅助函数
const sendRpcRequest = async (method: string, params: any[] = []) => {
  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method,
        params
      })
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('RPC request failed:', error)
    throw error
  }
}

// 设置存款最大值
const setDepositMax = () => {
  if (isConnected.value) {
    depositAmount.value = availableBalance.value;
  }
}

// 设置取款最大值
const setWithdrawMax = () => {
  if (isConnected.value) {
    withdrawAmount.value = userInfo.value.balance;
  }
}

// 存款功能
const deposit = async () => {
  if (!isConnected.value || !depositAmount.value || depositAmount.value <= 0) return

  try {
    // 实际应用中需要实现具体的存款逻辑
    console.log(`Depositing ${depositAmount.value} tokens`)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新数据
    await initializeData()
    
    alert($t('stake.depositSuccess'))
  } catch (error) {
    console.error('Error depositing:', error)
    alert($t('stake.depositError'))
  }
}

// 取款功能
const withdraw = async () => {
  if (!isConnected.value || !withdrawAmount.value || withdrawAmount.value <= 0 || withdrawAmount.value > userInfo.value.balance) return

  try {
    // 实际应用中需要实现具体的取款逻辑
    console.log(`Withdrawing ${withdrawAmount.value} tokens`)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新数据
    await initializeData()
    
    alert($t('stake.withdrawSuccess'))
  } catch (error) {
    console.error('Error withdrawing:', error)
    alert($t('stake.withdrawError'))
  }
}

// 领取所有奖励
const claimAll = async () => {
  if (!isConnected.value || claimableRewards.value <= 0) return

  try {
    // 实际应用中需要实现具体的领取奖励逻辑
    console.log('Claiming all rewards')
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新数据
    await initializeData()
    
    alert($t('stake.claimSuccess'))
  } catch (error) {
    console.error('Error claiming rewards:', error)
    alert($t('stake.claimError'))
  }
}

// 取出所有质押的LP代币
const withdrawAll = async () => {
  if (!isConnected.value || userInfo.value.balance <= 0) return

  try {
    // 实际应用中需要实现具体的全部取出逻辑
    console.log('Withdrawing all staked LP tokens')
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新数据
    await initializeData()
    
    alert($t('stake.withdrawAllSuccess'))
  } catch (error) {
    console.error('Error withdrawing all:', error)
    alert($t('stake.withdrawAllError'))
  }
}

// 取出所有奖励
const withdrawAllRewards = async () => {
  if (!isConnected.value || claimableRewards.value <= 0) return

  try {
    // 实际应用中需要实现具体的全部奖励取出逻辑
    console.log('Withdrawing all rewards')
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新数据
    await initializeData()
    
    alert($t('stake.withdrawRewardsSuccess'))
  } catch (error) {
    console.error('Error withdrawing rewards:', error)
    alert($t('stake.withdrawRewardsError'))
  }
}

// 监听钱包连接状态变化
watchEffect(async () => {
  if (isConnected.value && address.value) {
    await initializeData()
  }
})

// 模拟挖矿速度动态变化
const updateMiningSpeed = () => {
  // 在一定范围内随机生成挖矿速度，模拟波动
  const baseSpeed = 26.68;
  const fluctuation = (Math.random() - 0.5) * 2; // -1 到 1 之间的波动
  miningSpeed.value = parseFloat((baseSpeed + fluctuation).toFixed(2));
};

// 每隔一段时间更新挖矿速度
onMounted(() => {
  const interval = setInterval(updateMiningSpeed, 3000); // 每3秒更新一次
  
  // 组件卸载时清除定时器
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
/* Add any specific styles for the staking page here */
</style>