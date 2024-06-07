import BasicSelect from "../components/select"
import DatePickerValue from "../components/dataPicker";
import {HomePageProps } from "../typescript/interface";
import { Button, Skeleton } from "@mui/material";
import BasicTable from "../components/dataTable";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";


const HomePage: React.FC<HomePageProps> = ({data,loadingData,showedData,setShowedData, getData,filters, setFilters}) => {

  
 
  const [disableData , setDisableData] = useState(false)
  const [disbleFilterButton, setDisableFilterButton] = useState(false)
  const [errorData, seterrorData] = useState(false)

  useEffect(()=>{
    if(filters.timeTarget === '' && filters.aggregateBy === '' && filters.startDate === null && filters.endDate === null){
      setDisableFilterButton(true)
    }else if(filters.timeTarget === 'created at' && filters.startDate === null){
      setDisableFilterButton(true)
    }else if(filters.timeTarget === 'pickup date' && (filters.startDate === null || filters.endDate === null)){
      setDisableFilterButton(true)
    }else if(typeof(filters.startDate) === 'string' && typeof(filters.endDate) === 'string'){
      if((new Date(filters.startDate) > new Date(filters.endDate))){
        seterrorData(true)
      }
    }else{
      setDisableFilterButton(false)
      seterrorData(false)
    }
    
  },[filters.timeTarget,filters.aggregateBy,filters.startDate,filters.endDate ])

  useEffect(()=>{
    if(filters.timeTarget === ''){
      setDisableData(true)
    }else{
      setDisableData(false)
    }
    
  },[filters.timeTarget])


  const onClearButton = () =>{
    {
      getData({
        aggregateBy: '',
        timeTarget: '',
        startDate:null,
        endDate:null
      })
      setFilters({
        aggregateBy: '',
        timeTarget: '',
        startDate:null,
        endDate:null
      })}
  }

 

  const headerNames = [
    "",
    "Active Carries",
    "Active Client",
    "Aggregation Date",
    "Orders Assigned",
    "New Carries",
    "New Client",
    "Order Count",
    "Order Per Period"
  ]
 
  
  return (
    <div style={{ minHeight:'100vh'}} className="mt-5 pt-5">
      <div className="container mt-5 ">
        <div className="row ">
          <div className="col-2">
            <BasicSelect propsBasicSelect={
              {label:'Aggregated By',
                setValue:setFilters,
                keyLabel:"aggregateBy",
                stateObj:filters,
                items:['day','week' ,'month']
              }}/>
          </div>
          <div className="col-2">
            <BasicSelect propsBasicSelect={
              { label:'Time Target',
                setValue:setFilters,
                keyLabel:"timeTarget",
                stateObj:filters,
                items:['pickup date','created at']
              }}/>
          </div>
          <div className="col-2">
            <DatePickerValue propsDataPick={{
              label:filters.timeTarget === "created at"?"Date":"startDate",
              setValue:setFilters,
              keyLabel:"startDate",
              disabled:disableData,
              value:filters.startDate,
              error:errorData
            }}></DatePickerValue>
          </div>
        
          <div className="col-2">
            {filters.timeTarget === "pickup date" &&
            <DatePickerValue propsDataPick={{
              label:'End Date',
              setValue:setFilters,
              keyLabel:"endDate",
              disabled:disableData,
              value:filters.endDate,
              error:errorData
            }}></DatePickerValue>
            }
          </div>
          
          <div style={{ marginTop: 'auto', marginBottom: 'auto'}} className="col-3 ms-5">
            <div className="d-flex">
              <Button 
                disabled={loadingData || disbleFilterButton || errorData}
                variant="contained"
                onClick={()=>getData(filters)}
              >Filter</Button>
             
              <Button 
                sx={{marginLeft:"20px"}}
                disabled={loadingData}
                variant="outlined"
                onClick={()=> onClearButton()}
              >Reset</Button>
            </div>
            
          </div>
        </div>
        <div className="row mt-5">
          {
            loadingData ?  <div  className="mt-5"> 
              <div className="d-flex justify-content-end mb-3">
                <Skeleton variant="rectangular" width={'120px'} height={35} />
              </div>
              <Skeleton variant="rectangular" width={'100%'} height={118} /> 
            </div>
              :<div className="mt-5">
                <div className="d-flex justify-content-end mb-3">
                  {showedData.length !== 0 &&
                  <Link to="/histograms"><Button variant="outlined">GO TO CHARTS <ArrowForwardIcon sx={{ color: '#1976D2', cursor: 'pointer',marginLeft:'10px' }} /></Button></Link>
                  }
                </div>
                <BasicTable data={data?.data_table} headerNames={headerNames} showedData={showedData} setShowedData={setShowedData}></BasicTable>
              </div>
          }
  
        </div>
      </div>

    </div>
   
  )
}

export default HomePage