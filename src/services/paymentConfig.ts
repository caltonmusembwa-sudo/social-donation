export interface GatewayConfig {
  flutterwavePublicKey: string;
  paypalClientId: string;
  isLiveMode: boolean;
  merchantCode: string;
  momoMerchantAccount: string;
}

const STORAGE_KEY = 'kc_gateway_config_v1';

export const DEFAULT_GATEWAY_CONFIG: GatewayConfig = {
  flutterwavePublicKey: 'FLWPUBK_TEST-5f8e91823a789c0b12-X',
  paypalClientId: 'sb', // standard PayPal sandbox client ID
  isLiveMode: false,
  merchantCode: '782490',
  momoMerchantAccount: '010844921198002',
};

export function getGatewayConfig(): GatewayConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_GATEWAY_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read gateway config:', e);
  }
  return DEFAULT_GATEWAY_CONFIG;
}

export function saveGatewayConfig(config: GatewayConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Could not save gateway config:', e);
  }
}
