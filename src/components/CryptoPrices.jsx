


import React,{ useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Routes

 } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import CoinData from './CoinData';
export default function DataTable() {
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [api, setApi] = useState('https://coinranking1.p.rapidapi.com/coins?');

    const [coin_name,setCoinName]=useState('')
    const handleRowClick = (e) => {
        setCoinName(e.row.referenceId)
        return (
            <Router>
                <Routes>
                    <Route  exact path='/:coin_name' element={<CoinData  coin_name={coin_name}/>} />
                
                </Routes>
            </Router>
            
        )
       
    }



    const handleChange = (e) => {
        setSearchItem(e.target.value);
        
        
    }
    
        useEffect(()=>{
            setApi(`https://coinranking1.p.rapidapi.com/coins?search=${searchItem}`)
           
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

    ,[searchItem,api])


    const columns = [
        {field:'rank' , headerName: 'Rank', width: 70},
        
        { field: 'name', headerName: 'Name', width: 200 },
        {field : 'price', headerName: 'Price', width: 200},
        {field : 'marketCap', headerName: 'Market Cap', width: 200},
        {field : 'volume', headerName: 'Volume', width: 200},
        {field : 'change', headerName: 'Change', width: 200},
    ];
    
    const rows=data.map((item,index)=>({
        id: index+1,
        referenceId: item.uuid,
        rank: item.rank,
        name: item.name,
        price: item.price,
        marketCap: item.marketCap,
        volume: item.volume,
        change: item.change

    }))
    return (
        <>
        <TextField 
        id="outlined-basic" 
        label="Search" 
        variant="outlined" 
        onChange={handleChange} 
        value={searchItem} 
        />
        <div 
        style={{ height: 400, width: '100%' }}>
            <DataGrid
            onRowClick={handleRowClick} 
            rows={rows} 
            columns={columns} 
            pageSize={5} 
            isRowSelectable={false}
            
            />
            
        </div>
        <CoinData coin_name={coin_name} />
        </>
    );



}
