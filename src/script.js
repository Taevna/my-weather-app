let now = new Date();


function showWeekday(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayInt = now.getDay();
  let day = days[dayInt];
  return day;
}

function showTime(now) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return `${hours}:${minutes}`;
}


/*
document.querySelector("#day").innerHTML = `${showWeekday(now)}, | ${showTime(
  now
)}`;

*/


let city = document.querySelector("#search-form");

function displayCondition(response) {
  let temperature = Math.floor(response.data.main.temp);
  let temperatureH3 = document.querySelector("#temperature");
  temperatureH3.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = "7d60c6ca1bbdda3284dd78e6babf3688";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(api).then(displayCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  document.querySelector("#city").innerHTML = city.value;
  searchCity(city.value);
}

city.addEventListener("submit", handleSubmit);


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
  "December",

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
  let defaultDiscription = document.querySelector("#description");
  let defaultFeelsLike = document.querySelector("#feelsLike");
  let defaultHumidity = document.querySelector("#humidity");
  let defaultWind = document.querySelector("#wind");
  
  
  defaultDate.innerHTML = formatDate(response.data.dt);
  defaultCity.innerHTML = response.data.name;
  defaultTemparature.innerHTML = Math.round(response.data.main.temp);
  defaultDiscription.innerHTML = response.data.weather[0].description;
  defaultFeelsLike.innerHTML = Math.round(response.data.main.feels_like);
  defaultHumidity.innerHTML = Math.round(response.data.main.humidity);
  defaultWind.innerHTML = Math.round(response.data.wind.speed);
  
  console.log(response);
  
}
let defaultCity = "Berlin";
let apiKey = "7d60c6ca1bbdda3284dd78e6babf3688";
let api = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${apiKey}`;

axios.get(api).then(displayDefaultCondition)


