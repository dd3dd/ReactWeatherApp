import './Row24Hr.css'
export default function Item1Hr({ time, pop, image }) {
    return (
        <div className="Item1Hr">
            <p className='Time'>{time}</p>
            <img className='Img' src={image} alt="" />
            <p className='Pop'>{pop}</p>

        </div>
    )
}