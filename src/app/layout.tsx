import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'usd.c | The Agent Exchange',
  description: 'Deterministic settlement layer for Autonomous Agents. Input Any Token -> Output USDC.',
  openGraph: {
    title: 'usd.c | Settlement Layer',
    description: 'The standard protocol for machine-to-machine value settlement.',
    url: 'https://usd.c',
    siteName: 'usd.c',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'usd.c Protocol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'usd.c | Agent Protocol',
    description: 'Input Any -> Output USDC. Powered by CoW Protocol.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950`}
      >
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
