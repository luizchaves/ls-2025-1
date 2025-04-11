// function declaration
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // NaN
console.log(sum(1, 2, 3)); // 3

// function expression
const minus = function (a, b) {
  return a - b;
};

console.log(minus); // [Function: minus]
console.log(minus(2, 1)); // 1

// arrow function
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(2, 3)); // 6

// arrow function with implicit return
const divide = (a, b) => a / b;

console.log(divide(6, 2)); // 3

// default parameters
function power(base, exponent = 1) {
  return base ** exponent;
}

console.log(power(2)); // 2
console.log(power(2, 3)); // 8

// rest parameter
function summation(...numbers) {
  let sum = 0;

  for (let number of numbers) {
    sum += number;
  }

  return sum;
}

console.log(summation(1)); // 1
console.log(summation(1, 2)); // 3
console.log(summation(1, 2, 3)); // 6

// callback function
function calc(a, b, operator) {
  return operator(a, b);
}

console.log(calc(1, 2, sum)); // 3
console.log(calc(1, 2, minus)); // -1
console.log(calc(1, 2, multiply)); // 2
console.log(calc(1, 2, divide)); // 0.5
console.log(calc(1, 2, (a, b) => a + b)); // 3

function checkNumber(number, callback) {
  return Boolean(callback(number));
}

console.log(checkNumber(1, (number) => number > 0)); // true
console.log(checkNumber(1, (number) => number < 0)); // false
console.log(checkNumber(1, (number) => number & 1)); // true
