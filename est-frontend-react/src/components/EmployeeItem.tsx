import React from 'react';
import { Employee } from '../interfaces/Employees';

interface EmployeeItemProps {
    employee: Employee;
    index: number;
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee, index }) => (
    <li className="employee" key={index}>
        <div className="employeeIndex">{index + 1}</div>
        <div className="employeeFirstName">{employee.firstName}</div>
        <div className="employeeLastName">{employee.lastName}</div>
        <div className="employeeContacts">{employee.contactNumber}</div>
        <div className="deleteBtn">D</div>
    </li>
);

export default EmployeeItem;
