import React from 'react';

export default function CreateIconWName({ name, icon, symbol }) {
    let iconType;
    if(icon.includes('.svg')){
        iconType='image/svg+xml'
    }
    else if(icon.includes('.png')){
        iconType='image/png'
    }
  return (
    <div className={`font-montserrat flex gap-3 overflow-hidden`}>
        <img src={icon
        } alt={name} className="w-6 h-6 mt-2" type={iconType}/>
     
      <div className="">
        <p>{name}</p>
        <p className="font-medium text-left text-xs">{symbol}</p>
      </div>
    </div>
  );
    
}