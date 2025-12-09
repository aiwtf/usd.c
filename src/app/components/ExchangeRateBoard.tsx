'use client';

import React, { useEffect, useState } from 'react';
import { fetchExchangeRates, MarketData } from '../lib/pricesApi';

export default function ExchangeRateBoard() {
    const [rates, setRates] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRates = async () => {
            try {
                const data = await fetchExchangeRates();
                setRates(data);
            } catch (err) {
                setError('Failed to fetch rates');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadRates();
        // Optional: Set up an interval to refresh rates
        const intervalId = setInterval(loadRates, 60000); // Update every minute
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded-xl animate-pulse">
                <span className="text-gray-400">Loading Market Data...</span>
            </div>
        );
    }

    if (error || !rates) {
        return (
            <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded-xl">
                <span className="text-red-400">Unable to load market data</span>
            </div>
        );
    }

    // Formatters
    const fiatFormatter = (currency: string) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const cryptoFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="w-full bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Column 1: USDC vs Fiat */}
                <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-blue-400 font-bold mb-3 uppercase tracking-wider text-sm flex items-center">
                        <span className="mr-2">🌍</span> Global Fiat Peg
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-1 rounded transition">
                            <span>USD/TWD</span>
                            <span className="font-mono text-blue-300 font-semibold">{fiatFormatter('TWD').format(rates.fiat.twd)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-1 rounded transition">
                            <span>USD/EUR</span>
                            <span className="font-mono text-blue-300 font-semibold">{fiatFormatter('EUR').format(rates.fiat.eur)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-1 rounded transition">
                            <span>USD/JPY</span>
                            <span className="font-mono text-blue-300 font-semibold">{fiatFormatter('JPY').format(rates.fiat.jpy)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-1 rounded transition">
                            <span>USD/CNY</span>
                            <span className="font-mono text-blue-300 font-semibold">{fiatFormatter('CNY').format(rates.fiat.cny)}</span>
                        </div>
                    </div>
                </div>

                {/* Column 2: Major Crypto */}
                <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="text-yellow-400 font-bold mb-3 uppercase tracking-wider text-sm flex items-center">
                        <span className="mr-2">⚡</span> Major Markets
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded transition">
                            <span className="font-bold text-white">BTC/USDC</span>
                            <span className="font-mono text-yellow-300 font-bold text-lg">{cryptoFormatter.format(rates.crypto.btc)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded transition">
                            <span className="font-bold text-white">ETH/USDC</span>
                            <span className="font-mono text-yellow-300 font-bold text-lg">{cryptoFormatter.format(rates.crypto.eth)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded transition">
                            <span className="font-bold text-white">SOL/USDC</span>
                            <span className="font-mono text-yellow-300 font-bold text-lg">{cryptoFormatter.format(rates.crypto.sol)}</span>
                        </div>
                    </div>
                </div>

                {/* Column 3: Privacy Zone */}
                <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-purple-400 font-bold mb-3 uppercase tracking-wider text-sm flex items-center">
                        <span className="mr-2">🕵️</span> Privacy & Freedom
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded transition">
                            <span className="font-bold text-white">XMR/USDC</span>
                            <span className="font-mono text-green-400 font-bold text-lg">{cryptoFormatter.format(rates.privacy.xmr)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded transition">
                            <span className="font-bold text-white">ZEC/USDC</span>
                            <span className="font-mono text-green-400 font-bold text-lg">{cryptoFormatter.format(rates.privacy.zec)}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="text-center mt-4 text-xs text-gray-500">
                Prices updated every minute • Powered by CoinGecko
            </div>
        </div>
    );
}
