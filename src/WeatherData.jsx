import { House } from '@mui/icons-material';
import './MinTMaxT.css'
import './Pop12h.css'
import './StartEndTime.css'
import './Hours.css'
export default function WeatherData({ weatherData }) {


    // console.log(HoursStatement)
    return (
        <div>
            <p className="Hours">
                {weatherData.length !== 0 && `${weatherData[5]}`}
            </p>
            <p className="StartEndTime">
                {weatherData.length !== 0 && `${weatherData[0]}~${weatherData[1]}`}
            </p>
            <p className="MinTMaxT">
                {weatherData.length !== 0 && `${weatherData[3]}°C~${weatherData[4]}°C`}
            </p>
            <p className="Pop12h">
                {weatherData.length !== 0 && `${weatherData[2]}%`}
            </p>

        </div>

    )
}