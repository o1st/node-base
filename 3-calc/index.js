const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const param1 = process.argv[2];
const param2 = process.argv[3];
const operation = process.argv[4];

const num1 = parseFloat(param1);
const num2 = parseFloat(param2);

let result;

switch (operation) {
  case 'add':
    result = add(num1, num2);
    break;
  case 'subtract':
    result = subtract(num1, num2);
    break;
  case 'multiply':
    result = multiply(num1, num2);
    break;
  case 'divide':
    result = divide(num1, num2);
    break;
  default:
    console.log('Invalid operation');
    process.exit(1);
}

console.log(`Result: ${result}`);