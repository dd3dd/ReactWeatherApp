import Item1Hr from './Item1Hr'
import './Row24Hr.css'
export default function Row24Hr({ data1Hr }) {
    //   console.log(data1Hr)
    if (!data1Hr || data1Hr.length === 0) {
        return null; // 或者您可以顯示一個載入中的狀態或錯誤消息
    }
    return (
        <div className="Row24Hr">

            {data1Hr.map(obj => {
                return <Item1Hr time={obj.time} pop={obj.pop} image={obj.image} temp={obj.temp} />
            })}
        </div>
    )
}