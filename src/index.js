//Global Variables
let weatherApiKey = "25ab5286afcbdded052a998b9b369c43";
let endPoint = "https://api.openweathermap.org/data/2.5/";
let units = "metric";
let celsiusTemp = null;
/*Calcualte the timestamp*/
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  //Function to derive the minutes in :MM
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }
  let dayPeriod;
  if (hours >= 12) {
    dayPeriod = "PM";
  } else {
    dayPeriod = "AM";
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} ${dayPeriod}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function searchCity(city) {
  let weatherApiUrl = `${endPoint}weather?q=${city}&appid=${weatherApiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(displayWeather);
}

//function to derive the searchCity value
function getSearchCity(event) {
  event.preventDefault();
  //make api call
  //get response and display city name and temperature
  let city = document.querySelector("#cityName").value;
  searchCity(city);
}

//To display the forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  //let days = ["Tue", "Wed", "Thur", "Fri"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="weatherforecastDay">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="CLear" width="42" id="icon"/>
    <div class="weatherforecastTemperature"><span class="maxTemp">${Math.round(
      forecastDay.temp.max
    )}°</span> 
        <span class="minTemperature"> ${Math.round(
          forecastDay.temp.min
        )}°</span></div>  
</div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Function to get the coordiantes for forecast
function getWeatherForecast(coordinates) {
  let apiUrl = `${endPoint}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${weatherApiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
/*The function that displays the response from the API to the screen*/
function displayWeather(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;

  let cityTemperature = document.querySelector("#currentTemp");
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#description");
  let currentDate = document.querySelector("#today-date");

  let icon = document.querySelector("#icon");
  //Get temperature of current city

  //Get temperature
  cityTemperature.innerHTML = Math.round(response.data.main.temp);
  //Get wind speed
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  //Get humidity
  humidity.innerHTML = Math.round(response.data.main.humidity);
  //Get description
  weatherDescription.innerHTML = response.data.weather[0].description;
  //Get Date
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  //Get the weather icon
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //Set alt attribute
  icon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  celsiusTemp = response.data.main.temp;
  getWeatherForecast(response.data.coord);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let weatherApiUrl = `${endPoint}weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(displayWeather);
}
function getCurrentPosition(searchLocation) {}
let current = document.querySelector("#currentLocation");
current.addEventListener("click", displayCurrentLocation);
searchCity("Kitchener");

function displayCurrentLocation(event) {
  //debugger;
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//GEt Fahrenheit Temperature
/*function displayFahrenheitTemp(event) {
  event.preventDefault();
  //remove active class from teh celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let FahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(FahrenheitTemp);
}*/

//Get Celsius Temperature

function displayCelsiusTemp(event) {
  event.preventDefault();
  /*celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");*/
  let celsiusElement = document.querySelector("#currentTemp");
  celsiusElement.innerHTML = Math.round(celsiusTemp);
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let form = document.querySelector("form");
form.addEventListener("submit", getSearchCity);
