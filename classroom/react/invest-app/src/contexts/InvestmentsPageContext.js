'use client';

import { createContext, useState, useContext } from 'react';
import Storage from '@/storage/storage-fetch';
// import Storage from '@/storage/storage-axios';
// import Storage from '@/storage/storage-supabase-client';

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

  const [investments, setInvestments] = useState([]);

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [isShowValues, setIsShowValues] = useState(true);

  const [isShowModal, setIsShowModal] = useState(false);

  const [investmentModalData, setInvestmentModalData] = useState({});

  const [isShowInvestmentForm, setIsShowInvestmentForm] = useState(false);

  const [investmentFormData, setInvestmentFormData] = useState(
    initialInvestmentFormData
  );

  const [investmentFormAction, setInvestmentFormAction] = useState('');

  const toggleShowValues = () => {
    setIsShowValues(!isShowValues);
  };

  const toggleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const toggleShowInvestmentForm = () => {
    setIsShowInvestmentForm(!isShowInvestmentForm);
  };

  const resetInvestmentFormData = () => {
    setInvestmentFormData(initialInvestmentFormData);
  };

  const sortInvestmentsByDate = (investments) => {
    return investments.sort((a, b) => {
      const dateA = new Date(a.created_at);

      const dateB = new Date(b.created_at);

      return dateB - dateA; // Ordem decrescente (mais novo primeiro)
    });
  };

  const loadInvestments = async () => {
    setIsLoadingPage(true);

    try {
      const investments = await Storage.read('investments');

      const sortedInvestments = sortInvestmentsByDate(investments);

      setInvestments(sortedInvestments);
    } catch (error) {
      console.error('Erro ao carregar investimentos:', error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  const createInvestment = async (investment) => {
    const newInvestment = await Storage.create('investments', investment);

    const updatedInvestments = [...investments, newInvestment];

    const sortedInvestments = sortInvestmentsByDate(updatedInvestments);

    setInvestments(sortedInvestments);
  };

  const updateInvestment = async (investment) => {
    const newInvestments = investments.filter(
      (item) => item.id !== investment.id
    );

    const updatedInvestments = [...newInvestments, investment];

    const sortedInvestments = sortInvestmentsByDate(updatedInvestments);

    setInvestments(sortedInvestments);

    Storage.update('investments', investment);
  };

  const removeInvestment = (id) => {
    const newInvestments = investments.filter(
      (investment) => investment.id !== id
    );

    setInvestments(newInvestments);

    Storage.remove('investments', id);
  };

  return (
    <InvestmentsPageContext.Provider
      value={{
        createInvestment,
        initialInvestmentFormData,
        investmentFormData,
        investmentModalData,
        investments,
        isLoadingPage,
        isShowInvestmentForm,
        isShowModal,
        isShowValues,
        loadInvestments,
        removeInvestment,
        resetInvestmentFormData,
        setInvestmentFormData,
        setInvestmentFormAction,
        setInvestmentModalData,
        setInvestments,
        setIsShowModal,
        setIsShowValues,
        toggleShowInvestmentForm,
        toggleShowModal,
        toggleShowValues,
        updateInvestment,
        investmentFormAction,
      }}
    >
      {children}
    </InvestmentsPageContext.Provider>
  );
}

export function useInvestmentsPage() {
  return useContext(InvestmentsPageContext);
}
