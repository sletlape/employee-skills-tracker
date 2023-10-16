import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";

interface FilterDropdownProps {
    onFilterChange: (filters: { skill: string; seniority: string; city: string }) => void;
}
const initFilters = {
    skill: "",
    seniority: "",
    city: "",
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState(initFilters);

    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleFilterChangeAndToggle = (filters: { skill: string; seniority: string; city: string }) => {
        onFilterChange(filters);
        setIsOpen(!isOpen);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleFilterChangeAndToggle(filters);
    };

    const handleResetFilters = () => {
        setFilters(initFilters);
        handleFilterChangeAndToggle(initFilters);
    };

    return (
        <div className="filter-dropdown">
            <span onClick={() => setIsOpen(!isOpen)}>Filter by { }
                <FontAwesomeIcon icon={faAngleDown} style={{ color: "#7b549c", }} />
            </span>
            {isOpen && (
                <div style={{ position: 'absolute', zIndex: 1 }}>
                    <form onSubmit={handleSubmit}>
                        <div className="filter-group">
                            <label htmlFor="skill">Skill:</label>
                            <input
                                type="text"
                                name="skill"
                                value={filters.skill}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="filter-group">
                            <label htmlFor="seniority">Seniority:</label>
                            <select
                                name="seniority"
                                value={filters.seniority}
                                onChange={handleFilterChange}
                            >
                                <option value="">Select...</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <button type="submit">Apply Filters</button>
                        <button type="button" onClick={handleResetFilters}>Reset Filters</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
