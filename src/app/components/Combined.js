"use client";
import React, { useState } from 'react';
import Search from './Search';
import Filter from './Filter';

const MovieSearchPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleFilterChange = (newGenreId) => {
    setSelectedGenre(newGenreId);
  };

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      <Search genreId={selectedGenre} />
      {/* Render search results here */}
    </div>
  );
};

export default MovieSearchPage;
