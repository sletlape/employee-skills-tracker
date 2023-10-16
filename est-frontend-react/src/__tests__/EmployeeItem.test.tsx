import { render, screen } from '@testing-library/react';
import EmployeeItem from '../components/EmployeeItem';

describe('EmployeeItem Component', () => {
    const mockEmployee = {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "123-456-7890",
        emailAddress: "john.doe@example.com",
        dob: "1990-01-01",
        address: {
            streetAddress: "123 Main St",
            city: "Cityville",
            postalCode: "12345",
            country: "USA"
        },
        skills: [
            {
                skill: "JavaScript",
                yearsExperience: "5",
                seniority: "Intermediate",
            },
            {
                skill: "React",
                yearsExperience: "3",
                seniority: "Junior",
            },
        ],
    };

    it('should render employee details', () => {
        render(<EmployeeItem employee={mockEmployee} index={0} onEditEmployeeClick={() => { }} />);
        expect(screen.getByText('1')).toBeInTheDocument(); // Check index
        expect(screen.getByText('John')).toBeInTheDocument(); // Check first name
        expect(screen.getByText('Doe')).toBeInTheDocument(); // Check last name
        expect(screen.getByText('123-456-7890')).toBeInTheDocument(); // Check contact number
    });

    it('should call onEditEmployeeClick when clicked', () => {
        const onEditEmployeeClick = vi.fn();
        render(<EmployeeItem employee={mockEmployee} index={0} onEditEmployeeClick={onEditEmployeeClick} />);
        const listItem = screen.getByText('John'); // Click anywhere on the item
        listItem.click();
        expect(onEditEmployeeClick).toHaveBeenCalledTimes(1);
    });
});
