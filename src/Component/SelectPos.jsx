import './SelectPos.css'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function SelectPos({ firstData, secondData, handleFirstValueChange, handleSecondValueChange
    , firstDecision }) {
    return (
        <div className='SelectPos'>
            <Form.Select onChange={(e) => handleFirstValueChange(e.target.value)}>
                <option disabled={firstDecision[0]}>選擇縣市</option>
                {firstData.map((item) => (
                    <option value={item}>
                        {item}
                    </option>
                ))}
            </Form.Select>

            <Form.Select onChange={(e) => handleSecondValueChange(e.target.value)} >
                <option disabled={firstDecision[1]}>選擇鄉鎮</option>
                {secondData.map((item) => (
                    <option value={item.locationName}>
                        {item.locationName}
                    </option>
                ))}
            </Form.Select>
        </div>
    )
}