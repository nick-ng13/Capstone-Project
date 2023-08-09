// import Select from "react-select"
import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";
// import { Box, TextField, MenuItem } from "@mui/material";

const DropdownSelectAll = ({ onChange }) => {
    const options = [
        {value: "All", label: "All Parkades"},
        {value: "North", label: "North"},
        {value: "West", label: "West"},
        {value: "Fraser", label: "Fraser"},
        {value: "Rose", label: "Rose"},
        {value: "Health", label: "Health"},
        {value: "Thunderbird", label: "Thunderbird"}
    ];

    const [selectedOption, setSelectedOption] = useState("")

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption.target.value);
        onChange(selectedOption.target.value);
    };

    return (
        <div>
            <Select onChange={handleChange} value={selectedOption} displayEmpty sx={{width: "250px"}}  data-testid="select">
            <MenuItem value="" disabled>Select Parkade</MenuItem>
                <MenuItem value="All" data-testid="menuitem">All Parkades</MenuItem>
                <MenuItem value="North" data-testid="menuitem">North</MenuItem>
                <MenuItem value="West" data-testid="menuitem">West</MenuItem>
                <MenuItem value="Fraser" data-testid="menuitem">Fraser</MenuItem>
                <MenuItem value="Rose" data-testid="menuitem">Rose</MenuItem>
                <MenuItem value="Health" data-testid="menuitem">Health</MenuItem>
                <MenuItem value="Thunderbird" data-testid="menuitem">Thunderbird</MenuItem>
            </Select>
        </div>
    );
}
 
export default DropdownSelectAll;