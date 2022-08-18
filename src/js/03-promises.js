import { Notify } from 'notiflix/build/notiflix-notify-aio';
////////////////////
const btnEl = document.querySelector('.submit');

btnEl.addEventListener('submit', event => {
  event.preventDefault();
  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      Notify.success('Sol lucet omnibus');
    } else {
      Notify.failure('Qui timide rogat docet negare');
    }
  }
});
