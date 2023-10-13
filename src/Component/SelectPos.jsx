import './SelectPos.css'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function SelectPos() {
    return (
        <div className='SelectPos'>
            <Form.Select  >
                <option >選擇縣市</option>
                <option >選擇縣市</option>
                <option >選擇縣市</option>
                <option >選擇縣市</option>
                {/* {firstData.map((item) => (
                    <option value={item}>
                        {item}
                    </option>
                ))} */}
            </Form.Select>

            <Form.Select  >
                <option >選擇鄉鎮</option>
                {/* {secondData.map((item) => (
                    <option value={item.locationName}>
                        {item.locationName}
                    </option>
                ))} */}
            </Form.Select>
        </div>
    )
}