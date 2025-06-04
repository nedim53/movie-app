import React from "react";
import { useState, useEffect } from "react";
import { fetchMovies, fetchSearch } from "../services/api"; 

function Search(){
    const [searchTerm, setsearchTerm] = useState('');
    const [searchResults, setsearchResults] = useState([]);
    //const [allMovies, setAllMovies] = useState([]); 

    useEffect(() => {
        const fetchMovie = async() => {
            try {
                const res = await fetchMovies();
                //setAllMovies(res.results); 
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
        console.log("Search term:", event.target.value);
    }

    const filterSearch = async () => {
    if (searchTerm.trim() === '') {
        setsearchResults([]);
        return;
    }

    try {
        const data = await fetchSearch(searchTerm);
        setsearchResults(data); // jer fetchSearch već vraća data.results
    } catch (error) {
        setsearchResults([]);
    }
};



    const handleSubmit = async (event) => {
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
                onKeyUp={handleSubmit}
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