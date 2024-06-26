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
  dayClock: document.querySelector('data-days'),
  hour: document.querySelector('data-hours'),
  minute: document.querySelector('data-minutes'),
  second: document.querySelector('data-seconds'),
};

let selectedDate;
elements.btnStart.style.disabled = 'false';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] > Date.now()) {
      selectedDate = selectedDates[0];
      elements.btnStart.style.disabled = 'false';
    } else {
      elements.btnStart.style.disabled = 'true';
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
};
flatpickr(elements.inputDate, options);

elements.btnStart.addEventListener('click', clickStartTimer());
function clickStartTimer() {
  elements.btnStart.style.disabled = true;
  elements.inputDate.style.disabled = true;
  const intervalId = setInterval(() => {
    const calculateInterval = selectedDate.getDate() - Date.now();
    if (interval <= 0) {
      clearInterval(intervalId);
      elements.btnStart.style.disabled = false;
      elements.inputDate.style.disabled = false;
      return;
    } else {
      elements.dayClock.textContent = dayClock;
      elements.hour.textContent = hour;
      elements.minute.textContent = minute;
      elements.second.textContent = second;

      const { days, hours, minutes, seconds } = convertMs(calculateInterval);
    }
  }, 1000);
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
