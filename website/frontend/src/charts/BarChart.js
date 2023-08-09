import { Chart as ChartJS, BarElement, LinearScale, CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = ({data, labels, hours}) => {
    var processed_data = {
        labels: labels ?? ['North', 'West', 'Fraser', 'Rose', 'Health', 'Thunderbird'],
        datasets: [{
            label: 'Peak # of Cars',
            data: data,
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(153, 102, 255, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
        }, {
            label: 'Peak Hour (24hr)',
            data: hours ?? [],
            backgroundColor: [
                'transparent'
                ],
                borderColor: [
                'transparent'
                ],
                borderWidth: 1
        }]
    }
    var options = {
        interaction: {
            mode: 'index'
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                stacked: true
            },
            x: {
                stacked: true
            }
        },
        legend: {
            labels: {
                fondSize: 25,
            }
        }
    }
      
    return (
        <div>
            <Bar
                data={processed_data}
                height={400}
                options={options}
            />
        </div>
    );
}
 
export default BarChart;