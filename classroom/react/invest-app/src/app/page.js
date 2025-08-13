'use client';
import { useEffect } from 'react';
import { useInvestment } from '@/contexts/InvestmentContext';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import InvestmentCard from '@/components/InvestmentCard';
import InvestmentForm from '@/components/InvestmentForm';
import Modal from '@/components/Modal';

export default function Home() {
  const {
    investments,
    loadInvestments,
    isLoading,
    isShowValues,
    toggleShowValues,
    handleCreateInvestment,
  } = useInvestment();

  useEffect(() => {
    loadInvestments();
  }, []);

  return (
    <>
      <header className="py-12">
        <div className="float-right" onClick={toggleShowValues}>
          {isShowValues ? <IconEye size={24} /> : <IconEyeOff size={24} />}
        </div>
        <h1 className="text-center text-2xl font-bold">Investimentos</h1>
      </header>

      <div className="investments grid grid-cols-3 gap-3">
        {isLoading ? (
          <div className="col-span-3 flex flex-col justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <div className="text-gray-500 text-lg">Carregando investimentos...</div>
          </div>
        ) : investments.length === 0 ? (
          <div className="col-span-3 flex justify-center items-center py-12">
            <div className="text-gray-500 text-lg">Nenhum investimento encontrado</div>
          </div>
        ) : (
          investments.map((investment) => (
            <InvestmentCard {...investment} key={investment.id} />
          ))
        )}
      </div>

      <div className="fixed bottom-8 right-8">
        <button
          type="button"
          className="new-investment-btn py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm"
          onClick={() => handleCreateInvestment()}
        >
          +
        </button>
      </div>

      <InvestmentForm />

      <Modal />
    </>
  );
}
