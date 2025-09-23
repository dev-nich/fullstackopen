
const Weather = ({capital, weatherData}) => {
    const iconUrl = 'https://openweathermap.org/img/wn/';
    return weatherData ? <div>
        <h3>Weather in {capital}</h3>
        <div>Temperature - {weatherData.main.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
        <div>Wind {weatherData.wind.speed} m/s</div>
    </div> : null
}
export default Weather