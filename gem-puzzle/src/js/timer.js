const arrTimers = [];
const createTimer = (newGame = false, saveTime = false) => {
  const timeWrapper = document.querySelector('.time');

  const time = {
    sec: 0,
    min: 0,
  };
  if (saveTime) {
    time.sec = +saveTime.sec;
    time.min = +saveTime.min;
  }
  const timer = setInterval(() => {
    time.sec++;
    if (time.sec > 60) {
      time.sec = 0;
      time.min++;
    }
    timeWrapper.textContent = `Time: ${time.min ? `${time.min}m` : ''} ${time.sec}s`;
  }, 1000);
  arrTimers.push(timer);
  if (newGame) {
    clearInterval(arrTimers[0]);
    arrTimers.shift();
  }

  return { timer, time };
};

export default createTimer;
