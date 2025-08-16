'use client';
import Link from 'next/link';
import { IconTrendingUp, IconPigMoney, IconChartBar, IconArrowRight, IconEye, IconCurrencyDollar } from '@tabler/icons-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IconCurrencyDollar size={32} className="text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">InvestApp</h1>
          </div>

          <Link
            href="/asset"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Acessar App
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6">
        <section className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Gerencie seus
            <span className="block text-green-600">Investimentos</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organize, acompanhe e analise seus investimentos de forma simples e intuitiva.
            Tenha controle total sobre seu portfólio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/asset/allocation"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Meus Investimentos
              <IconArrowRight size={20} className="ml-2" />
            </Link>

            <Link
              href="/asset"
              className="inline-flex items-center px-8 py-4 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-lg font-semibold"
            >
              Ver Estatísticas
              <IconChartBar size={20} className="ml-2" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para gerenciar seus investimentos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <IconPigMoney size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Gestão de Portfólio
              </h3>
              <p className="text-gray-600">
                Adicione, edite e organize todos os seus investimentos em um só lugar.
                Categorize por tipo, origem e acompanhe o desempenho.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <IconChartBar size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Análises Detalhadas
              </h3>
              <p className="text-gray-600">
                Visualize estatísticas completas do seu portfólio com gráficos,
                distribuição por categoria e métricas de performance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <IconEye size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Privacidade Total
              </h3>
              <p className="text-gray-600">
                Controle total sobre a visualização dos seus dados.
                Oculte valores sensíveis quando necessário.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white rounded-2xl shadow-lg border border-gray-100 my-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Comece a Investir Melhor
            </h2>
            <p className="text-xl text-gray-600">
              Organize seus investimentos e tome decisões mais inteligentes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Gratuito</div>
            </div>

            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">∞</div>
              <div className="text-gray-600">Investimentos</div>
            </div>

            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">📊</div>
              <div className="text-gray-600">Relatórios</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/asset/allocation"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all text-lg font-semibold shadow-lg"
            >
              Começar Agora
              <IconTrendingUp size={20} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <IconCurrencyDollar size={24} className="text-green-400" />
            <span className="text-xl font-semibold">InvestApp</span>
          </div>

          <p className="text-gray-400 mb-6">
            Sua plataforma completa para gestão de investimentos
          </p>

          <div className="flex justify-center space-x-6">
            <Link href="/asset" className="text-gray-400 hover:text-white transition-colors">
              Estatísticas
            </Link>
            <Link href="/asset/allocation" className="text-gray-400 hover:text-white transition-colors">
              Investimentos
            </Link>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8">
            <p className="text-gray-500 text-sm">
              © 2025 InvestApp. Desenvolvido para ajudar você a investir melhor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
