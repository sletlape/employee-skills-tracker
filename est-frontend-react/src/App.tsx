import './App.css';

function App() {

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <div className="title">
            <h3>Employees</h3>
            <h6>There are X employees </h6>
          </div>
          <div className="searchbar">Search</div>
          <div className="filter">Filter by v </div>
          <div className="addEmployeeBtn">+ New Employees</div>
        </div>
        <div className="employeeList">
          <div className="employee">
            <div className="employeeIndex">1</div>
            <div className="employeeFirstName">First name</div>
            <div className="employeeLastName">Last name</div>
            <div className="employeeContacts">012 345 6789</div>
            <div className="deleteBtn">D</div>
          </div>
          <div className="employee">
            <div className="employeeIndex">2</div>
            <div className="employeeFirstName">First name</div>
            <div className="employeeLastName">Last name</div>
            <div className="employeeContacts">012 345 6789</div>
            <div className="deleteBtn">D</div>
          </div>
          <div className="employee">
            <div className="employeeIndex">3</div>
            <div className="employeeFirstName">First name</div>
            <div className="employeeLastName">Last name</div>
            <div className="employeeContacts">012 345 6789</div>
            <div className="deleteBtn">D</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
