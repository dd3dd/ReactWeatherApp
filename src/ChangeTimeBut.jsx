import './ChangeTimeBut.css'
import Button from 'react-bootstrap/Button';
export default function ChangeTimeBut({ butTimeState, weatherData }) {
    return (
        <div className="ChangeTimeBut">
            {weatherData.length !== 0 && <Button className='LeftBut' variant="light" onClick={() => { butTimeState(-1) }}>{'<'}</Button>}
            {weatherData.length !== 0 && <Button className='RightBut' variant="light" onClick={() => { butTimeState(1) }}>{'>'}</Button>}
        </div>
    )
}
