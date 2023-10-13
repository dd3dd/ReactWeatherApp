import './MainInfo.css'
export default function MainInfo({ changePos, weatherData, minMaxOpacity = 1, weatherOpacity = 1,
    background, mainInfoStyle = 0, tempOpacity = 1, anime = 0 }) {
    if (!weatherData) {
        return null; // 或者您可以顯示一個載入中的狀態或錯誤消息
    }

    return (
        <div className={`MainInfo${anime === 1 ? 'Anime' : ''}`} style={{ backgroundImage: background }}>
            <p onClick={changePos} className='UserPos'>{weatherData.userPos}</p>
            <p onClick={changePos} style={{ opacity: tempOpacity }} className='Temp'>{weatherData.temp}</p>
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