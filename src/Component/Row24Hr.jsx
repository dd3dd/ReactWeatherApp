import Item1Hr from './Item1Hr'
import './Row24Hr.css'
export default function Row24Hr({ data1Hr, boxColor }) {
    //   console.log(data1Hr)
    if (!data1Hr || data1Hr.length === 0) {
        return null;
    }
    return (
        <div className="Row24Hr" style={{
            backgroundColor: boxColor,
        }}>
            {data1Hr.map(obj => {
                return <Item1Hr time={obj.time} pop={obj.pop} image={obj.image} temp={obj.temp} />
            })}
        </div>

    )
}