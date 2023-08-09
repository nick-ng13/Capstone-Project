import DoughnutChart from "./charts/DoughnutChart";

const SmallStatistic = (props) => {
    const current = new Date();
    const month = current.toLocaleString("en-US", {month: "long"});
    const weekday = current.toLocaleString("en-US", {weekday: "long"});
    const day = current.toLocaleString("en-US", {day: "2-digit"});

    const imgStyle = { width: '250px', height: '341px' }

    return (
        <div className="stat-preview-small">
            <h2>{ props.label }</h2>
            <h5>{ weekday }, { month } { day }</h5>
            <br></br>
            <DoughnutChart data={ [328, 129, 78, 136] }/>
        </div>
    );
}
 
export default SmallStatistic;