import React, { useState } from "react";
interface SearchBarProps {
    onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSearchText(text);
        onSearch(text);
    };

    return (
        <input
            className="searchbar"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
        />
    );
};

export default SearchBar;