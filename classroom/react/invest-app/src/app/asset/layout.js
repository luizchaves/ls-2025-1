'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { InvestmentsDataProvider, useInvestmentsData } from '@/contexts/InvestmentsDataContext';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

function AssetLayoutContent({ children }) {
  const { isShowValues, toggleShowValues } = useInvestmentsData();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/asset') {
      return 'Estatísticas de Investimentos';
    } else if (pathname === '/asset/allocation') {
      return 'Meus Investimentos';
    }
    return 'Investimentos';
  };

  return (
    <>
      <header className="py-12">
        <div className="flex justify-end">
          <div onClick={toggleShowValues} className="cursor-pointer">
            {isShowValues ? <IconEye size={24} /> : <IconEyeOff size={24} />}
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold mt-4">{getPageTitle()}</h1>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}

export default function AssetLayout({ children }) {
  return (
    <InvestmentsDataProvider>
      <AssetLayoutContent>
        {children}
      </AssetLayoutContent>
    </InvestmentsDataProvider>
  );
}
