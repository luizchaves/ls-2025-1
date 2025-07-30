'use client';
import InvestmentCard from '@/components/InvestmentCard';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';

const data = [
  {
    id: 'b9f2414d-b8dd-484d-8179-83383d10a3fd',
    name: 'Tesouro Selic 2029',
    value: 10050,
    origin: 'Tesouro Nacional',
    category: 'Pós',
    created_at: '2023-08-22T00:00:00-03:00',
    interest: '100% Selic',
  },
  {
    id: 'a1e2c3d4-e5f6-7890-abcd-1234567890ef',
    name: 'CDB Banco X 2027',
    value: 25000,
    origin: 'Banco X',
    category: 'Prefixado',
    created_at: '2022-11-15T00:00:00-03:00',
    interest: '12% a.a.',
  },
  {
    id: 'f7e6d5c4-b3a2-1098-7654-3210fedcba98',
    name: 'LCI Banco A 2026',
    value: 18000,
    origin: 'Banco A',
    category: 'Pós',
    created_at: '2024-01-10T00:00:00-03:00',
    interest: '98% CDI',
  },
];

export default function Home() {
  const [investments, setInvestments] = useState(data);
  const [isShowValues, setIsShowValues] = useState(true);

  const handleToggleValues = () => {
    // isShowValues = !isShowValues;
    setIsShowValues(!isShowValues);

    console.log('Toggle Values');
  };

  return (
    <>
      <div className="float-right cursor-pointer" onClick={handleToggleValues}>
        {isShowValues ? (
          <IconEye size={24} />
        ) : (
          <IconEyeOff size={24} />
        )}
      </div>

      <h1 className="text-center text-2xl my-12 font-bold">Investimentos</h1>

      <div className="investments grid grid-cols-3 gap-3">
        {investments.map((investment) => (
          <InvestmentCard
            key={investment.id}
            investment={investment}
            isShowValues={isShowValues}
            setInvestments={setInvestments}
          />
        ))}
      </div>
    </>
  );
}
