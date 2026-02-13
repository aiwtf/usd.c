/* eslint-disable */
'use client';

import React, { useState } from 'react';
import AgentTerminal from '../components/AgentTerminal';
import InvoiceGenerator from '../components/InvoiceGenerator';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function Home({ searchParams }: HomeProps) {
  // We need to unwrap params roughly, but since this is a client component now (due to useState),
  // we actually need to handle the async params differently or push state down.
  // HOWEVER, Next.js 15+ allows async params in Client Components if using `use` hook,
  // but for simplicity, let's keep it clean.
  // Actually, to use `useState`, this file MUST be 'use client'.
  // But `searchParams` prop in `page.tsx` is server-side.
  // Let's make a wrapper or just use `use()` if available, OR
  // simplest hack: Just resolve the promise if it's passed, but in Next 15 it's a promise.
  // Standard pattern: Page (Server) -> ClientWrapper.
  // Refactoring: Let's split this into a Client Component to handle the Toggle, 
  // and keep Page as Server Component to parse params.

  // WAIT: To avoid large refactors, I will just make the Page a Client Component?
  // No, Page must remain Server Component to receive searchParams properly in Next.js 13+.
  // So I will create a `TerminalWrapper` client component.

  // Let's implement the wrapper logic inline here by extracting the content.
  // Actually, I'll cheat slightly: make Home a Server component that returns a Client Component
  // that manages the state.

  // See `TerminalContainer.tsx` below (I will create it properly first then update this file).
  // Wait, I can't create a new file in this tool call.
  // I will use `useState` directly here, but mark it 'use client'.
  // Next.js App Router Page can be 'use client'? Yes, but then searchParams is not a Promise?
  // In Next.js 15, searchParams IS a promise even in Client Components (passed as prop).
  // I will use the `React.use()` API or just `await` it if it was server...
  // Let's stick to the SAFEST route:
  // Convert `page.tsx` to handle the Promise, then pass data to a Client Component.

  // STEP 1: Parse Params (Server Side)
  // We need to `await` searchParams.
  const params = React.use(searchParams);

  const inputToken = typeof params.inputToken === 'string' ? params.inputToken : undefined;
  const sellAmount = typeof params.amount === 'string' ? params.amount : undefined;

  const recipient = (typeof params.to === 'string' ? params.to : undefined) ||
    (typeof params.recipient === 'string' ? params.recipient : undefined);
  const buyAmount = typeof params.buyAmount === 'string' ? params.buyAmount : undefined;

  // Determine initial mode: If 'to' is present, we are likely in payment mode, 
  // BUT the user wants the Invoice Generator to be a separate "RECEIVE" tab.
  // If `to` is present, the VIEWER is the PAYER -> So they should see `AgentTerminal`.
  // If `to` is NOT present, the user might want to Swap OR Receive.
  // Default to SWAP.

  return (
    <ViewManager
      inputToken={inputToken}
      sellAmount={sellAmount}
      recipient={recipient}
      buyAmount={buyAmount}
    />
  );
}

// Internal Client Component to handle State
function ViewManager({ inputToken, sellAmount, recipient, buyAmount }: any) {
  const [mode, setMode] = useState<'SWAP' | 'RECEIVE'>('SWAP');

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

      {/* Tab Switcher */}
      <div className="flex space-x-8 mb-8 text-xs font-mono tracking-widest">
        <button
          onClick={() => setMode('SWAP')}
          className={`pb-1 border-b-2 transition-all ${mode === 'SWAP'
              ? 'text-white border-green-500'
              : 'text-gray-600 border-transparent hover:text-gray-400'
            }`}
        >
          [ SWAP_MODE ]
        </button>
        <button
          onClick={() => setMode('RECEIVE')}
          className={`pb-1 border-b-2 transition-all ${mode === 'RECEIVE'
              ? 'text-white border-green-500'
              : 'text-gray-600 border-transparent hover:text-gray-400'
            }`}
        >
          [ RECEIVE_MODE ]
        </button>
      </div>

      {mode === 'SWAP' ? (
        <AgentTerminal
          initialInputToken={inputToken}
          initialSellAmount={sellAmount}
          initialRecipient={recipient}
          initialBuyAmount={buyAmount}
        />
      ) : (
        <InvoiceGenerator />
      )}
    </div>
  );
}
