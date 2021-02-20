let now = new Date();

function showWeekday(now) {
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
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

document.querySelector("#day").innerHTML = `${showWeekday(now)} – ${showTime(
  now
)}`;

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
  document.querySelector("h1").innerHTML = city.value;
  searchCity(city.value);
}

city.addEventListener("submit", handleSubmit);
