const API_BASE_URL = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWEzNDkyOTBkNDZjMGMwMDk0ZGJiODkwZTI1NTI0NiIsIm5iZiI6MTc0ODg2ODExMy4zMDU5OTk4LCJzdWIiOiI2ODNkOWMxMTI3MGJhNWFhMDFmZGI0MmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AMB8qLCzzBhCUlrOhZSA1MeiAjH6CsaxmTmUSITp79E'
  }
};

export const fetchMovies = async () => {
    try{
        const response = await fetch(API_BASE_URL,options);
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

