import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

interface HeaderProps {
    employeeCount: number;
    onAddEmployeeClick: () => void;
    onSearch: (searchText: string) => void;
    onFilterChange: (filters: { skill: string; seniority: string; city: string }) => void;
}

const Header: React.FC<HeaderProps> = ({ employeeCount, onAddEmployeeClick, onSearch, onFilterChange }) => {
    return (
        <div className="header">
            <div className="title">
                <h3>Employees</h3>
                <h6>{employeeCount > 0 ?`There are ${employeeCount} employees` : 'No Employees' }</h6>
            </div>
            <div className="search-filter">
            {
                // employeeCount > 0 &&
                    <>
                        <SearchBar onSearch={onSearch} />
                        <FilterDropdown onFilterChange={onFilterChange} />
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