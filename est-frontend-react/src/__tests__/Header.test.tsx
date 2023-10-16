import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Testing the Header component with employees', () => {
    const mockEmployeeCount = 3;
    const mockFunc = vi.fn();

    console.log("Header tests")
    beforeEach(() => {
        render(<Header
            employeeCount={mockEmployeeCount}
            onAddEmployeeClick={mockFunc}
            onSearch={mockFunc}
            onFilterChange={mockFunc} />);
    });

    it('should display the title', () => {
        expect(screen.getByRole('heading', { name: /Employees/i, level: 3 })).toBeInTheDocument();
    });

    it('should display the correct employee count of 3', () => {
        const countElement = screen.getByText(/3 Employees/i);
        expect(countElement).toBeInTheDocument();
    });
});