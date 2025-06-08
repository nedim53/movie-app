import React from "react";
import { useEffect, useState } from "react";
import { fetchDetails } from "../services/api";
import { useParams} from "react-router-dom";
import useTypeFetchh from "../hooks/useTypeFetch";

const Details = () => {

    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const type = useTypeFetchh();

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
        return <h1>Movie not found.</h1>;
    }
    return (
         <div className="detail-container">
            <h1>{details.title ? details.title : details.name }</h1>
            <p>{details.overview ? details.overview : "No description available"}</p>
            <p>{details.relese_date}</p>
            <p>Popularity: {details.popularity}</p>
            <p>Votes on average: {details.vote_average}</p>
                        <img src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.name} />

            </div>
    );


}

export default Details;