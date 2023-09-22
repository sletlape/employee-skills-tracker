import { Employee } from "../interfaces/Employees";

export async function getEmployees(): Promise<Employee[]> {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/employees`);
        if (!response.ok) {
            throw new Error('Network error.')
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error retriving employees: ${error.message}`)
    }

}