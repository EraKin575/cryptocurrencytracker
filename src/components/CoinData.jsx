import React,{useEffect,useState} from 'react';




export default function CoinData({coin_name}){
    const [coinData,setCoinData] = useState([]);
    
    
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key':'a67bb7208amshc9f3583b2bf2877p159913jsn086a6691f0d5',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            },
        };
        fetch(`https://coinranking1.p.rapidapi.com/coin/${coin_name}`,options)
            .then(response => response.json())
            .then(response => setCoinData(response.data.coin))
            .catch(err => console.error(err));
    },[coin_name])

    return (
        <div>
            <h1>{coinData.name}</h1>
            
            
        </div>
    )



}