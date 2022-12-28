
import React,{ useEffect,useState } from 'react';
import {Box,
    Select,
    MenuItem,
    Input,
    ButtonGroup,
    Button,
    InputAdornment

} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateIconWName from './CreateIconWName';
import CryptoGrid from './CryptoGrid';

import CoinData from './CoinData';





export default function DataTable() {

  
    
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [api, setApi] = useState('https://coinranking1.p.rapidapi.com/coins?');
    const [timePeriod, setTimePeriod]=useState('24h');
    const [categoryTag, setCategoryTag]=useState(null);
    const [coin_name, setCoinName]=useState('')

    let iconStyle;
    const handleRowClick = (e) => {
        setCoinName(e.row.referenceId)      
    }
    const handleChange = (e) => {
        iconStyle={
            color:'blue'
        }

        setSearchItem(e.target.value);     
    }
    const handleCategory=(index)=>{
        setCategoryTag(index)
    }
    const handleTime=(e)=>{
        setTimePeriod(e.target.value)
       
    }
    

    const availableTimePeriods = ['1h','3h','12h','24h','7d','30d','3m','1y','3y','5y'];
    const categoryTags=['meme','defi','stablecoin' ,'nft', 'dex', 'exchange' ,'staking' ,
    'dao', 'metaverse', 'gaming' ,'wrapped' ,'layer-1', 'layer-2']
    
  
   


    

   
    
        
    useEffect(()=>{
        let new_api = api;
        new_api += `&tags%5B0%5D=${categoryTags[categoryTag]}`;
        setApi(new_api);
    },[categoryTag,api])

        useEffect(()=>{
          
            
            setApi(`https://coinranking1.p.rapidapi.com/coins?search=${searchItem}&timePeriod=${timePeriod}`)


          
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'a67bb7208amshc9f3583b2bf2877p159913jsn086a6691f0d5',
                    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                }
            };
            
    
            
            fetch(api, options)
                .then(response => response.json())
                .then(response => setData(response.data.coins))
                .catch(err => console.error(err));
            
            
}


    ,[searchItem,api,timePeriod])
   
   


    const columns = [
        {field:'rank' ,
         headerName: <p className='font-montserrat font-bold'>{'Rank'}</p>, 
         
         width: 70},
        
        { field: 'name',
         headerName:<p className='font-montserrat font-bold'>{'Name'}</p>,
          width: 200,
          renderCell:(params)=>{
            return (
                <CreateIconWName name={params.row.name} icon={params.row.icon} symbol={params.row.symbol}/>
            )
          }
         },
        {field : 'price', 
        headerName:<p className='font-montserrat font-bold'>{'Price'}</p>, 
        width: 200,
        renderCell:(params)=>{
            const price = params.row.price;
            return (
                (price)>1?<p>{`$${Number(price).toFixed(2)}`}</p>:<p>{`$${Number(price).toFixed(8)}`}</p>
            )
            
        }
    },
        {field : 'change', 
        headerName: <p className='font-montserrat font-bold'>{'Change'}</p>, 
        width: 200,
        renderCell:(params)=>{
            if(params.row.value===null){
                return (
                    <p>{`N/A`}</p>
                )
            }
            
            
            return (        
               <p 
               className={params.row.change>0?'text-green-700':'text-red-600'}>
                {`${params.row.change}%`}
                </p>
            )
        }
        

    
},
        {field : 'marketCap',
         headerName: <p className='font-montserrat font-bold'>{'Market Cap'}</p>, 
         width: 200,
         renderCell:(params)=>{
            const volume = params.row.marketCap;
            const volumeInBillion = volume/1000000000;
            const volumeInMillion = volume/1000000;
            const volumeInThousand = volume/1000;

            
            if(volumeInBillion>1){
            return (
                <p>{`$${volumeInBillion.toFixed(2)}B`}</p>

            )
            }
            else if(volumeInMillion>1){
                return (
                    <p>{`$${volumeInMillion.toFixed(2)}M`}</p>
    
                )
            }
            else if(volumeInThousand>1){
                return (
                    <p>{`$${volumeInThousand.toFixed(2)}K`}</p>
    
                )
            }
            else{
                return (
                    <p>{`$${volume}`}</p>
    
                )
            }   

         }
        },
        {field : 'volume', 
        headerName:<p className='font-montserrat font-bold'>{'Volume'}</p>,
         width: 200,
         renderCell:(params)=>{
            const volume = params.row.volume;
            const volumeInBillion = volume/1000000000;
            const volumeInMillion = volume/1000000;
            const volumeInThousand = volume/1000;

            
            if(volumeInBillion>1){
            return (
                <p>{`$${volumeInBillion.toFixed(2)}B`}</p>

            )
            }
            else if(volumeInMillion>1){
                return (
                    <p>{`$${volumeInMillion.toFixed(2)}M`}</p>
    
                )
            }
            else if(volumeInThousand>1){
                return (
                    <p>{`$${volumeInThousand.toFixed(2)}K`}</p>
    
                )
            }
            else{
                return (
                    <p>{`$${volume}`}</p>
    
                )
            }   

         }
        },
    
    

        
    ];
  
    const rows=data.map((item,index)=>({
        id: index+1,
        referenceId: item.uuid,
        rank: item.rank,
        name:(item.name),
        price: item.price,
        icon: item.iconUrl,
        symbol: item.symbol,
        marketCap: item.marketCap,
        volume: item['24hVolume'],
        change: item.change,

    }))
    return (
        <div className='font-montserrat'>
    
        <h1 className='font-bold text-3xl'>Cryptocurrency Price List</h1>
        <div className='right-1'>
        <Box sx={{
            fontFamily:'Montserrat',
            width: 100 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timePeriod}
          sx={{
            fontFamily:'Montserrat',
            width: 80,
            height: 40,
            fontWeight:'bold',
            color:'grey'
          }}
          
          
        
          onChange={handleTime}
        >
            {availableTimePeriods.map((item,index)=>(
                <MenuItem sx={{
                    fontFamily:'Montserrat',
                    fontWeight:'bold',
                    color:'grey',
                  

                }}  value={item}>{item}</MenuItem>
            ))}
        </Select>
            

        </Box>

        
       
        
        <Input
        sx={{
            fontFamily:'Montserrat',
            fontWeight:'bold',
            color:'grey',
            marginBottom:2
        }}
        startAdornment = {
            <InputAdornment position="start">
              <SearchIcon sx={iconStyle} />
            </InputAdornment>
    }
       
        placeholder='Search'
        value={searchItem}
        onChange={handleChange}
        />
        <br></br>

        <ButtonGroup variant="text" aria-label="text button group">
        
        {categoryTags.map((item,index)=>(
            <Button sx={{

                fontFamily:'Montserrat',
                fontWeight:'bold',
                color:'grey',
                fontSize:10,
                ":hover":{
                    color:'black',
                },
                ":checked":{
                    color:'black',
                    backgroundColor:'grey'
                }
                
            }}

            onClick={     
                ()=>{handleCategory(index)}}
            active={categoryTag===index}  
            >
                {item}
            </Button>
        ))}
        </ButtonGroup>
        
        </div>
        <CryptoGrid
         rows={rows} 
         columns={columns} 
         handleRowClick={handleRowClick} 
         />

        

        <CoinData
         coin_name={coin_name} 
         />
        </div>
    );



}
