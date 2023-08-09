import BarChart from "./charts/BarChart";
import ParkingAPI from "./api/ParkingApi";
import React, { useState } from "react";
import DropdownSelectAll from "./DropdownSelectAll";
import DateSelect from "./DateSelect";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const TotalUsage = () => {

    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [parkade, setParkade] = useState("");

    const handleClick = async () => {
        var result, newData;
        if (parkade === "All") {
            result = await ParkingAPI.getTotalUsage(date);
            newData = [result[date]?.North, result[date]?.West,
                        result[date]?.Fraser, result[date]?.Rose,
                        result[date]?.Health, result[date]?.Thunderbird];
        } else {
            result = await ParkingAPI.getTotalUsage(date, parkade);
            newData = [result[date]?.North, result[date]?.West,
                        result[date]?.Fraser, result[date]?.Rose,
                        result[date]?.Health, result[date]?.Thunderbird];
        }
        setData(newData);
    };

    const handleSelectChange = (selectedOption) => {
        setParkade(selectedOption);
    };

    const handleDateChange = (date) => {
        setDate(date.format('YYYY-MM-DD'));
    };

    return (
        <div className="totalusage">
            <h1>Total Usage</h1>
            <br></br>
            <div className="selectorBox">
                <div className="selectors">
                    <DropdownSelectAll onChange={handleSelectChange}/>
                </div>
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
                <BarChart data={ data }/>
            </div>
        </div>
    );
}
 
export default TotalUsage;