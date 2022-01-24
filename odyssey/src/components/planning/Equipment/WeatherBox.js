export default function WeatherBox(props) {
  return (
    <div className={`weather-box-${props.weather}`}>
      <h4>{props.date}</h4>
      <h4>{props.weather}</h4>
      <h4>{props.temp} °C</h4>
      <h4>Sunrise: {props.sunrise}</h4>
      <h4>Sunset: {props.sunset}</h4>
    </div>
  );
}
