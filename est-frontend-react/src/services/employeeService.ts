import { Employee } from "../interfaces/Employees";

// Mock data
const employeesData: Employee[] = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        contactNumber: "123-456-7890",
        emailAddress: "john.doe@example.com",
        dob: "1990-01-01",
        streetAddress: "123 Main St",
        city: "Cityville",
        postalCode: "12345",
        country: "USA",
        skills: [
            {
                skill: "JavaScript",
                yearsExperience: 5,
                seniority: "Intermediate",
            },
            {
                skill: "React",
                yearsExperience: 3,
                seniority: "Junior",
            },
        ],
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        contactNumber: "987-654-3210",
        emailAddress: "jane.smith@example.com",
        dob: "1995-02-15",
        streetAddress: "456 Oak St",
        city: "Townsville",
        postalCode: "54321",
        country: "Canada",
        skills: [
            {
                skill: "Python",
                yearsExperience: 4,
                seniority: "Intermediate",
            },
            {
                skill: "Django",
                yearsExperience: 2,
                seniority: "Junior",
            },
        ],
    },
];

export async function getEmployees(): Promise<Employee[]> {
    // Simulate a delay (e.g., an API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return employeesData;
}

export async function saveEmployee(employee: Employee): Promise<Employee> {
    // Simulate saving the employee (e.g., an API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a unique ID (replace this with actual ID generation logic)
    const id = employeesData.length + 1;
    const newEmployee = { ...employee, id };

    // Update the mock data
    employeesData.push(newEmployee);

    return newEmployee;
}
