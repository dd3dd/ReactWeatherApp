
export default function ChangeTimeBut({ butTimeState }) {
    return (
        <div>
            <button onClick={() => { butTimeState(-1) }}>{'<'}</button>
            <button onClick={() => { butTimeState(1) }}>{'>'}</button>
        </div>
    )
}
