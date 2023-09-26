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
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({ skill: "", seniority: "", city: "" });


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

  useEffect(() => {
    const filteredEmployees = async () => {
      try {
        // Create an object to hold the query parameters
        const queryParams: { [key: string]: string } = {};

        if (searchText.trim() !== "") {
          queryParams.search = searchText;
        }

        if (filters.skill) {
          queryParams.skill = filters.skill;
        }
        if (filters.seniority) {
          queryParams.seniority = filters.seniority;
        }
        if (filters.city) {
          queryParams.city = filters.city;
        }

        // Build the query string from the queryParams object
        const queryString = Object.keys(queryParams)
          .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
          .join("&");

        // Make the API request with the query string
        const filtered = await getEmployees(queryString);
        

        setEmployees(filtered);
      } catch (error) {
        console.error("Error filtering employees:", error);
      }
    };

    filteredEmployees();
  }, [searchText, filters]);


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
        <Header
          onAddEmployeeClick={handleAddEmployeeClick}
          employeeCount={employees.length}
          onSearch={(text) => {
            console.log(text)
            setSearchText(text)
          }}
          onFilterChange={(newFilters) => {
            console.log(newFilters);
            setFilters(newFilters)
          }}
        />
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
