'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import Storage from '@/storage/storage-fetch';
import { supabase } from '@/storage/storage-supabase-client';
// import Storage from '@/storage/storage-axios';
// import Storage from '@/storage/storage-supabase-client';

export const InvestmentsDataContext = createContext({});

export function InvestmentsDataProvider({ children }) {
  const [investments, setInvestments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isShowValues, setIsShowValues] = useState(true);

  const toggleShowValues = () => {
    setIsShowValues(!isShowValues);
  };

  const sortInvestmentsByDate = (investments) => {
    return investments.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  };

  const loadData = async () => {
    setIsLoadingData(true);

    try {
      const investments = await Storage.read('investments');
      const sortedInvestments = sortInvestmentsByDate(investments);
      setInvestments(sortedInvestments);

      let { data: categories } = await supabase.rpc("get_enum_values", { enum_name: "category" });
      setCategories(Object.values(categories));
    } catch (error) {
      console.error('Erro ao carregar investimentos:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const createInvestment = async (investment) => {
    const newInvestment = await Storage.create('investments', investment);
    const newInvestments = [...investments, newInvestment];
    const sortedInvestments = sortInvestmentsByDate(newInvestments);
    setInvestments(sortedInvestments);
    return newInvestment;
  };

  const updateInvestment = async (investment) => {
    const newInvestments = investments.filter(
      (item) => item.id !== investment.id
    );
    const updatedInvestments = [...newInvestments, investment];
    const sortedInvestments = sortInvestmentsByDate(updatedInvestments);
    setInvestments(sortedInvestments);
    await Storage.update('investments', investment.id, investment);
    return investment;
  };

  const removeInvestment = async (id) => {
    const newInvestments = investments.filter(
      (investment) => investment.id !== id
    );
    setInvestments(newInvestments);
    await Storage.remove('investments', id);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <InvestmentsDataContext.Provider
      value={{
        investments,
        categories,
        isLoadingData,
        isShowValues,
        createInvestment,
        updateInvestment,
        removeInvestment,
        toggleShowValues,
        setInvestments,
        setIsShowValues,
      }}
    >
      {children}
    </InvestmentsDataContext.Provider>
  );
}

export function useInvestmentsData() {
  return useContext(InvestmentsDataContext);
}
