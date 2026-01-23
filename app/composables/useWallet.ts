// Bitcoin 钱包连接 composable
// 支持 UniSat、Xverse、OKX、Leather、Magic Eden 等比特币钱包

import type { WalletType } from '~/stores/wallet'

export interface BitcoinWallet {
  address: string
  publicKey: string
  balance?: number
}

export interface WalletProvider {
  requestAccounts: () => Promise<string[]>
  getAccounts: () => Promise<string[]>
  getPublicKey: () => Promise<string>
  getBalance: () => Promise<{ confirmed: number; unconfirmed: number; total: number }>
  signMessage: (message: string) => Promise<string>
  on: (event: string, callback: (accounts: string[]) => void) => void
  removeListener: (event: string, callback: (accounts: string[]) => void) => void
}

// OKX 钱包特有接口
export interface OKXWalletProvider {
  bitcoin: WalletProvider
}

// Leather 钱包特有接口
export interface LeatherProvider {
  request: (method: string, params?: any) => Promise<any>
}

// Magic Eden 钱包特有接口  
export interface MagicEdenProvider {
  bitcoin: WalletProvider
}

declare global {
  interface Window {
    unisat?: WalletProvider
    xverse?: WalletProvider
    okxwallet?: OKXWalletProvider
    LeatherProvider?: LeatherProvider
    magicEden?: MagicEdenProvider
  }
}

export interface WalletInfo {
  id: WalletType
  name: string
  icon: string
  installed: boolean
  downloadUrl: string
}

export const useWallet = () => {
  const walletStore = useWalletStore()

  // 支持的钱包列表
  const supportedWallets = computed<WalletInfo[]>(() => {
    if (!import.meta.client) return []
    
    return [
      {
        id: 'unisat',
        name: 'UniSat',
        icon: 'unisat',
        installed: !!window.unisat,
        downloadUrl: 'https://unisat.io/download'
      },
      {
        id: 'okx',
        name: 'OKX Wallet',
        icon: 'okx',
        installed: !!window.okxwallet,
        downloadUrl: 'https://www.okx.com/web3'
      },
      {
        id: 'xverse',
        name: 'Xverse',
        icon: 'xverse',
        installed: !!window.xverse,
        downloadUrl: 'https://www.xverse.app/download'
      },
      {
        id: 'leather',
        name: 'Leather',
        icon: 'leather',
        installed: !!window.LeatherProvider,
        downloadUrl: 'https://leather.io/install-extension'
      },
      {
        id: 'magiceden',
        name: 'Magic Eden',
        icon: 'magiceden',
        installed: !!window.magicEden,
        downloadUrl: 'https://wallet.magiceden.io/'
      }
    ]
  })

  // 检测任何钱包是否已安装
  const isWalletInstalled = computed(() => {
    if (!import.meta.client) return false
    return supportedWallets.value.some(wallet => wallet.installed)
  })

  // 获取钱包提供者
  const getProvider = (walletType?: WalletType): WalletProvider | null => {
    if (!import.meta.client) return null
    
    if (walletType) {
      switch (walletType) {
        case 'unisat':
          return window.unisat || null
        case 'okx':
          return window.okxwallet?.bitcoin || null
        case 'xverse':
          return window.xverse || null
        case 'leather':
          // Leather 使用不同的 API，需要适配
          return null
        case 'magiceden':
          return window.magicEden?.bitcoin || null
        default:
          return null
      }
    }
    
    // 如果没有指定类型，优先使用 UniSat
    return window.unisat || window.okxwallet?.bitcoin || window.xverse || window.magicEden?.bitcoin || null
  }

  // 连接钱包
  const connectWallet = async (walletType: WalletType): Promise<boolean> => {
    try {
      // 特殊处理 Leather 钱包
      if (walletType === 'leather') {
        return await connectLeatherWallet()
      }

      const provider = getProvider(walletType)
      
      if (!provider) {
        console.warn(`${walletType} 钱包未安装`)
        const walletInfo = supportedWallets.value.find(w => w.id === walletType)
        if (walletInfo) {
          window.open(walletInfo.downloadUrl, '_blank')
        }
        return false
      }

      // 请求账户权限
      const accounts = await provider.requestAccounts()
      
      if (accounts.length === 0) {
        console.warn('未获取到账户地址')
        return false
      }

      const address = accounts[0]!
      
      // 获取公钥
      let publicKey = ''
      try {
        publicKey = await provider.getPublicKey()
      } catch (error) {
        console.warn('获取公钥失败:', error)
      }

      // 获取余额
      let balance = 0
      try {
        const balanceInfo = await provider.getBalance()
        balance = balanceInfo.total
      } catch (error) {
        console.warn('获取余额失败:', error)
      }

      // 保存到 store
      walletStore.setWallet({
        address,
        publicKey: publicKey || '',
        balance,
        walletType
      })

      // 监听账户变化
      provider.on('accountsChanged', handleAccountsChanged)

      console.log(`${walletType} 钱包连接成功:`, address)
      return true
    } catch (error) {
      console.error(`连接 ${walletType} 钱包失败:`, error)
      return false
    }
  }

  // Leather 钱包特殊连接方法
  const connectLeatherWallet = async (): Promise<boolean> => {
    try {
      if (!window.LeatherProvider) {
        console.warn('Leather 钱包未安装')
        window.open('https://leather.io/install-extension', '_blank')
        return false
      }

      const response = await window.LeatherProvider.request('getAddresses')
      const addresses = response.result.addresses
      
      if (!addresses || addresses.length === 0) {
        console.warn('未获取到账户地址')
        return false
      }

      // Leather 返回的地址格式
      const btcAddress = addresses.find((addr: any) => addr.type === 'p2wpkh')
      const address = btcAddress?.address || addresses[0]?.address || ''
      const publicKey = btcAddress?.publicKey || ''

      if (!address) {
        console.warn('Leather 未获取到有效地址')
        return false
      }

      walletStore.setWallet({
        address,
        publicKey,
        balance: 0,
        walletType: 'leather'
      })

      console.log('Leather 钱包连接成功:', address)
      return true
    } catch (error) {
      console.error('连接 Leather 钱包失败:', error)
      return false
    }
  }

  // 断开钱包连接
  const disconnectWallet = () => {
    const provider = getProvider()
    if (provider) {
      provider.removeListener('accountsChanged', handleAccountsChanged)
    }
    walletStore.clearWallet()
  }

  // 处理账户变化
  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // 用户断开连接
      disconnectWallet()
    } else {
      // 切换账户
      const walletType = walletStore.walletType
      if (!walletType) return

      const provider = getProvider(walletType)
      if (!provider) return

      const address = accounts[0]!
      let publicKey = ''
      let balance = 0

      try {
        publicKey = await provider.getPublicKey()
      } catch (error) {
        console.warn('获取公钥失败:', error)
      }

      try {
        const balanceInfo = await provider.getBalance()
        balance = balanceInfo.total
      } catch (error) {
        console.warn('获取余额失败:', error)
      }

      walletStore.setWallet({
        address,
        publicKey: publicKey || '',
        balance,
        walletType
      })
    }
  }

  // 格式化地址（显示前6位和后4位）
  const formatAddress = (address: string): string => {
    if (!address || address.length < 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // 格式化余额（从 satoshi 转换为 BTC）
  const formatBalance = (satoshi: number): string => {
    const btc = satoshi / 100000000
    return btc.toFixed(8)
  }

  return {
    supportedWallets,
    isWalletInstalled,
    isConnected: computed(() => walletStore.isConnected),
    address: computed(() => walletStore.address),
    publicKey: computed(() => walletStore.publicKey),
    balance: computed(() => walletStore.balance),
    walletType: computed(() => walletStore.walletType),
    connectWallet,
    disconnectWallet,
    formatAddress,
    formatBalance
  }
}
