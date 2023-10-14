import axios from "axios";
import { useState, useEffect } from "react";
import MainInfo from "./MainInfo";
import Row24Hr from "./Row24Hr";
import Data10Days from "./Data10Days";
import Row24Header from "./Row24Header";
import SettingPage from "./SettingPage";
import './ContainerV2.css'

export default function ContainerV2({ }) {
    const getDay = { 0: '週日', 1: '週一', 2: '週二', 3: '週三', 4: '週四', 5: '週五', 6: '週六' }
    //  const [userPos, setUserPos] = useState(null);
    const currentTime = new Date();
    const days = currentTime.getDay();
    const hours = currentTime.getHours();
    const [weatherData, setWeatherData] = useState({});
    const [data1Hr, setData1Hr] = useState();
    const [data10Days, setdata10Days] = useState();
    const [background, setBackground] = useState();
    const [boxColor, setBoxColor] = useState();
    const [mainInfoStyle, setMainInfoStyle] = useState();
    const [minMaxOpacity, setminMaxOpacity] = useState();
    const [weatherOpacity, setweatherOpacity] = useState();
    const [tempOpacity, settempOpacity] = useState();
    const [anime, setanime] = useState(1);
    const [showHeader, setshowHeader] = useState('none')
    const [currentPage, setcurrentPage] = useState(0);
    const [page2Obj, setpage2Obj] = useState();

    // const [opacityObj,setOpacityObj]=useState()
    const weatherapieKey = '9c46040661fe4027a7835737230710'
    useEffect(() => {

        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = !page2Obj ? position.coords.latitude : page2Obj.Lat;
                const longitude = !page2Obj ? position.coords.longitude : page2Obj.Lon;
                // const latitude = 49.26;
                // const longitude = -123.109;
                console.log("Latitude: " + latitude);
                console.log("Longitude: " + longitude);

                const fetchData = async () => {
                    try {
                        const userPos = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
                        const address = userPos.data.address;
                        const city = address.city;
                        const town = address.town || address.suburb || address.village || address.city;
                        // console.log(city, town)
                        // setUserPos(town)
                        //                         const dataA00001 = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=${myAuthorization}
                        // &elementName=TEMP,Weather&parameterName=CITY`)

                        //                         const dataA00003 = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${myAuthorization}
                        // &elementName=TEMP,Weather&parameterName=CITY`)
                        // const test = await axios.get(`https://nominatim.openstreetmap.org/search?q=桃園市中壢區&format=json&limit=1&addressdetails=1`)
                        // console.log(test.data)
                        // const weekData = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/${currentCityCode}?Authorization=${myAuthorization}
                        // &elementName=MinT,MaxT,PoP12h,WeatherDescription`)
                        const data1Hr = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=2&lang=zh_tw&key=${weatherapieKey}`)
                        const data10Days = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=10&hour=9&lang=zh_tw&key=${weatherapieKey}`)
                        //console.log(data1Hr.data)
                        const temp = data1Hr.data.current.temp_c;
                        let weather = data1Hr.data.current.condition.text;
                        //let weather = '雨';

                        const currentMin = Math.round(data1Hr.data.forecast.forecastday[0].day.mintemp_c);
                        const currentMax = Math.round(data1Hr.data.forecast.forecastday[0].day.maxtemp_c);
                        if (weather.includes('週边')) {
                            weather = weather.replace('週边', '周邊')
                        }
                        const weatherObj = {
                            userPos: !page2Obj ? town : page2Obj.name, temp: `${Math.round(temp)}°`,
                            weather: weather, minT: `最低${currentMin}°`,
                            maxT: `最高${currentMax}°`
                        };
                        // console.log(weatherObj)
                        setanime(1);
                        setWeatherData(weatherObj)
                        if (weatherObj.weather.includes('晴') && hours >= 6 && hours < 18) {
                            setBackground(`url('../assets/sunny.jpg')`)
                            setBoxColor('#3077BF')
                        }
                        else if (weatherObj.weather.includes('晴') && hours >= 18 || (weatherObj.weather.includes('晴') && hours < 6)) {
                            setBackground(`url('../assets/nightsunny.jpg')`)
                            setBoxColor('#2B2E4D')

                        }
                        else if (weatherObj.weather.includes('多雲') && hours >= 6 && hours < 18) {
                            setBackground(`url('../assets/cloudy.jpg')`)
                            setBoxColor('#4F5F75')

                        }
                        else if ((weatherObj.weather.includes('多雲') && hours >= 18) || (weatherObj.weather.includes('多雲') && hours < 6) ||
                            (weatherObj.weather.includes('陰'))) {
                            setBackground(`url('../assets/cloudynight.jpg')`)
                            setBoxColor('#4F5F75')

                        }
                        else if (weatherObj.weather.includes('雨')) {
                            setBackground(`url('../assets/rain2.gif')`)
                            setBoxColor('#4F5F75')
                            setanime(0)
                        }
                        else if (hours >= 6 && hours < 18) {
                            setBackground(`url('../assets/cloudy.jpg')`)
                            setBoxColor('#4F5F75')
                        }
                        else {
                            setBackground(`url('../assets/cloudynight.jpg')`)
                            setBoxColor('#4F5F75')
                        }


                        // setBackground(`url('./src/assets/cloudy.jpg')`)
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
                        setData1Hr(perfectData)
                        setshowHeader('block');

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
                        alert('請開啟定位功能!!')
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


    }, [page2Obj]);
    // console.log(data10Days)

    const handleScroll = (e) => {
        const scrollY = e.target.scrollTop;
        if (scrollY > 60) {
            setMainInfoStyle(1);
        }
        else {
            setMainInfoStyle(0);
        }
        const opacityminMax = 1 - (scrollY / 10);
        setminMaxOpacity(opacityminMax)

        const opacityWeather = 1 - (scrollY / 50);
        setweatherOpacity(opacityWeather)

        const opacityTemp = 1 - (scrollY / 80);
        settempOpacity(opacityTemp)


        // console.log(scrollY)
    }
    const changePage = (num) => {
        setcurrentPage(num);
    }
    const storePage2Info = (obj) => {
        setpage2Obj(obj)
    }

    return (
        <>
            {currentPage === 0 ?
                <div style={{ backgroundImage: background }} onScroll={handleScroll} className={`ContainerV2${anime === 1 ? 'Anime' : ''}`}>
                    {/* <div style={{ height: '30px' }}></div> */}
                    <MainInfo changePage={changePage} background={background} mainInfoStyle={mainInfoStyle} weatherData={weatherData}
                        minMaxOpacity={minMaxOpacity} weatherOpacity={weatherOpacity} tempOpacity={tempOpacity} anime={anime} />
                    <div className="MiddleRow"></div>
                    <Row24Header boxColor={boxColor} showHeader={showHeader} />
                    <Row24Hr data1Hr={data1Hr} boxColor={boxColor} />
                    <Data10Days data10Days={data10Days} boxColor={boxColor} />
                </div> : <SettingPage changePage={changePage} background={background}
                    storePage2Info={storePage2Info} weatherData={weatherData} anime={anime} />
            }
        </>
    )
}