// components/Sidebar.js
import React from 'react';

const stocks = [
    {symbol:'UBER', change: -2.54},
    {symbol:'HOOD', change: -2.77},
    {symbol:'GRRR', change: -2.82},
    {symbol:'SMCI', change: -2.97},
    {symbol: 'AMD', change: -3.88},
    {symbol: 'TSLA', change: -4.57},
];

function Sidebar(){
    return (
        <aside className='sidebar'>
            <h3>AI & LLM</h3>
            <ul>
                {stocks.map((stock, i)=> (
                    <li key={i} className={stock.change<0?'down' : 'up'}>
                        <span>{stock.symbol}</span>
                        <span>{stock.change}%</span>
            
                    </li>
                ))}
            </ul>
        </aside>
    );
}
export default Sidebar;