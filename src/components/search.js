import React from "react";
import { useState, useEffect } from "react";
import { fetchMovies } from "../services/api"; 

function Search(){
    const [searchTerm, setsearchTerm] = useState('');
    const [searchResults, setsearchResults] = useState([]);
    const [allMovies, setAllMovies] = useState([]); 

    useEffect(() => {
        const fetchMovie = async() => {
            try {
                const res = await fetchMovies();
                setAllMovies(res.results); 
                setsearchResults(res.results);
                console.log("Movies fetched successfully:", res.results);
            } catch (error) {
                console.error("Error while fetching movies:", error);
            }
        };

        fetchMovie(); 
    }, []);


    const handleSearch = (event) => {
        setsearchTerm(event.target.value);
    }

    const filterSearch = () => {
        if (searchTerm.trim() === '') {
            setsearchResults([]);
            return;
        }

        

        const results = allMovies.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("Search term:", searchTerm);
        console.log("Results test here",results);
        setsearchResults(results);
    }


    const handleSubmit = (event) => {
            event.preventDefault();
            filterSearch();
        }

    return(
        <div className="search-container">
            <form onSubmit={handleSubmit}>
        <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}

            />
            <button type="submit">Search up</button>
            </form>
            
            <div className="search-results">
                {searchResults.map((item) => (
                    <div key={item.id} className="search-item">
                        <h2>{item.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                    </div>
                ))}
            </div>
        </div>
    )


}

export default Search;