function formatDate(timestamp){
let date = new Date(timestamp*1000);
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day = days[date.getDay()];
let months = [
  
  "January",
  "February",
  "March",
  "April",
  "May",
  "Juni",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
let month = months[date.getMonth()];
let dayInt = date.getDate();
let year = date.getFullYear();
let hours = date.getUTCHours();
let minutes = date.getMinutes();
 return `${day}, ${month} ${dayInt} ${year} | ${hours}:${minutes}`;
}
function displayDefaultCondition(response){
  let defaultDate = document.querySelector("#date");
  let defaultCity = document.querySelector("#city");
  let defaultTemparature = document.querySelector("#temperature");
  let defaultDescription = document.querySelector("#description");
  let defaultFeelsLike = document.querySelector("#feels-like-temperature");
  let defaultHumidity = document.querySelector("#humidity");
  let defaultWind = document.querySelector("#wind");
  let defaultIcon = document.querySelector("#icon");
  let defaultAltAttribut = document.querySelector("#icon");
  defaultDate.innerHTML = formatDate(response.data.dt);
  defaultCity.innerHTML = response.data.name;
  defaultTemparature.innerHTML = Math.round(response.data.main.temp);
  defaultDescription.innerHTML = response.data.weather[0].description;
  defaultFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  defaultHumidity.innerHTML = Math.round(response.data.main.humidity);
  defaultWind.innerHTML = Math.round(response.data.wind.speed);
  defaultIcon.setAttribute("src", `src/icons/${response.data.weather[0].icon}.png`);
  defaultAltAttribut.setAttribute("alt",`${response.data.weather[0].description}`); 
}
let defaultCity = "Berlin";
let apiKey = "7d60c6ca1bbdda3284dd78e6babf3688";
let api = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${apiKey}`;
axios.get(api).then(displayDefaultCondition)


// Search engine
function displayForecast(response){
  console.log(response.data);
}

function getCityCoord(response){
  let apiKey = "7d60c6ca1bbdda3284dd78e6babf3688";
  let cityLat = response.data.city.coord.lat;
  let cityLon = response.data.city.coord.lon;
  api = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly,current&units=metric&appid=${apiKey}`;
  axios.get(api).then(displayForecast);
  
}
function displayCondition(response) {
  let dateElement = document.querySelector("#date");
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let altAttributElement = document.querySelector("#icon");
  
  dateElement.innerHTML = formatDate(response.data.dt);
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `src/icons/${response.data.weather[0].icon}.png`);
  altAttributElement.setAttribute("alt",`${response.data.weather[0].description}`); 
}
function searchCity(city) {
  let apiKey = "7d60c6ca1bbdda3284dd78e6babf3688";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(api).then(displayCondition);

  api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(api).then(getCityCoord);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  document.querySelector("#city").innerHTML = city.value;
  searchCity(city.value);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", handleSubmit);


// Change unit form celsius to fahrenheit and other way 
function changeUnit(event){
  event.preventDefault();
  let currentUnit = document.querySelector("#unit");
  console.log(currentUnit)
  if(currentUnit.innerHTML === "°C") {

    let fahrenheitTemperature = Math.round(( 14 * 9 ) / 5 + 32);
    let fahrenheitTemperatureElement = document.querySelector("#temperature");

    let feelsLikeTemperature = Math.round(( 11 * 9 ) / 5 + 32);
    console.log(feelsLikeTemperature);
    let feelsLikeTemperatueElement = document.querySelector("#feels-like-temperature");

    let unitElement = document.querySelector("#unit");
    let unitButtonElement = document.querySelector("#unit-link");
    let feelsLikeUnitElement = document.querySelector("#feels-like-unit");
    
    fahrenheitTemperatureElement.innerHTML = fahrenheitTemperature;
    feelsLikeTemperatueElement.innerHTML = feelsLikeTemperature;
    unitElement.innerHTML = "°F";
    unitButtonElement.innerHTML = "°C";
    feelsLikeUnitElement.innerHTML= "°F";

  } else {
   
    let celsiusTemperature = Math.round((55 - 32) * 5/9);
    let celsiusTemperatureElement = document.querySelector("#temperature");

    let feelsLikeTemperature = Math.round((50 - 32) * 5/9);
    let feelsLikeTemperatureElement = document.querySelector("#feels-like-temperature");

    let unitElement = document.querySelector("#unit");
    let unitButtonElement = document.querySelector("#unit-link");
    let feelsLikeUnitElement = document.querySelector("#feels-like-unit");
    
    celsiusTemperatureElement.innerHTML = celsiusTemperature;
    feelsLikeTemperatureElement.innerHTML = feelsLikeTemperature;

    unitElement.innerHTML = "°C";
    unitButtonElement.innerHTML = "°F";
    feelsLikeUnitElement.innerHTML = "°C";

  }
}
let unitElement = document.querySelector("#unit-button");
unitElement.addEventListener("click", changeUnit);