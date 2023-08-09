import Preview from "./Preview";
import placeholder from './images/download.png';
import pie_preview from './images/pie_preview.png';
import doughnut_preview from './images/doughnut_preview.png';
import bar_preview from './images/bar_preview.png';
import bar_side_preview from './images/bar_side_preview.png';
import BigStatistic from "./BigStatistic";
import SmallStatistic from "./SmallStatistic";

const Home = () => {
    return (
        <div className="home">
            <div className="chartCard">
                <BigStatistic img={placeholder} label="Total Parking Utilization"/>
                <SmallStatistic img={placeholder} label="Percent of Utilization"/>
            </div>
            <div className="chartCard">
                <Preview img={doughnut_preview} label="Total Usage" routekey="TotalUsage"/>
                <Preview img={pie_preview} label="Peak Usage Per Day" routekey="PeakUsagePerDay"/>
                <Preview img={bar_preview} label="Forecasting" routekey="Forecasting"/>
                <Preview img={bar_side_preview} label="Average Time Spent" routekey="AvgTimeSpent"/>
            </div>
            
        </div>
    );
}
 
export default Home;