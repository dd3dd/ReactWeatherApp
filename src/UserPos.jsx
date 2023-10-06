import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPos() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [township, setTownship] = useState('');

    useEffect(() => {
        // 獲取用戶的經緯度坐標
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

                // 使用Nominatim進行反向地理編碼
                axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`)
                    .then((response) => {
                        const address = response.data.address;
                        const town = address.town || address.suburb || address.village || address.city;

                        setTownship(town);
                    })
                    .catch((error) => {
                        console.error("Error fetching location information:", error);
                    });
            });
        } else {
            console.error("Geolocation is not available in this browser.");
        }
    }, []);
    return (
        <div>
            <p>經度：{latitude}</p>
            <p>緯度：{longitude}</p>
            <p>鄉鎮：{township}</p>
        </div>
    )
}