import BarChart from "./charts/BarChart";
import ParkingAPI from "./api/ParkingApi";
import { useState } from "react";
import DropdownSelect from "./DropdownSelect";
import DateSelect from "./DateSelect";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const PeakUsagePerDay = () => {

    const [data, setData] = useState();
    const [labels, setLabels] = useState([]);
    const [hours, setHours] = useState([]);
    const [date, setDate] = useState("");
    const [parkade, setParkade] = useState("");

    const handleClick = async () => {
        const result = await ParkingAPI.getPeakUsagePerDay(date, parkade);
        const newData = [];
        const newLabels = [];
        const newHours = [];
        Object.entries(result)?.map(([k, v]) => {
            newLabels.push(k);
            newData.push(v[parkade]?.max_overlap);
            newHours.push(v[parkade]?.max_hour);
        });
        setData(newData);
        setLabels(newLabels);
        setHours(newHours)
    };

    const handleSelectChange = (selectedOption) => {
        setParkade(selectedOption);
    };

    const handleDateChange = (date) => {
        setDate(date.format('YYYY-MM-DD'));
    };

    return (
        <div className="peakusageperday">
            <h1>Peak Usage Per Day</h1>
            <br></br>
            <div className="selectorBox">
                <div className="selectors">
                    <DropdownSelect onChange={handleSelectChange}/>
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
                <BarChart data={ data } labels={ labels } hours={ hours }/>
            </div>
        </div>
    );
}
 
export default PeakUsagePerDay;