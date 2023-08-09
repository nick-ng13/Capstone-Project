import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const MockNavBar = () => {
    return (
        <Router>
            <Navbar />
        </Router>
    )
}

describe("Navbar", () => {
    test('display ubc parking title', async () => {
        render(<MockNavBar />);
        const headingElement = screen.getByRole("heading");
        expect(headingElement).toBeInTheDocument();
    });
    
    test('display ubc logo', async () => {
        render(<MockNavBar />);
        const imageElement = screen.getByAltText("logo");
        expect(imageElement).toBeInTheDocument();
    });
    
    test('display total usage link text', async () => {
        render(<MockNavBar />);
        const linkTextElement = screen.getByText("Total Usage");
        expect(linkTextElement).toBeInTheDocument();
    });
    
    test('display peak usage link text', async () => {
        render(<MockNavBar />);
        const linkTextElement = screen.getByText("Peak Usage Per Day");
        expect(linkTextElement).toBeInTheDocument();
    });
    
    test('display forecasting link text', async () => {
        render(<MockNavBar />);
        const linkTextElement = screen.getByText("Forecasting");
        expect(linkTextElement).toBeInTheDocument();
    });
    
    test('display average time link text', async () => {
        render(<MockNavBar />);
        const linkTextElement = screen.getByText("Average Time Spent");
        expect(linkTextElement).toBeInTheDocument();
    });
});