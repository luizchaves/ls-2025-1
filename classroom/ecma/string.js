// String (', ", `)
// single quote
console.log('hello world'); //=> "hello world"
// double quote
// console.log("hello world"); //=> "hello world"
// Template literals / Template strings
console.log(`hello world`); //=> "hello world"

const id = '1';
const name = 'John';
const email = 'john@email.com';

// Concat (+)
// <tr><td></td><td></td><td></td></tr>
console.log(
  '<tr><td>' + id + '</td><td>' + name + '</td><td>' + email + '</td></tr>'
);

// Template literals / Template strings
// multi-line strings
// string interpolation
console.log(
  `<tr>
  <td>${id}</td>
  <td>${name}</td>
  <td>${email}</td>
</tr>`
);

// Convert String(), .toString()
console.log(String(10)); //=> "10"
console.log((10).toString()); //=> "10"
console.log(Number('10')); //=> 10

// String.length

// String.padStart, String.padEnd
const pc = 10;
console.log(`PC-${String(pc).padStart(3, '0')}`); //=> "PC-010"

// String.split / Array.join
const csvRow = '1,John,john@email';
console.log(csvRow.split(',')); //=> ["1", "John", "john@email"]
console.log(csvRow.split(',').join('; ')); //=> "1; John; john@email"

// String.toLowerCase
console.log('hello world'.toLowerCase()); //=> "hello world"
console.log('HELLO WORLD'.toLowerCase()); //=> "hello world"

// String.includes
console.log('hello world'.includes('hello')); //=> true
console.log('HELLO WORLD'.includes('hello')); //=> false
console.log('HELLO WORLD'.toLowerCase().includes('hello'.toLowerCase())); //=> true

// String.localeCompare
