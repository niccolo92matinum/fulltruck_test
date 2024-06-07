import { Link, useNavigate, useParams } from "react-router-dom";
import { Carrier, Client, DetailsPageProps } from "../typescript/interface";
import TextDettaglio from "../components/textDettaglio";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";

const Details: React.FC<DetailsPageProps> = ({data}) => {

  const { id , who} = useParams<{id:string,who:string}>();
  const navigate = useNavigate()
 
  useEffect(()=>{
    if(!data[who as keyof unknown][id as keyof string]){
      navigate('/home')
    }
  },[])

 

  const singleElemment : Carrier|Client = data[who as keyof { carrier: { [key: string]: Carrier; }; client: { [key: string]: Client; }; }][id as keyof unknown]
  return (
    <div style={{ minHeight:'100vh'}} className="mt-5 pt-5">
     
      <div className="bg-white mb-5 me-5 ms-5">
        <div className="d-flex justify-content-start mb-3">
          <Link to="/trend"><Button variant="outlined"> <ArrowBackIcon sx={{ color: '#1976D2', cursor: 'pointer',marginRight:'10px' }} /> BACK </Button></Link>
        </div>
        {singleElemment &&
        <div className="pt-5 pb-5 ">
          <Typography sx={{fontWeight:'bold'}} variant="h5">{who === "carrier" ? "Details Carrier": "Details Client"}</Typography>
          <div className="container text-center">
            <TextDettaglio description='Label' value={singleElemment.label}></TextDettaglio>
            <TextDettaglio description='Absolute margin' value={singleElemment.margin_abs.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}></TextDettaglio>
            <TextDettaglio description='Absolute Margin by Order' value={singleElemment.margin_abs_per_order.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}></TextDettaglio>
            <TextDettaglio description='Absolute Margin on total' value={singleElemment.margin_abs_perc_on_tot  * 100 + "%"}></TextDettaglio>
            <TextDettaglio description='Percentage Margin' value={singleElemment.margin_perc  * 100 + "%"}></TextDettaglio>
            <TextDettaglio description='Order Count' value={singleElemment.order_count.toString()}></TextDettaglio>
            <TextDettaglio description='Order Count Percentage' value={singleElemment.order_count_perc_on_tot  * 100 + "%"}></TextDettaglio>
            <TextDettaglio description='Revenue' value={singleElemment.revenue.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}></TextDettaglio>
            <TextDettaglio description='Revenue by Order' value={singleElemment.revenue_per_order.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}></TextDettaglio>
            <TextDettaglio description='Revenue Percentage' value={singleElemment.revenue_perc_on_tot  * 100 + "%"}></TextDettaglio>
            
           
          </div>
        </div>
        }
      </div>
    </div>

  )
   
};

export default Details;
