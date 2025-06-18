import { formatCurrency, formatDate } from '@/lib/format';

export default function Home() {
  const investments = [
    {
      id: 'b9f2414d-b8dd-484d-8179-83383d10a3fd',
      name: 'Tesouro Selic 2029',
      value: 10050,
      origin: 'Tesouro Nacional',
      category: 'Pós',
      created_at: '2023-08-22T00:00:00-03:00',
      interest: '100% Selic',
    },
    {
      id: 'a1e2c3d4-e5f6-7890-abcd-1234567890ef',
      name: 'CDB Banco X 2027',
      value: 25000,
      origin: 'Banco X',
      category: 'Prefixado',
      created_at: '2022-11-15T00:00:00-03:00',
      interest: '12% a.a.',
    },
    {
      id: 'f7e6d5c4-b3a2-1098-7654-3210fedcba98',
      name: 'LCI Banco A 2026',
      value: 18000,
      origin: 'Banco A',
      category: 'Pós',
      created_at: '2024-01-10T00:00:00-03:00',
      interest: '98% CDI',
    },
  ];

  return (
    <>
      <h1 className="text-center text-2xl my-12 font-bold">Investimentos</h1>

      <div className="investments grid grid-cols-3 gap-3">
        {investments.map((investment) => (
          <InvestmentCard key={investment.id} investment={investment} />
        ))}
      </div>
    </>
  );
}

function InvestmentCard({ investment }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <div className="flex justify-between items-center">
        <h3 className="investment-name text-lg font-semibold text-gray-700">
          {investment.name}
        </h3>
        <p className="investment-value text-lg font-semibold text-gray-700">
          {formatCurrency(investment.value / 100)}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          <span className="font-bold mr-1">Origem:</span>
          <span className="investment-origin">{investment.origin}</span>
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold mr-1">Categoria:</span>
          <span className="investment-category">{investment.category}</span>
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold mr-1">Taxa:</span>
          <span className="investment-interest">{investment.interest}</span>
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold mr-1">Data:</span>
          <span className="investment-created_at">
            {formatDate(investment.created_at)}
          </span>
        </p>
      </div>
    </div>
  );
}

