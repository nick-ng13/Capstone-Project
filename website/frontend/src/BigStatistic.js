import { useEffect, useState } from "react";
import ParkingApi from "./api/ParkingApi";
import LineChart from "./charts/LineChart";

const BigStatistic = (props) => {
    const current = new Date();
    const month = current.toLocaleString("en-US", {month: "long"});
    const weekday = current.toLocaleString("en-US", {weekday: "long"});
    const day = current.toLocaleString("en-US", {day: "2-digit"});

    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    const loadDataOnlyOnce = async () => {
        var dates = [], values = [];
        var newDate = new Date();
        var dateStr, amount, result; 

        newDate.setDate(newDate.getDate() - 8);
        for (var i=0; i < 7; i++) {
            newDate.setDate(newDate.getDate() + 1);
            var formattedNumber = (newDate.getMonth() + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            dateStr = newDate.getFullYear()+'-'+formattedNumber+'-'+newDate.getDate();
            result = await ParkingApi.getTotalUsage(dateStr);
            dates.push(dateStr);
            amount = result[dateStr]?.North + result[dateStr]?.West +
                        result[dateStr]?.Fraser + result[dateStr]?.Rose +
                        result[dateStr]?.Health + result[dateStr]?.Thunderbird;
            values.push(amount);
        }
        setLabels(dates);
        setData(values);
    }

    useEffect(() => {
        loadDataOnlyOnce();
    }, [])

    return (
        <div className="stat-preview-big">
            <h2>{ props.label }</h2>
            <h5>{ weekday }, { month } { day }</h5>
            <LineChart data={ data } labels={ labels }/>
        </div>
    );
}
 
export default BigStatistic;