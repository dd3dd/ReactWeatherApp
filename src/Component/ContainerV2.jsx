import axios from "axios";
import { useState, useEffect } from "react";
import './ContainerV2.css'
import MainInfo from "./MainInfo";
import Row24Hr from "./Row24Hr";
import Data10Days from "./Data10Days";
import './Row24Hr.css'
import './Data10Days.css'
export default function ContainerV2() {
    const getDay = { 0: '週日', 1: '週一', 2: '週二', 3: '週三', 4: '週四', 5: '週五', 6: '週六' }
    const cityCode = {
        '宜蘭縣': 'F-D0047-003', '桃園市': 'F-D0047-007', '新竹縣': 'F-D0047-011', '苗栗縣': 'F-D0047-015', '彰化縣': 'F-D0047-019',
        '南投縣': 'F-D0047-023', '雲林縣': 'F-D0047-027', '嘉義縣': 'F-D0047-031', '屏東縣': 'F-D0047-035', '臺東縣': 'F-D0047-039',
        '花蓮縣': 'F-D0047-043', '澎湖縣': 'F-D0047-047', '基隆市': 'F-D0047-051', '新竹市': 'F-D0047-055', '嘉義市': 'F-D0047-059',
        '臺北市': 'F-D0047-063', '高雄市': 'F-D0047-067', '新北市': 'F-D0047-071', '臺中市': 'F-D0047-075', '臺南市': 'F-D0047-079',
        '連江縣': 'F-D0047-083', '金門縣': 'F-D0047-087'
    }
    //  const [userPos, setUserPos] = useState(null);
    const currentTime = new Date();
    const days = currentTime.getDay();
    const hours = currentTime.getHours();
    const [weatherData, setWeatherData] = useState({});
    const [data1Hr, setData1Hr] = useState();
    const [data10Days, setdata10Days] = useState();
    const [background, setBackground] = useState();
    const [boxColor, setBoxColor] = useState();
    const [dayBoxTop, setdayBoxTop] = useState();
    const [day10BoxTop, setday10BoxTop] = useState();
    const [day10BoxHeight, setday10BoxHeight] = useState();
    const [mainInfoStyle, setMainInfoStyle] = useState();
    const [minMaxOpacity, setminMaxOpacity] = useState();
    const [weatherOpacity, setweatherOpacity] = useState();
    const [tempOpacity, settempOpacity] = useState();
    const [tempV2Opacity, settempV2Opacity] = useState();
    const [anime, setanime] = useState(1);

    // const [opacityObj,setOpacityObj]=useState()
    const myAuthorization = 'CWB-75625081-4569-4414-93FD-FC371A92BAA4';
    const weatherapieKey = '9c46040661fe4027a7835737230710'
    useEffect(() => {

        if ("geolocation" in navigator) {
            // 获取用户位置
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log("Latitude: " + latitude);
                console.log("Longitude: " + longitude);

                const fetchData = async () => {
                    try {
                        const userPos = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
                        const address = userPos.data.address;
                        const city = address.city;
                        const currentCityCode = cityCode[city];
                        const town = address.town || address.suburb || address.village || address.city;
                        console.log(city, town, currentCityCode)
                        // setUserPos(town)
                        const dataA00001 = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=${myAuthorization}
&elementName=TEMP,Weather&parameterName=CITY`)

                        const dataA00003 = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${myAuthorization}
&elementName=TEMP,Weather&parameterName=CITY`)

                        const weekData = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/${currentCityCode}?Authorization=${myAuthorization}
&elementName=MinT,MaxT,PoP12h,WeatherDescription`)
                        const data1Hr = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=2&lang=zh_tw&key=${weatherapieKey}`)
                        const data10Days = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=10&hour=9&lang=zh_tw&key=${weatherapieKey}`)
                        //const future24hr = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=2&lang=
                        // zh_tw&key=${weatherapieKey}`)
                        //console.log(dataA00001.data, dataA00003.data)
                        const combineData = [...dataA00001.data.records.location,
                        ...dataA00003.data.records.location]
                        console.log(data1Hr.data)
                        //  console.log(data10Days.data)
                        // console.log(future24hr.data)
                        //   setObservatory(combineData);

                        let closestStation = null;
                        let closestDistance = Infinity;
                        combineData.forEach(obj => {
                            const latitudeDiff = Math.abs(latitude - obj.lat);
                            const longitudeDiff = Math.abs(longitude - obj.lon);
                            const distance = Math.sqrt(latitudeDiff ** 2 + longitudeDiff ** 2);

                            if (distance < closestDistance) {
                                closestStation = obj;
                                closestDistance = distance;
                            }
                        })
                        const findTown = weekData.data.records.locations[0].location;
                        // const currentMin = findTown.find(e => e.locationName === town).weatherElement[1]
                        //     .time[0].elementValue[0].value;
                        // const currentMax = findTown.find(e => e.locationName === town).weatherElement[3]
                        //     .time[0].elementValue[0].value;


                        //  console.log(currentMin, currentMax)

                        //console.log(closestStation)
                        // const temp = Math.round(closestStation.weatherElement[0].elementValue);
                        const temp = data1Hr.data.current.temp_c;
                        // const weather = closestStation.weatherElement[1].elementValue;
                        // let weather = data1Hr.data.current.condition.text;
                        let weather = '多雲';

                        const currentMin = Math.round(data1Hr.data.forecast.forecastday[0].day.mintemp_c);
                        const currentMax = Math.round(data1Hr.data.forecast.forecastday[0].day.maxtemp_c);
                        if (weather.includes('週边')) {
                            weather = weather.replace('週边', '周邊')
                        }
                        const weatherObj = {
                            userPos: town, temp: `${temp}°`,
                            weather: weather, minT: `最低${currentMin}°`,
                            maxT: `最高${currentMax}°`
                        };
                        setanime(1);
                        setWeatherData(weatherObj)
                        if (weatherObj.weather.includes('晴') && hours >= 6 && hours < 18) {
                            setBackground(`url('./src/assets/sunny.jpg')`)
                            setBoxColor('#3077BF')

                        }
                        else if (weatherObj.weather.includes('晴') && hours >= 18 || (weatherObj.weather.includes('晴') && hours < 6)) {
                            setBackground(`url('./src/assets/nightsunny.jpg')`)
                            setBoxColor('#2B2E4D')

                        }
                        else if (weatherObj.weather.includes('多雲') && hours >= 6 && hours < 18) {
                            setBackground(`url('./src/assets/cloudy.jpg')`)
                            setBoxColor('#4F5F75')

                        }
                        else if ((weatherObj.weather.includes('多雲') && hours >= 18) || (weatherObj.weather.includes('多雲') && hours < 6) ||
                            (weatherObj.weather.includes('陰'))) {
                            setBackground(`url('./src/assets/cloudynight.jpg')`)
                            setBoxColor('#4F5F75')

                        }
                        else if (weatherObj.weather.includes('雨')) {
                            setBackground(`url('./src/assets/rain2.gif')`)
                            setBoxColor('#4F5F75')
                            setanime(0)
                        }

                        // setBackground(`url('./src/assets/rain.jpg')`)
                        // setBoxColor('#4F5F75')


                        let perfectData = [];
                        const select1 = data1Hr.data.forecast.forecastday[0].hour;
                        const select2 = data1Hr.data.forecast.forecastday[1].hour;
                        for (let i = hours; i < select1.length; i++) {
                            let timeMsg = null;
                            if (i === hours)
                                timeMsg = '現在'
                            else if (i >= 0 && i < 12)
                                timeMsg = `上午${i}時`
                            else if (i === 12)
                                timeMsg = `下午${i}時`
                            else
                                timeMsg = `下午${i % 12}時`
                            perfectData = [...perfectData, {
                                time: timeMsg,
                                pop: select1[i].chance_of_rain,
                                image: select1[i].condition.icon,
                                temp: select1[i].temp_c
                            }]
                        }
                        for (let i = 0; i < hours; i++) {
                            let timeMsg = null;
                            if (i >= 0 && i < 12)
                                timeMsg = `上午${i}時`
                            else if (i === 12)
                                timeMsg = `下午${i}時`
                            else
                                timeMsg = `下午${i % 12}時`
                            perfectData = [...perfectData, {
                                time: timeMsg,
                                pop: select2[i].chance_of_rain,
                                image: select2[i].condition.icon,
                                temp: select2[i].temp_c
                            }]
                        }
                        //   console.log(perfectData)
                        setData1Hr(perfectData)


                        const select3 = data10Days.data.forecast.forecastday;
                        // console.log(data10Days.data.forecast.forecastday)
                        let complete10Days = [];
                        for (let i = 0; i < select3.length; i++) {
                            complete10Days = [...complete10Days, {
                                minT: select3[i].day.mintemp_c,
                                maxT: select3[i].day.maxtemp_c,
                                pop: select3[i].day.daily_chance_of_rain,
                                icon: select3[i].day.condition.icon,
                                day: i === 0 ? '今天' : getDay[(days + i) % 7]
                            }]
                        }
                        setdata10Days(complete10Days)
                        //  setClosestStationData(closestStation)


                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
                fetchData();

            }, function (error) {
                // 处理获取位置失败的情况
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("用户拒绝了位置请求");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("位置信息不可用");
                        break;
                    case error.TIMEOUT:
                        console.log("获取位置超时");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("发生未知错误");
                        break;
                }
            });
        } else {
            console.log("浏览器不支持Geolocation API");
        }
        //   console.log(data1Hr)


    }, []);
    // console.log(data10Days)

    const handleScroll = (e) => {
        const scrollY = e.target.scrollTop;




        // 阻止默认滚动行为


        if (scrollY > 60) {
            setMainInfoStyle(1);
        }
        else {
            setMainInfoStyle(0);
        }
        if (scrollY > 220) {
            setdayBoxTop(0);
            // setdayBoxHeight(150 - scrollY + 100);
        }
        else {
            setdayBoxTop(1);
            // setdayBoxHeight(150);
        }
        // if (scrollY > 255) {
        //     setday10BoxTop({ top: '120px', height: 550 - scrollY + 255 });
        //     // setday10BoxHeight(550 - scrollY + 255);


        // }
        // else {
        //     setday10BoxTop({ top: '380px', height: 550 });
        //     // setday10BoxHeight(550);
        // }


        const opacityminMax = 1 - (scrollY / 10);
        setminMaxOpacity(opacityminMax)

        const opacityWeather = 1 - (scrollY / 50);
        setweatherOpacity(opacityWeather)

        const opacityTemp = 1 - (scrollY / 80);
        settempOpacity(opacityTemp)


        // console.log(scrollY)
    }

    return (
        <div style={{ backgroundImage: background }} onScroll={handleScroll} className={`ContainerV2${anime === 1 ? 'Anime' : ''}`}>
            {/* <div style={{ height: '30px' }}></div> */}
            <MainInfo background={background} mainInfoStyle={mainInfoStyle} weatherData={weatherData}
                minMaxOpacity={minMaxOpacity} weatherOpacity={weatherOpacity} tempOpacity={tempOpacity} anime={anime} />
            <div className="aa"></div>
            <div style={{ backgroundColor: boxColor, opacity: dayBoxTop }} className='SubTitle24'>
                <p className='SubTitleText24'>每小時天氣預報</p>
                <hr className='myhr24'></hr>
            </div>
            <Row24Hr data1Hr={data1Hr} boxColor={boxColor} dayBoxTop={dayBoxTop} />
            <Data10Days data10Days={data10Days} boxColor={boxColor} day10BoxTop={day10BoxTop} day10BoxHeight={day10BoxHeight} />

        </div>
    )
}