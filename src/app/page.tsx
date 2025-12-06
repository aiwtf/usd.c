import YieldTable from './components/YieldTable';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-2">
          USDC.C Yield Tracker
        </h1>
        <p className="text-gray-400 mb-8">
          Live Top APY Rates for USDC
        </p>

        <YieldTable />
      </div>
    </main>
  );
}
