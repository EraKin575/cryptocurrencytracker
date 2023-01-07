import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart=({referenceId,referenceCurrencyId})=>{
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
   
  //add graph for 1h,24h,1y,4y,

    return (

        //line chart
        <>
        </>

    )
}
export default LineChart;