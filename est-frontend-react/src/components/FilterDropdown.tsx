import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";

interface FilterDropdownProps {
    onFilterChange: (filters: { skill: string; seniority: string; city: string }) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        skill: "",
        seniority: "",
        city: "",
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onFilterChange(filters);
        setIsOpen(!isOpen)
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
                    </form>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
