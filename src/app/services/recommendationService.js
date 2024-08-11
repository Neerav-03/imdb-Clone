import axios from 'axios';
import { getMovieDetails } from './tmdbService';

const BASE_URL = 'http://localhost:5000'; // Replace with your Flask server URL

export async function getRecommendations(title) {
  try {
    const response = await axios.get(`${BASE_URL}/recommend`, { params: { title } });
    console.log("lnknikn");
    // Assuming response.data is an array of movie IDs
    const movieIds = response.data.map(movie => movie.movie_id);
    
    // Fetch details for all movie IDs
    const movieDetailsPromises = movieIds.map(id => getMovieDetails(id));
    const movieDetails = await Promise.all(movieDetailsPromises);

    // Filter out any null responses
    return movieDetails.filter(movie => movie !== null);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}
