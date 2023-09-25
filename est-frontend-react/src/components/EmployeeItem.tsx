import React from 'react';
import { Employee } from '../interfaces/Employees';

interface EmployeeItemProps {
    employee: Employee;
    index: number;
    onEditEmployeeClick: (employee: Employee) => void;
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee, index, onEditEmployeeClick }) => {
    const handleClick = () => {
        if (onEditEmployeeClick) {
            onEditEmployeeClick(employee)
        }
    }
    return (
        <li className="employee" key={index} onClick={handleClick}>
            <div className="employeeIndex">{index + 1}</div>
            <div className="employeeFirstName">{employee.firstName}</div>
            <div className="employeeLastName">{employee.lastName}</div>
            <div className="employeeContacts">{employee.contactNumber}</div>
        </li>
    )
};

export default EmployeeItem;
