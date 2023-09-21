import './MyH1.css'
export default function MyH1({ selectedValue }) {
    return (
        <div className='MyH1'>
            {selectedValue !== '' ? <h1 >{selectedValue}</h1> : <h1 >全臺天氣預報</h1>}
        </div>
    )
}