import { TextField } from "@mui/material";
import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        placeholder="Search recipes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
