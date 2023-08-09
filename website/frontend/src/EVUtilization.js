import PieChart from "./charts/PieChart";

const EVUtilization = () => {
    return (
        <div className="evutilization">
            <h1>EV Utilization</h1>
            <div className="chartCard">
                <div className="chartBox">
                    <h2>North</h2>
                    <PieChart data={ [36, 24] }/>
                </div>
                <div className="chartBox">
                    <h2>West</h2>
                    <PieChart data={ [36, 24] }/>
                </div>
                <div className="chartBox">
                    <h2>Fraser</h2>
                    <PieChart data={ [36, 24] }/>
                </div>
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <h2>Rose</h2>
                    <PieChart data={ [36, 24] }/>
                </div>
                <div className="chartBox">
                    <h2>Health</h2>
                    <PieChart data={ [36, 24] }/>
                </div>
                <div className="chartBox">
                    <h2>Thunderbird</h2>
                    <PieChart data={ [36, 24] }/>
                </div>
            </div>
        </div>
    );
}
 
export default EVUtilization;