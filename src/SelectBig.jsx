export default function SelectBig({ firstData, secondData, firstValueChange, secondValueChange }) {
    const firstHandleChange = (e) => {
        const eventObj = { value: e.target.value, index: e.target.selectedIndex }
        firstValueChange(eventObj);
    };
    const secondHandleChange = (e) => {
        const eventObj = { value: e.target.value, index: e.target.selectedIndex }
        secondValueChange(eventObj);
    };
    return (
        <div>
            <select onChange={firstHandleChange}>
                <option >選擇縣市</option>
                {firstData.map((item) => (
                    <option value={item.locationName}>
                        {item.locationName}
                    </option>
                ))}
            </select>
            <select onChange={secondHandleChange}>
                <option >選擇鄉鎮</option>
                {secondData.map((item) => (
                    <option value={item.locationName}>
                        {item.locationName}
                    </option>
                ))}
            </select>
        </div>
    )
}