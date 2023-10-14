import './MainInfo.css'
export default function MainInfo({ changePage, weatherData, minMaxOpacity = 1, weatherOpacity = 1,
    background, mainInfoStyle = 0, tempOpacity = 1, anime = 0 }) {
    if (!weatherData) {
        return null;
    }

    return (
        <div className={`MainInfo${anime === 1 ? 'Anime' : ''}`} style={{ backgroundImage: background }}>
            <p onClick={() => changePage(1)} className='UserPos'>{weatherData.userPos}</p>
            <p onClick={() => changePage(1)} style={{ opacity: tempOpacity }} className='Temp'>{weatherData.temp}</p>
            <p style={{ opacity: weatherOpacity }} className='Weather'>{weatherData.weather}</p>
            <p style={{ opacity: minMaxOpacity }} className='MinMaxT'>{weatherData.maxT} {weatherData.minT}</p>
            <div style={{ opacity: mainInfoStyle }} className='MainInfoV2'>
                <p className='TempV2'>{weatherData.temp}</p>
                <p className=''>|</p>
                <p className='WeatherV2'>{weatherData.weather}</p>
            </div >
        </div>

    )
}