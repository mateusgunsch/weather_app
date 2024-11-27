import './weathercard.css'
import search_icon from "../assets/search.png"
import { useEffect, useRef, useState } from 'react'
import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"
import { icons } from '../weather_icons/icons'

export default function WeatherCard() {

    const [weatherData, setWeatherData] = useState(false)

    useEffect(() => {
        search("Sao Paulo")
    }, [])

    const inputRef = useRef()

    const search = async (city) => {
        if(city === "") {
            alert("Enter City Name!")
            return
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const res = await fetch(url)
            const data = await res.json()

            if(!res.ok) {
                alert(data.message)
                return
            }

            const icon = icons[data.weather[0].icon] || icons['01d']

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeatherData(false)
            console.error(error.message)
        }
    }

    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search city..." onKeyDown={(ev) => {
                    if(ev.key === 'Enter'){
                        search(inputRef.current.value)
                    }
                }} />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ? 
                <>
                    <img src={weatherData.icon} alt="" className='weather-icon' />
                    <p className='temp'>{weatherData.temperature}ºC</p>
                    <p className='loc'>{weatherData.location}</p>

                    <div className="data">
                        <div className="col">
                        <img src={humidity_icon} alt="" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </> : <></>
            }
        </div>
    )
}