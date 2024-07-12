"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from "next-themes";
import './disqusStyles.css'; // Import your custom styles
import DarkMode from "@/app/components/DarkMode";

const MoviePage = ({ params }) => {
  const [movie, setMovie] = useState(null);

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
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [params.id]);

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
          <h2 className="text-lg mb-3">{movie.title || movie.name}</h2>
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur odit
        laboriosam labore expedita quidem ipsam iste perferendis explicabo
        delectus, quos error doloribus, velit blanditiis obcaecati, alias
        repudiandae vel voluptatem accusantium.
      </p>
      
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-5xl mx-auto md:space-x-6">
        <div className="w-full">
          <DiscussionEmbed
            shortname="imdbclone"
            config={{
              url: `https://your-site.com/movie/${movie.id}`,
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
