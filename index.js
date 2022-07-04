let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

dayTime.innerHTML = `${day}  ${date}  ${month}  ${year},  ${hours}:${mins}`;

//
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityName");
  let city = document.querySelector("#city-input").value;
  let apiKey = "9c9080e190f8de94f431567b5176425a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  console.log(apiUrl);

  cityElement.innerHTML = `📍 ${city}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// ℉
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#numberTemp");
  let temp = tempElement.innerHTML;
  temp = Number(temp);
  tempElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}
let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", convertToFahrenheit);

//℃
function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#numberTemp");
  let temp = tempElement.innerHTML;
  temp = Number(temp);
  //tempElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

// Week 5 Homework

function displayWeatherConditions(response) {
  console.log(response.data.name);
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#numberTemp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchLocation(position) {
  console.log(position);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "9c9080e190f8de94f431567b5176425a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let showCurrentLocation = document.querySelector("#currentLocationButton");
showCurrentLocation.addEventListener("click", getCurrentLocation);
