import React from 'react';
export default function CreateIconWName({name,icon,symbol}) {

    return (
        <div className='font-[montserrat] flex'>
                    <object data={icon} width="40" height="40" title={name} aria-label="this object has text" /> 
        <div className=''>

            

            <p>{name}</p>
            <p className='font-semibold'>{symbol}</p> 


        </div>
        
        </div>
    )
}