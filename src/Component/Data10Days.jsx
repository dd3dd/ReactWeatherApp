import './Data10Days.css'
import Data10DaysItem from "./Data10DaysItem";
export default function Data10Days({ data10Days, boxColor }) {
    if (!data10Days || data10Days.length === 0) {
        return null;
    }
    return (

        <div className='Data10DaysContainer'>
            <div style={{ backgroundColor: boxColor }} className='SubTitle'>
                <p className='SubTitleText'>10天天氣預報</p>
                <hr className='myhr'></hr>
            </div>
            <div className="Data10Days" style={{
                backgroundColor: boxColor,
            }}>
                {data10Days.map(obj => {
                    return <Data10DaysItem minT={obj.minT} maxT={obj.maxT} pop={obj.pop}
                        icon={obj.icon} day={obj.day} />
                })}
            </div>
        </div>

    )
}