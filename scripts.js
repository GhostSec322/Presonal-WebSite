let cityInput = document.getElementById("city_input");
let searchBtn = document.getElementById("searchBtn");
let locationBtn = document.getElementById("locationBtn");
const api_key = "499c3ac744ee7c1d4883c66da8d66032";
let currentWeatherCard = document.querySelectorAll(".weather-left .card")[0];
let fiveDaysForecastCard = document.querySelector(".day-forecast");
let aqiCard = document.querySelectorAll(".highlights .card")[0];
let sunriseCard = document.querySelectorAll(".highlights .card")[1];
let hourlyForecastCard = document.querySelector(".hourly-forecast");
function formatTimestampToAMPM(timestamp) {
  const date = new Date(timestamp * 1000); // 밀리초로 변환
  const hours = date.getHours(); // 24시간 형식으로 가져오기
  const minutes = date.getMinutes();
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesFormatted}`; // 24시간 형식으로 반환
}
function getweater(name, lat, lon, contry, state) {
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
  let AIR_POLUTI_API_URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
  let Weather_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
  console.log(FORECAST_API_URL);
  aqiList = ["Good", "Fair", "Moderate", , "Poor", "Very Poor"];
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  console.log("Weather api is... " + Weather_API_URL);
  console.log("AIR.... " + AIR_POLUTI_API_URL);
  fetch(AIR_POLUTI_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;

      aqiCard.innerHTML = `              <div class="card-head">
                <p>Air Quality Index</p>
                <p class="air-index aqi-${data.list[0].main.aqi}">${
        aqiList[data.list[0].main.aqi - 1]
      }</p>
              </div>
              <div class="air-indices">
          
                <div class="item">
                  <p>PM2.5</p>
                  <h2>${pm2_5}</h2>
                </div>
                <div class="item">
                  <p>PM10</p>
                  <h2>${pm10}</h2>
                </div>
                <div class="item">
                  <p>SO2</p>
                  <h2>${so2}</h2>
                </div>
                <div class="item">
                  <p>CO</p>
                  <h2>${co}</h2>
                </div>
                <div class="item">
                  <p>NO</p>
                  <h2>${no}</h2>
                </div>
                <div class="item">
                  <p>NO2</p>
                  <h2>${no2}</h2>
                </div>
                <div class="item">
                  <p>NH3</p>
                  <h2>${nh3}</h2>
                </div>
                <div class="item">
                  <p>O3</p>
                  <h2>${o3}</h2>
                </div>
              </div>`;
      console.log("data is,,," + data);
      console.log(data);
    })
    .catch(() => {
      alert("Fail");
    });
  fetch(Weather_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let sunrise = data.sys.sunrise;
      let sunset = data.sys.sunset;
      console.log(
        formatTimestampToAMPM(sunrise),
        formatTimestampToAMPM(sunset)
      );
      sunriseCard.innerHTML = `
                    <div class="card-head">
                <p>Sunrise & Sunset</p>
              </div>
              <div class="sunrise-sunset">
                <div class="item">
                  <div class="icon">
                    <i class="bx bx-sun bx-lg"></i>
                  </div>
                  <div>
                    <p>Sunrise</p>
                    <h2>${formatTimestampToAMPM(sunrise)}</h2>
                  </div>
                </div>
                <div class="item">
                  <div class="icon">
                    <i class="bx bx-moon bx-lg"></i>
                  </div>
                  <div>
                    <p>Sunset</p>
                    <h2>${formatTimestampToAMPM(sunset)}</h2>
                  </div>
                </div>
              </div>`;

      console.log("data is...", data);
      let date = new Date();
      currentWeatherCard.innerHTML = `
                 <div class="current-weather">
              <div class="details">
                <p>현재</p>
                <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                <p>${data.weather[0].description}</p>
              </div>
              <div class="weather-icon">
                <img
                  src="https://openweathermap.org/img/wn/${
                    data.weather[0].icon
                  }@2x.png"
                  alt="날씨 아이콘"
                />
              </div>
            </div>
            <hr />
            <div class="card-footer">
          <p><i class="bx bxs-calendar-alt"></i> ${date.getFullYear()}년 ${
        months[date.getMonth()]
      }월 ${date.getDate()}일</p>

              <p><i class="bx bx-current-location"></i>${data.name},${
        data.sys.country
      }</p>
            </div>`;

      let hum = data.main.humidity;
      document.getElementById("humidityVal").textContent = `${hum} %`;
      let pressure = data.main.pressure;
      document.getElementById("PresureVal").textContent = `${pressure} hPa`;
      let FillLike = data.main.feels_like - 273.15;
      document.getElementById("FillLikeVal").textContent = `${FillLike.toFixed(
        1
      )} °C`;
      let windspeed = data.wind.speed;
      document.getElementById(
        "WindSpeedVal"
      ).textContent = `${windspeed.toFixed(1)} m/s`;
    })
    .catch(() => {
      alert("Fail to fetch current weather");
    });
  fetch(FORECAST_API_URL)
    .then((res) => res.json())
    .then((data) => {
      let hourltyForcast = data.list;
      hourlyForecastCard.innerHTML = "";

      for (i = 0; i <= 7; i++) {
        console.log("실행");
        let hrForecastDate = new Date(hourltyForcast[i].dt_txt);
        let hr = hrForecastDate.getHours();
        console.log("실행2"); //V
        let a = "PM";
        if (hr < 12) a = "AM";
        console.log("실행3");

        console.log("실행4");
        if (hr > 12) hr = hr - 12;
        console.log("실행5");

        hourlyForecastCard.innerHTML += `
                    <div class="card">
              <p>${hr} ${a}</p>
              <img src="https://openweathermap.org/img/wn/${
                hourltyForcast[i].weather[0].icon
              }.png" alt="" />
              <p>${(hourltyForcast[i].main.temp - 273.15).toFixed(1)}&deg;C</p>
            </div>`;
      }
      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true; // 날짜가 유일하면 해당 항목을 유지
        }
        return false; // 중복된 날짜는 제외
      });
      console.log(fiveDaysForecast);
      fiveDaysForecastCard.innerHTML = ``;
      for (i = 1; i < fiveDaysForecast.length; i++) {
        let date = new Date(fiveDaysForecast[i].dt_txt);
        fiveDaysForecastCard.innerHTML += `              
        <div class="forecast-item">
  <div class="icon-wrapper">
    <img
      src="https://openweathermap.org/img/wn/${
        fiveDaysForecast[i].weather[0].icon
      }.png"
      alt="날씨 아이콘"
    />
    <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
  </div>
  <p>${date.getMonth() + 1}월 ${date.getDate()}일</p> 
  <p>${days[date.getDay()]}</p>   
</div>

        `;
      }
    })
    .catch(() => {
      alert("Failed to fetch Forecast");
    });
}
function getcity() {
  let name = cityInput.value.trim();
  console.log(name);
  cityInput.value = "";
  if (!name) return;
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${api_key}`;
  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let { city_name, lat, lon, contury, state } = data[0];
      getweater(city_name, lat, lon, contury, state);
    })
    .catch(() => {
      alert(`Failed to fetch cordinates ${name}`);
    });
}
function getUserCoordinates() {
  navigator.geolocation.getCurrentPosition((position) => {
    let { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    let ReverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    fetch(ReverseGeocodingUrl)
      .then((res) => res.json())
      .then((data) => {
        let { name, contry, state } = data[0];
        getweater(name, latitude, longitude, contry, state);
      })
      .catch(() => {
        alert("Failed to fetch user coordinates");
      });
  });
}
searchBtn.addEventListener("click", getcity);
locationBtn.addEventListener("click", getUserCoordinates);
