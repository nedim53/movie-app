import React from "react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import { Link} from "react-router-dom";

const MovieList = () => {
    const [ movie , setmovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page , setPage] = useState(1);

    

  useEffect(() => {

  const loadMovies = async (pageNumber) => {
    setLoading(true);
    try {
      const result = await fetchMovies(pageNumber);
    setmovies((prevMovies) => {
        const existingIds = new Set(prevMovies.map(m => m.id));
        const newMovies = result.results.filter(movie => !existingIds.has(movie.id));
        return [...prevMovies, ...newMovies];
      });      setLoading(false);
    } catch (error) {
      console.error("Error while fetching movies:", error);
      setLoading(false);
    }
  };
    loadMovies(page);
    }, [page]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
                setPage((prevPage) => prevPage + 1);
            }};
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);



return (
    
    <div>
        <h1 className="headline">Most popular Movies</h1>
        <div className = "card-container">
            {movie.map((item) => (
                <div key={item.id} className="card">
                    <Link to={`/movie/${item.id}`}>
                    <h2 className="headline">{item.original_title}</h2>
                    <div className="image-container">
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} />
                    </div>
                    </Link>
                </div>
            ))}
        </div>

        {/*}<button
        onClick={handleLoadMore}
        >Load more</button> */}
        {loading && <h1>Loading...</h1>}
    </div>
    );

}

export default MovieList;