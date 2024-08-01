"use client"
import React, { useState } from 'react';
import { getRecommendations } from '../services/recommendationService';

const Home = () => {
  const [title, setTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async () => {
    const data = await getRecommendations(title);
    setRecommendations(data);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-medium text-amber-600">Movie Recommendations</h1>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          className="p-2 border border-gray-300 rounded"
        />
        <button 
          onClick={handleSearch} 
          className="p-2 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          Get Recommendations
        </button>
      </div>
      <ul className="space-y-2 mt-4">
        {recommendations.map((movie) => (
          <li key={movie.title} className="cursor-pointer sm:p-3
    sm:hover:shadow-slate-400
    sm:shadow-md rounded-lg sm:border sm:border-slate-400 group sm:m-2 transition-shadow duration-200">
            {movie.title} (Similarity: {movie.similarity.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
