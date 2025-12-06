'use client';

import { useEffect, useState } from 'react';
import { fetchDefiLlamaPools, DefiLlamaPool } from '../lib/api';

export default function YieldTable() {
    const [pools, setPools] = useState<DefiLlamaPool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDefiLlamaPools();
                setPools(data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8 text-gray-300">
                Loading best rates...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-xl border border-gray-800">
            <table className="min-w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-800 text-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Platform</th>
                        <th scope="col" className="px-6 py-3">Chain</th>
                        <th scope="col" className="px-6 py-3">APY</th>
                        <th scope="col" className="px-6 py-3 text-right">TVL</th>
                    </tr>
                </thead>
                <tbody>
                    {pools.map((pool, index) => (
                        <tr
                            key={`${pool.project}-${pool.chain}-${index}`}
                            className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                        >
                            <td className="px-6 py-4 font-medium text-white">
                                {pool.project}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {pool.chain}
                            </td>
                            <td className={`px-6 py-4 font-bold ${pool.apy > 5 ? 'text-green-400' : 'text-gray-300'
                                }`}>
                                {pool.apy.toFixed(2)}%
                            </td>
                            <td className="px-6 py-4 text-right tabular-nums">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0
                                }).format(pool.tvlUsd)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
