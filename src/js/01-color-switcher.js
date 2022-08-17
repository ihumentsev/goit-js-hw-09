const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', onBtnStarted);
refs.stopBtn.addEventListener('click', onBtnStoped);

function onBtnStarted() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

function onBtnStoped() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}
