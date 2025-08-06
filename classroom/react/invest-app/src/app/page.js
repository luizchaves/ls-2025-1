'use client';
import InvestmentCard from '@/components/InvestmentCard';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import API from '@/storage/storage-fetch';
// import API from '@/storage/storage-axios';
// import API from '@/storage/storage-supabase-client';

export default function Home() {
  const [investments, setInvestments] = useState([]);
  const [isShowValues, setIsShowValues] = useState(true);

  const handleToggleValues = () => {
    // isShowValues = !isShowValues;
    setIsShowValues(!isShowValues);

    console.log('Toggle Values');
  };

  const fetchInvestments = async () => {
    const investments = await API.read('investments');
    setInvestments(investments);
  }

  useEffect(() => {
    fetchInvestments();
  }, []);

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
