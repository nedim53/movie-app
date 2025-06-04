
const API_BASE_URL_SERIES = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
const TMDB_TOKEN = process.env.REACT_APP_API;

console.log("api key", process.env.REACT_APP_API);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};
const API_BASE_URL_MOVIES = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

//const API_BASE_URL_FILTER = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';


export const fetchMovies = async () => {
    try{
        const response = await fetch(API_BASE_URL_MOVIES,options);
        if (!response.ok){
            throw new Error('Network response was not valid');
        }
        const rez = await response.json();
        return rez;
    }catch(error){
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export const fetchSeries = async () => {
    try{
        const response = await fetch(API_BASE_URL_SERIES,options);
        if (!response.ok){
            throw new Error('Network response was not valid');
        }
        const rez = await response.json();
        return rez;
    }catch(error){
        console.error('Error fetching series:', error);
        throw error;
    }
}

export const fetchDetails = async (id) => {
    try{
        const response = await fetch(API_BASE_URL_MOVIES + `/${id}?language=en-US`, options);
        if (!response.ok) {
            throw new Error('Network response was not valid');
        }
        const rez = await response.json();
        console.log("Details fetched successfully:", rez);

        const movie = rez.results.find(movie => movie.id.toString() === id);
        if (movie) {
            console.log("Movie found:", movie);
            return movie;
        }
        
    }catch(error){
        console.error("There has been an error",error);
        throw error;
    }
}


export const fetchSearch = async (searchTerm) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&language=en-US&page=1&include_adult=false`, options);
    if (!response.ok) {
      throw new Error('Network response was not valid');
    }
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error("Error fetching search results:", error);
    return []; 
  }
};

