import { render, screen, waitFor } from '@testing-library/react';
import DropdownSelectAll from '../DropdownSelectAll';
import userEvent from '@testing-library/user-event';

const mockedOnChange = jest.fn();

describe("Dropdown Select All", () => {
    test('display default select menu', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        expect(defaultValueElement).toBeInTheDocument();
    });

    test('display menu items', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        const menuitems = screen.getAllByTestId("menuitem");
        expect(menuitems.length).toBe(7);
    });

    test('update to all parkade', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        await waitFor(() => userEvent.click(screen.getByText("All Parkades")));
        const updateElement = screen.getByTestId("select");
        expect(updateElement).toHaveTextContent("All Parkades");
    });

    test('update to north parkade', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        await waitFor(() => userEvent.click(screen.getByText("North")));
        const updateElement = screen.getByTestId("select");
        expect(updateElement).toHaveTextContent("North");
    });

    test('update to west parkade', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        await waitFor(() => userEvent.click(screen.getByText("West")));
        const updateElement = screen.getByTestId("select");
        expect(updateElement).toHaveTextContent("West");
    });

    test('update to fraser parkade', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        await waitFor(() => userEvent.click(screen.getByText("Fraser")));
        const updateElement = screen.getByTestId("select");
        expect(updateElement).toHaveTextContent("Fraser");
    });

    test('update to rose parkade', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        await waitFor(() => userEvent.click(screen.getByText("Rose")));
        const updateElement = screen.getByTestId("select");
        expect(updateElement).toHaveTextContent("Rose");
    });

    test('update to health parkade', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        await waitFor(() => userEvent.click(screen.getByText("Health")));
        const updateElement = screen.getByTestId("select");
        expect(updateElement).toHaveTextContent("Health");
    });

    test('update to thunderbird parkade', async () => {
        render(<DropdownSelectAll onChange={ mockedOnChange } />);
        const defaultValueElement = screen.getByText("Select Parkade");
        userEvent.click(defaultValueElement);
        await waitFor(() => userEvent.click(screen.getByText("Thunderbird")));
        const updateElement = screen.getByTestId("select");
        expect(updateElement).toHaveTextContent("Thunderbird");
    });
});