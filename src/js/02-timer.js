import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
////////////////////
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  timerFace: document.querySelector('.timer'),
  inputEl: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);
//////////////////////

const timer = {
  start() {
    setInterval(() => {
      const startTime = refs.inputEl.value;
      const deltaTime = new Date(startTime).getTime() - Date.now();
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.daysEl.textContent = `${days}`;
      refs.hoursEl.textContent = `${hours}`;
      refs.minutesEl.textContent = `${minutes}`;
      refs.secondsEl.textContent = `${seconds}`;
    }, 1000);
  },
};
refs.btnStart.addEventListener('click', timer.start);

////////////////////////////////////
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
