// statements (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)

// if
let number = 10;

// truthy: !falsy
// falsy: 0, -0, NaN, '', null, undefined
// https://dorey.github.io/JavaScript-Equality-Table/
if (number > 0) {
  console.log('This number is positive');
}

// if..else (? :)
if (number > 0) {
  console.log('This number is positive');
} else {
  console.log('This number is negative');
}

console.log(number > 0 ? 'This number is positive' : 'This number is negative');

// if..else if..else
if (number > 0) {
  console.log('This number is positive');
} else if (number < 0) {
  console.log('This number is negative');
} else {
  console.log('This number is zero');
}

// switch
const number1 = 10;
const number2 = 20;
const operator = '+'; // '+', '-'
let result;

switch (operator) {
  case '+':
    result = number1 + number2;
    break;
  case '-':
    result = number1 - number2;
    break;
  default:
    console.log('Invalid operator');
}

console.log(result);

// if (number > 0) {
//   console.log('This number is positive');
// } else if (number < 0) {
//   console.log('This number is negative');
// } else {
//   console.log('This number is zero');
// }
switch (true) {
  case number > 0:
    console.log('This number is positive');
    break;
  case number < 0:
    console.log('This number is negative');
    break;
  default:
    console.log('This number is zero');
}

// while

// do..while

// for

// 00, 01, ..., 09
// 10, 11, ..., 19
// ...
// 90, 91, ..., 99

// for for
// 99, 98, ..., 90
// ...
// 19, 18, ..., 10
// 00, 08, ..., 00
// 99, 97, ..., 91
// ...
// 19, 17, ..., 11
// 00, 07, ..., 01
