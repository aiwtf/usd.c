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
    // State for Terminal Mode
    const [mode, setMode] = useState<'SWAP' | 'RECEIVE'>('SWAP');

    // State for Invoice Generator
    const [invoiceRecipient, setInvoiceRecipient] = useState('');
    const [invoiceAmount, setInvoiceAmount] = useState('100');
    const [copied, setCopied] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState('');

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
        const eth = (window as any).ethereum;
        if (typeof window !== 'undefined' && eth) {
            setProvider(eth);

            // Passive Wallet Detection for Invoice Recipient
            if (eth.selectedAddress) {
                setInvoiceRecipient(eth.selectedAddress);
            } else if (eth.request) {
                eth.request({ method: 'eth_accounts' })
                    .then((accounts: string[]) => {
                        if (accounts && accounts.length > 0) {
                            setInvoiceRecipient(accounts[0]);
                        }
                    })
                    .catch((err: any) => console.error(err));
            }
        }
    }, []);

    // Invoice Generator Effect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const baseUrl = window.location.origin;
            const url = `${baseUrl}/?to=${invoiceRecipient}&buyAmount=${invoiceAmount}`;
            setGeneratedUrl(url);
        }
    }, [invoiceRecipient, invoiceAmount]);

    const handleCopy = () => {
        if (!generatedUrl) return;
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Logic: If buyAmount is present, we are in "Invoice Mode" (Buy Order).
    // Otherwise, we default to "Sell Order".
    const isPaymentMode = !!initialBuyAmount;

    // Force SWAP mode if user clicked a payment link
    useEffect(() => {
        if (isPaymentMode) {
            setMode('SWAP');
        }
    }, [isPaymentMode]);

    // Format Buy Amount for USDC (6 Decimals)
    let formattedBuyAmount = '0';
    if (isPaymentMode && initialBuyAmount) {
        try {
            const amountNum = parseFloat(initialBuyAmount);
            if (!isNaN(amountNum)) {
                // USDC has 6 decimals. 
                // "100" -> 100 * 10^6 = 100000000
                // Use Math.floor to avoid floating point issues like 100.0000001
                formattedBuyAmount = Math.floor(amountNum * 1000000).toString();
            }
        } catch (e) {
            console.error("Error parsing amount", e);
        }
    }

    const params = {
        appCode: 'usd.c-agent',
        width: '100%',
        height: '600px',
        chainId: 1, // Mainnet
        tokenList: 'https://files.cow.fi/tokens/CoinGecko.json',
        tradeType: TradeType.SWAP,
        sell: {
            asset: isPaymentMode ? undefined : (resolveToken(initialInputToken) || NATIVE_ETH),
            amount: isPaymentMode ? undefined : initialSellAmount,
        },
        buy: {
            asset: resolveToken(initialOutputToken) || USDC_ADDRESS, // Default USDC
            amount: isPaymentMode ? formattedBuyAmount : '0',
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
            <div className={`absolute -inset-0.5 bg-gradient-to-r rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 ${mode === 'SWAP' ? 'from-green-500 to-emerald-600' : 'from-blue-500 to-cyan-600'
                }`}></div>

            <div className="relative border border-green-500/20 rounded-lg bg-black overflow-hidden font-mono">

                {/* Tab Switcher (Hidden in Payment Mode) */}
                {!isPaymentMode && (
                    <div className="flex border-b border-green-500/20">
                        <button
                            onClick={() => setMode('SWAP')}
                            className={`flex-1 py-2 text-xs transition-colors duration-300 ${mode === 'SWAP'
                                ? 'bg-green-500/10 text-green-400 font-bold'
                                : 'text-gray-600 hover:text-green-500/50 hover:bg-green-900/5'
                                }`}
                        >
                            {'> EXECUTE_SWAP'}
                        </button>
                        <button
                            onClick={() => setMode('RECEIVE')}
                            className={`flex-1 py-2 text-xs transition-colors duration-300 ${mode === 'RECEIVE'
                                ? 'bg-blue-500/10 text-blue-400 font-bold'
                                : 'text-gray-600 hover:text-blue-500/50 hover:bg-blue-900/5'
                                }`}
                        >
                            {'> GENERATE_INVOICE'}
                        </button>
                    </div>
                )}

                {/* Header for "Agent Mode" verification */}
                <div className={`flex items-center justify-between px-4 py-1 border-b text-[10px] ${initialRecipient
                    ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-500'
                    : mode === 'SWAP'
                        ? 'bg-green-900/10 border-green-500/10 text-green-500'
                        : 'bg-blue-900/10 border-blue-500/10 text-blue-500'
                    }`}>
                    <span className={initialRecipient ? "animate-pulse font-bold" : ""}>
                        {initialRecipient
                            ? "STATUS: PAYMENT_REQUEST"
                            : mode === 'SWAP' ? "STATUS: ONLINE" : "STATUS: CONFIG_MODE"}
                    </span>
                    <span>
                        {initialRecipient
                            ? `TARGET: ${initialRecipient.slice(0, 6)}...${initialRecipient.slice(-4)}`
                            : "PROTOCOL: COW_SWAP"
                        }
                    </span>
                </div>

                {/* Invoice Mode Banner (Only for Payer) */}
                {initialRecipient && isPaymentMode && (
                    <div className="bg-yellow-900/30 border-b border-yellow-500/20 px-4 py-2 text-center">
                        <p className="text-[10px] text-yellow-500 tracking-wider">
                            ⚠ PAYING TO: <span className="text-white">{initialRecipient}</span>
                        </p>
                    </div>
                )}

                {mode === 'SWAP' ? (
                    provider ? (
                        <CowSwapWidget params={params} provider={provider} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[560px] space-y-4">
                            <div className="text-green-500 animate-pulse">Waiting for Wallet Injection...</div>
                            <div className="text-xs text-gray-500 text-center px-8">
                                If you are an AI Agent, please ensure your environment injects an EIP-1193 provider.
                            </div>
                        </div>
                    )
                ) : (
                    /* INVOICE GENERATOR UI */
                    <div className="p-6 space-y-6 h-[560px] overflow-y-auto">
                        <div className="text-center space-y-2 pb-4 border-b border-blue-500/10">
                            <h2 className="text-xl text-blue-500 font-bold tracking-tighter">
                                INVOICE_BUILDER
                            </h2>
                            <p className="text-[10px] text-blue-500/50 uppercase tracking-widest">
                                Create Cryptographic Payment Link
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-blue-500/70 uppercase">Recipient (Address)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-blue-500/50">{'>'}</span>
                                    <input
                                        type="text"
                                        value={invoiceRecipient}
                                        onChange={(e) => setInvoiceRecipient(e.target.value)}
                                        placeholder="0x..."
                                        className="w-full bg-black border border-blue-500/30 rounded px-8 py-2 text-blue-400 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-blue-900/30"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] text-blue-500/70 uppercase">Amount (USDC)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-blue-500/50">{'>'}</span>
                                    <input
                                        type="number"
                                        value={invoiceAmount}
                                        onChange={(e) => setInvoiceAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-black border border-blue-500/30 rounded px-8 py-2 text-blue-400 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-blue-900/30"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-900/10 border border-blue-500/20 rounded p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-blue-500/50 uppercase">Generated Link</span>
                            </div>

                            <div className="break-all text-[10px] text-blue-400/80 leading-relaxed select-all bg-black/50 p-2 rounded border border-blue-500/10">
                                {generatedUrl || "Computing..."}
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={handleCopy}
                                    disabled={!invoiceRecipient}
                                    className={`flex-1 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all duration-300 ${copied
                                        ? 'bg-blue-500 text-black shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                        : 'bg-blue-900/20 text-blue-500 border border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500'
                                        }`}
                                >
                                    {copied ? 'COPIED!' : 'COPY LINK'}
                                </button>
                                <a
                                    href={generatedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded text-xs font-bold tracking-wider uppercase bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-500 transition-all"
                                >
                                    TEST ↗
                                </a>
                            </div>
                        </div>

                        <div className="text-[10px] text-center text-gray-600 pt-8">
                            <p>Agent will see: <span className="text-yellow-500">PAYMENT_REQUEST</span></p>
                            <p>Settlement: <span className="text-blue-500">USDC</span> (Guaranteed)</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
