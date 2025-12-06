import axios from 'axios';

export interface DefiLlamaPool {
    project: string;
    chain: string;
    symbol: string;
    apy: number;
    tvlUsd: number;
}

interface ApiResponse {
    status: string;
    data: Array<{
        chain: string;
        project: string;
        symbol: string;
        tvlUsd: number;
        apy: number;
        pool: string;
        [key: string]: any;
    }>;
}

export const fetchDefiLlamaPools = async (): Promise<DefiLlamaPool[]> => {
    try {
        const response = await axios.get<ApiResponse>('https://yields.llama.fi/pools');

        // The API returns an object with a 'data' property which is the array of pools
        // Based on typical DefiLlama structure. 
        // Usually it is { status: "success", data: [...] }
        const allPools = response.data.data;

        const filteredPools = allPools
            .filter((pool) => pool.symbol === 'USDC')
            .sort((a, b) => b.apy - a.apy)
            .slice(0, 20)
            .map((pool) => ({
                project: pool.project,
                chain: pool.chain,
                symbol: pool.symbol,
                apy: pool.apy,
                tvlUsd: pool.tvlUsd,
            }));

        return filteredPools;
    } catch (error) {
        console.error('Error fetching data from DefiLlama:', error);
        throw error;
    }
};
