import { useEffect, useState } from 'react';
import './App.css';

function App() {
  interface Employee {
    firstName: string;
    lastName: string;
    contactNumber: string;
  }

  const [employees, setEmpoyees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/employees`)
      .then(res => res.json())
      .then(data => setEmpoyees(data))
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="title">
            <h3>Employees</h3>
            <h6>There are {employees.length} employees </h6>
          </div>
          <div className="searchbar">Search</div>
          <div className="filter">Filter by v </div>
          <div className="addEmployeeBtn">+ New Employees</div>
        </div>
        <div className="employeeList">
          {employees.map((employee, index) => (
            <li className="employee" key={index}>
              <div className="employeeIndex">{index + 1}</div>
              <div className="employeeFirstName">{employee.firstName}</div>
              <div className="employeeLastName">{employee.lastName}</div>
              <div className="employeeContacts">{employee.contactNumber}</div>
              <div className="deleteBtn">D</div>
            </li>
          ))}

        </div>
      </div>
    </div>
  )
}

export default App
