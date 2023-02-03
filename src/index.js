let now = new Date();
let currentDate = document.querySelector("#current-date");
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
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

function search(city) {
  let apiKey = "bt3bo829922a2a4ff5a7368510baad63";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.daily[0].temperature.day
  );
  document.querySelector("#humidity").innerHTML =
    response.data.daily[0].temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.daily[0].wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.daily[0].condition.description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.daily[0].condition.icon);

  celsiusTemperature = response.data.daily[0].temperature.day;
}
function searchLocation(position) {
  let apiKey = "bt3bo829922a2a4ff5a7368510baad63";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row">`;
  let days = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="card">
              <div class="card-body">
                <p class="weekdays">${day}</p>
                <p class="weather-condition">
                  <img
                    class="weather-icon"
                    src="images/rain_light.png"
                    width="50"
                  />
                </p>
                <p class="temperature">32°|24°</p>
              </div>
            </div>
          </div>`;
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);

search("Lagos");
displayForecast();
