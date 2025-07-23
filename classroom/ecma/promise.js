function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }

  return a + b;
}

console.log(sum(1, 2)); // 3
// console.log(sum(1, '2')); // Error: Both arguments must be numbers

// PROMISE VERSION
function sumPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      reject(new Error('Both arguments must be numbers'));
    } else {
      resolve(a + b);
    }
  });
}

console.log(sumPromise(1, 2)); // 3

sumPromise(1, 2)
  .then(result => console.log(result)) // 3
  .catch(error => console.log(error.message));

sumPromise(1, '2')
  .then(result => console.log(result))
  .catch(error => console.log(error.message)); // Both arguments must be numbers

// Chaining promises
sumPromise(1, 2)
  .then(result => sumPromise(result, 3))
  .then(result => console.log(result)) // 6
  .catch(error => console.log(error.message));

sumPromise(1, 1)
  .then(result => console.log(result)) // 2
  .catch(error => console.log(error.message));

sumPromise(2, 2)
  .then(result => console.log(result)) // 4
  .catch(error => console.log(error.message));

sumPromise(2, '2')
  .then(result => console.log(result))
  .catch(error => console.log(error.message)); // Both arguments must be numbers

sumPromise(3, 3)
  .then(result => console.log(result)) // 6
  .catch(error => console.log(error.message));

// async/await
async function sumAsync(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  } else {
    return a + b;
  }
}

sumAsync(1, 2)
  .then(result => console.log(result)) // 3
  .catch(error => console.log(error.message));

try {
  let result = await sumAsync(5, 5);
  console.log(result); // 10

  result = await sumAsync(6, 6);
  console.log(result); // 12
} catch (error) {
  console.log(error.message);
}

async function main() {
  let result = await sumAsync(7, 7);
  console.log(result); // 14
}

main();

// fetch
const cep = '01001000';
const url = `https://viacep.com.br/ws/${cep}/json/`;

const response = await fetch(url);
const cepData = await response.json();
console.log(JSON.stringify(cepData, null, 2)); // Pretty print JSON data
console.log(cepData.localidade); // São Paulo
