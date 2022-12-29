import React,{useState,useEffect} from 'react';


export default function CoinData({referenceId}){

    const [coinData,setcoinData]=useState({})
   

    useEffect(()=>{
    
        
              
             fetch(`https://api.coinranking.com/v2/coin/${referenceId}`)
                .then(responseJson=>responseJson.json())
                .then(responseJson=>setcoinData(responseJson.data.coin))
                .then(err=>console.log(err))
          
            
            

        

    },
    [referenceId])
    return(
        <div>
            <h1>{coinData.name}</h1>
          
        </div>
    )
    
    
}

