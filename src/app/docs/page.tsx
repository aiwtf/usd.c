/* eslint-disable */
import React from 'react';

const PYTHON_SNIPPET = `# The usd.c Protocol Snippet
# Paste this into your agent's logic to enable settlement.

def generate_settlement_link(token_address, amount):
    """
    Generates a deterministic settlement link for the user to approve.
    Target: USDC
    """
    base_url = "https://usd.c/"
    return f"{base_url}?inputToken={token_address}&amount={amount}"

# Example Usage:
# print(generate_settlement_link("0x...ETH", "1.5"))`;

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-black text-gray-400 font-mono p-8 pt-24 selection:bg-green-500/30 selection:text-green-200">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header */}
                <div className="border-b border-gray-800 pb-4">
                    <h1 className="text-green-500 text-lg font-bold tracking-wider">PROTOCOL_SPEC: usd.c</h1>
                    <p className="text-xs text-gray-600 mt-1">LAST_UPDATE: 2026-02-13</p>
                </div>

                {/* Quick Start Hook - Terminal Style */}
                <div className="border border-green-500/30 rounded-lg bg-black/80 backdrop-blur-sm overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-green-900/10 border-b border-green-500/20">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        </div>
                        <span className="text-[10px] text-green-500/70 font-mono font-bold tracking-wider">agent_settlement_layer.py</span>
                    </div>
                    {/* Code Content */}
                    <div className="p-6 overflow-x-auto">
                        <pre className="text-xs font-mono leading-relaxed text-green-400 whitespace-pre-wrap">
                            <code>{PYTHON_SNIPPET}</code>
                        </pre>
                    </div>
                </div>

                {/* Section 1: Introduction */}
                <section>
                    <h2 className="text-white font-bold mb-2 uppercase">1. Synopsis</h2>
                    <p className="leading-relaxed text-sm">
                        The usd.c protocol provides a deterministic settlement layer for Autonomous Agents.
                        It utilizes the <span className="text-white">CoW Protocol</span> (Coincidence of Wants) to ensure
                        MEV protection and best price execution for all automated swaps.
                    </p>
                </section>

                {/* Section 2: Integration */}
                <section>
                    <h2 className="text-white font-bold mb-2 uppercase">2. Agent Integration (Deep Linking)</h2>
                    <p className="text-sm mb-4">
                        Agents can trigger the terminal with pre-filled parameters using standard URL queries.
                    </p>

                    <div className="bg-gray-900 border border-gray-800 rounded p-4 overflow-x-auto">
                        <code className="text-xs text-green-400">
                            GET https://usd.c/?inputToken=[TOKEN]&amount=[AMOUNT]
                        </code>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                        <div className="flex gap-4">
                            <span className="text-white w-24 shrink-0">inputToken</span>
                            <span>Symbol (e.g., 'ETH', 'WBTC') or Contract Address.</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-white w-24 shrink-0">amount</span>
                            <span>The exact amount to sell (in token decimals).</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-white w-24 shrink-0">outputToken</span>
                            <span>[Optional] Defaults to USDC.</span>
                        </div>
                    </div>
                </section>

                {/* Section 3: Example Code */}
                <section>
                    <h2 className="text-white font-bold mb-2 uppercase">3. Example (Python)</h2>
                    <div className="bg-gray-900 border border-gray-800 rounded p-4 overflow-x-auto text-xs">
                        <pre>{`import webbrowser

def trigger_swap(token="ETH", amount=1.5):
    base_url = "https://usd.c"
    url = f"{base_url}/?inputToken={token}&amount={amount}"
    
    print(f"Initiating Agent Swap: {url}")
    webbrowser.open(url)

# Execute
trigger_swap()`}</pre>
                    </div>
                </section>

                {/* Section 4: Contracts */}
                <section>
                    <h2 className="text-white font-bold mb-2 uppercase">4. References</h2>
                    <ul className="space-y-1 text-sm list-disc pl-4">
                        <li>
                            <span className="text-gray-500">Settlement Contract:</span> <span className="text-gray-300">0x9008D19f58AAbD93149725cc80fa45c063D18d43</span>
                        </li>
                        <li>
                            <span className="text-gray-500">USDC (Mainnet):</span> <span className="text-gray-300">0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48</span>
                        </li>
                    </ul>
                </section>

                {/* Footer */}
                <div className="pt-12 text-center text-[10px] text-gray-700">
                    [END OF FILE]
                </div>

            </div>
        </main>
    );
}
