// expression (commands: variable, literal, operator) => (value)
1 + 2; //=> 3
// 1++++2;

// operators (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
const fahrenheit = 30;
const celsius = (fahrenheit - 32) / 1.8; // (), -, /, =

// arithmetic operators
// + - * / % **
console.log(1 + 1);

// IEEE 754
console.log(0.1 + 0.2);

// increment and decrement operators (++, --)
let value = 10;

console.log(++value); //=> 11

console.log(value); //=> 11

console.log(value++); //=> 11

console.log(value); //=> 12

// relational operators => boolean

// equality operators => boolean
console.log(1 == 1); //=> true
console.log(1 == '1'); //=> true
console.log(1 === '1'); //=> false
console.log(1 === 1); //=> true
console.log(0.5 === 1 / 2);

// binary logical operators
let number = 1;

console.log(number || 10); //=> 1

// binary bitwise operators

// 0b1011
// 0b0001 &
// 0b0001
console.log(11 & 1); //=> 1

// 0b1100
// 0b0001 &
// 0b0000
console.log(12 & 1); //=> 0

// 0b1101
// 0b0001 &
// 0b0001
console.log(13 & 1); //=> 1

console.log(!(11 & 1)); //=> 0

// +
console.log(+1); //=> 1
console.log(1 + 1); //=> 2
console.log(1 + '1'); //=> 11

// coercion type
// https://exploringjs.com/deep-js/ch_type-coercion.html
console.log(10 / '1'); // 10
console.log(10 / 'a'); // NaN
// type error
const x = 10;
x(); // TypeError: x is not a function
