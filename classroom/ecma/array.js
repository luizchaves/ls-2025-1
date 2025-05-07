// mutable
const numbers = [1, 2, 3, 4, 5];

console.log(numbers); //=> [1, 2, 3, 4, 5]
console.log(numbers.length); //=> 5
console.log(numbers[0]); //=> 1
console.log(numbers[4]); //=> 5
console.log(numbers[numbers.length - 1]); //=> 5
console.log(numbers.at(-1)); //=> 5
console.log(numbers[5]); //=> undefined

// const numbers = 10;
numbers.push(6); //=> [1, 2, 3, 4, 5, 6]
console.log(numbers); //=> [1, 2, 3, 4, 5, 6]
numbers.unshift(0); //=> [0, 1, 2, 3, 4, 5, 6]

// multiple types
const person = [1010, 'John', true, ['john@email.com', 'john@example.com']];

// destructuring arrays
// const state = useState('');
// const [name, setName] = useState('');
// const name = person[0];
// const email = person[3];
const [, name, , email] = person;
console.log(name); //=> "John"
console.log(email); //=> ['john@email.com', 'john@example.com']

// spread operator
const student = [...person, ['LS', 'SO']];
console.log(student); //=> [1010, "John", true, Array(2), Array(2)]

// loops
console.log(numbers); //=> [0, 1, 2, 3, 4, 5, 6]

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]); //=> 0, 1, 2, 3, 4, 5, 6
}

for (const value of numbers) {
  // value of array
  console.log(value); //=> 0, 1, 2, 3, 4, 5, 6
}

for (const index in numbers) {
  // index of array
  console.log(index); //=> 0, 1, 2, 3, 4, 5, 6
}

for (const [value, index] of numbers.entries()) {
  // index of array
  console.log(value, index); //=> 0 0, 1 1, 2 2, 3 3, 4 4, 5 5, 6 6
}

// sort
const values = [10, 1, 5];

console.log(values.sort()); //=> [1, 10, 5]
console.log(values.sort((a, b) => a - b)); //=> [1, 5, 10]
// 1 - 10 => -9
// 10 - 5 => 5

// functional programming
const array = [1, 2, 3, 4, 5];

array.map((value) => value * 2); //=> [2, 4, 6, 8, 10]

array.filter((value) => value % 2 === 0); //=> [2, 4]

array.map((value) => value * 3).filter((value) => value % 2 === 0); //=> [6, 12]

const isEven = (value) => value % 2 === 0;
const triple = array.map((value) => value * 3);
const even = triple.filter(isEven);

let sum = 0;
for (const value of array) {
  sum += value;
}
console.log(sum); //=> 15

// forEach
sum = 0;
array.forEach((value, index) => {
  sum += value;
});
console.log(sum); //=> 15

// reduce
array.reduce((accumulator, value) => accumulator + value, 0); //=> 15
// accumulator | value | (a, v) => a + v
// 0           | 1     | 1
// 1           | 2     | 3
// 3           | 3     | 6
// 6           | 4     | 10
// 10          | 5     | 15
// 0 + 1 + 2 + 3 + 4 + 5 = 15

array.reduce((accumulator, value) => accumulator * value); //=> 120
// accumulator | value | (a, v) => a * v
// 1           | 2     | 2
// 2           | 3     | 6
// 6           | 4     | 24
// 24          | 5     | 120
// 1 * 2 * 3 * 4 * 5 = 120

// every
array.every(isEven); //=> false

// some
array.some(isEven); //=> true

// find
array.find(isEven); //=> 2

// findIndex
array.findIndex(isEven); //=> 1
