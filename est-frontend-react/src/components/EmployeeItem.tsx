import React from 'react';
import { Employee } from '../interfaces/Employees';

interface EmployeeItemProps {
    employee: Employee;
    index: number;
    onEditEmployeeClick: () => void;
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ employee, index, onEditEmployeeClick }) => (
    <li className="employee" key={index} onClick={onEditEmployeeClick}>
        <div className="employeeIndex">{index + 1}</div>
        <div className="employeeFirstName">{employee.firstName}</div>
        <div className="employeeLastName">{employee.lastName}</div>
        <div className="employeeContacts">{employee.contactNumber}</div>
    </li>
);

export default EmployeeItem;
