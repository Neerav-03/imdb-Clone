"use client";
import React, { useState } from 'react';
import { getRecommendations } from '../services/recommendationService';
import Card from '../components/Card';

const Home = () => {
  const [title, setTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const handleSearch = async () => {
    const data = await getRecommendations(title);
    setRecommendations(data);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the start and end indices for the current page
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentRecommendations = recommendations.slice(startIdx, endIdx);
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  return (
    <div className="home-container max-w-6xl mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-medium text-amber-600">Movie Recommendations</h1>
      <div className="search-container flex flex-col space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          className="search-input p-2 border border-gray-300 rounded"
        />
        <button 
          onClick={handleSearch} 
          className="search-button p-2 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          Get Recommendations
        </button>
      </div>
      <div className="recommendations-grid sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-5xl mx-auto py-4">
        {currentRecommendations.map((recommendation) => (
          <Card key={recommendation.id} result={recommendation} />
        ))}
      </div>
      <div className="pagination-container flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 m-1 rounded ${currentPage === index + 1 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
