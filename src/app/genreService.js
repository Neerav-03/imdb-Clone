// genreService.js
import axios from 'axios';

let genresCache = null;

export const fetchGenres = async () => {
  if (!genresCache) {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: apiKey,
          language: 'en-US',
        },
      });
      genresCache = response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }
  return genresCache;
};
