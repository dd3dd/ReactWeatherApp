import axios from "axios";
import { useState, useEffect } from "react";
export default function ContainerV2() {
    const [observatory, setObservatory] = useState([]);
    const myAuthorization = 'CWB-75625081-4569-4414-93FD-FC371A92BAA4';
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
                        const town = address.town || address.suburb || address.village || address.city;
                        console.log(town)
                        const dataA00001 = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=
${myAuthorization}&elementName=Weather&parameterName=CITY`)

                        const dataA00003 = await axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=
${myAuthorization}&elementName=Weather&parameterName=CITY`)
                        //console.log(dataA00001.data, dataA00003.data)
                        const combineData = [...dataA00001.data.records.location,
                        ...dataA00003.data.records.location]
                        console.log(combineData)
                        setObservatory(combineData);

                        let closestStation = null;
                        let closestDistance = Infinity;
                        combineData.forEach(obj => {
                            const latitudeDiff = Math.abs(latitude - obj.lat);
                            const longitudeDiff = Math.abs(longitude - obj.lon);
                            const distance = Math.sqrt(latitudeDiff ** 2 + longitudeDiff ** 2);

                            if (distance < closestDistance) {
                                closestStation = obj.stationId;
                                closestDistance = distance;
                            }
                        })

                        console.log(closestStation)

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



    }, []);
    return (
        <div>

        </div>
    )
}