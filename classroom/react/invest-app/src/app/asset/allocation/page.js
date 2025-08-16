'use client';
import { useInvestmentsData } from '@/contexts/InvestmentsDataContext';
import { useInvestmentsPage, InvestmentsPageProvider } from '@/contexts/InvestmentsPageContext';
import InvestmentCard from '@/components/InvestmentCard';
import InvestmentForm from '@/components/InvestmentForm';
import DeleteInvestmentModal from '@/components/DeleteInvestmentModal';

function InvestmentsPageContent() {
  const { investments, isLoadingData: isLoadingPage } = useInvestmentsData();

  const {
    resetInvestmentFormData,
    setInvestmentFormAction,
    toggleShowInvestmentForm,
  } = useInvestmentsPage();

  const handleCreateInvestment = async () => {
    resetInvestmentFormData();

    setInvestmentFormAction('create');

    toggleShowInvestmentForm();
  };

  return (
    <>
      <div className="investments grid grid-cols-3 gap-3">
        {isLoadingPage ? (
          <div className="col-span-3 flex justify-center items-center gap-4 py-12">
            <div className="animate-spin rounded-full size-4 border-b-2 border-gray-900 mb-4"></div>
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

export default function InvestmentsPage() {
  return (
    <InvestmentsPageProvider>
      <InvestmentsPageContent />
    </InvestmentsPageProvider>
  );
}
