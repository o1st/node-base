function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return num1 / num2;
}

module.exports = divide;
