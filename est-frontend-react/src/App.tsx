import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { Employee } from "./interfaces/Employees";
import { deleteEmployee, getEmployees,  } from "./services/employeeService";
import doodle from "./assets/Icon-removebg-preview.png";

function App() {
  const [employees, setEmpoyees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(undefined);

  useEffect(() => {
    getEmployees()
      .then(data => setEmpoyees(data))
      .catch((err) => console.log(err));
  }, [employees]);

  const handleAddEmployeeClick = () => {
    setShowModal(true);
    setEditingEmployee(undefined);
  };

  const handleEditEmployeeClick = (employeeData: Employee) => {
    setShowModal(true);
    setEditingEmployee(employeeData);
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    console.log("Employee data to save in state:", employeeData);
    setEmpoyees([...employees, employeeData]);
    setShowModal(false);
  };

  const handleDeleteEmployee = async (employeeID: string) => {
    console.log("Deleting employee", employeeID);
    try {
      const response = await deleteEmployee(employeeID);
      if (response.status === 200) {
        setEmpoyees(employees.filter(employee => employee.id !== employeeID));
      }
    } catch (error) {
      console.error(`Error deleting employee and/or updating employee state: ${(error as Error).message}`);
    }
    setShowModal(false);
  }

  const hanldeUpdateEmployee = (employeeID: string) => {
    console.log("Updating employee", employeeID)
  }

  return (
    <div className="App">
      <div className="container">
        <Header onAddEmployeeClick={handleAddEmployeeClick} employeeCount={employees.length} />
        { employees.length > 0 ?
          <EmployeeList employees={employees} onEditEmployeeClick={handleEditEmployeeClick} /> :
          <div className="no-employees">
            <img src={doodle}></img>
            <h4>There is nothing here</h4>
            <h5>Create a new employee by clicking</h5>
            <h5><strong>New Employee</strong> button to get started</h5>
          </div>
        }
        {
          showModal && (
          <EmployeeForm
              onClose={() => setShowModal(false)}
              onSave={handleSaveEmployee}
              onDelete={handleDeleteEmployee}
              employeeData={editingEmployee}
              updateEmployee={hanldeUpdateEmployee}
            />
        )}
      </div>
    </div>
  );
}

export default App;
