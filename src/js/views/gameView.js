const infoEl = document.querySelector(".js-info");
const infoTextEl = document.querySelector(".js-info__text");
const infoTimer = document.querySelector(".js-info__timer");
const infoBtn = document.querySelector(".js-info__btn");
const menuBtn = document.querySelectorAll(".menu__btn");
let timer;
const displayInfo = function (information, seconds = 0) {
  console.log(information);
  setTimeout(() => {
    infoTextEl.textContent = "";
    infoEl.classList.remove("hidden");
    let message =
      typeof information === "object"
        ? `You must find ${information.countryName.split(",")[0]}`
        : information;

    infoTextEl.insertAdjacentText("afterbegin", message);
  }, seconds * 1000);
};

const addHandlerCountry = function (handler) {
  menuBtn.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      handler(e);
    })
  );
};

const renderCountriesPolygons = function (map, countriesPolygon, handler) {
  startTimer();
  countriesPolygon.forEach((country) => {
    if (Object.keys(map.getStyle().sources).includes(country.properties.ISO_A3))
      return;

    map.addSource(country.properties.ISO_A3, {
      type: "geojson",
      data: country,
    });
    map.addLayer({
      id: country.properties.ISO_A3,
      type: "fill",
      source: country.properties.ISO_A3,
      paint: {
        "fill-color": "#eee",
        "fill-outline-color": "#7e4545",
      },
    });

    map.on("click", country.properties.ISO_A3, handler);
  });
};
// export const addHandlerClickCountry = function (data, map) {
//   console.log(data);
//   const layers = map.getStyle().layers;
//   if (!layers) return;
//   layers.forEach((l) =>
//     map.on("click", l.id, (e) => {
//       if (e.features[0].properties.ISO_A3 === data.randomCountry.code3) {
//       }
//     })
//   );
// };
const startTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    infoTimer.textContent = `${min}:${sec}`;

    time++;
  };

  let time = 0;

  // Call the timer every second
  tick();
  timer = setInterval(tick, 1000);
  console.log(timer);
};

const addHandlerEndGame = function (handler) {
  infoBtn.addEventListener("click", handler);
};
const stopTimer = () => clearInterval(timer);

export {
  addHandlerEndGame,
  stopTimer,
  addHandlerCountry,
  renderCountriesPolygons,
  displayInfo,
};
