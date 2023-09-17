import axios from 'axios';
import { useState, useEffect } from 'react';
export default function Select({ data, onValueChange, onIndexChange }) {

    const handleChange = (e) => {
        onValueChange(e.target.value);
        onIndexChange(e.target.selectedIndex);
    };



    return (

        <select onChange={handleChange}>
            <option >選擇鄉鎮</option>
            {data.map((item) => (
                <option>
                    {item.locationName}
                </option>
            ))}
        </select>
    )

}