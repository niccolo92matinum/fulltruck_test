import LineChart from "../components/charts/linearChart"
import { HistogramsPageProps, TimeMarginPerc, TimeOrderCount } from "../typescript/interface"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BarChart from "../components/charts/barChartOrderCount";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";


const Histograms: React.FC<HistogramsPageProps>  = ({data}) => {

  const timeArrayOrder = data.time_order_count.data.map((el:TimeOrderCount) => el.date)
  const timeArrayMargin = data.time_margin_perc.data.map((el:TimeMarginPerc) => el.date)
  const orderNumberArray = data.time_order_count.data.map((el:TimeOrderCount) => el.order_count)
  const marginArray = data.time_margin_perc.data.map((el:TimeMarginPerc) => el.margin_perc)

  const [value, setValue] = React.useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
 
    setValue(newValue);
  };

  return (

    <div style={{ minHeight:'100vh'}} className="mt-5 pt-5">
      <div className="container mt-5 ">
        <div className="d-flex justify-content-start mb-3">
          <Link to="/home"><Button variant="outlined"> <ArrowBackIcon sx={{ color: '#1976D2', cursor: 'pointer',marginRight:'10px' }} /> BACK TO FILTERS </Button></Link>
        </div>
        <div className="row ">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Margin/Revenue" value="1" />
                  <Tab label="Orders by Date" value="2" />
                  <Tab label="Margin by Date" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
          
                <LineChart data={data.time_revenue}/>
             
              </TabPanel>
              <TabPanel value="2">
                <BarChart data={data.time_order_count} timeArray={timeArrayOrder} xArray={orderNumberArray} label={"Number of Orders by Date"}/>
              </TabPanel>
              <TabPanel value="3">
                <BarChart data={data.time_margin_perc} timeArray={timeArrayMargin} xArray={marginArray} label={"Margin Percentage by Date"}/>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Histograms