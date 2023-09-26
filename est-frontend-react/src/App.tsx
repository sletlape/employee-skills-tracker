import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { Employee } from "./interfaces/Employees";
import { deleteEmployee, getEmployees, saveEmployee, updateEmployee } from "./services/employeeService";
import doodle from "./assets/Icon-removebg-preview.png";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(undefined);
  const [shouldUpdateEmployees, setShouldUpdateEmployees] = useState(false);

  useEffect(() => {
    getEmployees()
      .then((data) => {
        setEmployees(data);
        if (shouldUpdateEmployees) {
          getEmployees()
            .then((updatedData) => setEmployees(updatedData))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, [shouldUpdateEmployees]);

  const handleAddEmployeeClick = () => {
    setShowModal(true);
    setEditingEmployee(undefined);
  };

  const handleEditEmployeeClick = (employeeData: Employee) => {
    setShowModal(true);
    setEditingEmployee(employeeData);
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    if (editingEmployee && editingEmployee._id) {
      updateEmployee(editingEmployee._id, employeeData)
        .then((updatedEmployee) => {
          console.log("Updating:", updatedEmployee)
          setShouldUpdateEmployees(true);
        })
        .catch((error) => console.error("Error updating employee:", error));
    } else {
      saveEmployee(employeeData)
        .then((newEmployee) => {
          console.log("Adding employee:", newEmployee)
          setEditingEmployee(undefined);
          setShouldUpdateEmployees(true);
        })
        .catch((error) => console.error("Error adding employee:", error));
    }

    setShowModal(false);
  };

  const handleDeleteEmployee = async (employeeID: string) => {
    console.log("Deleting employee", employeeID);
    try {
      const response = await deleteEmployee(employeeID);
      if (response.status === 200) {
        // Trigger an update of employee data
        setShouldUpdateEmployees(true);
      }
    } catch (error) {
      console.error(`Error deleting employee and/or updating employee state: ${(error as Error).message}`);
    }
    setShowModal(false);
  }

  return (
    <div className="App">
      <div className="container">
        <Header onAddEmployeeClick={handleAddEmployeeClick} employeeCount={employees.length} />
        {employees.length > 0 ? (
          <EmployeeList employees={employees} onEditEmployeeClick={handleEditEmployeeClick} />
        ) : (
          <div className="no-employees">
            <img src={doodle} alt="No employees" />
            <h4>There is nothing here</h4>
            <h5>Create a new employee by clicking</h5>
            <h5><strong>New Employee</strong> button to get started</h5>
          </div>
        )}
        {showModal && (
          <EmployeeForm
            onClose={() => setShowModal(false)}
            onSave={handleSaveEmployee}
            onDelete={handleDeleteEmployee}
            employeeData={editingEmployee}
          />
        )}
      </div>
    </div>
  );
}

export default App;
