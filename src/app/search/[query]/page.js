"use client";
import React from 'react';
import axios from 'axios';
import Results from '@/app/components/Results'; // Adjust the import path as necessary

const SearchPage = ({ params }) => {
  const { query } = params;
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_API_KEY;
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
              api_key: apiKey,
              query,
              language: 'en-US',
              page: 1,
              include_adult: false
            }
          });
          setResults(response.data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchResults();
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Search Results for &quot;{query}&quot;
      </h1>

      <Results results={results} />
    </div>
  );
};

export default SearchPage;
