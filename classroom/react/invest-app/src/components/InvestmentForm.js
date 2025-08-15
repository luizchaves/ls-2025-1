import { useInvestmentsPage } from '@/contexts/InvestmentsPageContext';
import { useState } from 'react';

export default function InvestmentForm() {
  const {
    isShowInvestmentForm,
    toggleShowInvestmentForm,
    investmentFormData,
    setInvestmentFormData,
    investmentFormAction,
    createInvestment,
    updateInvestment,
  } = useInvestmentsPage();

  const [taxaError, setTaxaError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const taxaRegex = /^$|^\d+(\.\d+)?%(\s*(Selic|CDI))?$|^IPCA\s*\+\s*\d+(\.\d+)?%$/i;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      investmentFormData.value = Number(investmentFormData.value) * 100;

      investmentFormData.created_at = new Date(
        investmentFormData.created_at + 'T00:00:00-03:00'
      ).toISOString();

      investmentFormAction === 'create'
        ? await createInvestment(investmentFormData)
        : await updateInvestment(investmentFormData);

      toggleShowInvestmentForm();
    } catch (error) {
      console.error('Erro ao salvar investimento:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (name === 'interest') {
      const isValid = taxaRegex.test(value);
      if (!isValid && value !== '') {
        setTaxaError('Formato inválido. Use: 10%, 100% CDI, 100% Selic ou IPCA + 5%');
      } else {
        setTaxaError('');
      }
    }

    setInvestmentFormData({ ...investmentFormData, [name]: value });
  };

  return (
    <>
      {isShowInvestmentForm && (
        <div>
          <div
            className="fixed h-full w-full right-0 top-0 bg-black/50 z-10"
            onClick={() => toggleShowInvestmentForm()}
          ></div>
          <div
            className="fixed bottom-0 right-0 top-0 z-[1045] flex w-96 max-w-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out"
            tabIndex={-1}
          >
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">
                Investimento
              </h3>
              <button
                type="button"
                className="investment-drawer-close inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm"
                onClick={() => toggleShowInvestmentForm()}
              >
                <span className="sr-only">Cadastro de Investimento</span>
                <svg
                  className="w-3.5 h-3.5"
                  width={8}
                  height={8}
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <form onSubmit={(event) => handleFormSubmit(event)}>
                <input type="hidden" id="id" name="id" />
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={investmentFormData.name}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ex: Tesouro Selic 2030"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="value"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Valor
                  </label>
                  <input
                    type="number"
                    id="value"
                    name="value"
                    step={0.01}
                    onChange={handleChange}
                    value={investmentFormData.value}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ex: 1000.00"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="origin"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Origem
                  </label>
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    onChange={handleChange}
                    value={investmentFormData.origin}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ex: Banco A"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Categoria
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={investmentFormData.category}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ex: Renda Fixa, Ações, FII"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Taxa
                  </label>
                  <input
                    type="text"
                    id="interest"
                    name="interest"
                    onChange={handleChange}
                    value={investmentFormData.interest}
                    className={`py-3 px-4 block w-full border rounded-md text-sm focus:ring-blue-500 ${taxaError
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500'
                      }`}
                    placeholder="Ex: 100% CDI, 10%, IPCA + 5%"
                  />
                  {taxaError && (
                    <p className="text-red-500 text-xs mt-1">{taxaError}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="created_at"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Data
                  </label>
                  <input
                    type="date"
                    id="created_at"
                    name="created_at"
                    onChange={handleChange}
                    value={investmentFormData.created_at}
                    className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`py-3 px-4 inline-flex w-full justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm ${isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500'
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full size-4 border-b-2 border-white mr-2"></div>
                        Salvando...
                      </>
                    ) : (
                      'Enviar'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
