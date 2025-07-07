import React from 'react'

function Sidebar(){
    const navItems = [
        {label:'Chart', target:'chart'},
        {label:'Positions', target:'positions'},
        {label:'Orders', target:'orders'},
    ];
  return (
    <aside className='sidebar'>
         <h3>Smart Stock Portfolio, Inc. </h3>
            <ul>
                {navItems.map((item, i)=>(
                    <li key={i}>
                        <a href={`#${item.target}`}>{item.label}</a>
                    </li>
                ))}
            </ul>
        
    </aside>
  )
}

export default Sidebar;
