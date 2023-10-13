import './Data10Days.css'
export default function Row24Header({ boxColor = '#4F5F75', showHeader = 'none' }) {
    return (
        <div style={{ backgroundColor: boxColor, display: showHeader }} className='SubTitle24'>
            <p className='SubTitleText24'>每小時天氣預報</p>
            <hr className='myhr24'></hr>
        </div>
    )
}