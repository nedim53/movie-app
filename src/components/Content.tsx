import React from "react";
import ContentList from "./ContentList";

interface ContentListProps {
  type: "movie" | "tv";
}

const ContentListElements: React.FC<ContentListProps> = ({ type }) => {
  const getTitle = () => {
    return type === "movie" ? "Most Popular Movies" : "Most Popular TV Shows";
  };

  return (
    <div>
      <h1 className="headline">{getTitle()}</h1>
      <ContentList type={type} />
    </div>
  );
};

export default ContentListElements;
