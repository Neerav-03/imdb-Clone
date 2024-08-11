"use client";
import React, { useState, useEffect } from 'react';
import { fetchGenres } from '../genreService';

const Filter = ({ onFilterChange = () => {} }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    };

    loadGenres();
  }, []); // Fetch genres only once when the component mounts

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter); // Notify parent of the filter change
  };

  return (
    <select
      value={selectedFilter}
      onChange={handleFilterChange}
      className="text-xs mx-2 border border-gray-300 rounded h-8 p-2"
    >
      <option
        value="all"
        className={`${
          selectedFilter === 'all' ? 'bg-amber-500 text-white' : 'bg-white text-black'
        }`}
      >
        All
      </option>
      {genres.map((genre) => (
        <option
          key={genre.id}
          value={genre.id}
          className={`${
            selectedFilter === genre.id.toString() ? 'bg-amber-500 text-white' : 'bg-white text-black'
          }`}
        >
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default Filter;
