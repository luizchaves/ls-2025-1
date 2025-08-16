import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import { IconPigMoney, IconChartBar } from '@tabler/icons-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Invest App",
  description: "Aplicativo de controle de investimentos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <nav className="bg-white shadow mb-6">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center lg:max-w-screen-lg">
            <Link href="/" className="font-bold text-xl text-gray-800">Invest App</Link>
            <div className="flex space-x-6">
              <Link href="/asset" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <IconChartBar size={20} />
                <span>Estatísticas</span>
              </Link>
              <Link href="/asset/allocation" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <IconPigMoney size={20} />
                <span>Investimentos</span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="container min-h-screen mx-auto lg:max-w-screen-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
