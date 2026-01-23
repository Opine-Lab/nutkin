// crypto-converter.ts

export enum CryptoUnit {
  // ETH单位
  WEI = 'wei',
  ETH = 'eth',
  
  // BTC单位
  SATOSHI = 'satoshi',
  BTC = 'btc'
}

export interface ConversionResult {
  value: string;
  unit: CryptoUnit;
}

/**
 * 加密货币单位转换工具类
 */
export class CryptoConverter {
  // ETH单位转换系数 (18位精度)
  private static readonly ETH_PRECISION = 1e18;
  
  // BTC单位转换系数 (8位精度)
  private static readonly BTC_PRECISION = 1e8;

  /**
   * 快捷方法：ETH转Wei
   */
  static ethToWei(ethValue: string): string {
    const value = parseFloat(ethValue) * this.ETH_PRECISION;
    return value.toString();
  }

  /**
   * 快捷方法：Wei转ETH (18位精度)
   * @param weiValue Wei值字符串
   * @returns ETH值字符串，保留4位小数
   */
  static weiToEth(weiValue: string): string {
    return (parseFloat(weiValue) / this.ETH_PRECISION).toFixed(4);
  }

  /**
   * 快捷方法：BTC转Satoshi
   */
  static btcToSatoshi(btcValue: string): string {
    const value = parseFloat(btcValue) * this.BTC_PRECISION;
    return value.toString();
  }

  /**
   * 快捷方法：Satoshi转BTC (8位精度)
   * @param satoshiValue Satoshi值字符串
   * @returns BTC值字符串，保留8位小数
   */
  static satoshiToBtc(satoshiValue: string): string {
    return (parseFloat(satoshiValue) / this.BTC_PRECISION).toFixed(8);
  }

  /**
   * 格式化显示
   */
  static format(value: string, unit: CryptoUnit): string {
    return `${value} ${unit}`;
  }
}

/**
 * 精度验证工具
 */
export class PrecisionValidator {
  /**
   * 验证ETH相关值的精度是否有效
   */
  static validateETH(value: string, maxDecimals: number = 18): boolean {
    const parts = value.split('.');
    const decimalPart = parts[1] || '';
    return decimalPart.length <= maxDecimals && /^\d+(\.\d+)?$/.test(value);
  }

  /**
   * 验证BTC相关值的精度是否有效
   */
  static validateBTC(value: string, maxDecimals: number = 8): boolean {
    const parts = value.split('.');
    const decimalPart = parts[1] || '';
    return decimalPart.length <= maxDecimals && /^\d+(\.\d+)?$/.test(value);
  }
}
