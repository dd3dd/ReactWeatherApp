import './SelectBig.css'
import './Selectwrapper.css'
import Form from 'react-bootstrap/Form';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className='Selectwrapper'>
                <Form.Select onChange={firstHandleChange} aria-label="aa">
                    <option disabled={firstDecision[0]}>選擇縣市</option>
                    {firstData.map((item) => (
                        <option value={item.locationName}>
                            {item.locationName}
                        </option>
                    ))}
                </Form.Select>

                <Form.Select onChange={secondHandleChange} aria-label="bb">
                    <option disabled={firstDecision[1]}>選擇鄉鎮</option>
                    {secondData.map((item) => (
                        <option value={item.locationName}>
                            {item.locationName}
                        </option>
                    ))}
                </Form.Select>
            </div>



        </div >
    )
}