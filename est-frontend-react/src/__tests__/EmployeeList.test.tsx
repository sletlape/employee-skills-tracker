import { render, screen } from '@testing-library/react';
import EmployeeList from '../components/EmployeeList';

describe('Testing EmployeeList Component with employees', () => {
    const mockEmployees = [
        { firstName: 'John', lastName: 'Doe', contactNumber: '1234567890' },
        { firstName: 'Jane', lastName: 'Doe', contactNumber: '0987654321' }
    ];

    beforeEach(() => {
        render(<EmployeeList employees={mockEmployees} />);
    });

    it('should render the employee list', () => {
        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();
    });

    it('should render the correct number of employees', () => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBe(mockEmployees.length);
    });
});
