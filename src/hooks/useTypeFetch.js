import { useLocation } from "react-router-dom";

export default function useTypeFetchh() {
  const location = useLocation();
  return location.pathname.includes("/series") ? "tv" : "movie";
}
