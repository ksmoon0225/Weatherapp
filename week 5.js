function formatDate(currentTime) {
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let month = months[currentTime.getMonth()];
  let dateof = currentTime.getDate();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[currentTime.getDay()];
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${month}/${dateof} <br/> ${day}, ${hours}:${minutes}`;
}

//challenge 2

function currentTemp(response) {
  console.log(response);
  let myTemp = document.querySelector("#temperature");
  myTemp.innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#tempmax").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#tempmin").innerHTML = Math.round(
    response.data.main.temp_min
  );
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(currentTemp);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function handlePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(currentTemp);
}

let currentlocation = document.querySelector("#currentLocation");
currentlocation.addEventListener("click", handlePosition);

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
searchCity("Kelowna");

let currentTime = new Date();
document.querySelector("#date").innerHTML = formatDate(currentTime);

// //Bonus
// function conversion(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperature = temperatureElement.innerHTML;
//   temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
// }

// let fahrenheitLink = document.querySelector("#fahrenheit");
// fahrenheitLink.addEventListener("click", conversion);
