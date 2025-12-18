'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet, Coins, Circle } from 'lucide-react';
import { clsx } from 'clsx';

export default function Navbar() {
    const pathname = usePathname();

    const handleConnectWallet = () => {
        console.log('Connect wallet clicked');
    };

    const navLinks = [
        { name: 'Dashboard', href: '/' },
        { name: 'Swap', href: '/swap' },
        { name: 'Gold & RWA', href: '/resources' },
        { name: 'Buy Crypto', href: '/buy' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                            <Circle className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-blue-100">C</div>
                        </div>
                        <span className="font-bold text-xl text-white tracking-wide">USD.C</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => {
                                // Simple active check: strictly equal for root, startsWith for others if needed
                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                                            isActive
                                                ? 'text-white bg-slate-800'
                                                : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Action Section */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleConnectWallet}
                            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/20"
                        >
                            <Wallet className="w-4 h-4" />
                            <span>Connect Wallet</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
