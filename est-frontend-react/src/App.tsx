import { useEffect, useState } from 'react';
import './App.css';
import { getEmployees } from './services/employeeService';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import { Employee } from './interfaces/Employees';

function App() {
  const [employees, setEmpoyees] = useState<Employee[]>([]);

  useEffect(() => {
    getEmployees()
      .then(data => setEmpoyees(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <div className="container">    
        <Header employeeCount={employees.length} />
        <EmployeeList employees={employees} />
      </div>
    </div>
  )
}

export default App
