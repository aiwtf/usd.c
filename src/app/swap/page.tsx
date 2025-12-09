import React from 'react';
import { ShieldCheck, Bitcoin, Coins } from 'lucide-react';

export default function SwapPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] p-8 flex flex-col items-center">
            {/* Header Section */}
            <div className="text-center mb-10 mt-10">
                <h2 className="text-3xl font-bold text-white mb-2">Cross-Chain Swap</h2>
                <p className="text-gray-400">
                    Exchange any crypto to USDC anonymously & instantly
                </p>
            </div>

            {/* Widget Container */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <div className="h-[360px] w-full md:w-[400px] rounded-xl shadow-2xl border border-slate-700 overflow-hidden bg-slate-900">
                    <iframe
                        id="iframe-widget"
                        src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.1&amountFiat=1500&backgroundColor=1e293b&darkMode=true&from=btc&fromFiat=usd&horizontal=false&isFiat=false&lang=en-US&link_id=usdc_c_swap&locales=true&logo=false&primaryColor=3b82f6&to=usdc&toFiat=usd&toTheMoon=true"
                        className="h-full w-full border-none overflow-hidden"
                    ></iframe>
                </div>

                {/* Info / Assets Section */}
                <div className="mt-12 w-full max-w-2xl text-center">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-800 pb-2">
                        Supported Assets
                    </h3>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {['Bitcoin', 'Ethereum', 'Monero', 'Solana', 'USDT'].map((asset) => (
                            <span
                                key={asset}
                                className="px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 text-sm font-medium border border-slate-700 flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                {asset}
                            </span>
                        ))}
                    </div>

                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="font-semibold">No Registration Required</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
