import { defineStore } from 'pinia'

export type WalletType = 'unisat' | 'xverse' | 'okx' | 'leather' | 'magiceden'

export interface WalletState {
  address: string
  publicKey: string
  balance: number
  isConnected: boolean
  walletType: WalletType | null
}

export const useWalletStore = defineStore('wallet', {
  state: (): WalletState => ({
    address: '',
    publicKey: '',
    balance: 0,
    isConnected: false,
    walletType: null
  }),

  getters: {
    // 格式化的地址（前6后4）
    formattedAddress: (state) => {
      if (!state.address) return ''
      return `${state.address.slice(0, 6)}...${state.address.slice(-4)}`
    },

    // 格式化的余额（BTC）
    formattedBalance: (state) => {
      const btc = state.balance / 100000000
      return btc.toFixed(8)
    }
  },

  actions: {
    // 设置钱包信息
    setWallet(wallet: { address: string; publicKey: string; balance?: number; walletType: WalletType }) {
      this.address = wallet.address
      this.publicKey = wallet.publicKey
      this.balance = wallet.balance || 0
      this.isConnected = true
      this.walletType = wallet.walletType
    },

    // 更新余额
    updateBalance(balance: number) {
      this.balance = balance
    },

    // 清除钱包信息
    clearWallet() {
      this.address = ''
      this.publicKey = ''
      this.balance = 0
      this.isConnected = false
      this.walletType = null
    }
  },

  // 持久化配置
  // persist: {
  //   storage: typeof window !== 'undefined' ? localStorage : undefined
  // }
})
