function divide(num1, num2) {
  if (num2 === 0) {
    console.log('Cannot divide by zero.');
    return;
  }
  return num1 / num2;
}

module.exports = divide;
