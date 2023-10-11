import Item1Hr from './Item1Hr'
import './Row24Hr.css'
import './Data10Days.css'
export default function Row24Hr({ data1Hr, boxColor, dayBoxTop = 1
}) {
    //   console.log(data1Hr)
    if (!data1Hr || data1Hr.length === 0) {
        return null; // 或者您可以顯示一個載入中的狀態或錯誤消息
    }
    return (
        <div className='aa'>
            <div style={{ backgroundColor: boxColor, opacity: dayBoxTop }} className='SubTitle24'>
                <p className='SubTitleText24'>每小時天氣預報</p>
                <hr className='myhr24'></hr>
            </div>
            <div className="Row24Hr" style={{
                backgroundColor: boxColor,
                // top: dayBoxTop.top,
                // height: dayBoxTop.height
            }}>


                {data1Hr.map(obj => {
                    return <Item1Hr time={obj.time} pop={obj.pop} image={obj.image} temp={obj.temp} />
                })}
            </div>
        </div>
    )
}