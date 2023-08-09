import { DatePicker } from '@mui/x-date-pickers';

const DateSelect = ({ onChange }) => {
    return (
        <div data-testid="datepicker">
            <DatePicker onChange={onChange} />
        </div>
    );
}

export default DateSelect;