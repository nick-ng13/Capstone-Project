import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    Tooltip,
    ArcElement
)

const PieChart = (props) => {

    var data = {
        labels: ['# of Occupied', '# of Unoccupied'],
        datasets: [{
          label: 'Count',
          data: props.data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
    }
    var options = {
        maintainAspectRatio: true,
    }
      
    return (
        <div>
            <Pie
                data={data}
                height={100}
                options={options}
            />
        </div>
    );
}
 
export default PieChart;