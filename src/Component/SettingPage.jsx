import CurrentPosBar from './CurrentPosBar';
import './Page2Container.css'
import SelectPos from './SelectPos';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SettingPage({ storePage2Info, changePage, background, weatherData, anime }) {
    const myAuthorization = 'CWB-75625081-4569-4414-93FD-FC371A92BAA4';
    const cityCode = {
        '宜蘭縣': 'F-D0047-003', '桃園市': 'F-D0047-007', '新竹縣': 'F-D0047-011', '苗栗縣': 'F-D0047-015', '彰化縣': 'F-D0047-019',
        '南投縣': 'F-D0047-023', '雲林縣': 'F-D0047-027', '嘉義縣': 'F-D0047-031', '屏東縣': 'F-D0047-035', '臺東縣': 'F-D0047-039',
        '花蓮縣': 'F-D0047-043', '澎湖縣': 'F-D0047-047', '基隆市': 'F-D0047-051', '新竹市': 'F-D0047-055', '嘉義市': 'F-D0047-059',
        '臺北市': 'F-D0047-063', '高雄市': 'F-D0047-067', '新北市': 'F-D0047-071', '臺中市': 'F-D0047-075', '臺南市': 'F-D0047-079',
        '連江縣': 'F-D0047-083', '金門縣': 'F-D0047-087'
    }
    const [firstData, setFirstData] = useState(['新竹縣', '金門縣', '苗栗縣', '新北市', '宜蘭縣', '雲林縣',
        '臺南市', '高雄市', '彰化縣', '臺北市', '南投縣', '澎湖縣', '基隆市',
        '桃園市', '花蓮縣', '連江縣', '臺東縣', '嘉義市', '嘉義縣', '屏東縣', '臺中市', '新竹市'])
    const [secondData, setSecondData] = useState([])
    const [firstselectedValue, setfirstSelectedValue] = useState('');
    const [secondselectedValue, setsecondSelectedValue] = useState('');
    const [firstDecision, setfirstDecision] = useState([false, false]);
    const [storeSelectPos, setstoreSelectPos] = useState()
    useEffect(() => {

        let currentCityCode = '';
        currentCityCode = cityCode[firstselectedValue];
        if (currentCityCode) {
            axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/${currentCityCode}?Authorization=${myAuthorization}&elementName=MinT`)
                .then((response) => {
                    setSecondData(response.data.records.locations[0].location);
                })
                .catch((error) => {
                    console.error('API 請求失敗', error);
                });
        }

    }, [firstselectedValue]);

    const handleFirstValueChange = (value) => {
        setsecondSelectedValue('');
        setfirstDecision([true, false]);
        setSecondData([]);
        // setWeatherData([]);
        setfirstSelectedValue(value);
        setstoreSelectPos(value);
        // setTimeState(0);
    };
    const handleSecondValueChange = (value) => {
        //  console.log(value)
        setfirstDecision([true, true]);
        setsecondSelectedValue(value);
        const fullTown = storeSelectPos + value
        if (fullTown) {
            axios.get(`https://nominatim.openstreetmap.org/search?q=${fullTown}&format=json&limit=1&addressdetails=1`)
                .then((response) => {
                    //console.log(response.data)
                    const page2Obj = {
                        Lat: response.data[0].lat,
                        Lon: response.data[0].lon,
                        name: fullTown.slice(3),
                    }
                    storePage2Info(page2Obj)
                    changePage(0)
                })
                .catch((error) => {
                    console.error('API 請求失敗', error);
                });

        }


    };
    // console.log(storeSelectPos)
    return (
        <div className="Page2Container">
            <p className='MyText'>天氣</p>
            <CurrentPosBar changePage={changePage} background={background} weatherData={weatherData} anime={anime} />
            <p className='SetPosText'>選擇位置</p>
            <SelectPos firstData={firstData} secondData={secondData} handleFirstValueChange=
                {handleFirstValueChange} handleSecondValueChange={handleSecondValueChange}
                firstDecision={firstDecision} />
        </div>
    )
}