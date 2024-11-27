import './weathercard.css'
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import { useEffect } from 'react'

export default function WeatherCard() {

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`

            const res = await fetch(url)
            const data = await res.json()

            console.log(data)

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        search("London")
    }, [])

    return (
        <div className="weather">
            <div className="search-bar">
                <input type="text" placeholder="Search city..." />
                <img src={search_icon} alt="" />
            </div>

            <img src={clear_icon} alt="" className='weather-icon' />
            <p className='temp'>16ºC</p>
            <p className='loc'>London</p>

            <div className="data">
                <div className="col">
                <img src={humidity_icon} alt="" />
                    <div>
                        <p>91%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>3.6 km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}