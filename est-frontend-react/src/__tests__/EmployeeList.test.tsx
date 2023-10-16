import { render, screen } from '@testing-library/react';
import EmployeeList from '../components/EmployeeList';
import { Employee } from '../interfaces/Employees';

describe('Testing EmployeeList Component with employees', () => {

    console.log("\nEmployeeList test\n");
    const mockEmployees: Employee[] = [
        {
            firstName: "John",
            lastName: "Doe",
            contactNumber: "123-456-7890",
            emailAddress: "john.doe@example.com",
            dob: "1990-01-01",
            address:
            {
                streetAddress: "123 Main St",
                city: "Cityville",
                postalCode: "12345",
                country: "USA",
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
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            contactNumber: "987-654-3210",
            emailAddress: "jane.smith@example.com",
            dob: "1995-02-15",
            address: {
                streetAddress: "456 Oak St",
                city: "Townsville",
                postalCode: "54321",
                country: "Canada"
            },
            skills: [
                {
                    skill: "Python",
                    yearsExperience: "4",
                    seniority: "Intermediate",
                },
                {
                    skill: "Django",
                    yearsExperience: "2",
                    seniority: "Junior",
                },
            ],
        },
    ];

    const mockEditEmployeeClick = vi.fn();

    beforeEach(() => {
        render(<EmployeeList employees={mockEmployees} onEditEmployeeClick={mockEditEmployeeClick} />);
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