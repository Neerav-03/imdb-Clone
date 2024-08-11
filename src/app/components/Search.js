"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Filter from './Filter';

const Search = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const router = useRouter();

  // Fetch genres from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure you have your API key
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: apiKey,
            language: 'en-US'
          }
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);
  //console.log(genres);
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
  
    if (searchQuery.trim()) {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const params = {
          api_key: apiKey,
          query: searchQuery,
          language: 'en-US',
          page: 1,
          include_adult: false,
          ...(genreId && { with_genres: genreId })  // Only add with_genres if genreId is set
        };
  
        console.log('API Request Params:', params);
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', { params });
        setSearchResults(response.data.results);
        console.log(response.data.results);
  
        router.push(`/search/${encodeURIComponent(searchQuery)}`);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setIsSearchActive(false);
    }
  };
  
  

  const toggleSearch = () => {
    if (isSearchActive && searchQuery.trim() === "") {
      setIsSearchActive(false);
    } else {
      setIsSearchActive(prevState => !prevState);
    }
  };

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
  
    if (newFilter === 'all') {
      setGenreId(null);
    } else {
      const selectedGenre = genres.find(
        genre => genre.name.toLowerCase() === newFilter.toLowerCase()
      );
      const genreId = selectedGenre ? selectedGenre.id : null;
      setGenreId(genreId);
      console.log(genreId);
    }
  
    // Trigger the search whenever the filter changes
    handleSearch();
  };
  
  

  return (
    <div className="flex flex-col items-center relative">
      {isSearchActive ? (
        <>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm mx-2 border border-gray-300 p-2 rounded h-8"
              placeholder="Search..."
              autoFocus
            />
            <button type="submit" className="text-xl mx-2">
              <FaSearch />
            </button>
          </form>
          {/* <Filter onFilterChange={handleFilterChange} /> Render the Filter component */}
        </>
      ) : (
        <button
          className="text-2xl mx-2"
          onClick={toggleSearch}
        >
          <FaSearch />
        </button>
      )}
    </div>
  );
};

export default Search;
