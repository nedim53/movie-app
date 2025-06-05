import React from "react";
import { useState, useEffect } from "react";
import { fetchMovies, fetchSearch, fetchSeries } from "../services/api"; 
import useTypeFetch from "../hooks/useTypeFetch.js";

function Search(){
    const [searchTerm, setsearchTerm] = useState('');
    const [searchResults, setsearchResults] = useState([]);
    //const [allMovies, setAllMovies] = useState([]); 
    const type = useTypeFetch(); 

    useEffect(() => {
        const fetchContent = async() => {
    if (type === "tv") {
        try{
            const res = await fetchSeries();
            setsearchResults(res.results);
        }catch (error) {
            console.error("Error while fetching series:", error);
        }
    }else if (type === "movie") {
        try {
            const res = await fetchMovies();
            //setAllMovies(res.results); 
            setsearchResults(res.results);
            console.log("Movies fetched successfully:", res.results);
        } catch (error) {
            console.error("Error while fetching movies:", error);
        }
    }
            
        }

        fetchContent(); 
    }, [type]);


    const handleSearch = (event) => {
        setsearchTerm(event.target.value);
        console.log("Search term:", event.target.value);
    }

    const filterSearch = async () => {
    if (searchTerm.trim() === '' || searchTerm.length < 3) {
        setsearchResults([]);
        return;
    }

    try {
        
            const time = setTimeout(async() => {
            
            try{
            const data = await fetchSearch(searchTerm,type);
            setsearchResults(data); 

           } catch (error) {
            setsearchResults([]);
           }
        },1000)
    return () => clearTimeout(time);
    }
    catch (error) {
    console.error("Error during search:", error);
    setsearchResults([]);           
   
};

    }

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
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                    </div>
                ))}
            </div>

        </div>
    )
}




export default Search;