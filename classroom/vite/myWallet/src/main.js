import { investments } from './data';

import './style/main.css';

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function createCard(investment) {
  return `
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            ${investment.name}
          </h2>
          <div class="text-gray-600 mb-4">${investment.type}</div>
          <div class="text-gray-600 mb-4">
            ${investment.return}
          </div>
          <div class="text-xl font-bold text-gray-800">
            ${formatCurrency(investment.value / 100)}
          </div>
      </div>
  `;
}

const container = document.getElementById('investments-container');

container.innerHTML = investments.map(createCard).join('');
