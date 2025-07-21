const timerString = process.argv[2] || '0h 0m 0s';

const [h, m, s] = timerString.split(' ').map(part => part.replace(/[a-zA-Z]/g, ''));

const timer = (h, m, s) => {
  const totalSeconds = (parseInt(h) || 0) * 3600 + (parseInt(m) || 0) * 60 + (parseInt(s) || 0);
  
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    console.error('Invalid time input');
    return;
  }

  let remainingSeconds = totalSeconds;

  const interval = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(interval);
      console.log('Time is up!');
      return;
    }

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    console.log(`${hours}h ${minutes}m ${seconds}s remaining`);
    remainingSeconds--;
  }, 1000);
}   

timer(h, m, s);