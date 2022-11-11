let now = new Date();
let h3 = document.querySelector("h3");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input").value;
  let h1 = document.querySelector("#city");
  if (searchCity) {
    h1.innerHTML = `${searchCity}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleCity);

function showTemp(response) {
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let citySearched = document.querySelector("#city");
  citySearched.innerHTML = response.data.name;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ca95aece5407f70771d3c2a89b07f94b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  navigator.geolocation.getCurrentPosition(showLocation);
  axios.get(apiUrl).then(showTemp);
}

function handleCity(e) {
  e.preventDefault();
  let searchCity = document.querySelector("#city-input").value;
  search(searchCity);
}

function search(city) {
  let apiKey = "22f56e2b46e01f373930322b649479c4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);
