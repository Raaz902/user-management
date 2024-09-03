// src/components/Filters.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/userSlice';
import './Filters.css';

const Filters = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ domain: '', gender: '', available: '' });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    dispatch(fetchUsers({ filters })); // Ensure the correct action is dispatched
  };

  return (
    <div className="filters-container">
      <select name="domain" onChange={handleChange} value={filters.domain} className="filter-select">
        <option value="">All Domains</option>
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        <option value="IT">IT</option>
        <option value="Marketing">Marketing</option>
        <option value="Management">Management</option>
        <option value="UI Designing">UI Designing</option>
      </select>

      <select name="gender" onChange={handleChange} value={filters.gender} className="filter-select">
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Agender">Agender</option>
        <option value="Bigender">Bigender</option>
      </select>

      <select name="available" onChange={handleChange} value={filters.available} className="filter-select">
        <option value="">All Availability</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>

      <button onClick={applyFilters} className="apply-filters-button">Apply Filters</button>
    </div>
  );
};

export default Filters;
