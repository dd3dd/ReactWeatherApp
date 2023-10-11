import './MainInfo.css'
export default function MainInfo({ weatherData, minMaxOpacity, weatherOpacity, background }) {
    if (!weatherData) {
        return null; // 或者您可以顯示一個載入中的狀態或錯誤消息
    }
    return (
        <div className="MainInfo" style={{ background: background }}>
            <p className='UserPos'>{weatherData.userPos}</p>
            <p className='Temp'>{weatherData.temp}</p>
            <p style={{ opacity: weatherOpacity }} className='Weather'>{weatherData.weather}</p>
            <p style={{ opacity: minMaxOpacity }} className='MinMaxT'>{weatherData.maxT} {weatherData.minT}</p>
        </div>

    )
}