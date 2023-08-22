import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', // Ganti dengan URL API Anda
    timeout: 10000, // Batas waktu maksimal untuk permintaan
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWM4YjA0YTNhZDAxZjkxZmM2ZDRhYjk3MjVmYThhNSIsInN1YiI6IjY0ZGVlODhjMzcxMDk3MDBjNTFlMzUwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.epBBa-Eg4wCLhFWFn2RefxPK_2cDGMWnmQRXEBnsAY4'
      }
});

  export const getMovies = async () => {
    try {
        const response = await instance.get('/discover/movie?page=1');
        return response.data;
    } catch (error) {
        throw error;
    }
};