import './MyContainer.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import SelectBig from './SelectBig';
import MyH1 from './MyH1';
import WeatherData from './WeatherData';
import ChangeTimeBut from './ChangeTimeBut';
import './Hours.css'
export default function MyContainer() {
    const cityCode = {
        '宜蘭縣': 'F-D0047-003', '桃園市': 'F-D0047-007', '新竹縣': 'F-D0047-011', '苗栗縣': 'F-D0047-015', '彰化縣': 'F-D0047-019',
        '南投縣': 'F-D0047-023', '雲林縣': 'F-D0047-027', '嘉義縣': 'F-D0047-031', '屏東縣': 'F-D0047-035', '臺東縣': 'F-D0047-039',
        '花蓮縣': 'F-D0047-043', '澎湖縣': 'F-D0047-047', '基隆市': 'F-D0047-051', '新竹市': 'F-D0047-055', '嘉義市': 'F-D0047-059',
        '臺北市': 'F-D0047-063', '高雄市': 'F-D0047-067', '新北市': 'F-D0047-071', '臺中市': 'F-D0047-075', '臺南市': 'F-D0047-079',
        '連江縣': 'F-D0047-083', '金門縣': 'F-D0047-087'
    }

    const storeStartTime = [];
    const storeEndTime = [];
    const storePoP12 = [];
    const storeMinT = [];
    const storeMaxT = [];
    const storeDes = [];
    const display1 = [];
    const display2 = [];
    const display3 = [];
    //const [firstData,setFirstData]=useState([]);
    const [firstData, setFirstData] = useState(['新竹縣', '金門縣', '苗栗縣', '新北市', '宜蘭縣', '雲林縣',
        '臺南市', '高雄市', '彰化縣', '臺北市', '南投縣', '澎湖縣', '基隆市',
        '桃園市', '花蓮縣', '連江縣', '臺東縣', '嘉義市', '嘉義縣', '屏東縣', '臺中市', '新竹市'])
    const [secondData, setSecondData] = useState([])
    const [timeState, setTimeState] = useState(0);


    const [firstselectedValue, setfirstSelectedValue] = useState('');
    const [secondselectedValue, setsecondSelectedValue] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [firstDecision, setfirstDecision] = useState([false, false]);
    const [showText, setShowText] = useState(false);

    const handleFirstValueChange = (value) => {
        setsecondSelectedValue('');
        setfirstDecision([true, false]);
        setSecondData([]);
        setWeatherData([]);
        setfirstSelectedValue(value);

        setTimeState(0);

    };
    const handleSecondValueChange = (value) => {
        if (showText) {
            // 如果当前文本正在显示，则设置showText为false以触发消失动画
            setShowText(false);
            // 使用setTimeout在动画完成后将新文本设置为选中的选项，并再次显示
            setTimeout(() => {

                setShowText(true);
            }, 200); // 这里的500表示渐变效果的持续时间
        } else {
            setShowText(true);
        }
        setfirstDecision([true, true]);
        setsecondSelectedValue(value);
        setTimeState(0);

    };

    const handleTimeButtonChange = (But) => {
        if (showText) {
            // 如果当前文本正在显示，则设置showText为false以触发消失动画
            setShowText(false);
            // 使用setTimeout在动画完成后将新文本设置为选中的选项，并再次显示
            setTimeout(() => {

                setShowText(true);
            }, 200); // 这里的500表示渐变效果的持续时间
        } else {
            setShowText(true);
        }
        if (But === 1)
            setTimeState((prevState) => (prevState + 1) % 3);
        else
            setTimeState((prevState) => (prevState - 1 + 3) % 3);
    }


    const myAuthorization = 'CWB-75625081-4569-4414-93FD-FC371A92BAA4';
    // useEffect(() => {
    //     axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${myAuthorization}&elementName=T`)
    //         .then((response) => {
    //             setFirstData(response.data.records.locations[0].location);
    //         })
    //         .catch((error) => {
    //             console.error('API 請求失敗', error);
    //         });

    // }, []);
    //console.log(firstData)
    useEffect(() => {

        let currentCityCode = '';
        currentCityCode = cityCode[firstselectedValue];

        axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/${currentCityCode}?Authorization=${myAuthorization}&elementName=MinT,MaxT,PoP12h,WeatherDescription`)
            .then((response) => {
                setSecondData(response.data.records.locations[0].location);
            })
            .catch((error) => {
                console.error('API 請求失敗', error);
            });


    }, [firstselectedValue]);

    useEffect(() => {

        if (secondselectedValue !== '' && firstDecision[1] === true) {
            const selectedTown = secondselectedValue;
            const selectedTownIdx = secondData.indexOf(secondData.find(element => {
                return element.locationName === selectedTown;
            }))


            for (let i = 0; i < 3; i++) {
                storeStartTime.push(secondData[selectedTownIdx].weatherElement[0].time[i].startTime);
                storeEndTime.push(secondData[selectedTownIdx].weatherElement[0].time[i].endTime);
                storePoP12.push(secondData[selectedTownIdx].weatherElement[0].time[i].elementValue[0].value);
                storeMinT.push(secondData[selectedTownIdx].weatherElement[1].time[i].elementValue[0].value);
                storeMaxT.push(secondData[selectedTownIdx].weatherElement[3].time[i].elementValue[0].value);
                storeDes.push(secondData[selectedTownIdx].weatherElement[2].time[i].elementValue[0].value);
            }

            for (let i = 0; i < 3; i++) {
                storeStartTime[i] = storeStartTime[i].slice(11, 16);
                storeEndTime[i] = storeEndTime[i].slice(11, 16);
                storeDes[i] = storeDes[i].slice(0, storeDes[i].indexOf('。'))
            }

            const currentDate = new Date();
            const hours = currentDate.getHours();

            let hourMsg1, hourMsg2, hourMsg3 = '';
            if (hours >= 0 && hours < 6) {
                hourMsg1 = '今晚明晨';
                hourMsg2 = '今日白天';
                hourMsg3 = '今日晚上';
            }
            else if (hours >= 6 && hours < 12) {
                hourMsg1 = '今日白天';
                hourMsg2 = '今晚明晨';
                hourMsg3 = '明日白天';
            }
            else if (hours >= 12 && hours < 18) {
                hourMsg1 = '今日白天';
                hourMsg2 = '今晚明晨';
                hourMsg3 = '明日白天';
            }
            else if (hours >= 18 && hours < 24) {
                hourMsg1 = '今晚明晨';
                hourMsg2 = '明日白天';
                hourMsg3 = '明日晚上';
            }

            if (timeState === 0) {
                display1.push(storeStartTime[0]);
                display1.push(storeEndTime[0]);
                display1.push(storePoP12[0]);
                display1.push(storeMinT[0]);
                display1.push(storeMaxT[0]);
                display1.push(hourMsg1);
                display1.push(storeDes[0]);
                setWeatherData(display1);


            }
            else if (timeState === 1) {
                display2.push(storeStartTime[1]);
                display2.push(storeEndTime[1]);
                display2.push(storePoP12[1]);
                display2.push(storeMinT[1]);
                display2.push(storeMaxT[1]);
                display2.push(hourMsg2);
                display2.push(storeDes[1]);
                setWeatherData(display2);
            }
            else {
                display3.push(storeStartTime[2]);
                display3.push(storeEndTime[2]);
                display3.push(storePoP12[2]);
                display3.push(storeMinT[2]);
                display3.push(storeMaxT[2]);
                display3.push(hourMsg3);
                display3.push(storeDes[2]);
                setWeatherData(display3);
            }

        }
        else {

        }

        // console.log(storeStartTime, storeEndTime, storePoP12, storeMinT, storeMaxT, storeDes);
    }, [secondselectedValue, timeState]);

    return (
        <div className='MyContainer'>
            <MyH1 selectedValue={secondselectedValue} />
            <SelectBig firstData={firstData} secondData={secondData} firstValueChange={handleFirstValueChange}
                secondValueChange={handleSecondValueChange} firstDecision={firstDecision} />
            <WeatherData weatherData={weatherData} showText={showText} />
            <ChangeTimeBut butTimeState={handleTimeButtonChange} weatherData={weatherData} />

        </div>
    )
}