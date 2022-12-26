
import React,{ useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import {Box,Select,MenuItem,Input} from '@mui/material';
import CreateIconWName from './CreateIconWName';

       

import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import CoinData from './CoinData';
import clsx from 'clsx';




export default function DataTable() {

  
    
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [api, setApi] = useState('https://coinranking1.p.rapidapi.com/coins?');

    const [coin_name,setCoinName]=useState('')
    const handleRowClick = (e) => {
        setCoinName(e.row.referenceId)      
    }



    const handleChange = (e) => {
        setSearchItem(e.target.value);
        
       
        
    }
    const availableTimePeriods = ['1h','3h','12h','24h','7d','30d','3m','1y','3y','5y'];
    const [timePeriod,setTimePeriod]=useState('24h');
    const handleTime=(e)=>{
        setTimePeriod(e.target.value)
       
    }
    
    
        
    
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
                <CreateIconWName name={params.row.name} icon={params.row.iconUrl} symbol={params.row.symbol}/>
            )
          }
         },
        {field : 'price', 
        headerName:<p className='font-montserrat font-bold'>{'Price'}</p>, 
        width: 200
    },
        {field : 'change', 
        headerName: <p className='font-montserrat font-bold'>{'Change'}</p>, 
        width: 200,
        cellClassName:(params)=>{
        return clsx('super-app', {
            
            positive: params.value > 0,
            negative: params.value < 0,
        }
        )

        }

    
},
        {field : 'marketCap',
         headerName: <p className='font-montserrat font-bold'>{'Market Cap'}</p>, 
         width: 200
        },
        {field : 'volume', 
        headerName:<p className='font-montserrat font-bold'>{'Volume'}</p>,
         width: 200
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
                    color:'grey'

                }}  value={item}>{item}</MenuItem>
            ))}
        </Select>
            

        </Box>
        <Input
        sx={{
            fontFamily:'Montserrat',
            fontWeight:'bold',
            color:'grey'
        }}
        placeholder='Search'
        value={searchItem}
        onChange={handleChange}
        />
        </div>

        <div 
        
        style={{ height: 400, width: '100%' }}>
            
            
            <DataGrid
            //style for the table
            style={{fontFamily:'Montserrat',
            fontWeight:'bold'}}
            sx={{
                '& .super-app.negative': {
                    color: 'red',
                    fontWeight: 'bold',
                },
                '& .super-app.positive': {
                    color: 'green',
                    fontWeight: 'bold',
                },

            }}
          
            

            onRowClick={handleRowClick} 
            rows={rows} 
            columns={columns} 
            pageSize={10} 
            isRowSelectable={false}   
            isCellEditable={false}  
            disableSelectionOnClick={true}
            
            />       
        </div>
        <CoinData coin_name={coin_name} />
        </div>
    );



}
