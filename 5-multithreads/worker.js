function countDigits({threadDigits}) {
  let count = 0;
  for (let digit of threadDigits) {
    if (digit % 3 === 0) {
      count += 1;
    }
  }

  postMessage(count);
}