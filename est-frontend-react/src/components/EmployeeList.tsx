import { Employee } from "../interfaces/Employees";
import EmployeeItem from "./EmployeeItem";

interface EmployeeListProps {
    employees: Employee[]
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
    return <ul className="employeeList">
        {employees.map((employee, index) => (
            <EmployeeItem key={index} employee={employee} index={index} />
        ))}
    </ul>;
}

export default EmployeeList;