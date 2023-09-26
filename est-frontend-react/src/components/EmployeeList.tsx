import React from "react";
import { Employee } from "../interfaces/Employees";
import EmployeeItem from "./EmployeeItem";

interface EmployeeListProps {
    employees: Employee[];
    onEditEmployeeClick: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEditEmployeeClick }) => {
    return (
        <ul className="employeeList">
            {employees.map((employee, index) => (
                <EmployeeItem
                    key={employee._id}
                    employee={employee}
                    index={index}
                    onEditEmployeeClick={onEditEmployeeClick}
                />
            ))}
        </ul>
    );
};

export default EmployeeList;