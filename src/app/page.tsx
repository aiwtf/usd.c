/* eslint-disable */
import React from 'react';
import AgentTerminal from '../components/AgentTerminal';

// Next.js 16: searchParams is a Promise
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;

  // Extract params safely
  const inputToken = typeof params.inputToken === 'string' ? params.inputToken : undefined;
  const sellAmount = typeof params.amount === 'string' ? params.amount : undefined;

  // Invoice Mode Params
  const recipient = (typeof params.to === 'string' ? params.to : undefined) ||
    (typeof params.recipient === 'string' ? params.recipient : undefined);
  const buyAmount = typeof params.buyAmount === 'string' ? params.buyAmount : undefined;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tighter">
          usd.c
        </h1>
        <p className="text-xs text-green-500/50 font-mono tracking-widest mt-2">
          AI AGENT EXCHANGE PROTOCOL<span className="animate-pulse text-green-500">_</span>
        </p>
      </div>

      <AgentTerminal
        initialInputToken={inputToken}
        initialSellAmount={sellAmount}
        initialRecipient={recipient}
        initialBuyAmount={buyAmount}
      />
    </div>
  );
}
