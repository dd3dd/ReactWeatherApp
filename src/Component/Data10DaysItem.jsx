import './Data10Days.css'
export default function Data10DaysItem({ minT, maxT, pop, icon, day }) {
    return (
        <div className="Data10DaysItem">
            <p className='Day'>{day}</p>
            <span className='IconAndPop'>
                {pop === 0 ? <img className='Img10Days' style={{ top: '13px' }} src={icon} alt="" /> :
                    <img className='Img10Days' src={icon} alt="" />}
                {pop !== 0 && <p className='pop10Days'>{pop}%</p>}
            </span>
            <p className='minT10Days'>{Math.round(minT)}°</p>
            <p className='Wave'>~</p>
            <p className='maxT10Days'>{Math.round(maxT)}°</p>
        </div>
    )
}