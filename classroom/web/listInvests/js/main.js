import { investments } from './data.js';

function loadInvestments() {
  // tag
  const ul = document.querySelector('ul');

  // content
  const items = investments
    .map((investment) => `<li>${investment}</li>`)
    .join('');

  // insert content into tag
  // ul.innerHTML = items;
  ul.insertAdjacentHTML('beforeend', items);
}

loadInvestments();
