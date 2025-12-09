import YieldTable from './components/YieldTable';
import ExchangeRateBoard from './components/ExchangeRateBoard';

export default function Home() {
  return (
    <main>
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Market Overview
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span className="text-xs font-mono text-green-400 uppercase tracking-widest font-semibold">Live Data</span>
          </div>
        </div>

        <ExchangeRateBoard />
        <div className="my-8" />

        <YieldTable />
      </div>
    </main>
  );
}
