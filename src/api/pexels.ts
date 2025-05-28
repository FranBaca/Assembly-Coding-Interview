import axios from 'axios';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchPexelsPhotos = async () => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/curated', {
      headers: {
        Authorization: API_KEY,
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const fetchPhotoById = async (id: number) => {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw error;
  }
}; 