'use client';
import { useMemo, useState } from 'react';
import { useInvestmentsData } from '@/contexts/InvestmentsDataContext';
import { IconTrendingUp, IconPigMoney, IconChartBar } from '@tabler/icons-react';
import { formatCurrency } from '@/lib/format';

export default function StatisticsPage() {
  const {
    investments,
    categories,
    isLoadingData: isLoadingPage,
    isShowValues,
  } = useInvestmentsData();

  const [activeTab, setActiveTab] = useState('categories');

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
    categories.forEach(category => {
      stats[category] = { count: 0, total: 0 };
    });

    // Soma os investimentos por categoria
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
  }, [investments, categories, totalValue]);

  const bankStats = useMemo(() => {
    const stats = {};

    investments.forEach(investment => {
      const bank = investment.origin || 'Sem banco informado';
      if (!stats[bank]) {
        stats[bank] = { count: 0, total: 0 };
      }
      stats[bank].count += 1;
      stats[bank].total += Number(investment.value || 0) / 100;
    });

    return Object.entries(stats)
      .map(([bank, data]) => ({
        bank,
        count: data.count,
        total: data.total,
        percentage: totalValue > 0 ? (data.total / totalValue * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.total - a.total); // Ordena por valor total decrescente
  }, [investments, totalValue]);

  const evolutionData = useMemo(() => {
    if (investments.length === 0) return [];

    // Agrupa investimentos por mês/ano
    const groupedByMonth = {};

    investments.forEach(investment => {
      const date = new Date(investment.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!groupedByMonth[monthKey]) {
        groupedByMonth[monthKey] = {
          month: monthKey,
          count: 0,
          total: 0,
          accumulated: 0
        };
      }

      groupedByMonth[monthKey].count += 1;
      groupedByMonth[monthKey].total += Number(investment.value || 0) / 100;
    });

    // Converte para array e ordena por data
    const sortedData = Object.values(groupedByMonth)
      .sort((a, b) => a.month.localeCompare(b.month));

    // Calcula valores acumulados
    let accumulatedTotal = 0;
    let accumulatedCount = 0;

    return sortedData.map(item => {
      accumulatedTotal += item.total;
      accumulatedCount += item.count;

      return {
        ...item,
        accumulated: accumulatedTotal,
        accumulatedCount: accumulatedCount,
        monthLabel: item.month.split('-').reverse().join('/')
      };
    });
  }, [investments]);

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

      <div className="mb-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === 'categories'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            Categoria
          </button>
          <button
            onClick={() => setActiveTab('banks')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === 'banks'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            Banco
          </button>
          <button
            onClick={() => setActiveTab('evolution')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === 'evolution'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            Evolução
          </button>
        </div>

        {activeTab === 'categories' && (
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
        )}

        {activeTab === 'banks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bankStats.map(({ bank, count, total, percentage }) => (
              <div key={bank} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">{bank}</h3>
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
        )}

        {activeTab === 'evolution' && (
          <div className="space-y-6">
            {evolutionData.length > 0 ? (
              <>
                {/* Gráfico de Linha Acumulativa */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução Acumulativa dos Investimentos</h3>
                  <div className="relative ml-16">
                    {/* Área do gráfico */}
                    <div className="relative h-64 w-full">
                      <svg viewBox="0 0 800 200" className="w-full h-full">
                        {/* Grid de fundo */}
                        <defs>
                          <pattern id="grid" width="80" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="800" height="200" fill="url(#grid)" />

                        {/* Linha acumulativa */}
                        {(() => {
                          const maxValue = Math.max(...evolutionData.map(d => d.accumulated));
                          const points = evolutionData.map((item, index) => {
                            const x = (index / (evolutionData.length - 1)) * 750 + 25;
                            const y = 180 - ((item.accumulated / maxValue) * 160);
                            return `${x},${y}`;
                          }).join(' ');

                          return (
                            <>
                              {/* Área preenchida sob a linha */}
                              <polygon
                                points={`25,180 ${points} ${750 + 25},180`}
                                fill="url(#gradient)"
                                opacity="0.3"
                              />
                              {/* Linha principal */}
                              <polyline
                                points={points}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {/* Pontos na linha */}
                              {evolutionData.map((item, index) => {
                                const x = (index / (evolutionData.length - 1)) * 750 + 25;
                                const y = 180 - ((item.accumulated / maxValue) * 160);
                                return (
                                  <circle
                                    key={index}
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill="#3b82f6"
                                    stroke="white"
                                    strokeWidth="2"
                                    className="hover:r-6 transition-all cursor-pointer"
                                  />
                                );
                              })}
                            </>
                          );
                        })()}

                        {/* Gradiente para área preenchida */}
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Labels do eixo X */}
                    <div className="flex justify-between mt-2 px-1">
                      {evolutionData.map((item, index) => (
                        <div
                          key={index}
                          className="text-xs text-gray-500 text-center"
                          style={{
                            width: `${100 / evolutionData.length}%`,
                            transform: evolutionData.length > 6 && index % 2 === 1 ? 'rotate(-45deg)' : 'none'
                          }}
                        >
                          {item.monthLabel}
                        </div>
                      ))}
                    </div>

                    {/* Labels do eixo Y */}
                    <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-500 -ml-16 text-right pr-2">
                      {(() => {
                        const maxValue = Math.max(...evolutionData.map(d => d.accumulated));
                        const steps = 5;
                        return Array.from({ length: steps + 1 }, (_, i) => {
                          const value = (maxValue / steps) * (steps - i);
                          return (
                            <div key={i} className="flex items-center">
                              {isShowValues ? formatCurrency(value) : '*****'}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  {/* Legenda */}
                  <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-1 bg-blue-500 rounded"></div>
                      <span>Valor Acumulado</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução Mensal dos Investimentos</h3>
                  <div className="space-y-4">
                    {evolutionData.map((item, index) => {
                      const maxValue = Math.max(...evolutionData.map(d => d.total));
                      const barWidth = maxValue > 0 ? (item.total / maxValue) * 100 : 0;

                      return (
                        <div key={item.month} className="flex items-center space-x-4">
                          <div className="w-20 text-sm text-gray-600 font-medium">
                            {item.monthLabel}
                          </div>
                          <div className="flex-1 flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                                style={{ width: `${barWidth}%` }}
                              >
                                {barWidth > 20 && (
                                  <span className="text-white text-xs font-medium">
                                    {isShowValues ? formatCurrency(item.total) : '*****'}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="w-24 text-sm text-gray-600">
                              {isShowValues ? `${item.count} inv.` : '** inv.'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="text-md font-semibold text-gray-700 mb-4">Resumo por Período</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-600">Período</th>
                          <th className="text-right py-2 text-gray-600">Quantidade</th>
                          <th className="text-right py-2 text-gray-600">Valor do Mês</th>
                          <th className="text-right py-2 text-gray-600">Total Acumulado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evolutionData.map((item) => (
                          <tr key={item.month} className="border-b border-gray-100">
                            <td className="py-2 font-medium text-gray-700">{item.monthLabel}</td>
                            <td className="py-2 text-right text-gray-600">
                              {isShowValues ? item.count : '**'}
                            </td>
                            <td className="py-2 text-right text-green-600 font-medium">
                              {isShowValues ? formatCurrency(item.total) : '*****'}
                            </td>
                            <td className="py-2 text-right text-blue-600 font-medium">
                              {isShowValues ? formatCurrency(item.accumulated) : '*****'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum dado de evolução disponível</p>
                <p className="text-gray-400 mt-2">Adicione investimentos para ver a evolução temporal</p>
              </div>
            )}
          </div>
        )}
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
