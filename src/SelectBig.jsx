import './SelectBig.css'
import './Selectwrapper.css'
import Form from 'react-bootstrap/Form';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SelectBig({ firstData, secondData, firstValueChange, secondValueChange, firstDecision }) {
    const firstHandleChange = (e) => {
        firstValueChange(e.target.value);
    };
    const secondHandleChange = (e) => {

        secondValueChange(e.target.value);
    };

    return (
        <div className='SelectBig'>
            <div className='Selectwrapper'>
                <Form.Select onChange={firstHandleChange} >
                    <option disabled={firstDecision[0]}>選擇縣市</option>
                    {firstData.map((item) => (
                        <option value={item}>
                            {item}
                        </option>
                    ))}
                </Form.Select>

                <Form.Select onChange={secondHandleChange} >
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