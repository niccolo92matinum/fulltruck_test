import { FC, useEffect, useState } from 'react'
import './App.css'
import ResponsiveAppBar from './components/navbar'
import { Route,Routes, } from 'react-router-dom'
import HomePage from './page/home'
import Histograms from './page/histograms'
import useStatistics from './hook/useStatistics'
import { DataTable, DataTableFetch, MainData,Props } from './typescript/interface'
import TrendPage from './page/trend'
import Details from './page/details'

const App: FC = () => {

  const {fetchStatistics} = useStatistics()
  const [data,setData] = useState<MainData>({
    data_table:[],
    histograms:{
      time_margin_perc: {
        data: []
      },
      time_order_count: {
        data: []  
      },
      time_revenue: {
        data: [],   
      }
    },
    scalars:{ 
      active_carriers: 0,
      active_clients: 0,
      average_margin_perc: 0,
      avg_order_margin_abs: 0,
      avg_order_revenue: 0,
      new_carriers: 0,
      new_clients: 0,
      total_assigned_count: 0,
      total_margin_abs: 0,
      total_order_count: 0,
      total_revenue: 0
    },
    kpis:{
      carrier:{},
      client:{}
    }
  })
 
 
  const [showedData, setShowedData] = useState<DataTable[]>([])
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [filters , setFilters] = useState<Props>({
    aggregateBy: '',
    timeTarget: '',
    startDate:null,
    endDate:null
  })
 
  const getData = async(filters:Props) => {
    setLoadingData(true)
    await fetchStatistics(filters).then((res:any) => {
      setLoadingData(false)
      const modifyObjDataTable = res.data_table.map((el:DataTableFetch)=>{
        const newSingleObj = {
          active_carrier:el.active_carrier,
          active_client:el.active_client,
          aggregate_date:el.aggregate_date,
          assigned_count:el.assigned_count,
          new_carriers:el.new_carriers,
          new_clients:el.new_clients,
          order_count:el.order_count,
          order_per_period: el.order_per_period,
          details:{
            margin_abs:el.margin_abs,
            margin_abs_per_order:el.margin_abs_per_order,
            margin_perc:el.margin_perc,
            revenue:el.revenue,
            revenue_assigned:el.revenue_assigned,
            revenue_per_order:el.revenue_per_order
          }}


        return newSingleObj

      })
      
      setData({...res,...{data_table:modifyObjDataTable }});
    }).catch(err =>{
      setLoadingData(false)
      console.log(err)
    })
  }
  
  

  useEffect(()=>{
    getData(filters)
  },[])





 
  return (
    <>
      <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
          <Route  path="/home" element={<HomePage data={data} loadingData={loadingData} showedData={showedData} setShowedData={setShowedData} getData={getData} filters={filters} setFilters={setFilters}/>}/>
          <Route  path="/histograms" element={<Histograms data={data.histograms} />}/>
          <Route  path="/trend" element={<TrendPage data={data.scalars} gridData={data.kpis}/>}/>
          <Route path="/details/:id/:who" element={<Details data={data.kpis} />} />
          <Route path="*" element={<HomePage data={data} loadingData={loadingData} showedData={showedData} setShowedData={setShowedData} getData={getData}  filters={filters} setFilters={setFilters}/>}/>
        </Routes>
      </div>
    
  
    </>
    
  )
  
  //<WelcomePage />
}

export default App
