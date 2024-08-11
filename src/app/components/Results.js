"use client";
import React, { useState } from 'react';
import Card from './Card';

const Results = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 52;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='max-w-5xl mx-auto py-4'>
      <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {results.slice(startIndex, startIndex + itemsPerPage).map(result => (
          <Card key={result.id} result={result} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 m-1 rounded ${currentPage === index + 1 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Results;
