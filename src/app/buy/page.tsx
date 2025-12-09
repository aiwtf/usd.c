import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';

export default function BuyPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] p-8 flex flex-col items-center">
            {/* Header Section */}
            <div className="text-center mb-10 mt-10">
                <h2 className="text-3xl font-bold text-white mb-2">Buy USDC with Fiat</h2>
                <p className="text-gray-400">
                    Best rates from Visa, Mastercard, Apple Pay
                </p>
            </div>

            {/* Widget Container */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <div className="h-[650px] w-full md:w-[480px] rounded-xl shadow-2xl border border-slate-700 overflow-hidden bg-slate-900">
                    <iframe
                        src="https://widget.onramper.com?color=3b82f6&theme=dark&defaultAmount=100&defaultFiat=USD&defaultCrypto=USDC_ETH"
                        title="Onramper Widget"
                        className="h-full w-full border-none overflow-hidden"
                        allow="accelerometer; autoplay; camera; gyroscope; payment"
                    ></iframe>
                </div>

                {/* Trust Signals Section */}
                <div className="mt-8 w-full max-w-lg text-center">
                    <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-400" />
                            <span className="font-medium">Visa / Mastercard</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-gray-300" />
                            <span className="font-medium">Apple Pay / Google Pay</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
