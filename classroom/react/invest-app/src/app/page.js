'use client';
import { useEffect } from 'react';
import { useInvestmentsPage, InvestmentsPageProvider } from '@/contexts/InvestmentsPageContext';
import { formatCurrency } from '@/lib/format';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import InvestmentCard from '@/components/InvestmentCard';
import InvestmentForm from '@/components/InvestmentForm';
import DeleteInvestmentModal from '@/components/DeleteInvestmentModal';

export default function InvestmentsPage() {
  return (
    <InvestmentsPageProvider>
      <Page />
    </InvestmentsPageProvider>
  );
}

function Page() {
  const {
    investments,
    loadInvestments,
    isLoadingPage,
    isShowValues,
    toggleShowValues,
    resetInvestmentFormData,
    setInvestmentFormAction,
    toggleShowInvestmentForm,
  } = useInvestmentsPage();

  const getTotalValue = () => {
    const total = investments.reduce((total, investment) => {
      return total + Number(investment.value * 100 || 0);
    }, 0);

    return total / 100;
  };

  const handleCreateInvestment = async () => {
    resetInvestmentFormData();

    setInvestmentFormAction('create');

    toggleShowInvestmentForm();
  };

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

      {/* <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Valor Total dos Investimentos</h2>
            <p className="text-3xl font-bold text-green-600">
              {isShowValues ? formatCurrency(getTotalValue() / 100) : '*****'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Total de investimentos</p>
            <p className="text-xl font-semibold text-gray-700">
              {isShowValues ? investments.length : '**'}
            </p>
          </div>
        </div>
      </div> */}

      <div className="investments grid grid-cols-3 gap-3">
        {isLoadingPage ? (
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
            <InvestmentCard investment={investment} key={investment.id} />
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

      <DeleteInvestmentModal />
    </>
  );
}
