import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
async function labelize(key){
    for(let i=0;i<key.length;i++){
        if(key[i]>='A' && key[i]<='Z'){
            key.splice(i,0,' ')
            i++
        }
           
    }
}

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a67bb7208amshc9f3583b2bf2877p159913jsn086a6691f0d5',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

export default function CoinData({ referenceId, referenceCurrencyId }) {
  const [coinData, setCoinData] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
    if(referenceId!==undefined){
      try {
        const response = await fetch(
           
          `https://coinranking1.p.rapidapi.com/coin/${referenceId}`,
          API_OPTIONS
        );
        const { data: { coin } } = await response.json();
        setCoinData(coin);
      } catch (err) {
        setError(err);
      }
    }
    
    };


    fetchCoinData();
  }, [referenceId, referenceCurrencyId]);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (!coinData) {
    return <p>Loading...</p>;
  }
  const valueStatsData=['rank','24hVolume','price','btcPrice','marketCap','numberOfExchanges','numberOfMarkets',"fullyDilutedMarketCap"]
  const toSentenceCase = camelCase => {
    if (camelCase) {
        const result = camelCase.replace(/([A-Z])/g, ' $1');
        return result[0].toUpperCase() + result.substring(1).toLowerCase();
    }
    return '';
 };
 

  return<> 
  <div className='flex  gap-3 ml-10 font-montserrat'>
    <img src={coinData.iconUrl} alt={coinData.name} width={40} height={40} className="" />
    <p className='font-montserrat font-bold mt-2 text-2xl'>{coinData.name}</p>
    <p className='mt-2 h-min border-2 p-1 rounded-lg '>{`#${coinData.rank}`}</p>
    <p className='mt-2.5 ml-12 text-2xl font-bold'>{`$${Number(coinData.price).toFixed(4)}`}</p>
   </div>
   <div className='flex-col ml-10 mt-5'>
    <div className='flex-col gap-3'>
    </div>
    <div className='b-flex-col w-[50%] border-2  p-4 pl-4 mt-5 rounded-lg'>
        <h1 className='text-left text-2xl font-bold '>Value Statistics</h1>
        <p1 className= 'text-left '>{`An overview showing the statistics of ${coinData.name}, such as the base and quote currency, the rank, and trading volume.`}

</p1>
        {valueStatsData.map((keys)=>{
            return (
                <div className=' flex gap-20 mb-8 border-b-2 justify-between'>
                    <p className='font-montserrat w-40 font-semibold  text-lg'>{toSentenceCase(keys)}</p>
                    <p className='font-montserrat font-bold text-lg'>{(keys!=="rank" && keys!=="numberOfMarkets" && keys!=="numberOfExchanges")?(`$${Number(coinData[keys]).toFixed(2)}`):(`${coinData[keys]}`)}</p>
                    
                </div>
            )
        })}
    </div>


    
    </div>
    




  
   
  </>
  ;
}
