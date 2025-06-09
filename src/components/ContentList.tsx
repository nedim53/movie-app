import React, {useEffect, useState} from "react";
import { fetchContent } from "../services/api";
import {Link } from "react-router-dom";

interface ContentItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
}
interface ContentListProps {
  type: "tv" | "movie";
}

const ContentList: React.FC<ContentListProps> = ({ type }) => {
    const [items, setItems] = useState<ContentItem[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [page, setPage] = useState(1);
useEffect(() => {
  const loadItems = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetchContent(pageNumber, type);
      setItems((prevItems) => {
  const newItems = res.results || [];
  const existingIds = new Set(prevItems.map(item => item.id));

  const filteredItems = newItems.filter((item: ContentItem) => !existingIds.has(item.id));

  return pageNumber === 1 ? newItems : [...prevItems, ...filteredItems];
});
  setLoading(false);
        
    } catch (error) {
      console.error("Error while fetching content:", error);
      setLoading(false);
    }
  };

  loadItems(page);
}, [type, page]);


    useEffect(() => {
        const handleScroll = () =>{
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                setPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

return (<div>
    <div className="card-container">
        {items.map((item) => (
            <Link to={`/${type}/${item.id}`} key={item.id} className="card">
                <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="card-image"
                />
                <div className="card-title">
                    {item.title || item.name}
                </div>
            </Link>
        ))}
        {loading && <p>Loading...</p>}
    </div>
</div>




)
}
export default ContentList;