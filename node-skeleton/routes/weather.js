const { response } = require("express");
const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const app = express();

const router = express.Router();

const weatherData = {
  lat: 51.04,
  lon: 114.07,
  timezone: "Asia/Chita",
  timezone_offset: 32400,
  daily: [
    {
      dt: 1642651200,
      sunrise: 1642637783,
      sunset: 1642668746,
      moonrise: 1642676880,
      moonset: 1642643580,
      moon_phase: 0.57,
      temp: {
        day: -21.23,
        min: -27.82,
        max: -18.13,
        night: -20.45,
        eve: -18.8,
        morn: -26.51,
      },
      feels_like: { day: -25.59, night: -20.45, eve: -18.8, morn: -26.51 },
      pressure: 1037,
      humidity: 93,
      dew_point: -21.98,
      wind_speed: 1.48,
      wind_deg: 105,
      wind_gust: 1.61,
      weather: [
        { id: 600, main: "Snow", description: "light snow", icon: "13d" },
      ],
      clouds: 100,
      pop: 0.99,
      snow: 0.93,
      uvi: 0.77,
    },
    {
      dt: 1642737600,
      sunrise: 1642724121,
      sunset: 1642755244,
      moonrise: 1642767780,
      moonset: 1642731120,
      moon_phase: 0.6,
      temp: {
        day: -16.88,
        min: -24.28,
        max: -15.13,
        night: -24.28,
        eve: -22.44,
        morn: -23.31,
      },
      feels_like: { day: -16.88, night: -29.17, eve: -22.44, morn: -23.31 },
      pressure: 1036,
      humidity: 89,
      dew_point: -19.44,
      wind_speed: 1.41,
      wind_deg: 336,
      wind_gust: 2.42,
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" },
      ],
      clouds: 82,
      pop: 0.07,
      uvi: 0.69,
    },
    {
      dt: 1642824000,
      sunrise: 1642810456,
      sunset: 1642841744,
      moonrise: 1642858620,
      moonset: 1642818540,
      moon_phase: 0.63,
      temp: {
        day: -15.41,
        min: -25.74,
        max: -13.66,
        night: -23.69,
        eve: -21.5,
        morn: -25.43,
      },
      feels_like: { day: -19.25, night: -23.69, eve: -21.5, morn: -31.19 },
      pressure: 1036,
      humidity: 87,
      dew_point: -18.09,
      wind_speed: 1.65,
      wind_deg: 276,
      wind_gust: 2,
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d",
        },
      ],
      clouds: 36,
      pop: 0,
      uvi: 0.79,
    },
    {
      dt: 1642910400,
      sunrise: 1642896788,
      sunset: 1642928244,
      moonrise: 1642949580,
      moonset: 1642905840,
      moon_phase: 0.67,
      temp: {
        day: -16.79,
        min: -24.49,
        max: -14.11,
        night: -21.59,
        eve: -19.04,
        morn: -24.49,
      },
      feels_like: { day: -16.79, night: -21.59, eve: -19.04, morn: -24.49 },
      pressure: 1036,
      humidity: 93,
      dew_point: -18.93,
      wind_speed: 1.35,
      wind_deg: 255,
      wind_gust: 1.21,
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: 100,
      pop: 0,
      uvi: 0.86,
    },
    {
      dt: 1642996800,
      sunrise: 1642983118,
      sunset: 1643014746,
      moonrise: 0,
      moonset: 1642993080,
      moon_phase: 0.7,
      temp: {
        day: -17.41,
        min: -24.47,
        max: -14.29,
        night: -23.48,
        eve: -20.34,
        morn: -24.2,
      },
      feels_like: { day: -17.41, night: -28.08, eve: -20.34, morn: -24.2 },
      pressure: 1035,
      humidity: 92,
      dew_point: -19.76,
      wind_speed: 1.35,
      wind_deg: 280,
      wind_gust: 1.75,
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: 98,
      pop: 0,
      uvi: 0.78,
    },
    {
      dt: 1643083200,
      sunrise: 1643069446,
      sunset: 1643101248,
      moonrise: 1643040660,
      moonset: 1643080440,
      moon_phase: 0.75,
      temp: {
        day: -17.49,
        min: -26.35,
        max: -14.09,
        night: -23.98,
        eve: -20.52,
        morn: -25.83,
      },
      feels_like: { day: -22.32, night: -29.65, eve: -24.85, morn: -31.73 },
      pressure: 1034,
      humidity: 91,
      dew_point: -19.89,
      wind_speed: 2.73,
      wind_deg: 325,
      wind_gust: 4.56,
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" },
      ],
      clouds: 79,
      pop: 0,
      uvi: 1,
    },
    {
      dt: 1643169600,
      sunrise: 1643155771,
      sunset: 1643187752,
      moonrise: 1643131860,
      moonset: 1643167920,
      moon_phase: 0.77,
      temp: {
        day: -17.1,
        min: -26.31,
        max: -13.65,
        night: -23.77,
        eve: -20.31,
        morn: -25.89,
      },
      feels_like: { day: -21.85, night: -29.14, eve: -20.31, morn: -32.17 },
      pressure: 1037,
      humidity: 89,
      dew_point: -19.79,
      wind_speed: 2.07,
      wind_deg: 317,
      wind_gust: 3.75,
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" },
      ],
      clouds: 53,
      pop: 0,
      uvi: 1,
    },
    {
      dt: 1643256000,
      sunrise: 1643242094,
      sunset: 1643274256,
      moonrise: 1643223300,
      moonset: 1643255700,
      moon_phase: 0.81,
      temp: {
        day: -16.21,
        min: -25.99,
        max: -12.64,
        night: -23.39,
        eve: -19.73,
        morn: -25.55,
      },
      feels_like: { day: -20.55, night: -29.33, eve: -23.92, morn: -31.54 },
      pressure: 1039,
      humidity: 85,
      dew_point: -19.31,
      wind_speed: 2.41,
      wind_deg: 316,
      wind_gust: 4.65,
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
      ],
      clouds: 13,
      pop: 0,
      uvi: 1,
    },
  ],
};

module.exports = (db) => {
  const lat = 51.04;
  const lon = 114.07;
  const part = "hourly,alerts ,current,minutely";
  const city = "Calgary";
  const cnt = 10;
  const key = process.env.WEATHER_API_KEY;
  const units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=en&exclude=${part}&units=${units}&appid=${key}`;
  router.get("/", (req, res) => {
    request(url, (error, response, body) => {
        console.log("in weather:", body);
        console.log("in error:", error);
        res.send(body);
    });
});
return router;
};
for (const item of weatherData.daily){
    const formatingData = {}
    const unixTime = item.dt;
const date = new Date(unixTime*1000);
// console.log("DATE",date.toLocaleDateString("en-US"));
if (!formatingData["days"]){
    formatingData["days"] ={}
}
if(!formatingData["days"]["date"]){
    formatingData["days"]["date"] = date.toLocaleDateString("en-US")
}
if(!formatingData["days"]["feels_like"]){
    formatingData["days"]["feels_like"]={
        day : item.feels_like.day,
        night : item.feels_like.day,
        evening : item.feels_like.eve,
        morning: item.feels_like.morn
    }
}



    console.log(formatingData);
    
   
}

