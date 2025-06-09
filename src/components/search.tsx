import React, { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useState, useEffect } from "react";
import {  fetchSearch } from "../services/api"; 
import useTypeFetchh from "../hooks/useTypeFetch";

interface SearchItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
}

function Search(){
    const [searchTerm, setsearchTerm] = useState<string>("");
    const [searchResults, setsearchResults] = useState<SearchItem[]>([]);
    const type = useTypeFetchh(); 

    useEffect(() => {
        const fetchContent = async() => {
    if (!searchTerm || searchTerm.trim().length <3) {
            setsearchResults([]);
            return;
        }

   
        try{
            const res = await fetchSearch(searchTerm,type);
            setsearchResults(res || []);
        }catch (error) {
            console.error("Error while fetching series:", error);
            setsearchResults([]);
        }
    };
            fetchContent();
            
            }, [type,searchTerm]);


    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setsearchTerm(event.target.value);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter" && searchTerm.trim().length >= 3) {
            event.preventDefault();
            filterSearch();}};



    const filterSearch = async () => {
    try{
        const data = await fetchSearch(searchTerm, type);
        setsearchResults(data || []);
    } catch (error) {
        console.error("Error while fetching search results:", error);
        setsearchResults([]);   
    }        
    };

    

    const handleSubmit = async (  event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if(searchTerm.trim().length >= 3){
                filterSearch();
            }else{
                setsearchResults([]);
            }
        }
        
    return(
        <div className="search-container">
            <form onSubmit={handleSubmit}>
        <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyUp={handleKeyUp}
            />
            <button className="search-button" type="submit">Search up</button>
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