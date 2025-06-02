import React from "react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import { Link} from "react-router-dom";

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
        <h1>Most popular Movies</h1>
        <div className = "card-container">
            {movie.map((item) => (
                <div key={item.id} className="card">
                    <Link to={`/movie/${item.id}`}>
                    <h2>{item.original_title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} />
                    </Link>
                </div>
            ))}
        </div>
    </div>
    );

}

export default MovieList;