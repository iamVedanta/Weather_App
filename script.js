let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8fdb404c4ded7d1a81cadf0e84c6cf7`,
      { mode: "cors" }
    );

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    updateWeatherIcon(id);
  } catch (error) {
    alert("City not found");
  }
};

function updateWeatherIcon(weatherId) {
  if (weatherId < 300 && weatherId >= 200) {
    tempicon.src = "./images/thunderstorm.svg";
  } else if (weatherId < 400 && weatherId >= 300) {
    tempicon.src = "./images/cloud-solid.svg";
  } else if (weatherId < 600 && weatherId >= 500) {
    tempicon.src = "./images/rain.svg";
  } else if (weatherId < 700 && weatherId >= 600) {
    tempicon.src = "./images/snow.svg";
  } else if (weatherId < 800 && weatherId >= 700) {
    tempicon.src = "./images/clouds.svg";
  } else if (weatherId === 800) {
    tempicon.src = "./images/clouds-and-sun.svg";
  }
}

function handleGeolocation(position) {
  const { longitude, latitude } = position.coords;
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a8fdb404c4ded7d1a81cadf0e84c6cf7`;

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const { name } = data;
      const { feels_like } = data.main;
      const { id, main } = data.weather[0];

      loc.textContent = name;
      climate.textContent = main;
      tempvalue.textContent = Math.round(feels_like - 273);
      updateWeatherIcon(id);

      console.log(data);
    });
}

function handleGeolocationError(error) {
  console.error("Geolocation error:", error);
  alert("Geolocation not available or denied. Please enter a city name manually.");
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleGeolocation, handleGeolocationError);
  } else {
    alert("Geolocation is not supported by your browser. Please enter a city name manually.");
  }
});
