import React from 'react'

interface HeaderProps {
    employeeCount: number
}

const Header: React.FC<HeaderProps> = ({ employeeCount }) => {
    return (
        <div className="header">
            <div className="title">
                <h3>Employees</h3>
                <h6>There are {employeeCount} employees </h6>
            </div>
            <div className="searchbar">Search</div>
            <div className="filter">Filter by v </div>
            <div className="addEmployeeBtn">+ New Employees</div>
        </div>
    );
};

export default Header;