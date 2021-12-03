import { generateRandomColor } from "../helpers";
const menuEl = document.querySelector(".js-menu");
const menuBtn = document.querySelectorAll(".menu__btn");
const moveTo = function (map, coords, zoomLevel) {
  map.flyTo({
    center: coords,
    zoom: zoomLevel,
    speed: 0.5,
    curve: 1,
    easing(t) {
      return t;
    },
    essential: true,
  });
};
const getContinentName = (e) => e.target.value.toLowerCase();

const hideMenu = () => menuEl.classList.add("hidden");

const addHandlerMenu = function (handler) {
  menuEl.addEventListener("mouseover", function (e) {
    handler(e);
    const btn = e.target.closest(".menu__btn");
    if (!btn) return;
    btn.style.background = generateRandomColor("dark");
    btn.style.opacity = 0.7;
    btn.style.color = "#eee";
  });
  // menuBtn.forEach((btn) =>
  //   btn.addEventListener("mouseout", function (e) {
  //     btn.style.background = "#eeeeee9a";
  //     btn.style.color = "#222";
  //   })
  // );
};
export { addHandlerMenu, moveTo, hideMenu, getContinentName };
