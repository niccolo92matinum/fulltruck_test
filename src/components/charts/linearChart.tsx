
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { LinearChartProps, TimeRevenue } from '../../typescript/interface';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChart :React.FC<LinearChartProps> = ({data}) => {
 
  const revenueArray = data.data.map((el:TimeRevenue) => el.revenue)
  const timeArray = data.data.map((el:TimeRevenue) => el.date)
  const marginArray = data.data.map((el:TimeRevenue) => el.margin_abs)
  const dataToInsert = {
    labels: timeArray ,
    datasets: [
      {
        label: 'Absolute Margin',
        data: marginArray,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        yAxisID: 'y1',
      },
      {
        label: 'Revenue',
        data: revenueArray,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        yAxisID: 'y2',
      }
    ],
  };

  const options: ChartOptions<"line">  = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y1: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Absolute Margin',
        },
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Revenue',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line data={dataToInsert} options={options} />;
};

export default LineChart;
