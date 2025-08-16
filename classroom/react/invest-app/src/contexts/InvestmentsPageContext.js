'use client';

import { createContext, useState, useContext } from 'react';

export const InvestmentsPageContext = createContext({});

export function InvestmentsPageProvider({ children }) {
  const initialInvestmentFormData = {
    name: '',
    value: '',
    origin: '',
    category: '',
    interest: '',
    created_at: '',
  };

  const [isShowModal, setIsShowModal] = useState(false);
  const [investmentModalData, setInvestmentModalData] = useState({});
  const [isShowInvestmentForm, setIsShowInvestmentForm] = useState(false);
  const [investmentFormData, setInvestmentFormData] = useState(
    initialInvestmentFormData
  );
  const [investmentFormAction, setInvestmentFormAction] = useState('');

  const toggleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const toggleShowInvestmentForm = () => {
    setIsShowInvestmentForm(!isShowInvestmentForm);
  };

  const resetInvestmentFormData = () => {
    setInvestmentFormData(initialInvestmentFormData);
  };

  return (
    <InvestmentsPageContext.Provider
      value={{
        initialInvestmentFormData,
        investmentFormData,
        investmentModalData,
        isShowInvestmentForm,
        isShowModal,
        investmentFormAction,

        resetInvestmentFormData,
        setInvestmentFormData,
        setInvestmentFormAction,
        setInvestmentModalData,
        setIsShowModal,
        toggleShowInvestmentForm,
        toggleShowModal,
      }}
    >
      {children}
    </InvestmentsPageContext.Provider>
  );
}

export function useInvestmentsPage() {
  return useContext(InvestmentsPageContext);
}
