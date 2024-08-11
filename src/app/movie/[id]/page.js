"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";
import './disqusStyles.css'; // Import your custom styles
import DarkMode from "@/app/components/DarkMode"; // Assuming this is your dark mode toggle component
import { getRecommendations } from "@/app/services/recommendationService";
import Card from "@/app/components/Card";

const MoviePage = ({ params }) => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await res.json();
        setMovie(data);

        // Fetch recommendations based on the movie title
        const recs = await getRecommendations(data.title);
        setRecommendations(recs);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError(error.message);
      }
    };

    fetchMovie();
  }, [params.id]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedRecommendations = recommendations.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-5xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
          width={500}
          height={300}
          alt="movie image"
          className="rounded-lg"
          style={{ maxWidth: "100%", height: "100%" }}
        />
        <div className="p-2">
          <h2 className="text-2xl font-bold mb-4">{movie.title || movie.name}</h2>
          <p className="mb-3 text-lg">
            <span className="font-semibold mr-1">Overview: </span>
            {movie.overview}
          </p>
          <p className="p-2">
            <span className="font-semibold mr-1">Released Date: </span>
            {movie.first_air_date || movie.release_date}
          </p>
          <p className="flex items-center p-2">
            <span className="font-semibold mr-1">Rating: </span>
            <AiFillHeart className="text-red-500 ml-3 mr-1" /> {movie.vote_count}
          </p>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="p-4 md:pt-8 flex flex-col items-center content-center max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Recommended Movies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedRecommendations.map((rec, index) => (
            <Card key={rec.id} result={rec} />
          ))}
        </div>

        {/* Pagination Controls */}
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

      {/* Disqus Section */}
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-5xl mx-auto md:space-x-6">
        <div className="w-full">
          <DiscussionEmbed
            shortname="imdbclone"
            config={{
              url: `https://imdb-clone-1-k4i4.onrender.com/movie/${movie.id}`,
              identifier: movie.id.toString(),
              title: movie.title || movie.name,
              language: "en_US" // Specify your desired language
            }}
            className="disqus-wrapper" // Toggle between light and dark styles
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
