import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your Flask server URL

export async function getRecommendations(title) {
  try {
    const response = await axios.get(`${BASE_URL}/recommend`, { params: { title } });
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}
