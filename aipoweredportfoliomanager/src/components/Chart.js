import React from 'react';
function Chart(){
    return(
        <div className='chart'>
            <div className='chart-header'>
                <input type='text' placeholder='Search Ticker...' defaultValue="SOXS"></input>
                <span>$8.05 ▲1.96%</span>
            </div>
            <div className='chartt-body'>
                <div className='chart-placeholder'>📊 Chart goes here</div>
            </div>
        </div>
    );
}
export default Chart;