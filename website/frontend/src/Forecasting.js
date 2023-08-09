import BarChart from "./charts/BarChart";
import ParkingAPI from "./api/ParkingApi";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DateSelect from "./DateSelect";
import { useState } from "react";

const Forecasting = () => {

    const [data, setData] = useState();
    const [date, setDate] = useState(new Date());
    const parkade = "Thunderbird";
    const [labels, setLabels] = useState([]);

    const days = (date_1, date_2) =>{
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    const handleClick = async () => {
        var dict = [], dates = [], values = [];
        var result, dateStr, amount;
        var newDate = new Date();
        var numDays = days(new Date(date), newDate) + 1;
        newDate.setDate(newDate.getDate() - 8);

        for (var i=0; i < 7; i++) {
            newDate.setDate(newDate.getDate() + 1);
            var formattedNumber = (newDate.getMonth() + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            var formattedNumberDay = (newDate.getDate()).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            dateStr = newDate.getFullYear()+'-'+formattedNumber+'-'+formattedNumberDay;
            amount = await ParkingAPI.getTotalUsage(dateStr, parkade);
            dates.push(dateStr);
            values.push(amount[dateStr][parkade]);
            dict.push({Timestamp: dateStr, total_count: amount[dateStr][parkade], parkade: parkade});
        }
        
        result = await ParkingAPI.getForecast(dict, numDays);

        for (i=0; i<result.length; i++) {
            newDate.setDate(newDate.getDate() + 1);
            var formattedNumber = (newDate.getMonth() + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
            dateStr = newDate.getFullYear()+'-'+formattedNumber+'-'+newDate.getDate();
            dates.push(dateStr)
            values.push(result[i].total_count);
        }

        setData(values);
        setLabels(dates);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <div className="forecasting">
            <h1>Thunderbird Forecasting</h1>
            <br></br>
            <div className="selectorBox">
                <div className="selectors">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateSelect onChange={handleDateChange}/>
                    </LocalizationProvider>
                </div>
                <div className="selectors">
                    <button onClick={handleClick}>Get Data</button>
                </div>
            </div>
            <div className="chartBox">
                <BarChart data={ data } labels={ labels }/>
            </div>
        </div>
    );
}
 
export default Forecasting;