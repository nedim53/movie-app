import React from "react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";

const MovieList = () => {
    const [ movie , setmovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies()
        .then((result) => {

            setmovies(result.results);
            setLoading(false);
            console.log("Movies fetched successfully:", result);
            
        })
        .catch((error) => {
            console.error("Error while finding movies:",error);
            setLoading(false);
        })
    } ,[]);

if (loading){
    return <h1>Loading...</h1>
}

return (
    
    <div>
        <h1>Movie list</h1>
        <div className = "movie-card-container">
            {movie.map((item) => (
                <div key={item.id} className="movie-card">
                    <h2>{item.name}</h2>
    
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} />
                </div>
            ))}
        </div>
    </div>
    );

}

export default MovieList;