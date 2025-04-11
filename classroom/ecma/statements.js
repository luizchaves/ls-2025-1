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
let flag = 0;

while (flag <= 9) {
  console.log(flag);
  flag++; // flag = flag + 1
}

// do..while
flag = 0;

do {
  console.log(flag);
  flag++; // flag = flag + 1
} while (flag <= 9);

// for
for (let flag = 0; flag <= 9; flag++) {
  console.log(flag);
}

// 00, 01, 02, 03, 04, 05, 06, 07, 08, 09
// 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
// 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
// 30, 31, 32, 33, 34, 35, 36, 37, 38, 39
// 40, 41, 42, 43, 44, 45, 46, 47, 48, 49
// 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
// 60, 61, 62, 63, 64, 65, 66, 67, 68, 69
// 70, 71, 72, 73, 74, 75, 76, 77, 78, 79
// 80, 81, 82, 83, 84, 85, 86, 87, 88, 89
// 90, 91, 92, 93, 94, 95, 96, 97, 98, 99
result = '';

for (let digit = 0; digit < 10; digit++) {
  for (let unit = 0; unit < 10; unit++) {
    result += `${digit}${unit}`;
    result += unit === 9 ? '\n' : ', ';
  }
}

console.log(result);

// 99, 98, 97, 96, 95, 94, 93, 92, 91, 90
// 89, 88, 87, 86, 85, 84, 83, 82, 81, 80
// 79, 78, 77, 76, 75, 74, 73, 72, 71, 70
// 69, 68, 67, 66, 65, 64, 63, 62, 61, 60
// 59, 58, 57, 56, 55, 54, 53, 52, 51, 50
// 49, 48, 47, 46, 45, 44, 43, 42, 41, 40
// 39, 38, 37, 36, 35, 34, 33, 32, 31, 30
// 29, 28, 27, 26, 25, 24, 23, 22, 21, 20
// 19, 18, 17, 16, 15, 14, 13, 12, 11, 10
// 09, 08, 07, 06, 05, 04, 03, 02, 01, 00
result = '';

for (let digit = 9; digit >= 0; digit--) {
  for (let unit = 9; unit >= 0; unit--) {
    result += `${digit}${unit}`;
    result += unit === 0 ? '\n' : ', ';
  }
}

console.log(result);
