// src/components/SearchBar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/userSlice';

const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(fetchUsers({ search: e.target.value }));
    };

    return (
        <input 
          type="text" 
          placeholder="Search by name..." 
          onChange={handleSearch} 
        />
    );
};

export default SearchBar;
