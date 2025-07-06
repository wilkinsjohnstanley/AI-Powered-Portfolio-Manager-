import React from 'react';

const position = [
    {syymbol:'BKSY', gain:51.36 },
    {symbol: 'AMD', gaini:32.85 },
    {symbol: 'TSM', gain:25.15 },
];

function Positions() {
    return (
        <div className='positions'>
            <h4>Positions</h4>
            <ul>
                {position.map((pos, i) => (
                    <li key={i}>
                        <span>{pos.symbol}</span>
                        <span className='gain'>▲{pos.gain}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Positions;