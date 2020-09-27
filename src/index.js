let date = document.querySelector(".current-date");
let time = document.querySelector(".current-time");
let now = new Date();
function getToday(date) {
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
  let daynumber = now.getDate();
  let year = now.getFullYear();
  return `${day}, ${month} ${daynumber}, ${year}`;
}
date.innerHTML = getToday(date);
function getTime(date) {
  let hour = now.getHours();
  let formattedHour = hour > 9 ? hour : "0" + hour;
  let minutes = now.getMinutes();
  let formattedMinutes = minutes > 9 ? minutes : "0" + minutes;
  return `${formattedHour}:${formattedMinutes}`;
}
time.innerHTML = getTime(date);
function showTemperature(response) {
  console.log(response);
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#converttemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function getPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "fad5728d5d1f40dc0936f3c386013435";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function getCity(city) {
  let apiKey = "fad5728d5d1f40dc0936f3c386013435";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  getCity(city);
}
function getLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function convertTempc(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) / 1.8;
  let temperatureElement = document.querySelector("#converttemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function convertTempF(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#converttemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

let fahrenheitTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
document.querySelector("#find-me").addEventListener("click", getLocation);
celsiusLink.addEventListener("click", convertTempc);
fahrenheitLink.addEventListener("click", convertTempF);
getCity("Austin");
