'use client';

import { createContext, useContext, useState } from 'react';

export const InvestmentContext = createContext({});

export function InvestmentProvider({ children }) {
  const [investments, setInvestments] = useState([]);

  const [isShowValues, setIsShowValues] = useState(true);

  const handleToggleValues = () => {
    // isShowValues = !isShowValues;
    setIsShowValues(!isShowValues);

    console.log('Toggle Values');
  };

  return (
    <InvestmentContext.Provider value={{
      investments,
      setInvestments,
      isShowValues,
      setIsShowValues,
      handleToggleValues
    }}>
      {children}
    </InvestmentContext.Provider>
  );
}

export function useInvestment() {
  return useContext(InvestmentContext);
}
