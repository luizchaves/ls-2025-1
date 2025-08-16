'use client';
import { useEffect, useMemo } from 'react';
import { useInvestmentsPage, InvestmentsPageProvider } from '@/contexts/InvestmentsPageContext';
import { IconEye, IconEyeOff, IconTrendingUp, IconPigMoney, IconChartBar } from '@tabler/icons-react';
import { formatCurrency } from '@/lib/format';

export default function StatisticsPage() {
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
  } = useInvestmentsPage();

  const totalValue = useMemo(() => {
    const total = investments.reduce((total, investment) => {
      return total + Number(investment.value * 100 || 0);
    }, 0);
    return total / 100;
  }, [investments]);

  const averageValue = useMemo(() => {
    if (investments.length === 0) return 0;
    return totalValue / investments.length;
  }, [totalValue, investments.length]);

  const categoryStats = useMemo(() => {
    const stats = {};
    investments.forEach(investment => {
      const category = investment.category || 'Sem categoria';
      if (!stats[category]) {
        stats[category] = { count: 0, total: 0 };
      }
      stats[category].count += 1;
      stats[category].total += Number(investment.value || 0) / 100;
    });
    return Object.entries(stats).map(([category, data]) => ({
      category,
      count: data.count,
      total: data.total,
      percentage: totalValue > 0 ? (data.total / totalValue * 100).toFixed(1) : 0
    }));
  }, [investments, totalValue]);

  const highestInvestment = useMemo(() => {
    if (investments.length === 0) return null;
    return investments.reduce((max, investment) => {
      const value = Number(investment.value || 0);
      const maxValue = Number(max.value || 0);
      return value > maxValue ? investment : max;
    });
  }, [investments]);

  useEffect(() => {
    loadInvestments();
  }, []);

  if (isLoadingPage) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full size-8 border-b-2 border-gray-900"></div>
        <div className="ml-4 text-gray-500 text-lg">Carregando estatísticas...</div>
      </div>
    );
  }

  return (
    <>
      <header className="py-12">
        <div className="flex justify-end">
          <div onClick={toggleShowValues} className="cursor-pointer">
            {isShowValues ? <IconEye size={24} /> : <IconEyeOff size={24} />}
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold mt-4">Estatísticas de Investimentos</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Valor Total */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Total</h2>
              <p className="text-3xl font-bold text-green-600">
                {isShowValues ? formatCurrency(totalValue / 100) : '*****'}
              </p>
            </div>
            <IconTrendingUp size={48} className="text-green-500" />
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Quantidade</h2>
              <p className="text-3xl font-bold text-blue-600">
                {isShowValues ? investments.length : '**'}
              </p>
            </div>
            <IconPigMoney size={48} className="text-blue-500" />
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Valor Médio</h2>
              <p className="text-3xl font-bold text-purple-600">
                {isShowValues ? formatCurrency(averageValue / 100) : '*****'}
              </p>
            </div>
            <IconChartBar size={48} className="text-purple-500" />
          </div>
        </div>
      </div>

      {highestInvestment && (
        <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Maior Investimento</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold text-gray-800">{highestInvestment.name}</p>
              <p className="text-sm text-gray-600">{highestInvestment.category} • {highestInvestment.origin}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {isShowValues ? formatCurrency(Number(highestInvestment.value || 0) / 100) : '*****'}
              </p>
              <p className="text-sm text-gray-500">{highestInvestment.interest}</p>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas por Categoria */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Distribuição por Categoria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryStats.map(({ category, count, total, percentage }) => (
            <div key={category} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700">{category}</h3>
                <span className="text-sm font-medium text-gray-500">{percentage * 100}%</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantidade:</span>
                  <span className="font-medium">{isShowValues ? count : '**'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valor Total:</span>
                  <span className="font-medium text-green-600">
                    {isShowValues ? formatCurrency(total) : '*****'}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {investments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum investimento encontrado para gerar estatísticas</p>
          <p className="text-blue-600 mt-2">Use a navegação acima para ir aos investimentos</p>
        </div>
      )}
    </>
  );
}
