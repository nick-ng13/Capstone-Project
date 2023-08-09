import DoughnutChart from "./charts/DoughnutChart";

const Utilization = () => {
    return (
        <div className="utilization">
            <h1>Utilization</h1>
            <div className="chartCard">
                <div className="chartBox">
                    <h2>North</h2>
                    <DoughnutChart data={ [328, 129, 78, 136] }/>
                </div>
                <div className="chartBox">
                    <h2>West</h2>
                    <DoughnutChart data={ [328, 129, 78, 136] }/>
                </div>
                <div className="chartBox">
                    <h2>Fraser</h2>
                    <DoughnutChart data={ [328, 129, 78, 136] }/>
                </div>
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <h2>Rose</h2>
                    <DoughnutChart data={ [328, 129, 78, 136] }/>
                </div>
                <div className="chartBox">
                    <h2>Health</h2>
                    <DoughnutChart data={ [328, 129, 78, 136] }/>
                </div>
                <div className="chartBox">
                    <h2>Thunderbird</h2>
                    <DoughnutChart data={ [328, 129, 78, 136] }/>
                </div>
            </div>
        </div>
    );
}

// north, west, fraser, rose, health, thunderbird
 
export default Utilization;