/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';

export default function InvoiceGenerator() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('100');
    const [copied, setCopied] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState('');

    // Passive Wallet Detection
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const eth = (window as any).ethereum;
        if (eth && eth.selectedAddress) {
            setRecipient(eth.selectedAddress);
        } else if (eth && eth.request) {
            // Try to get accounts passively (no prompt usually if already connected)
            eth.request({ method: 'eth_accounts' })
                .then((accounts: string[]) => {
                    if (accounts && accounts.length > 0) {
                        setRecipient(accounts[0]);
                    }
                })
                .catch((err: any) => console.error(err));
        }
    }, []);

    // Update URL whenever inputs change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const baseUrl = window.location.origin;
            const url = `${baseUrl}/?to=${recipient}&buyAmount=${amount}`;
            setGeneratedUrl(url);
        }
    }, [recipient, amount]);

    const handleCopy = () => {
        if (!generatedUrl) return;
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative w-full max-w-[480px] mx-auto group font-mono">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative border border-green-500/20 rounded-lg bg-black p-6 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2 border-b border-green-500/10 pb-4">
                    <h2 className="text-xl text-green-500 font-bold tracking-tighter">
                        INVOICE_GENERATOR<span className="animate-pulse">_</span>
                    </h2>
                    <p className="text-[10px] text-green-500/50 uppercase tracking-widest">
                        Create Cryptographic Payment Signal
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Recipient Input */}
                    <div className="space-y-1">
                        <label className="text-[10px] text-green-500/70 uppercase">Recipient (You)</label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="0x..."
                            className="w-full bg-black border border-green-500/30 rounded px-3 py-2 text-green-400 text-sm focus:outline-none focus:border-green-500 transition-colors placeholder-green-900/50"
                        />
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-1">
                        <label className="text-[10px] text-green-500/70 uppercase">Amount (USDC)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-black border border-green-500/30 rounded px-3 py-2 text-green-400 text-sm focus:outline-none focus:border-green-500 transition-colors placeholder-green-900/50"
                        />
                    </div>
                </div>

                {/* Output Area */}
                <div className="bg-green-900/10 border border-green-500/20 rounded p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-green-500/50 uppercase">Generated Link</span>
                        <span className="text-[10px] text-green-500/50 uppercase">{generatedUrl.length} chars</span>
                    </div>

                    <div className="break-all text-[10px] text-green-400/80 font-mono leading-relaxed select-all">
                        {generatedUrl || "Waiting for input..."}
                    </div>

                    <button
                        onClick={handleCopy}
                        disabled={!recipient}
                        className={`w-full py-2 rounded text-xs font-bold tracking-wider uppercase transition-all duration-300 ${copied
                                ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                : 'bg-green-900/20 text-green-500 border border-green-500/30 hover:bg-green-500/10 hover:border-green-500'
                            }`}
                    >
                        {copied ? '>> LINK COPIED TO CLIPBOARD <<' : '[ COPY TRANSMISSION LINK ]'}
                    </button>
                </div>

                {/* Preview Tip */}
                <div className="text-[10px] text-center text-gray-600">
                    <p>Agent will see: <span className="text-yellow-500">PAYMENT_REQUEST</span></p>
                    <p>Settlement: <span className="text-blue-500">USDC</span> (Guaranteed)</p>
                </div>

            </div>
        </div>
    );
}
