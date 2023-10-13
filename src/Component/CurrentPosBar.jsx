import './Page2Container.css'
export default function CurrentPosBar({ background = '', weatherData = {}, anime = 0 }) {
    return (
        <div style={{ backgroundImage: background }} className={`CurrentPosBar${anime === 1 ?
            'Anime' : ''}`}>
            <p className='MyPos'>現在位置</p>
            <p className='PosInfo'>{weatherData.userPos}</p>
            <p className='WeatherInfo'>{weatherData.weather}</p>
            <p className='TempInfo'>{weatherData.temp}</p>
            <p className='MinInfo'>{weatherData.minT}</p>
            <p className='MaxInfo'>{weatherData.maxT}</p>
        </div>
    )
}