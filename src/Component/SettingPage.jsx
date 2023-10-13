import CurrentPosBar from './CurrentPosBar';
import './Page2Container.css'
export default function SettingPage({ setPage, background, weatherData, anime }) {
    return (
        <div className="Page2Container">
            <p className='MyText'>天氣</p>
            <CurrentPosBar background={background} weatherData={weatherData} anime={anime} />
            <p className='SetPosText'>選擇位置</p>
        </div>
    )
}