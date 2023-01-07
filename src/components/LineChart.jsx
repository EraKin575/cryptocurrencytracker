import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart=({referenceId,referenceCurrencyId})=>{
    const [selectedNav,setselectedNav]=useState();
    const [historicalData, setHistoricalData] = useState('');
    useEffect(()=>{
        async function fetchHistoricalData(){
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'a67bb7208amshc9f3583b2bf2877p159913jsn086a6691f0d5',
                    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                }
            };
            
            await fetch('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?timePeriod=1y', options)
                .then(response => response.json())
               
                .then( response => setHistoricalData(response.data.history))
                .catch(err => console.error(err));
    }
    fetchHistoricalData();
    },[referenceId])
    console.log(historicalData)
    const timePeriods=['1H','3H','24H','7D','30D','3M','1Y','3Y','5Y' ]
   
  //add graph for 1h,24h,1y,4y,

    return (

       
        <>
        <div className="flex flex gap-2 justify-center">
            <p1 className='pt-1 font-bold'>Time Period</p1>
            {timePeriods.map((timePeriod)=>{
                return(
                    <button onClick={()=>setselectedNav(timePeriod)} className={`font-montserrat text-lg cursor-pointer w-12 font-bold hover:bg-gray-300 rounded-lg hover:text-[#0060ff]  ${selectedNav===timePeriod && 'bg-gray-300 text-[#0060ff]  rounded-lg'}`}>{timePeriod}</button>
                )
            })}

            </div>  





        </>

    )
}
export default LineChart;