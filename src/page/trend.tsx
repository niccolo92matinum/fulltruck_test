import Typography from "@mui/material/Typography"
import { TrendPageProps } from "../typescript/interface"
import CustomizedTables from "../components/dataTableSingleDetails"

const TrendPage: React.FC<TrendPageProps> = ({data, gridData}) =>  {

  return (
    <div style={{ minHeight:'100vh'}} className="mt-5 pt-5">
      <div className="container mt-5 ">
        <div >
          <Typography sx={{fontWeight:"bold"}} variant="h5" gutterBottom>
        We are a pioneering digital freight network dedicated to
revolutionizing the logistics industry.
          </Typography>
          <Typography  variant="subtitle1" gutterBottom>
           At FullTruck, our core mission is to optimize carrier
routes and provide shippers with unlimited, cost-efficient capacity. Our commitment extends
beyond enhancing operational efficiency; we are devoted to combating the global challenge
of CO2 emissions by minimizing waste, thereby contributing to a greener and more
sustainable planet.
          </Typography>
        </div>
        <div className="row mt-5">
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">Active Carries</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.active_carriers}</Typography>
          </div>
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">New Carries</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.new_carriers}</Typography>
          </div>
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">Active Clients</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.active_clients}</Typography>
          </div>
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">New Clients</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.new_clients}</Typography>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">Total orders</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.total_order_count}</Typography>
          </div>
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">Total assigned orders</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.total_assigned_count}</Typography>
          </div>
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">Total margin</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.total_margin_abs.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</Typography>
          </div>
          <div className="col-3">
            <Typography sx={{color:'#F94034',fontWeight:'bold'}} variant="h5">Total revenue</Typography>
            <Typography sx={{marginTop:'30px'}} variant="h6">{data.total_revenue.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</Typography>
          </div>
        </div>

        <div style={{marginTop:'80px'}} className="row">
          <div className="col-6">
            <Typography sx={{fontWeight:'bold'}} variant="h5">Client</Typography>
            <CustomizedTables elements={gridData.client} ownerTable={'client'}></CustomizedTables>
           
          </div>
          <div className="col-6">
            <Typography sx={{fontWeight:'bold'}} variant="h5">Carrier</Typography>
            <CustomizedTables elements={gridData.carrier} ownerTable={'carrier'}></CustomizedTables>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default TrendPage

//<RadarChart data={data} />