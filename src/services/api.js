
const TMDB_TOKEN = process.env.REACT_APP_API;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};


export const fetchMovies = async (page = 1) => {
  const url =`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    try{
        const response = await fetch(url,options);
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

export const fetchSeries = async (page = 1) => {
  const urlSeries = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;

    try{
        const response = await fetch(urlSeries,options);
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


export const fetchDetails = async (id, type = 'movie') => {
  if (type !== 'movie' && type !== 'tv') {
    throw new Error('Invalid type specified. Must be "movie" or "tv".');
  }

  const url = `https://api.themoviedb.org/3/${type}/${id}?language=en-US`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not valid');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${type} details:`, error);
    throw error;
  }
};


export const fetchSearch = async (searchTerm, type) => {
  const encodedTerm = encodeURIComponent(searchTerm);
  const baseURL = "https://api.themoviedb.org/3/search";
  
  const url = `${baseURL}/${type}?query=${encodedTerm}&language=en-US&page=1&include_adult=false`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not valid');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${type} search results:`, error);
    return [];
  }
};

