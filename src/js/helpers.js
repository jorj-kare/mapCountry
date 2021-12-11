
import icons from 'url:../data/icons.svg';

export const fetchData = async function (url, errorMessage) {
  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`${errorMessage} (Error ${response.status})`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min));

export function generateRandomColor(brightness = "all") {
  let additional = brightness === "light" ? 1 : 0;
  const divisor = brightness !== "all" ? 2 : 1;
  const red = Math.floor(((additional + Math.random()) * 256) / divisor);
  const green = Math.floor(((additional + Math.random()) * 256) / divisor);
  const blue = Math.floor(((additional + Math.random()) * 256) / divisor);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

export const startTimer = function (parentEl) {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    parentEl.textContent = `${min}:${sec}`;

    time++;
  };

  let time = 0;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
export const renderSpinner = function(parentElement) {

  
  const markup = `<div class='spinner'>
  <svg><use href='${icons}#icon-loader'></use></svg>
  </div>`
  
  parentElement.insertAdjacentHTML('afterbegin', markup);
 setTimeout(function() { 
  parentElement.innerHTML = ''},3000 )
}