import './SelectBig.css'

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBig({ firstData, secondData, firstValueChange, secondValueChange, firstDecision }) {
    const firstHandleChange = (e) => {
        // const eventObj = { value: e.target.value, index: e.target.selectedIndex }
        // console.log(e.target.value)
        firstValueChange(e.target.value);
    };
    const secondHandleChange = (e) => {
        // const eventObj = { value: e.target.value, index: e.target.selectedIndex }
        // console.log(e.target.value, e.target.selectedIndex)
        secondValueChange(e.target.value);
    };

    return (
        <div className='SelectBig'>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth >
                    <InputLabel sx={{ fontWeight: '700' }}>選擇縣市</InputLabel>
                    <Select sx={{

                        fontWeight: '700'

                    }}

                        label="縣市"
                        onChange={firstHandleChange}
                    >
                        <MenuItem disabled={firstDecision[0]}>選擇縣市</MenuItem>
                        {firstData.map((item) => (
                            <MenuItem value={item.locationName}>
                                {item.locationName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Box>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth  >
                    <InputLabel sx={{ fontWeight: '700' }}>選擇鄉鎮</InputLabel>
                    <Select sx={{
                        fontWeight: '700'

                    }}

                        label="鄉鎮"
                        onChange={secondHandleChange}
                    >
                        <MenuItem disabled={firstDecision[1]}>選擇鄉鎮</MenuItem>
                        {secondData.map((item) => (
                            <MenuItem value={item.locationName}>
                                {item.locationName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {/* <select onChange={secondHandleChange}>
                <option disabled={firstDecision[1]}>選擇鄉鎮</option>
                {secondData.map((item) => (
                    <option value={item.locationName}>
                        {item.locationName}
                    </option>
                ))}
            </select> */}


        </div >
    )
}