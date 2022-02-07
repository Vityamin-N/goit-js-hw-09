import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    timePicker: document.querySelector("#datetime-picker"),
    startButton: document.querySelector("[data-start]"),
    timer: document.querySelector(".timer"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};
let selectDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectDate = selectedDates[0].getTime();
        if (Date.now() > selectDate) {
            Notify.failure('Please choose a date in the future');
            refs.startButton.disabled = true;
            return;
        }
        refs.startButton.disabled = false;
    },
};
refs.startButton.disabled = true;
timerStyle();

flatpickr('#datetime-picker', options);
refs.startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
    const intervalId = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = selectDate - currentDate;
        if (deltaTime <= 0) {
            clearInterval(intervalId);
            updateTimer(convertMs(0));
            return;
        }
        updateTimer(convertMs(deltaTime));
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

function addZero(val) {
    return val.toString();
}
function updateTimer({ days, hours, minutes, seconds }) {
refs.days.textContent = addZero(days);
refs.hours.textContent = addZero(hours);
refs.minutes.textContent = addZero(minutes);
refs.seconds.textContent = addZero(seconds);
}

function timerStyle() {
    const mainTag = document.createElement('main');
    const divFirstTag = document.createElement('div');
    const divSecondTag = document.createElement('div');
    divFirstTag.classList.add('center');
    divSecondTag.classList.add('wrap');
    divFirstTag.appendChild(divSecondTag);
    mainTag.appendChild(divFirstTag);
    refs.timePicker.before(mainTag);
    divSecondTag.appendChild(refs.timePicker);
    divSecondTag.appendChild(refs.startButton);
    divSecondTag.appendChild(refs.timer);
} 