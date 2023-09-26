import { render, screen } from '@testing-library/react';
import App from '../App'; 
describe('App Component', () => {
    it('renders without crashing', () => {
        render(<App />);
        const headerElement = screen.getByRole('heading', { name: /Employees/i });
        expect(headerElement).toBeInTheDocument();
    });
});
