import { House } from '@mui/icons-material';
import './MinTMaxT.css'
import './Pop12h.css'
import './StartEndTime.css'
import './Hours.css'
import './WeatherData.css'
import './RainIcon.css'



export default function WeatherData({ weatherData }) {
    console.log(weatherData)
    return (
        <div className='WeatherData'>
            <p className="Hours">
                {weatherData.length !== 0 && `${weatherData[5]}`}
            </p>
            <p className="StartEndTime">
                {weatherData.length !== 0 && `${weatherData[0]}~${weatherData[1]}`}
            </p>
            <p className="MinTMaxT">
                {weatherData.length !== 0 && `${weatherData[6]}`}
            </p>
            <p className="MinTMaxT">
                {weatherData.length !== 0 && `${weatherData[3]}°C~${weatherData[4]}°C`}
            </p>
            <p className="Pop12h">
                {weatherData.length !== 0 && <svg className='RainIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z" />
                </svg>}
                {weatherData.length !== 0 && `${weatherData[2]}%`}
            </p>

        </div>

    )
}