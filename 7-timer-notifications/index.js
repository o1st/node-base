const notifier = require('node-notifier');

const timerString = process.argv[2] || '0h 0m 0s';

const regex = /^((\d{1,2})h)?\s*((\d{1,2})m)?\s*((\d{1,2})s)?$/;

const match = timerString.match(regex);

if (!match) {
  console.error('Invalid format. Expected format like "1h 5m 10s"');
  process.exit(1);
}

const hours = parseInt(match[2]) || 0;
const minutes = parseInt(match[4]) || 0;
const seconds = parseInt(match[6]) || 0;

const timer = (h, m, s) => {
  const totalSeconds = h * 3600 + m * 60 + s;

  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    console.error('Invalid time input. Total time must be positive.');
    return;
  }

  let remainingSeconds = totalSeconds;

  const interval = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(interval);
      console.log('Time is up!');
      notifier.notify({
        title: 'Timer Notification',
        message: 'Your timer has ended!',
        sound: true,
      });
      console.log('Notification sent.');
      return;
    }

    remainingSeconds--;

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    console.log(`${hours}h ${minutes}m ${seconds}s remaining`);
  }, 1000);
};

timer(hours, minutes, seconds);
