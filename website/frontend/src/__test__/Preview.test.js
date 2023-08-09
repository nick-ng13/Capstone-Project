import { render, screen } from '@testing-library/react';
import Preview from '../Preview';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import placeholder from '../images/download.png';


const MockPreview = ({ img, label, routekey }) => {
    return (
        <Router>
            <Preview img={ img } label={ label } routekey={ routekey } />
        </Router>
    )
}

describe("Preview", () => {
    test('display image', async () => {
        render(<MockPreview img={ placeholder } label={ "placeholder text" } routekey={ "placeholder" } />);
        const imageElement = screen.getByAltText("image");
        expect(imageElement).toBeInTheDocument();
    });

    test('display link text', async () => {
        render(<MockPreview img={ placeholder } label={ "placeholder text" } routekey={ "placeholder" } />);
        const headingElement = screen.getByRole("heading");
        expect(headingElement).toBeInTheDocument();
    });
});