import { generateRandomNumber, fetchData } from "./helpers";
import { countryByContinent, allCountries } from "./config";
import { ACCESS_TOKEN } from "./config";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
export const state = {
  map: {},
  randomCountry: {},
  continent: {
    continentName: "",
    coords: "",
    zoomLevel: "",
    countries: [],
    countriesPolygon: [],
    continentPolygon: [],
  },
};
export const saveData = async function(){
  const countries = await fetchData(countryByContinent);
    state.continent.countriesPolygon = countries
    state.continent.coords = [0, 0];
    state.continent.zoomLevel = 1;
    
}

export const renderMap = function () {
  mapboxgl.accessToken = ACCESS_TOKEN;
  state.map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/jorj-kare/ckwcmd6j52li015qo50pcvr9u",
    center: [0, 0],
    zoom: 1,
  });
};

export const loadRandomCountry = (countriesByContinent) => {
  const index = generateRandomNumber(0, countriesByContinent.length - 1);
  const country = countriesByContinent[index];

  if (!country) return;
  state.randomCountry = {
    index: index,
    countryName: country.Country_Name,
    code3: country.Three_Letter_Country_Code.toUpperCase(),
  };
};
export const loadContinentName = function (continentName) {
  state.continent.continentName = continentName;
};
export const loadContinentSelection = async () => {
  try {
    const countries = await fetchData(allCountries);

    if (state.continent.continentName === "all")
      state.continent.countries = countries;
    else
      state.continent.countries = countries.filter(
        (country) =>
          country.Continent_Name.replace(" ", "_").toLowerCase() ===
          state.continent.continentName
      );
  } catch (err) {
    throw err;
  }
};

export const loadCountriesPolygon = async function () {
  try {
    const countries = state.continent.countriesPolygon;

      
      const countriesData = countries
        .filter(
          (c) =>
          
            c[0].continent.name.toLowerCase() === state.continent.continentName
        )
        .flat();
        
      state.continent.continentPolygon = countriesData.splice(1);
      state.continent.coords = countriesData[0].continent.coords;
      state.continent.zoomLevel = countriesData[0].continent.zoomLevel;
    // }
  } catch (err) {
    throw err;
  }
};
export const loadCentroids = function (continent = "all") {
  const centroids = [
    { continent: "europe", coords: [6.542983, 46.4598674], zoomLevel: 3 },
    { continent: "asia", coords: [85.0720229, 27.0837562], zoomLevel: 2 },
    { continent: "africa", coords: [26.17, 5.65], zoomLevel: 2 },
    {
      continent: "south_america",
      coords: [-57.383586, -18.024358],
      zoomLevel: 2,
    },
    {
      continent: "north_america",
      coords: [-106.8691266, 46.3128821],
      zoomLevel: 2,
    },
    { continent: "oceania", coords: [174.8335298, -15.2716208], zoomLevel: 2 },
    { continent: "all", coords: [0, 0], zoomLevel: 1 },
  ];

  const c = centroids.find(
    (element) => element.continent.toLowerCase() === continent.toLowerCase()
  );

  return { coords: c.coords, zoomLevel: c.zoomLevel };
};
