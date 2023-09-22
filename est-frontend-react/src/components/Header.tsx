import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCirclePlus } from "@fortawesome/free-solid-svg-icons"

interface HeaderProps {
    employeeCount: number
}

const Header: React.FC<HeaderProps> = ({ employeeCount, onAddEmployeeClick }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('All')
    return (
        <div className="header">
            <div className="title">
                <h3>Employees</h3>
                <h6>There are {employeeCount} employees </h6>
            </div>
            <div className="searchbar">Search</div>
            <div className="filter">
                Filter by { }
                <FontAwesomeIcon icon={faAngleDown} style={{ color: "#7b549c", }} />
            </div>
            <button className="addEmployeeBtn">
                <FontAwesomeIcon icon={faCirclePlus} size='2xl' style={{ "--fa-primary-color": "#ffffff", "--fa-secondary-color": "#722fa1", "--fa-secondary-opacity": "1", }} />
                { } New Employees
            </button>
        </div>
    );
};

export default Header;