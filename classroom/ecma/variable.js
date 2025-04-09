// const
const number = 10;

// 'const' declarations must be initialized.
// const value;

// TypeError: Assignment to constant variable.
// number = 100;

// Cannot redeclare block-scoped variable 'number'.
// const number = 100;

function hello() {
  const number = 100;

  console.log(number);
}

// let
let value = 10;

value = 100;

console.log(value); // 100

let personName; // undefined

personName = 'Alice';

// let number;

// var
var name = 'Alice';

var name = 10;

// const vs let vs var
