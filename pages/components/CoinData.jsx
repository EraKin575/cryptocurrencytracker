import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import LineChart from './LineChart';

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
    <LineChart referenceId={referenceId} referenceCurrencyId={referenceCurrencyId}/>
    <div className='flex flex-wrap justify-between'>
    <div className='lg:flex-col w-[100%] border-2  p-4 pl-4 mt-5 rounded-lg mr-12  md:w-[40%]'>

        <h1 className='text-left text-2xl mb-3 font-bold '>Value Statistics</h1>
        <p1 className= 'text-left mb-5'>{`An overview showing the statistics of ${coinData.name}, such as the base and quote currency, the rank, and trading volume.`}

</p1>
        {valueStatsData.map((keys)=>{
            return (
                <div className='flex flex-wrap gap-20 mb-8 border-b-2 justify-between'>
                    <p className='font-montserrat w-40 font-semibold  text-lg'>{toSentenceCase(keys)}</p>
                    <p className='font-montserrat font-bold text-lg'>{(keys!=="rank" && keys!=="numberOfMarkets" && keys!=="numberOfExchanges")?(`$${Number(coinData[keys]).toFixed(2)}`):(`${coinData[keys]}`)}</p>
                    
                </div>
            )
        })}
    </div>


    
    
    <div className='flex-col w-[50%] border-2 mr-min h-min p-4 pl-4 mt-5 rounded-lg'>
    <h1 className='text-left text-2xl mb-3 font-bold '>Supply Information</h1>
    <p1 className= 'text-left mb-3 '>{`View the total and circulating supply of ${coinData.name}, including details on how the supplies are calculated.`}</p1>
    {Object.keys(coinData.supply).map((keys)=>{
        return (
            <div className=' flex flex-wrap gap-20 mb-8 border-b-2 justify-between'>
                <p className='font-montserrat w-40 font-semibold  text-lg'>{toSentenceCase(keys)}</p>
                <p className='font-montserrat font-bold text-lg'>{coinData.supply[keys]}</p>
                
            </div>
        )
    })
    }

    </div>
    </div>
    </div>
    <div className='ml-9 mb-7'>
      <h1 className='font-bold text-xl w-max mb-3'>Related Links:</h1>
      <div className='flex flex-wrap gap-5'>
        {coinData.links.map((link)=>{
          return(
            <div className='flex flex-col gap-2 bg-gray-300 px-5 rounded-lg'>
             
              <a href={link.url} target="_blank" rel="noreferrer">{link.type}</a>
            </div>
          )
        }
        )}



    </div>
    </div>
    <div className='ml-9'>
      <h1 className='text-left text-2xl font-bold mb-3'>{`About ${coinData.name}`}</h1>
      {
        <div className='text-left w-[90%]'  dangerouslySetInnerHTML={{__html:coinData.description}} />
}

      

    </div>
    
    




  
   
  </>
  ;
}