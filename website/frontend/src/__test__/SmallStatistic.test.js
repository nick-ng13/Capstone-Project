import { render, screen } from '@testing-library/react';
import SmallStatistic from '../SmallStatistic';

describe("Small Statistic", () => {
    test('display label text', async () => {
        render(<SmallStatistic label={ "placeholder" }/>);
        const headingElement = screen.getByText("placeholder");
        expect(headingElement).toBeInTheDocument();
    });

    test('display current date', async () => {
        render(<SmallStatistic label={ "placeholder" }/>);
        const current = new Date();
        const month = current.toLocaleString("en-US", {month: "long"});
        const weekday = current.toLocaleString("en-US", {weekday: "long"});
        const day = current.toLocaleString("en-US", {day: "2-digit"});
        const headingElement = screen.getByText(weekday + ", " + month + " " + day);
        expect(headingElement).toBeInTheDocument();
    });
});