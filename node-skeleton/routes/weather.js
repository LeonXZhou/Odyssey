const { response } = require("express");
const express = require("express");
const { dnsPrefetchControl } = require("helmet");
const router = express.Router();

function filterWeatherData(weatherData, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const filteredWeather = {};
  for (const dayWeather of weatherData) {
    const day = new Date(dayWeather.date);
    if (day - start >= 0 && end - day >= 0) {
      filteredWeather[dayWeather.date] = {
        sunrise: dayWeather.current_day.sunrise,
        sunset: dayWeather.current_day.sunset,
        temp: dayWeather.current_day.temp,
        weather: dayWeather.feels_like.description.main,
      };
    }
  }
  return filteredWeather;
}

async function weatherFormater(latitude, longitude) {
  const axios = require("axios");
  const dotenv = require("dotenv");
  dotenv.config();
  const lat = latitude;
  const lon = longitude;
  const part = "hourly,minutely";
  const key = process.env.WEATHER_API_KEY;
  const units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=en&exclude=${part}&units=${units}&appid=${key}`;

  const response = await axios
    .get(url)
    .then((response) => {
      const formatedDataArray = [];
      const weatherData = response.data;
      for (const item of weatherData.daily) {
        const formatingData = {};
        const date = new Date(item.dt * 1000);
        console.log("this is each date", date);
        if (!formatingData["days"]) {
          formatingData["days"] = {};
        }
        if (!formatingData["days"]["date"]) {
          formatingData["days"]["date"] = date.toLocaleDateString("en-CA");
        }

        if (!formatingData["days"]["current_day"]) {
          const sunRise = new Date(weatherData.current?.sunrise * 1000);
          const sunSet = new Date(weatherData.current?.sunset * 1000);
          const currentDay = new Date(weatherData.current?.sunset * 1000);

          formatingData["days"]["current_day"] = {
            currentDay: currentDay.toLocaleDateString("en-CA"),
            sunrise: sunRise.toLocaleTimeString("en-CA"),
            sunset: sunSet.toLocaleTimeString("en-CA"),
            temp: weatherData.current?.temp,
            feels_like: weatherData.current?.feels_like,
            pressure: weatherData.current?.pressure,
            humidity: weatherData.current?.humidity,
            dew_point: weatherData.current?.dew_point,
            uvi: weatherData.current?.uvi,
            clouds: weatherData.current?.clouds,
            visibility: weatherData.current?.visibility,
            wind_speed: weatherData.current?.wind_speed,
            wind_deg: weatherData.current?.wind_deg,
            wind_gust: weatherData.current?.wind_gust,
          };
        }
        if (!formatingData["days"]["temp"]) {
          formatingData["days"]["temp"] = {
            day: item.temp.day,
            min: item.temp.min,
            max: item.temp.max,
            night: item.temp.night,
            eve: item.temp.eve,
            morn: item.temp.morn,
          };
        }
        if (!formatingData["days"]["feels_like"]) {
          formatingData["days"]["feels_like"] = {
            day: item.feels_like.day,
            night: item.feels_like.day,
            evening: item.feels_like.eve,
            morning: item.feels_like.morn,
          };
        }
        if (!formatingData["days"]["feels_like"]["description"]) {
          for (const info of item.weather) {
            formatingData["days"]["feels_like"]["description"] = {
              id: info.id,
              main: info.main,
              description: info.description,
              icon: info.icon, //needs to be set up
            };
          }
        }
        if (!formatingData["days"]["feels_like"]["rise&set"]) {
          const sunRise = new Date(item.sunrise * 1000);
          const sunSet = new Date(item.sunset * 1000);
          const moonRise = new Date(item.moonrise * 1000);
          const moonSet = new Date(item.moonset * 1000);
          // Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is 'full moon' and 0.75 is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
          let moonPhase;
          if (item.moon_phase === 0 || 1) {
            moonPhase = "new moon";
          }
          if (item.moon_phase === 0.25) {
            moonPhase = "first quarter moon";
          }
          if (item.moon_phase === 0.5) {
            moonPhase = "full moon";
          }
          if (item.moon_phase === 0.75) {
            moonPhase = "last quarter moon";
          }
          formatingData["days"]["feels_like"]["rise_set"] = {
            sunrise: sunRise.toLocaleString("en-CA"),
            sunset: sunSet.toLocaleString("en-CA"),
            moonrise: moonRise.toLocaleString("en-CA"),
            moonset: moonSet.toLocaleString("en-CA"),
            moon_phase: moonPhase,
          };
        }

        if (!formatingData["days"]["feels_like"]["other"]) {
          formatingData["days"]["feels_like"]["other"] = {
            pressure: item.pressure,
            humidity: item.humidity,
            dew_point: item.dew_point,
            wind_speed: item.wind_speed,
            wind_deg: item.wind_deg,
            wind_gust: item.wind_gust,
            clouds: item.clouds,
            pop: item.pop,
            uvi: item.uvi,
          };
        }
        formatedDataArray.push(formatingData.days);
      }
      return formatedDataArray;
    })
    .then(function (result) {
      // console.log("RESULT?",result)
      return result;
    });
  return response;
}

module.exports = (db) => {
  router.get("/:lat/:lng/:startdate/:enddate", (req, res) => {
    weatherFormater(req.params.lat, req.params.lng).then((data) => {
      const fData = filterWeatherData(data, req.params.startdate, req.params.enddate);
      console.log("this is the filtered data", fData);
      res.send(data);
    });
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  });
  return router;
};
