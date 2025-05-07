// Investment
// name: Tesouro Selic 2028
// value: 164,76
// origin: Tesouro Nacional
// category: Pós
// date: 18/11/2024
// interest: 100% Selic

// JSON - JavaScript Object Notation
const investment = {
  name: 'Tesouro Selic 2028',
  value: 16476,
  origin: 'Tesouro Nacional',
  category: 'Pós',
  date: '18/11/2024',
  interest: '100% Selic',
};

// Class Definition
class Investment {
  constructor(name, value, origin, category, date, interest) {
    this.name = name;
    this.value = value;
    this.origin = origin;
    this.category = category;
    this.date = date;
    this.interest = interest;
  }
}

const tesouroSelic2028 = new Investment(
  'Tesouro Selic 2028',
  16476,
  'Tesouro Nacional',
  'Pós',
  '18/11/2024',
  '100% Selic'
);

console.log(tesouroSelic2028); //=> {name: "Tesouro Selic 2028", value: 16476, origin: "Tesouro Nacional", category: "Pós", date: "18/11/2024", interest: "100% Selic"}

// console.table
console.table(tesouroSelic2028);
// ┌──────────┬──────────────────────┐
// │ (index)  │ Values               │
// ├──────────┼──────────────────────┤
// │ name     │ 'Tesouro Selic 2028' │
// │ value    │ 16476               │
// │ origin   │ 'Tesouro Nacional'   │
// │ category │ 'Pós'                │
// │ date     │ '18/11/2024'         │
// │ interest │ '100% Selic'         │
// └──────────┴──────────────────────┘

// Accessing properties
console.log(tesouroSelic2028.name); //=> "Tesouro Selic 2028"
console.log(tesouroSelic2028['name']); //=> "Tesouro Selic 2028"

// private property (#)
class TesouroDireto {
  #name;
  #value;
  #origin;
  #category;
  #date;
  #interest;

  constructor(name, value, origin, category, date, interest) {
    this.#name = name;
    this.#value = value;
    this.#origin = origin;
    this.#category = category;
    this.#date = date;
    this.#interest = interest;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get origin() {
    return this.#origin;
  }

  set origin(origin) {
    this.#origin = origin;
  }

  get category() {
    return this.#category;
  }

  set category(category) {
    this.#category = category;
  }

  get date() {
    return this.#date;
  }

  set date(date) {
    this.#date = date;
  }

  get interest() {
    return this.#interest;
  }

  set interest(interest) {
    this.#interest = interest;
  }
}

const tesouroSelic = new TesouroDireto(
  'Tesouro Selic 2028',
  16476,
  'Tesouro Nacional',
  'Pós',
  '18/11/2024',
  '100% Selic'
);

console.log(tesouroSelic.name); //=> "Tesouro Selic 2028"
tesouroSelic.name = 'Tesouro Selic 2031';
console.log(tesouroSelic.name); //=> "Tesouro Selic 2031"

// Property Shorthand
const name = 'Tesouro Selic 2028';
const value = 16476;
const origin = 'Tesouro Nacional';
const category = 'Pós';
const date = '18/11/2024';
const interest = '100% Selic';

// const investmentShorthand = {
//   name: name,
//   value: value,
//   origin: origin,
//   category: category,
//   date: date,
//   interest: interest,
// };

const investmentShorthand = {
  name,
  value,
  origin,
  category,
  date,
  interest,
};

// Spread properties
const investmentSpread = {
  ...investmentShorthand,
  broker: 'Banco A',
  name: 'Tesouro Selic 2031',
};

// Copy reference
const tesouroSelic31 = {
  name: 'Tesouro Selic 2031',
  value: 16476,
  origin: 'Tesouro Nacional',
  category: 'Pós',
  date: '18/11/2024',
  interest: '100% Selic',
  broker: 'Banco A',
};
const tesouroSelic31Copy = tesouroSelic31; // Copy reference
tesouroSelic31Copy.value = 16399;
console.log(tesouroSelic31.value); //=> ?

// Clone
const tesouroSelic31Clone = { ...tesouroSelic31 }; // Clone
tesouroSelic31Clone.value = 16399;
console.log(tesouroSelic31.value); //=> 16476

// Destructuring
// const broker = tesouroSelic31.broker;
const { broker } = tesouroSelic31;
console.log(broker); //=> "Tesouro Selic 2031"

// Dynamic Property {[key]: value}
const key = 'risk';
const risk = 'low';
const investmentDynamic = {
  ...tesouroSelic31,
  key: risk, //=> {key: "low"}
  [key]: risk, //=> {risk: "low"}
};

// JSON.stringify
const investmentJSON = JSON.stringify(investment);
console.log(investmentJSON); //=> '{"name":"Tesouro Selic 2028","value":16476,"origin":"Tesouro Nacional","category":"Pós","date":"18/11/2024","interest":"100% Selic"}'

console.log(JSON.stringify(investment, null, 2)); //=> pretty print

// JSON.parse

const investmentString =
  '{"name":"Tesouro Selic 2028","value":16476,"origin":"Tesouro Nacional","category":"Pós","date":"18/11/2024","interest":"100% Selic"}';
console.log(investmentString.name); //=> undefined
const investmentParsed = JSON.parse(investmentString);
console.log(investmentParsed.name); //=> "Tesouro Selic 2028"
