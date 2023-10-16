import { render, screen } from '@testing-library/react';
import App from '../App'; 
describe('App Component', () => {
    it('renders without crashing', () => {
        console.log("\nBasic app test\n");
        render(<App />);
        const headerElement = screen.getByRole('heading', { name: /Employees/i, level: 3 });
        expect(headerElement).toBeInTheDocument();
    });
});
