import { Notify } from 'notiflix/build/notiflix-notify-aio';
const ref = {
  form: document.querySelector('.form'),
};

promisesStyle();

ref.form.addEventListener('submit', onButtonSubmit);

function onButtonSubmit(evt) {
  evt.preventDefault();
  const firstDelay = toNumber(evt.target.delay.value);
  const stepDelay = toNumber(evt.target.step.value);
  const amountOfDelays = toNumber(evt.target.amount.value);
  for (let i = 0; i < amountOfDelays; i += 1) {
    let position = i + 1;
    let delay = firstDelay + stepDelay * i;
    createPromise(position, delay).then(onResolve).catch(onReject);
  }
}

function toNumber(val) {
  const num = Number.parseInt(val);
  if (num < 0) return 0;
  return num;
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        //Fulfill
        resolve({ position, delay });
      } else {
        //Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
function onResolve({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
function onReject({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

function promisesStyle() {
  const mainTag = document.createElement('main');
  const divTag = document.createElement('div');
  divTag.classList.add('center');
  mainTag.appendChild(divTag);
  ref.form.before(mainTag);
  divTag.appendChild(ref.form);
}
