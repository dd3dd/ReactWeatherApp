import './Row24Hr.css'
export default function Item1Hr({ time, pop, image, temp }) {
    return (
        <div className="Item1Hr">
            <p className='Time'>{time}</p>
            {pop > 0 ? <img style={{ marginTop: '-15px' }} className='Img' src={image} alt="" /> :
                <img style={{ marginTop: '-5px' }} className='Img' src={image} alt="" />}
            {pop > 0 ? <p className='Pop'>{pop}%</p> :
                <p className='Pop'></p>
            }
            {pop > 0 ? <p style={{ marginTop: '-15px' }} className='TempHr'>{Math.round(temp)}°</p> :
                <p style={{ marginTop: '-7px' }} className='TempHr'>{Math.round(temp)}°</p>}
        </div>
    )
}