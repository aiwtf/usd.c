/* eslint-disable */
'use client';

import React, { useEffect, useState } from 'react';
import { CowSwapWidget } from '@cowprotocol/widget-react';
import { TradeType } from '@cowprotocol/widget-lib';

interface AgentTerminalProps {
    initialInputToken?: string;
    initialOutputToken?: string;
    initialSellAmount?: string;
    initialBuyAmount?: string;
    initialRecipient?: string;
}

export default function AgentTerminal({
    initialInputToken = 'ETH',
    initialOutputToken = 'USDC',
    initialSellAmount = '0',
    initialBuyAmount,
    initialRecipient,
}: AgentTerminalProps) {
    // State to handle client-side provider safely
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [provider, setProvider] = useState<any>(null);

    // Native ETH address in CoW Protocol
    const NATIVE_ETH = '0xEeeeeEeeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    // USDC on Mainnet
    const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

    // Helper to resolve token symbols to addresses
    const resolveToken = (token: string | undefined) => {
        if (!token) return undefined;
        const t = token.toUpperCase();
        if (t === 'ETH') return NATIVE_ETH;
        if (t === 'USDC') return USDC_ADDRESS;
        return token; // Assume it's an address if not a reserved symbol
    };

    useEffect(() => {
        // Safe access to window.ethereum only on client side
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setProvider((window as any).ethereum);
        }
    }, []);

    // Logic: If buyAmount is present, we are in "Invoice Mode" (Buy Order).
    // Otherwise, we default to "Sell Order".
    const isInvoiceMode = !!initialBuyAmount;

    const params = {
        appCode: 'usd.c-agent',
        width: '100%',
        height: '600px',
        chainId: 1, // Mainnet
        tokenList: 'https://files.cow.fi/tokens/CoinGecko.json',
        tradeType: TradeType.SWAP,
        sell: {
            asset: resolveToken(initialInputToken) || NATIVE_ETH,
            amount: isInvoiceMode ? undefined : initialSellAmount,
        },
        buy: {
            asset: resolveToken(initialOutputToken) || USDC_ADDRESS, // Default USDC
            amount: initialBuyAmount || '0',
        },
        enabledTradeTypes: [TradeType.SWAP, TradeType.LIMIT],
        theme: {
            baseTheme: 'dark',
            primary: '#22c55e', // Agent Green
            paper: '#000000', // Pitch Black for OLED/Terminal feel
            text: '#e2e8f0',
        },
        // Optional: Hide the "Settings" button to keep it clean for Agents?
        // simple: true 
    };

    return (
        <div className="relative w-full max-w-[480px] mx-auto group">
            {/* Terminal Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

            <div className="relative border border-green-500/20 rounded-lg bg-black overflow-hidden">
                {/* Header for "Agent Mode" verification */}
                <div className="flex items-center justify-between px-4 py-1 bg-green-900/10 border-b border-green-500/10 text-[10px] font-mono text-green-500">
                    <span>STATUS: ONLINE</span>
                    <span>PROTOCOL: COW_SWAP</span>
                </div>

                {/* Invoice Mode Banner */}
                {initialRecipient && (
                    <div className="bg-yellow-900/30 border-b border-yellow-500/20 px-4 py-2 text-center">
                        <p className="text-[10px] text-yellow-500 font-mono tracking-wider">
                            ⚠ PAYING TO: <span className="text-white">{initialRecipient}</span>
                        </p>
                    </div>
                )}

                {provider ? (
                    <CowSwapWidget params={params} provider={provider} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-[560px] space-y-4 font-mono">
                        <div className="text-green-500 animate-pulse">Waiting for Wallet Injection...</div>
                        <div className="text-xs text-gray-500 text-center px-8">
                            If you are an AI Agent, please ensure your environment injects an EIP-1193 provider.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
