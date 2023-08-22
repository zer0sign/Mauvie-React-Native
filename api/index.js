import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', // Ganti dengan URL API Anda
    timeout: 20000, // Batas waktu maksimal untuk permintaan
    headers: {
        accept: 'application/json',
        Authorization: '' // isi dengan bearer token dari https://www.themoviedb.org/
      }
});
const api_key = ""; // untuk mendapatkan apikey silahkan buka https://www.themoviedb.org/ untuk mendapatkan api_key
  export const getMovies = async () => {
    try {
        const response = await instance.get('/discover/movie');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const detailMovies = async (movieId) => {
    try {
        const response = await instance.get('/movie/'+movieId);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const trailerMovies = async (movieId) => {
    try {
        const response = await instance.get('/movie/'+movieId+"/videos?api_key="+api_key);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await instance.get('/search/movie',{
            params:{
                query:query
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};