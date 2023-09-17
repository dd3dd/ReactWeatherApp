import './MyContainer.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Select from './Select';
import MyH1 from './MyH1';
import MinTMaxT from './MinTMaxT';
export default function MyContainer() {
    const [data, setData] = useState([])
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleValueChange = (value) => {
        setSelectedValue(value);
    };
    const handleIndexChange = (index) => {
        setSelectedIndex(index);
    };
    const myAuthorization = 'CWB-75625081-4569-4414-93FD-FC371A92BAA4';
    useEffect(() => {
        axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-007?Authorization=${myAuthorization}&elementName=MinT,MaxT,PoP12h,WeatherDescription`)
            .then((response) => {
                setData(response.data.records.locations[0].location);
            })
            .catch((error) => {
                console.error('API 請求失敗', error);
            });

    }, []);
    // console.log(data);

    return (
        <div className='MyContainer'>
            <MyH1 selectedValue={selectedValue} />
            <Select data={data} onValueChange={handleValueChange} onIndexChange={handleIndexChange} />
            <MinTMaxT />
        </div>
    )
}