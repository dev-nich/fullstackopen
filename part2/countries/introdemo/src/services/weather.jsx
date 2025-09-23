import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const API_WEATHER = import.meta.env.VITE_API_WEATHER

const getWeather = (data) => {
  const request = axios.get(`${baseUrl}?lat=${data[0]}&lon=${data[1]}&appid=${API_WEATHER}`)
  return request.then(response => response.data)
}


export default { getWeather }
