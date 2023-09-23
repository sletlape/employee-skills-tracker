import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import SearchBar from './SearchBar';

interface HeaderProps {
    employeeCount: number,
    onAddEmployeeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ employeeCount, onAddEmployeeClick }) => {
    // const [selectedFilter, setSelectedFilter] = useState<string>('All');
    return (
        <div className="header">
            <div className="title">
                <h3>Employees</h3>
                <h6>{employeeCount > 0 ?`There are ${employeeCount} employees` : 'No Employees' }</h6>
            </div>
            <div className="search-filter">
            {
                employeeCount > 0 &&
                    <>
                        <SearchBar />
                        <div className="filter">
                            Filter by { }
                            <FontAwesomeIcon icon={faAngleDown} style={{ color: "#7b549c", }} />
                        </div>
                    </> 
                }
            </div>
            <button className="addEmployeeBtn" onClick={onAddEmployeeClick}>
                <FontAwesomeIcon icon={faCirclePlus} size='2xl' style={{ "--fa-primary-color": "#ffffff", "--fa-secondary-color": "#722fa1", "--fa-secondary-opacity": "1", }} />
                { } New Employees
            </button>
        </div>
    );
};

export default Header;