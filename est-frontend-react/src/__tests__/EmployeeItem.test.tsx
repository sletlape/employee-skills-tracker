import { render, screen } from '@testing-library/react';
import EmployeeItem from '../components/EmployeeItem';

describe('Testing EmployeeItem with correct employee', () => {
    const mockEmployee = {
        firstName: 'John',
        lastName: 'Doe',
        contactNumber: '123-456-7890'
    };

    beforeEach(() => {
        render(<EmployeeItem employee={mockEmployee} index={0} />);
    });

    it('should render the employee index', () => {
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should render the employee first name', () => {
        expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('should render the employee last name', () => {
        expect(screen.getByText('Doe')).toBeInTheDocument();
    });

    it('should render the employee contact number', () => {
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    });

    it('should render the delete button', () => {
        expect(screen.getByText('D')).toBeInTheDocument();
    });
});
