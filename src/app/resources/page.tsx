'use client';

import React from 'react';
import { Gem, ShieldCheck, Scale } from 'lucide-react';

export default function ResourcesPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] p-8 flex flex-col items-center bg-slate-950">
            {/* Header Section */}
            <div className="text-center mb-10 mt-10">
                <h2 className="text-3xl font-bold text-white mb-2">Trade Real World Assets</h2>
                <p className="text-gray-400">
                    Swap USDC for Gold (PAXG) instantly. Backed by physical gold bars.
                </p>
            </div>

            {/* Widget Container */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <div className="h-[360px] w-full md:w-[400px] rounded-xl shadow-2xl border border-yellow-500/30 overflow-hidden bg-slate-900 shadow-yellow-900/20">
                    <iframe
                        id="iframe-widget"
                        src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=100&amountFiat=1500&backgroundColor=1e293b&darkMode=true&from=usdc&fromFiat=usd&horizontal=false&isFiat=false&lang=en-US&link_id=usdc_c_gold&locales=true&logo=false&primaryColor=eab308&to=paxg&toFiat=usd&toTheMoon=true"
                        className="h-full w-full border-none overflow-hidden"
                    ></iframe>
                </div>

                {/* Trust & Info Section */}
                <div className="mt-12 w-full max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="p-6 rounded-xl border border-yellow-500/20 bg-slate-900/50 flex flex-col items-center text-center hover:border-yellow-500/40 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500">
                                <Gem className="w-6 h-6" />
                            </div>
                            <h3 className="text-yellow-100 font-semibold mb-2">1 Troy oz Gold</h3>
                            <p className="text-sm text-gray-400">1 PAXG token represents one fine troy ounce of London Good Delivery gold.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-6 rounded-xl border border-yellow-500/20 bg-slate-900/50 flex flex-col items-center text-center hover:border-yellow-500/40 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-yellow-100 font-semibold mb-2">Audited & Regulated</h3>
                            <p className="text-sm text-gray-400">Regulated by NYDFS. Fully backed and audited monthly.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-6 rounded-xl border border-yellow-500/20 bg-slate-900/50 flex flex-col items-center text-center hover:border-yellow-500/40 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500">
                                <Scale className="w-6 h-6" />
                            </div>
                            <h3 className="text-yellow-100 font-semibold mb-2">Redeemable</h3>
                            <p className="text-sm text-gray-400">Theoretically redeemable for physical gold bars.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
