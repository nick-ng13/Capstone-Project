import { render, screen, waitFor } from '@testing-library/react';
import DateSelect from '../DateSelect';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const mockedOnChange = jest.fn();

const MockDateSelect = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateSelect onChange={mockedOnChange}/>
        </LocalizationProvider>
    )
}

describe("Dropdown Select", () => {
    test('display default datepicker', async () => {
        render(<MockDateSelect />);
        const datePickerElement = screen.getByTestId("datepicker");
        expect(datePickerElement).toBeInTheDocument();
    });
});