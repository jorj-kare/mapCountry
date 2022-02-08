"use strict";

const box = document.querySelector('.box');
import * as helper from "./helpers";
import * as model from "./model";
import * as gameView from "./views/gameView";
import * as menuView from "./views/menuView";

const init = async function () {
 await model.saveData();
  model.renderMap();
  menuView.addHandlerMenu(controlMenu);
  gameView.addHandlerCountry(controlGame);
  gameView.addHandlerEndGame(endGame);
};

const endGame = function () {
  window.location.reload();
};

const controlMenu = function (e) {
  const centroids = model.loadCentroids(e.target.value);
  menuView.moveTo(model.state.map, centroids.coords, centroids.zoomLevel);
};

const controlGame = async function (e) {
  const continentName = menuView.getContinentName(e);

  model.loadContinentName(continentName);

  if (!model.state.continent.continentName) return;

  menuView.hideMenu();
  
  const continent = model.loadCentroids(model.state.continent.continentName);
  await model.loadContinentSelection();
  
  await model.loadCountriesPolygon(model.state.map);
  menuView.moveTo(model.state.map, continent.coords, continent.zoomLevel);
  gameView.renderCountriesPolygons(
   model.state.map,
   model.state.continent.continentPolygon,
   
 );
  model.loadRandomCountry(model.state.continent.countries);
  

  gameView.addHandlerClickCountry(model.state.map,model.state.continent.countriesPolygon,controlCountry)
  helper.renderSpinner(box);
  gameView.displayInfo(model.state.randomCountry, 1);
  
  
};

const controlCountry = function (e) {
  
  if (e.features[0].properties.ISO_A3 === model.state.randomCountry.code3) {
    let color = helper.generateRandomColor("light");
    model.state.map.setPaintProperty(
      model.state.randomCountry.code3,
      "fill-color",
      color
    );
    model.state.continent.countries.splice(model.state.randomCountry.index, 1);

    model.loadRandomCountry(model.state.continent.countries);
    gameView.displayInfo("Correct!");
    gameView.displayInfo(model.state.randomCountry, 1);

    if (model.state.continent.countries.length === 0) {
      gameView.displayInfo(
        "CONGRATULATION! YOU HAVE FIND ALL THE COUNTRIES!",
        1
      );
      gameView.stopTimer();
      return;
    }
  } else {
    model.loadRandomCountry(model.state.continent.countries);
    gameView.displayInfo("Wrong country!");
    gameView.displayInfo(model.state.randomCountry, 1);
  }
};
init();
