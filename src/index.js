let weatherApiKey = "25ab5286afcbdded052a998b9b369c43";
let endPoint = "https://api.openweathermap.org/data/2.5/weather";
let units = "metric";

function searchCity(city) {
  let weatherApiUrl = `${endPoint}?q=${city}&appid=${weatherApiKey}&units=${units}`;
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

function displayWeather(response) {
  console.log(response);
  //Get temperature of current city
  document.querySelector("#current-city").innerHTML = response.data.name;

  //Get Searched city
  let temp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#currentTemp");
  cityTemp.innerHTML = temp;
  //Get Wind
  let windy = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = windy;
  //Get humidity
  let humid = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humid;

  //Get description
  let description = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;
}

//function displayDate(today) {
let today = new Date();

let hours = today.getHours();
let seconds = today.getSeconds();
let minutes = today.getMinutes();
let day = today.getDay();

//Function to derive the minutes in :MM
function getMinutes(minutes) {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }
  return minutes;
}

//The function to get either AM or PM
function getAMPM(hours) {
  let dayPeriod;
  if (hours >= 12) {
    dayPeriod = "PM";
  } else {
    dayPeriod = "AM";
  }
  return dayPeriod;
}

//function to derive the day
function getDay(day) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (day = days[day]);
}

//let todayDate = `${day} ${time}`;
let displayTodayDate = document.querySelector("#today-date");
displayTodayDate.innerHTML = `${getDay(day)}  ${hours} : ${getMinutes(
  minutes
)} ${getAMPM(hours)}`;

let form = document.querySelector("form");
form.addEventListener("submit", getSearchCity);

/*Changing the celsius to Fahrenheit and vice versa*/
let cel = 17;
function getCelsiusTemp(event) {
  event.preventDefault();
  let celsius = document.querySelector("#currentTemp");
  celsius.innerHTML = cel;
}

function getFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#currentTemp");
  let fah = Math.round((cel * 9) / 5 + 32);
  fahrenheit.innerHTML = `${fah}`;
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", getCelsiusTemp);

let faherenheitTemp = document.querySelector("#fahrenheit");
faherenheitTemp.addEventListener("click", getFahrenheitTemp);

function displayCurrentLocation(event) {
  //debugger;
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let weatherApiUrl = `${endPoint}?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(displayWeather);
}
function getCurrentPosition(searchLocation) {}
let current = document.querySelector("#currentLocation");
current.addEventListener("click", displayCurrentLocation);
searchCity("Kitchener");
