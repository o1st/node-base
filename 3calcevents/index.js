const EventEmitter = require('events');

const add = require('../3-calc/add');
const subtract = require('../3-calc/subtract');
const multiply = require('../3-calc/multiply');
const divide = require('../3-calc/divide');

const param1 = process.argv[2];
const param2 = process.argv[3];
const operation = process.argv[4];

const eventEmitter = new EventEmitter();

if (!param1 || !param2 || !operation) {
  console.log('Usage: node index.js <num1> <num2> <operation>');
  process.exit(1);
}

if(!['add', 'subtract', 'multiply', 'divide'].includes(operation)) {
  console.log('Invalid operation. Use add, subtract, multiply, or divide.');
  process.exit(1);
}

eventEmitter.on('add', (num1, num2) => {
  console.log(add(num1, num2));
});

eventEmitter.on('subtract', (num1, num2) => {
  console.log(subtract(num1, num2));
});

eventEmitter.on('multiply', (num1, num2) => {
  console.log(multiply(num1, num2));
});

eventEmitter.on('divide', (num1, num2) => {
  console.log(divide(num1, num2));
});

const num1 = parseFloat(param1);
const num2 = parseFloat(param2);

if (isNaN(num1) || isNaN(num2)) {
  console.log('Both parameters must be numbers.');
  process.exit(1);
}

eventEmitter.emit(operation, num1, num2);