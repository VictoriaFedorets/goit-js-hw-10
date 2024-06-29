// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  dayClock: document.querySelector('.value[data-days]'),
  hour: document.querySelector('.value[data-hours]'),
  minute: document.querySelector('.value[data-minutes]'),
  second: document.querySelector('.value[data-seconds]'),
};

elements.btnStart.disabled = true;

let selectedDate;
let interval;

elements.btnStart.addEventListener('click', clickStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      elements.btnStart.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      elements.btnStart.disabled = false;
    }
  },
};
flatpickr(elements.inputDate, options);

function clickStartTimer() {
  interval = setInterval(calculateInterval, 1000);
  elements.btnStart.disabled = true;
  elements.inputDate.disabled = true;
}

function stopTimer() {
  clearInterval(interval);

  elements.btnStart.disabled = false;
  elements.inputDate.disabled = false;

  elements.dayClock.textContent = '00';
  elements.hour.textContent = '00';
  elements.minute.textContent = '00';
  elements.second.textContent = '00';
  return;
}

function calculateInterval() {
  const calculate = selectedDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(calculate);
  elements.dayClock.textContent = addLeadingZero(days);
  elements.hour.textContent = addLeadingZero(hours);
  elements.minute.textContent = addLeadingZero(minutes);
  elements.second.textContent = addLeadingZero(seconds);
  if (calculate <= 0) {
    stopTimer();
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
