import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    Tooltip,
    // Legend,
    ArcElement
)

const DoughnutChart = (props) => {
    var data = {
        labels: ['Students', 'Faculty', 'Other', 'Unoccupied'],
        datasets: [{
          label: 'Count',
          data: props.data,
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
    }
    var options = {
        maintainAspectRatio: true,
        // legend: {
        //     labels: {
        //         fondSize: 25,
        //     }
        // }
    }
      
    return (
        <div>
            <Doughnut
                data={data}
                height={500}
                options={options}
            />
        </div>
    );
}
 
export default DoughnutChart;