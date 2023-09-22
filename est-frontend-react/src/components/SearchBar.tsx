import React, { useState } from "react"

const SearchBar: React.FC = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        const text = e.target.value;
        setSearchText(text);
        onSearch(text);
    }

    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchBar;