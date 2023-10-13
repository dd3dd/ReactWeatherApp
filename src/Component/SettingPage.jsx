import CurrentPosBar from './CurrentPosBar';
import './Page2Container.css'
import SelectPos from './SelectPos';
import { useState, useEffect } from 'react';

export default function SettingPage({ changePage, background, weatherData, anime }) {
    const [firstData, setFirstData] = useState(['新竹縣', '金門縣', '苗栗縣', '新北市', '宜蘭縣', '雲林縣',
        '臺南市', '高雄市', '彰化縣', '臺北市', '南投縣', '澎湖縣', '基隆市',
        '桃園市', '花蓮縣', '連江縣', '臺東縣', '嘉義市', '嘉義縣', '屏東縣', '臺中市', '新竹市'])
    const [secondData, setSecondData] = useState([])
    const [firstselectedValue, setfirstSelectedValue] = useState('');
    const [secondselectedValue, setsecondSelectedValue] = useState('');

    return (
        <div className="Page2Container">
            <p className='MyText'>天氣</p>
            <CurrentPosBar changePage={changePage} background={background} weatherData={weatherData} anime={anime} />
            <p className='SetPosText'>選擇位置</p>
            <SelectPos />
        </div>
    )
}