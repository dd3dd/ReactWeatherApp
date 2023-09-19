export default function MyH1({ selectedValue }) {


    return (
        <div>
            {selectedValue !== '' ? <h1 style={{ color: 'black' }}>{selectedValue}</h1> : <h1 style={{ color: 'black' }}>天氣預報系統</h1>}
        </div>

    )
}