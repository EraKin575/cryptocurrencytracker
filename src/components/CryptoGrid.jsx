import { DataGrid } from "@mui/x-data-grid";
import { BrowserRouter,Router,Routes } from "react-router-dom";


export default function CryptoGrid({rows,columns,handleRowClick}) {
    return (
        <BrowserRouter>
        

        <div style={{ height: 400, width:'100%' }}>
        <DataGrid
            //style for the table
            style={{fontFamily:'Montserrat',
            fontWeight:'bold'}}
            onRowClick={handleRowClick} 
            rows={rows} 
            
            columns={columns} 
            pageSize={rows.length} 
            isRowSelectable={false}   
            isCellEditable={false}  
            disableSelectionOnClick={true}
            reset
            
            />   
            </div>    
            </BrowserRouter>
    )

}