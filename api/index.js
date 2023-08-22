import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', // Ganti dengan URL API Anda
    timeout: 20000, // Batas waktu maksimal untuk permintaan
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWM4YjA0YTNhZDAxZjkxZmM2ZDRhYjk3MjVmYThhNSIsInN1YiI6IjY0ZGVlODhjMzcxMDk3MDBjNTFlMzUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.epBBa-Eg4wCLhFWFn2RefxPK_2cDGMWnmQRXEBnsAY4'
      }
});
const api_key = "89c8b04a3ad01f91fc6d4ab9725fa8a5";
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