import './MainInfo.css'
export default function MainInfo({ weatherData }) {
    if (!weatherData) {
        return null; // 或者您可以顯示一個載入中的狀態或錯誤消息
    }
    return (
        <div className="MainInfo">
            <p className='UserPos'>{weatherData.userPos}</p>
            <p className='Temp'>{weatherData.temp}</p>
            <p className='Weather'>{weatherData.weather}</p>
            <p className='MinMaxT'>{weatherData.maxT} {weatherData.minT}</p>
        </div>
    )
}