<template>
  <div class="weather" id='weather-vue'>
    <div class="weather__inner">
      <div class="current">
        <div class="current__city"> {{cityName}}, {{countryName}}</div>
        <div class="current__description">{{description}} , feels like {{feelslike}}</div>
        <div class="center"><div class="current__icon" :class='"icon__" + icon'></div> <div class="current__temperature"> {{temperature}} </div></div>
      </div>
      <div class="details">
        <div class="details__row">
          <div class="details__item feelslike">
            <div class="details__name">Visibility</div>
            <div class="details__value"> {{details.visibility}}</div>
          </div>
          <div class="details__item pressure">
            <div class="details__name">Pressure:</div>
            <div class="details__value"> {{details.pressure}} </div>
          </div>
        </div>
        <div class="details__row">
          <div class="details__item humidity">
            <div class="details__name">Humidity:</div>
            <div class="details__value"> {{details.humidity}} </div>
          </div>
          <div class="details__item wind">
            <div class="details__name">Wind:</div>
            <div class="details__value"> {{details.wind}} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <input type="text" v-model="sity">
    <div @click="getWeather(sity)">Button</div>
</template>

  <script>
    import axios from 'axios';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=caac442a9f6f6b2f02fa20c006534b5d';
    const temperatureUnit = '˚C';
    const visibilityUnit = 'km';
    const humidityUnit = '%';
    const pressureUnit = 'hPa';
    const windUnit = 'm/s';
    export default {
      data() {
        return {
          sity: 'Moscow',
          cityName: '--',
          countryName: '--',
          description: '--',
          feelslike: '--',
          icon: '50d',
          temperature: '--˚',
          details: {
            visibility: 0,
            pressure: 0,
            humidity: 0,
            wind: 0
          }
        };
      },
      methods: {
          async getWeather(sity) {
            try {
              url = `https://api.openweathermap.org/data/2.5/weather?q=${sity}&appid=caac442a9f6f6b2f02fa20c006534b5d`;
              console.log(url);
              let res = await axios.get(url)
              console.log(res.data);
              this.cityName = res.data.name;
              this.countryName = res.data.sys.country;
              this.description = res.data.weather[0].description;
              this.feelslike = getTemperature(res.data.main.feels_like)
              this.temperature = getTemperature(res.data.main.temp)
              this.icon = res.data.weather[0].icon;
              this.details = getDetails(res.data);
          } catch (err) { console.log(err); }
        },
      },
      async mounted() {
        try {
          let res = await axios.get(url)
          console.log(res.data);
          this.cityName = res.data.name;
          this.countryName = res.data.sys.country;
          this.description = res.data.weather[0].description;
          this.feelslike = getTemperature(res.data.main.feels_like)
          this.temperature = getTemperature(res.data.main.temp)
          this.icon = res.data.weather[0].icon;
          this.details = getDetails(res.data);
          renderDayOrNight(res.data);
        } catch (err) { console.log(err); }
      }
    };

function getDetails(data) {
  let item = data;
  let pressure = getValueWithUnit(item.main.pressure, pressureUnit);
  let humidity = getValueWithUnit(item.main.humidity, humidityUnit);
  let visibility = getVisibility(item.visibility);
  let wind = getValueWithUnit(item.wind.speed, windUnit);

  return {
    pressure: pressure,
    humidity: humidity,
    visibility: visibility,
    wind: wind
  }
}

function getValueWithUnit(value, unit) {
  return `${value}${unit}`;
}

function getTemperature(value) {
  var roundedValue = Math.round(value-273.15);
  return getValueWithUnit(roundedValue, temperatureUnit);
}

function getVisibility(value) {
  var roundedValue = Math.round(value/1000);
  return getValueWithUnit(roundedValue, visibilityUnit);
}

function isDay(data) {
  let sunrise = data.sys.sunrise * 1000;
  let sunset = data.sys.sunset * 1000;

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
