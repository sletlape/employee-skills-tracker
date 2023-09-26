import { Employee } from "../interfaces/Employees";

// const baseURL: string = import.meta.env.API_BASE_URL;
// const apiVersion: string = import.meta.env.API_VER;
// const resourcePath = "employees";
// const apiURL: string = `${baseURL}/${apiVersion}/${resourcePath}`;

const apiURL: string = `http://localhost:3000/api/v1/employees`;

export async function getEmployees(): Promise<Employee[]> {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error("Network error.")
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error retrieving employees: ${(error as Error).message}`);
    }
}

export async function saveEmployee(employeeData: Employee): Promise<Employee[]> {
    console.log("Sending POST request")
    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeData),
        });
        if (!response.ok)
            throw new Error("Network error.");

        const savedEmpoyee = await response.json();
        console.log(savedEmpoyee)
        return savedEmpoyee;
        
    } catch (error) {
        throw new Error(`Error retrieving employees: ${(error as Error).message}`);
    }
}

export async function deleteEmployee(employeeId: string): Promise<Response> {
    let response;
    try {
        console.log("Deleting employee with id:", employeeId)
        response = await fetch(`${apiURL}/${employeeId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Network error.")
        }
    } catch (error) {
        throw new Error(`Error deleting employee: ${(error as Error).message}`);
    }
    return response;
}

export async function updateEmployee(employeeId: string, updateEmployeeData: Employee): Promise<Employee> {
    console.log("Updating user:", employeeId)
    try {
        const response = await fetch(`${apiURL}/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateEmployeeData)
        });

        if (!response.ok) {
            throw new Error("Network error.");
        }
        const updatedEmployee = await response.json();
        return updatedEmployee;
    } catch (error) {
        throw new Error(`Error updating employee: ${(error as Error).message}`);
        
    }
}