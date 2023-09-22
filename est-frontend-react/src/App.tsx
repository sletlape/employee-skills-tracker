// App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { Employee } from "./interfaces/Employees";
import { getEmployees } from "./services/employeeService";

function App() {
  const [employees, setEmpoyees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    getEmployees()
      .then(data => setEmpoyees(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddEmployeeClick = () => {
    setShowModal(true);
    setEditingEmployee(null);
  };

  const handleEditEmployeeClick = (employeeData: any) => {
    setShowModal(true);
    setEditingEmployee(employeeData);
  };

  const handleSaveEmployee = (employeeData: any) => {
    console.log("Employee data to save:", employeeData);
    setShowModal(false);
  };

  return (
    <div className="App">
      <div className="container">
        <Header onAddEmployeeClick={handleAddEmployeeClick} employeeCount={employees.length} />
        <EmployeeList employees={employees} onEditEmployeeClick={handleEditEmployeeClick} />
        {showModal && (
          <EmployeeForm
            onClose={() => setShowModal(false)}
            onSave={handleSaveEmployee}
            employeeData={editingEmployee}
          />
        )}
      </div>
    </div>
  );
}

export default App;
