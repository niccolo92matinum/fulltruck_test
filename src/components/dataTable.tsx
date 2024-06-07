import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import { Card, TablePagination } from '@mui/material';
import { DataTableProps } from '../typescript/interface';




const BasicTable: React.FC<DataTableProps> = ({data, showedData, setShowedData, headerNames}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
    
    
    
  useEffect(()=>{
    setCount(data.length);
    setPage(0);
    setRowsPerPage(10);
    setShowedData(data.slice(0, 10));
    // setOpen(false);
  },[data]);
    
  useEffect(()=>{
    let from = 0;
    if(page === 0){
      from = 0;
    }else{
      from = page * rowsPerPage;
    }
    setShowedData(data.slice(from, rowsPerPage + from));
  },[page,rowsPerPage]);
  return (
    <>
      <div style={{overflowX:'auto'}}>
        <Card   >
        
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead sx={{backgroundColor:'#f2f2f2'}}>
                <TableRow>
                  {headerNames.map((el)=>{
                    return(
                      <TableCell align="center" key={Math.random()} sx={{color:'black', fontWeight:'bold'}}>{el}</TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              {showedData.length === 0 ? <TableBody  style={{height: '50px'}}>

              </TableBody> :
                showedData.map((row) => {
            
                  return(
                    <Row key={Math.random()} row={row}></Row>
                  ); })}
            </Table>
          </TableContainer>
        </Card>
      </div>
      <div className="pt-3"> 
        <TablePaginationDemo 
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          rowsPerPage={rowsPerPage}
          count={count}
        ></TablePaginationDemo>
      </div>  
    </>
  );
};
export default BasicTable;
    
    
const Row = (row:any) => {
  const [open, setOpen] = useState(false);
 
  return(
        
    <TableBody sx={{minHeight:"100px"}}>
      <TableRow  sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            sx={{color:'#227AFC'}}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {row.row.active_carrier}
        </TableCell>
        <TableCell align="center">{row.row.active_client}</TableCell>
        <TableCell align="center">{new Date(row.row.aggregate_date).toLocaleString().split(',')[0]}</TableCell>
        <TableCell align="center">{row.row.assigned_count}</TableCell>
        <TableCell align="center">{row.row.new_carriers}</TableCell>
        <TableCell align="center">{row.row.new_clients}</TableCell>
        <TableCell align="center">{row.row.order_count}</TableCell>
        <TableCell align="center">{row.row.order_per_period}</TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 , backgroundColor:'#F8F8F8', padding:'10px'}}>
              <Typography sx={{marginLeft:"6px", fontWeight:'bold'}} variant="h6" gutterBottom component="div">
                Focus
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead> 
                  <TableRow sx={{borderColor:"white",borderWidth:"thick"}}>
                    <TableCell align="center" sx={{ marginLeft:"16px"}} >Absolute Margin</TableCell>
                    <TableCell align="center" sx={{ marginLeft:"16px"}}>Absolute Margin Order</TableCell>
                    <TableCell align="center" sx={{ marginLeft:"16px"}}>Margin Percentage</TableCell>
                    <TableCell align="center" sx={{ marginLeft:"16px"}}>Total Revenue</TableCell>
                    <TableCell align="center" sx={{ marginLeft:"16px"}}>Assigned Revenue Orders</TableCell>
                    <TableCell align="center" sx={{ marginLeft:"16px"}}>Revenue per Order</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody sx={{borderColor:"white",borderWidth:"thick"}}>
                 
                  <TableRow key={Math.random()}>
                    <TableCell align="right">{row.row.details.margin_abs.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
                    <TableCell align="right">{row.row.details.margin_abs_per_order.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
                    <TableCell align="right">{(row.row.details.margin_perc*100).toLocaleString() +"%"}</TableCell>
                    <TableCell align="right">{row.row.details.revenue.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
                    <TableCell align="right">{row.row.details.revenue_assigned.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
                    <TableCell align="right">{row.row.details.revenue_per_order.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</TableCell>
                    
                  </TableRow>
                
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> 
    </TableBody>);
   
   
   
};
    
    
    type TablePaginationDemoProps = {
      setPage:React.Dispatch<React.SetStateAction<number>>,
      page:number,
      rowsPerPage:number,
      setRowsPerPage:React.Dispatch<React.SetStateAction<number>>,
      count:number
    }
    
    
const TablePaginationDemo: React.FC<TablePaginationDemoProps> = ({setPage, page, rowsPerPage, setRowsPerPage, count}) => {
        
        
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    console.log(event)
    setPage(newPage);
  };
        
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
        
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
    