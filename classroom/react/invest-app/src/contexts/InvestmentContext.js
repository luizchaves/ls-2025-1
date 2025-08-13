'use client';

import { createContext, useState, useContext } from 'react';
import { formatDate } from '@/lib/format';
import Storage from '@/storage/storage-fetch';
// import Storage from '@/storage/storage-axios';
// import Storage from '@/storage/storage-supabase-client';

export const InvestmentContext = createContext({});

export function InvestmentProvider({ children }) {
  const initialInvestmentFormData = {
    name: '',
    value: '',
    origin: '',
    category: '',
    interest: '',
    created_at: '',
  };

  const [investments, setInvestments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isShowValues, setIsShowValues] = useState(true);

  const [isShowModal, setIsShowModal] = useState(false);

  const [isShowInvestmentForm, setIsShowInvestmentForm] = useState(false);

  const [investmentModalData, setInvestmentModalData] = useState({});

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

  const getTotalValue = () => {
    const total = investments.reduce((total, investment) => {
      return total + Number(investment.value * 100 || 0);
    }, 0);

    return total / 100;
  };

  const sortInvestmentsByDate = (investments) => {
    return investments.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA; // Ordem decrescente (mais novo primeiro)
    });
  };

  const loadInvestments = async () => {
    setIsLoading(true);

    try {
      const investments = await Storage.read('investments');
      const sortedInvestments = sortInvestmentsByDate(investments);
      setInvestments(sortedInvestments);
    } catch (error) {
      console.error('Erro ao carregar investimentos:', error);
    } finally {
      setIsLoading(false);
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

  const handleLoadModalData = (id) => {
    const investment = investments.find((investment) => investment.id === id);

    setInvestmentModalData(investment);

    toggleShowModal();
  };

  const handleCreateInvestment = async () => {
    setInvestmentFormData(initialInvestmentFormData);

    setInvestmentFormAction('create');

    toggleShowInvestmentForm();
  };

  const handleDeleteInvestment = () => {
    removeInvestment(investmentModalData.id);

    toggleShowModal();
  };

  const handleUpdateInvestment = async (id) => {
    loadInvestmentFormData(id);

    setInvestmentFormAction('update');

    toggleShowInvestmentForm();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    investmentFormData.value = Number(investmentFormData.value) * 100;

    investmentFormData.created_at = new Date(
      investmentFormData.created_at + 'T00:00:00-03:00'
    ).toISOString();

    investmentFormAction === 'create'
      ? createInvestment(investmentFormData)
      : updateInvestment(investmentFormData);

    toggleShowInvestmentForm();
  };

  const loadInvestmentFormData = (id) => {
    const investment = investments.find((investment) => investment.id === id);

    investment.value = Number(investment.value) / 100;

    investment.created_at = formatDate(investment.created_at, 'ymd');

    setInvestmentFormData(investment);
  };

  return (
    <InvestmentContext.Provider
      value={{
        createInvestment,
        getTotalValue,
        handleCreateInvestment,
        handleDeleteInvestment,
        handleFormSubmit,
        handleLoadModalData,
        handleUpdateInvestment,
        initialInvestmentFormData,
        investmentFormData,
        investmentModalData,
        investments,
        isLoading,
        isShowInvestmentForm,
        isShowModal,
        isShowValues,
        loadInvestmentFormData,
        loadInvestments,
        removeInvestment,
        setInvestmentFormData,
        setInvestments,
        setIsShowModal,
        setIsShowValues,
        toggleShowInvestmentForm,
        toggleShowModal,
        toggleShowValues,
        updateInvestment,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
}

export function useInvestment() {
  return useContext(InvestmentContext);
}
