import React from "react";
import { useEffect, useState } from "react";
import { fetchSeries } from "../services/api";

const SerieList = () => {
    const [series, setseries] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchSeries()
        .then((res) => {

            setseries(res.results);
            setLoading(false);
            console.log("Series are fetched !", res);
        })
        .catch((error) => {
            console.error("Error while collecting series:",error);
            setLoading(false);
        })

    }, []);

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Most Popular Series</h1>
            <div className="card-container">
                {series.map((item) =>(
                    <div key={item.id} className="card">
                        <h2>{item.name}</h2>
                     <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SerieList;