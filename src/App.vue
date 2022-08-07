<template>
<div class="weather" id='weather-vue'>
    <div class="weather__inner">
      <div class="current">
        <div class="current__city"> {{cityName}} </div>
        <div class="current__description"> {{description}} </div>
        <div class="current__temperature"> {{temperature}} </div>
      </div>

      <div class="forecast">
        <forecast-item 
          v-for='forecast in forecasts' 
          v-bind:time='forecast.time' 
          v-bind:icon='forecast.icon' 
          v-bind:value='forecast.value'></forecast-item>
      </div>

      <div class="details">
        <div class="details__row">
          <div class="details__item feelslike">
            <div class="details__name">ощущается как</div>
            <div class="details__value"> {{details.feelslike}}</div>
          </div>
          <div class="details__item pressure">
            <div class="details__name">давление</div>
            <div class="details__value"> {{details.pressure}} </div>
          </div>
        </div>
        <div class="details__row">
          <div class="details__item humidity">
            <div class="details__name">влажность</div>
            <div class="details__value"> {{details.humidity}} </div>
          </div>
          <div class="details__item wind">
            <div class="details__name">ветер</div>
            <div class="details__value"> {{details.wind}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

  <script>
  // const url = 'js/data.json';
// const url = 'https://api.openweathermap.org/data/2.5/weather?lat=55.7522&lon=37.6156&appid=f10c65ef5d07ea68f14659815112020b';
const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=caac442a9f6f6b2f02fa20c006534b5d';
const temperatureUnit = '˚';
const humidityUnit = ' %';
const pressureUnit = ' мм. рт. ст.';
const windUnit = ' м/с';

Vue.component('forecast-item', {
  props: ['time', 'icon', 'value'],
  template: 
  `<div class="forecast__item">
    <div class="forecast__time"> {{time}} </div>
    <div class="forecast__icon" :class='"icon__" + icon'></div>
    <div class="forecast__temperature"> {{value}}</div>
  </div>`
})

var app = new Vue({
  el: '#weather-vue',
  data() {
    return {
      cityName: '--',
      description: '--',
      temperature: '--˚',
      forecasts: [],
      details: {
        feelslike: 0,
        humidity: 0,
        pressure: 0,
        wind: 0
      },
      cachedData: null,
    }
  },
  methods: {
    start(startPeriodicTasks = false) {
      this.getData().then(response => {
        this.cachedData = response.data;
        this.render(response.data);
        if (startPeriodicTasks == true) {
          this.periodicTasks();
        }
      });
    },
    render(data) {
      this.cityName = data.city.name;
      this.description = data.list[0].weather[0].description;
      this.temperature = getTemperature(data.list[0].main.temp);
      this.forecasts = getForecast(data);

      this.details = getDetails(data);
      renderDayOrNight(data);
    },
    getData() {
      return axios.get(url);
    },
    periodicTasks() {
      setInterval(() => this.start(false), 6000000);
      setInterval(() => {
        renderDayOrNight(this.cachedData);
      }, 60000);
    }
  },

  mounted() {
    this.start(true);
  }
})

function getDetails(data) {
  let item = data.list[0];
  let pressureValue = convertPressure(item.main.pressure);
  let pressure = getValueWithUnit(pressureValue, pressureUnit);
  let humidity = getValueWithUnit(item.main.humidity, humidityUnit);
  let feels_like = getTemperature(item.main.feels_like);
  let wind = getValueWithUnit(item.wind.speed, windUnit);

  return {
    feelslike: feels_like,
    humidity: humidity,
    pressure: pressure,
    wind: wind
  }
}

function getValueWithUnit(value, unit) {
  return `${value}${unit}`;
}

function getTemperature(value) {
  var roundedValue = value.toFixed();
  return getValueWithUnit(roundedValue, temperatureUnit);
}

function getForecast(data) {
  let forecasts = [];
  for (let i = 0; i < 6; i++) {
    let item = data.list[i];

    let icon = item.weather[0].icon;
    let temp = getTemperature(item.main.temp);
    let hours = ( i == 0 ? 'Сейчас' : getHoursString(item.dt * 1000));
    forecasts.push({
      time: hours,
      icon: icon,
      value: temp
    });
  }

  return forecasts;
}

function getHoursString(dateTime) {
  let date = new Date(dateTime);
  let hours = date.getHours().pad();

  return hours;
}
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}
function convertPressure(value) {
  return (value/1.33 ).toFixed();
}

function isDay(data) {
  let sunrise = data.city.sunrise * 1000;
  let sunset = data.city.sunset * 1000;

  let now = Date.now();
  return (now > sunrise && now < sunset);
}

function renderDayOrNight(data) {
  let attrName = isDay(data) ? 'day':'night';
  transition();
  document.documentElement.setAttribute('data-theme', attrName);
}
function transition() {
  document.documentElement.classList.add('transition');
  setTimeout(function() {
    document.documentElement.classList.remove('transition');
  }, 4000)
}
  </script>
