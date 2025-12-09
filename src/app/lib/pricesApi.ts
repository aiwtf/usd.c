import axios from 'axios';

// Define the response interface requested
export interface MarketData {
    fiat: {
        twd: number;
        eur: number;
        jpy: number;
        cny: number;
    };
    crypto: {
        btc: number;
        eth: number;
        sol: number;
    };
    privacy: {
        xmr: number;
        zec: number;
    };
}

// CoinGecko API URL
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export const fetchExchangeRates = async (): Promise<MarketData> => {
    try {
        const params = {
            ids: 'bitcoin,ethereum,solana,monero,zcash,usd-coin',
            vs_currencies: 'usd,twd,eur,jpy,cny',
        };

        const response = await axios.get(COINGECKO_API_URL, { params });
        const data = response.data;

        // Helper to get price safely
        const getPrice = (id: string, currency: string): number => {
            return data[id]?.[currency] || 0;
        };

        // 1. Calculate Crypto Prices in USDC
        // We calculate price in USDC by: Price in USD / USDC in USD
        // This accounts for any minor depeg of USDC, though typically USDC ~ $1
        const usdcUsdPrice = getPrice('usd-coin', 'usd');

        // Avoid division by zero
        const safeUsdcPrice = usdcUsdPrice > 0 ? usdcUsdPrice : 1;

        const btcPrice = getPrice('bitcoin', 'usd') / safeUsdcPrice;
        const ethPrice = getPrice('ethereum', 'usd') / safeUsdcPrice;
        const solPrice = getPrice('solana', 'usd') / safeUsdcPrice;
        const xmrPrice = getPrice('monero', 'usd') / safeUsdcPrice;
        const zecPrice = getPrice('zcash', 'usd') / safeUsdcPrice;

        // 2. Calculate Fiat Exchange Rates
        // "1 USDC equals how much TWD?"
        // This is simply the price of 'usd-coin' in 'twd'
        const usdcTwd = getPrice('usd-coin', 'twd');
        const usdcEur = getPrice('usd-coin', 'eur');
        const usdcJpy = getPrice('usd-coin', 'jpy');
        const usdcCny = getPrice('usd-coin', 'cny');

        return {
            fiat: {
                twd: usdcTwd,
                eur: usdcEur,
                jpy: usdcJpy,
                cny: usdcCny,
            },
            crypto: {
                btc: btcPrice,
                eth: ethPrice,
                sol: solPrice,
            },
            privacy: {
                xmr: xmrPrice,
                zec: zecPrice,
            },
        };
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Return empty/zero data or throw, depending on preference. 
        // For now, throwing to let the caller handle it or returning mock zeros if strictly typed.
        // Given the interface implies numbers, we throw so the app knows it failed.
        throw error;
    }
};
