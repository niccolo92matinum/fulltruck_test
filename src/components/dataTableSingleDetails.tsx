import { DataGrid, GridRowParams,GridEventListener,GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CustommizedTableProps } from '../typescript/interface';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomizedTables: React.FC<CustommizedTableProps> = ({elements , ownerTable}) => {


  const navigate = useNavigate()

  const createArrayObj = Object.keys(elements).map((el)=>{

    return {id:el}
  })
    
  const [infoPageListaDatiFat , setInfoPageListaDatiFat] = useState({ page: 0, pageSize: 100 });

  const handleEvent: GridEventListener<'rowClick'> = (
    params:GridRowParams
  ) => {
    console.log(params.row)
  };

 
 

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width:400 , headerClassName: 'super-app-theme--header', headerAlign: 'left',  renderCell: (param:any) => <p className="mese_alidita text-primary fw-bolder">{param.row.id}</p>},
    {field: 'action', headerName: '',sortable: false,width:150,headerAlign: 'left',disableColumnMenu :true,renderCell: ((param:any) => ( <Button>Details <ArrowForwardIcon sx={{ color: '#1976D2', cursor: 'pointer',marginLeft:'10px' }} onClick={() => navigate(`/details/${param.row.id}/${ownerTable}`)} /></Button>)),}
  ];

 
  return (
    <div>
      <DataGrid sx={{
        height:'400px',
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: 'white',
        }
      }}
      onPaginationModelChange={(e)=>{
        setInfoPageListaDatiFat(e)}}
      paginationModel={infoPageListaDatiFat}
      rows={createArrayObj} 
      columns={columns}
      getRowId={(row) => row.id}
      onRowClick={handleEvent}
      />
    </div>
   
  );
}

export default CustomizedTables


