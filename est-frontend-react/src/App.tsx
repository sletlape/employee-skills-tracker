import { useEffect, useState } from 'react';
import './App.css';
import { getEmployees } from './services/employeeService';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import { Employee } from './interfaces/Employees';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [employees, setEmpoyees] = useState<Employee[]>([]);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


  useEffect(() => {
    getEmployees()
      .then(data => setEmpoyees(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddEmployeeClick = () => {
    setIsAddEmployeeModalOpen(true);
    setSelectedEmployee(null); // Clear selected employee data
  };

  const handleEditEmployeeClick = (employee: Employee) => {
    setIsAddEmployeeModalOpen(true);
    setSelectedEmployee(employee); // Set selected employee data for editing
  };

  const handleSaveEmployee = (employee: Employee) => {
    // Handle saving employee data (add or edit)
    // Add your logic here to update the employees list or send data to the server
    console.log('Saved employee data:', employee);

    // Close the modal
    setIsAddEmployeeModalOpen(false);
  };


  const handleCloseEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  return (
    <div className="App">
      <div className="container">    
        <Header employeeCount={employees.length} onAddEmployeeClick={handleAddEmployeeClick} />
        <EmployeeList employees={employees} />
        <EmployeeForm
          onClose={handleCloseEmployeeModal}
          onSave={handleSaveEmployee}
        />
      </div>
    </div>
  )
}

export default App
