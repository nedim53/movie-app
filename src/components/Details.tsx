import React from "react";
import { useEffect, useState } from "react";
import { fetchDetails } from "../services/api";
import { useParams } from "react-router-dom";

interface DetailsData {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    relese_date?: string;
    popularity?: number;
    vote_average?: number;
}


const Details = () => {

const [details, setDetails] = useState<DetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const { type,id} = useParams();

    useEffect(() => {
        setLoading(true);
        fetchDetails(id,type)
            .then((elements) => {
                setDetails(elements);
                setLoading(false);
                
            })
            .catch((error) => {
                console.error("Error while fetching details:", error);
                setLoading(false);
            });
    }, [id,type]);

    if (loading) {
        return <h1>Loading...</h1>;
    }
if (!details) {
        return <h1>Content not found.</h1>;
    }

    const getTitle = () =>{
        return details.title || details.name || "No title available";

    }
    return (
         <div className="detail-container">
            <h1>{getTitle() }</h1>
            <p>{details.overview ? details.overview : "No description available"}</p>
            <p>{details.relese_date}</p>
            <p>Popularity: {details.popularity}</p>
            <p>Votes on average: {details.vote_average}</p>
                        <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.name} />

            </div>
    );


}

export default Details;