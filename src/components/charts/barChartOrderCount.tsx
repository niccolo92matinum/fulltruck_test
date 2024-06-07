// BarChart.js

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { BarChartOrderCountProps } from '../../typescript/interface';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart:React.FC<BarChartOrderCountProps> = ({timeArray, xArray,label}) => {
 
  const dataToInsert = {
    labels: timeArray,
    datasets: [
      {
        label:  label === "Number of Orders by Date" ? "Number of Orders":"Margin Pecentage",
        data: xArray,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: label ,
      },
    },
  };

  return <Bar data={dataToInsert} options={options} />;
};

export default BarChart;
