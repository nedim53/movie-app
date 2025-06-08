import React from "react";
import { useEffect, useState } from "react";
import { fetchSeries } from "../services/api";
import { Link } from "react-router-dom";

const SerieList = () => {
    const [series, setseries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ page , setpage] = useState(1);

    
    useEffect(() => {
    
    const loadSeries = async (pagenmbr) => {
        setLoading(true);
        try{
            const result = await fetchSeries(pagenmbr);
            setseries((previousSeries) => {
                const existingIds = new Set(previousSeries.map(s => s.id));
                const newSeries = result.results.filter(series =>!existingIds.has(series.id));
                return [...previousSeries, ...newSeries];
            });
            setLoading(false);
        }catch(error){
            console.error(error);
            setLoading(false);
        }
    };
    loadSeries(page);
},[page]);

useEffect(() => {
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
            setpage((prevPage) => prevPage + 1);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, [loading]);



    return (
        <div>
            <h1 className="headline">Most Popular Series</h1>
            <div className="card-container">
                {series.map((item) =>(
                    <div key={item.id} className="card">
                         <Link to={`/series/${item.id}`}>
                        <h2 className="headline">{item.name}</h2>
                        <div className="image-container">
                     <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} />
                    </div>
                    </Link>
                    </div>
                ))}

            </div>
          {/*}  <button
            onClick={handleLoadMore}>
                Load More
            </button> */}
            {loading && <h1>Loading...</h1>}
        </div>
    )
}

export default SerieList;