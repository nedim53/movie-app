import { useLocation } from "react-router-dom";

export default function useTypeFetchh(): "tv" | "movie" {
  const location = useLocation();
  return location.pathname.includes("/tv") ? "tv" : "movie";
}
