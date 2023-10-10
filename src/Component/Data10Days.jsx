import './Data10Days.css'
import Data10DaysItem from "./Data10DaysItem";
export default function Data10Days({ data10Days, boxColor, day10BoxPos = {
    position: 'absolute', top: '380px'
}, day10BoxHeight = 550 }) {
    if (!data10Days || data10Days.length === 0) {
        return null; // 或者您可以顯示一個載入中的狀態或錯誤消息
    }
    return (
        <div className="Data10Days" style={{
            backgroundColor: boxColor, position:
                day10BoxPos.position, top: day10BoxPos.top, height: day10BoxHeight
        }}>
            <div className='SubTitle'>
                <p className='SubTitleText'>10天天氣預報</p>
                <hr className='myhr'></hr>
            </div>
            {data10Days.map(obj => {
                return <Data10DaysItem minT={obj.minT} maxT={obj.maxT} pop={obj.pop}
                    icon={obj.icon} day={obj.day} />
            })}
        </div>
    )
}