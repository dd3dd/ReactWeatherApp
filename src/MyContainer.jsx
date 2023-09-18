import './MyContainer.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import SelectSmall from './SelectSmall';
import SelectBig from './SelectBig';
import MyH1 from './MyH1';
import MinTMaxT from './MinTMaxT';
export default function MyContainer() {
    const cityCode = {
        '宜蘭縣': 'F-D0047-003', '桃園市': 'F-D0047-007', '新竹縣': 'F-D0047-011', '苗栗縣': 'F-D0047-015', '彰化縣': 'F-D0047-019',
        '南投縣': 'F-D0047-023', '雲林縣': 'F-D0047-027', '嘉義縣': 'F-D0047-031', '屏東縣': 'F-D0047-035', '臺東縣': 'F-D0047-039',
        '花蓮縣': 'F-D0047-043', '澎湖縣': 'F-D0047-047', '基隆市': 'F-D0047-051', '新竹市': 'F-D0047-055', '嘉義市': 'F-D0047-059',
        '臺北市': 'F-D0047-063', '高雄市': 'F-D0047-067', '新北市': 'F-D0047-071', '臺中市': 'F-D0047-075', '臺南市': 'F-D0047-079',
        '連江縣': 'F-D0047-083', '金門縣': 'F-D0047-087'
    }


    const [firstData, setFirstData] = useState([])
    const [secondData, setSecondData] = useState([])
    //const [cityData, setCityData] = useState([])
    // const [selectedValue, setSelectedValue] = useState('');
    // const [selectedIndex, setSelectedIndex] = useState(null);

    const [firstselectedValue, setfirstSelectedValue] = useState({ value: '', index: null });
    const [secondselectedValue, setsecondSelectedValue] = useState({ value: '', index: null });

    const handleFirstValueChange = (valueobj) => {
        setSecondData([]);
        setfirstSelectedValue(valueobj);
    };
    const handleSecondValueChange = (valueobj) => {
        setsecondSelectedValue(valueobj);

    };
    //  console.log(secondselectedValue)
    const myAuthorization = 'CWB-75625081-4569-4414-93FD-FC371A92BAA4';
    useEffect(() => {
        axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${myAuthorization}&elementName=T`)
            .then((response) => {
                setFirstData(response.data.records.locations[0].location);
            })
            .catch((error) => {
                console.error('API 請求失敗', error);
            });

    }, []);
    useEffect(() => {
        let currentCityCode = '';
        currentCityCode = cityCode[firstselectedValue.value];

        axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/${currentCityCode}?Authorization=${myAuthorization}&elementName=MinT,MaxT,PoP12h,WeatherDescription`)
            .then((response) => {
                setSecondData(response.data.records.locations[0].location);
            })
            .catch((error) => {
                console.error('API 請求失敗', error);
            });
        console.log(currentCityCode);

    }, [firstselectedValue]);
    // console.log(data);

    return (
        <div className='MyContainer'>
            <MyH1 selectedValue={secondselectedValue.value} />
            <SelectBig firstData={firstData} secondData={secondData} firstValueChange={handleFirstValueChange}
                secondValueChange={handleSecondValueChange} />
            <MinTMaxT />

        </div>
    )
}