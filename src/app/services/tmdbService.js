// services/tmdbService.js
import axios from 'axios';
const TMDB_API_KEY = process.env.API_KEY; // Replace with your TMDB API key
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie';

export async function getMovieDetails(movieId) {
  try {
    const response = await axios.get(`${TMDB_API_URL}/${movieId}`, {
      params: { api_key: TMDB_API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    return null;
  }
}
