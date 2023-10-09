import axios from "axios";
import { useState, useEffect } from "react";
import './ContainerV2.css'
import MainInfo from "./MainInfo";
import Row24Hr from "./Row24Hr";
import Data10Days from "./Data10Days";
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
                        const data1Hr = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=2&key=${weatherapieKey}`)
                        const data10Days = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=10&hour=9&lang=zh_tw&key=${weatherapieKey}`)
                        //const future24hr = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${latitude}%2C${longitude}&days=2&lang=
                        // zh_tw&key=${weatherapieKey}`)
                        //console.log(dataA00001.data, dataA00003.data)
                        const combineData = [...dataA00001.data.records.location,
                        ...dataA00003.data.records.location]
                        console.log(data1Hr.data)
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
                        const currentMin = findTown.find(e => e.locationName === town).weatherElement[1]
                            .time[0].elementValue[0].value;
                        const currentMax = findTown.find(e => e.locationName === town).weatherElement[3]
                            .time[0].elementValue[0].value;

                        //  console.log(currentMin, currentMax)

                        //console.log(closestStation)
                        const temp = Math.round(closestStation.weatherElement[0].elementValue);
                        const weather = closestStation.weatherElement[1].elementValue;
                        const weatherObj = {
                            userPos: town, temp: `${temp}°`,
                            weather: weather, minT: `最低${currentMin}°`,
                            maxT: `最高${currentMax}°`
                        };
                        setWeatherData(weatherObj)

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
                        console.log(data10Days.data.forecast.forecastday)
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
    console.log(data10Days)
    return (
        <div className="ContainerV2">
            <MainInfo weatherData={weatherData} />
            <Row24Hr data1Hr={data1Hr} />
            <Data10Days data10Days={data10Days} />
        </div>
    )
}